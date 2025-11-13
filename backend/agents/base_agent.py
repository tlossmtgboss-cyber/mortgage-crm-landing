"""
Base Agent Class

Foundation for all agentic AI implementations in the system.
Uses LangGraph for state management and orchestration.
"""

import logging
from typing import Any, Dict, List, Optional, TypedDict
from datetime import datetime, timezone
from abc import ABC, abstractmethod

from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver

from .tools import tool_registry

logger = logging.getLogger(__name__)


class AgentState(TypedDict):
    """State maintained throughout agent execution"""
    messages: List[Any]
    goal: str
    entity_type: Optional[str]
    entity_id: Optional[int]
    context: Dict[str, Any]
    next_action: Optional[str]
    workflow_id: Optional[int]
    actions_taken: List[Dict[str, Any]]
    requires_review: bool
    confidence: float
    error: Optional[str]


class BaseAgent(ABC):
    """
    Base class for all agents in the system.

    Agents are autonomous entities that can:
    - Understand context and goals
    - Plan multi-step actions
    - Use tools to interact with the CRM
    - Maintain state across conversations
    - Request human review when needed
    """

    def __init__(
        self,
        agent_type: str,
        model_name: str = "gpt-4o-mini",
        temperature: float = 0.7,
        max_tokens: int = 2000,
        permissions: List[str] = None,
        db = None
    ):
        self.agent_type = agent_type
        self.model_name = model_name
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.permissions = permissions or []
        self.db = db

        # Initialize LLM
        self.llm = ChatOpenAI(
            model=model_name,
            temperature=temperature,
            max_tokens=max_tokens
        )

        # Initialize LangGraph components
        self.memory = MemorySaver()
        self.graph = self._build_graph()

        logger.info(f"Initialized {agent_type} agent with model {model_name}")

    @abstractmethod
    def get_system_prompt(self) -> str:
        """
        Return the system prompt that defines this agent's personality and role.
        Must be implemented by each agent subclass.
        """
        pass

    @abstractmethod
    def get_goal_prompt(self, goal: str, context: Dict[str, Any]) -> str:
        """
        Convert a goal and context into a specific prompt for this agent.
        Must be implemented by each agent subclass.
        """
        pass

    def _build_graph(self) -> StateGraph:
        """Build the LangGraph workflow for this agent"""
        workflow = StateGraph(AgentState)

        # Add nodes
        workflow.add_node("plan", self._plan_node)
        workflow.add_node("execute", self._execute_node)
        workflow.add_node("reflect", self._reflect_node)

        # Set entry point
        workflow.set_entry_point("plan")

        # Add edges
        workflow.add_conditional_edges(
            "plan",
            self._should_execute,
            {
                "execute": "execute",
                "end": END
            }
        )

        workflow.add_conditional_edges(
            "execute",
            self._should_continue,
            {
                "plan": "plan",
                "reflect": "reflect",
                "end": END
            }
        )

        workflow.add_edge("reflect", END)

        return workflow.compile(checkpointer=self.memory)

    async def _plan_node(self, state: AgentState) -> AgentState:
        """Planning node - decide what action to take"""
        try:
            # Get available tools
            tool_schemas = tool_registry.get_tool_schemas(self.permissions)

            # Build messages
            messages = [
                SystemMessage(content=self.get_system_prompt())
            ]

            if state.get("goal"):
                goal_prompt = self.get_goal_prompt(state["goal"], state.get("context", {}))
                messages.append(HumanMessage(content=goal_prompt))

            # Add conversation history
            messages.extend(state.get("messages", []))

            # Call LLM with tools
            response = await self.llm.ainvoke(
                messages,
                tools=tool_schemas if tool_schemas else None
            )

            # Update state
            state["messages"].append(response)

            # Check if tool calls were made
            if hasattr(response, "tool_calls") and response.tool_calls:
                state["next_action"] = "execute_tools"
            else:
                state["next_action"] = "complete"

            logger.info(f"{self.agent_type}: Planned next action - {state['next_action']}")

            return state

        except Exception as e:
            logger.error(f"{self.agent_type}: Planning failed - {str(e)}", exc_info=True)
            state["error"] = str(e)
            state["next_action"] = "error"
            return state

    async def _execute_node(self, state: AgentState) -> AgentState:
        """Execution node - execute planned actions"""
        try:
            last_message = state["messages"][-1]

            if not hasattr(last_message, "tool_calls") or not last_message.tool_calls:
                state["next_action"] = "complete"
                return state

            # Execute each tool call
            tool_results = []

            for tool_call in last_message.tool_calls:
                tool_name = tool_call["name"]
                tool_args = tool_call["args"]

                logger.info(f"{self.agent_type}: Executing tool {tool_name}")

                # Execute tool
                result = await tool_registry.execute_tool(
                    name=tool_name,
                    arguments=tool_args,
                    agent_type=self.agent_type,
                    workflow_id=state.get("workflow_id"),
                    db=self.db
                )

                tool_results.append({
                    "tool_name": tool_name,
                    "arguments": tool_args,
                    "result": result,
                    "timestamp": datetime.now(timezone.utc).isoformat()
                })

                # Add to actions taken
                if "actions_taken" not in state:
                    state["actions_taken"] = []
                state["actions_taken"].append(tool_results[-1])

            # Add tool results to messages
            # LangGraph will handle this automatically based on tool_calls

            state["next_action"] = "plan"  # Go back to planning
            logger.info(f"{self.agent_type}: Executed {len(tool_results)} tools")

            return state

        except Exception as e:
            logger.error(f"{self.agent_type}: Execution failed - {str(e)}", exc_info=True)
            state["error"] = str(e)
            state["next_action"] = "error"
            return state

    async def _reflect_node(self, state: AgentState) -> AgentState:
        """Reflection node - evaluate what was accomplished"""
        try:
            # Build reflection prompt
            actions_summary = "\n".join([
                f"- {action.get('tool_name')}: {action.get('result', {}).get('success', False)}"
                for action in state.get("actions_taken", [])
            ])

            reflection_prompt = f"""
            Goal: {state.get('goal')}

            Actions Taken:
            {actions_summary}

            Please provide a brief summary of what was accomplished and whether the goal was achieved.
            """

            messages = state["messages"] + [HumanMessage(content=reflection_prompt)]

            response = await self.llm.ainvoke(messages)

            state["messages"].append(response)
            state["next_action"] = "complete"

            logger.info(f"{self.agent_type}: Reflection complete")

            return state

        except Exception as e:
            logger.error(f"{self.agent_type}: Reflection failed - {str(e)}", exc_info=True)
            state["error"] = str(e)
            return state

    def _should_execute(self, state: AgentState) -> str:
        """Decide if we should execute tools or end"""
        if state.get("next_action") == "execute_tools":
            return "execute"
        return "end"

    def _should_continue(self, state: AgentState) -> str:
        """Decide if we should continue planning, reflect, or end"""
        if state.get("error"):
            return "end"

        next_action = state.get("next_action")

        if next_action == "plan":
            # Check if we've taken too many actions
            if len(state.get("actions_taken", [])) >= 10:
                return "reflect"
            return "plan"

        if next_action == "complete":
            return "reflect"

        return "end"

    async def run(
        self,
        goal: str,
        entity_type: str = None,
        entity_id: int = None,
        context: Dict[str, Any] = None,
        workflow_id: int = None
    ) -> Dict[str, Any]:
        """
        Run the agent with a specific goal.

        Args:
            goal: The goal/objective for the agent to achieve
            entity_type: Type of entity (lead, loan, etc.)
            entity_id: ID of the entity
            context: Additional context for the agent
            workflow_id: Associated workflow ID

        Returns:
            Dict with result, actions taken, and state
        """
        try:
            logger.info(f"{self.agent_type}: Starting run with goal '{goal}'")

            # Initialize state
            initial_state: AgentState = {
                "messages": [],
                "goal": goal,
                "entity_type": entity_type,
                "entity_id": entity_id,
                "context": context or {},
                "next_action": None,
                "workflow_id": workflow_id,
                "actions_taken": [],
                "requires_review": False,
                "confidence": 1.0,
                "error": None
            }

            # Run the graph
            config = {"configurable": {"thread_id": f"{workflow_id or 'default'}"}}
            final_state = await self.graph.ainvoke(initial_state, config)

            logger.info(f"{self.agent_type}: Run complete with {len(final_state.get('actions_taken', []))} actions")

            return {
                "success": final_state.get("error") is None,
                "actions_taken": final_state.get("actions_taken", []),
                "messages": [str(msg.content) for msg in final_state.get("messages", []) if hasattr(msg, 'content')],
                "requires_review": final_state.get("requires_review", False),
                "confidence": final_state.get("confidence", 1.0),
                "error": final_state.get("error")
            }

        except Exception as e:
            logger.error(f"{self.agent_type}: Run failed - {str(e)}", exc_info=True)
            return {
                "success": False,
                "error": str(e),
                "actions_taken": [],
                "requires_review": True
            }
