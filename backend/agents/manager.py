"""
Agent Manager - Orchestration Layer

Manages all agent instances, routes events to appropriate agents,
and coordinates workflow execution across the system.
"""

import logging
from typing import Dict, Any, Optional, List, Type
from datetime import datetime, timezone
from sqlalchemy.orm import Session

from .base_agent import BaseAgent

logger = logging.getLogger(__name__)


class AgentManager:
    """
    Central orchestration system for all agents.

    Responsibilities:
    - Register and instantiate agent types
    - Route goals/events to appropriate agents
    - Manage workflow lifecycle (create, execute, track, resume)
    - Persist workflow state to database
    - Coordinate human-in-the-loop reviews
    """

    def __init__(self, db: Session):
        self.db = db
        self._agent_registry: Dict[str, Type[BaseAgent]] = {}
        self._agent_instances: Dict[str, BaseAgent] = {}
        logger.info("AgentManager initialized")

    def register_agent_type(self, agent_type: str, agent_class: Type[BaseAgent]):
        """
        Register an agent class by type name.

        Args:
            agent_type: Unique identifier for this agent type (e.g., "receptionist", "pipeline_ops")
            agent_class: The agent class (subclass of BaseAgent)
        """
        self._agent_registry[agent_type] = agent_class
        logger.info(f"Registered agent type: {agent_type}")

    def get_agent(self, agent_type: str, permissions: List[str] = None, **kwargs) -> Optional[BaseAgent]:
        """
        Get or create an agent instance of the specified type.

        Args:
            agent_type: Type of agent to get
            permissions: List of permissions for the agent
            **kwargs: Additional arguments to pass to agent constructor

        Returns:
            Agent instance or None if type not registered
        """
        # Check if instance already exists
        instance_key = f"{agent_type}:{','.join(sorted(permissions or []))}"

        if instance_key in self._agent_instances:
            return self._agent_instances[instance_key]

        # Check if type is registered
        if agent_type not in self._agent_registry:
            logger.error(f"Agent type not registered: {agent_type}")
            return None

        # Create new instance
        agent_class = self._agent_registry[agent_type]
        agent_instance = agent_class(
            agent_type=agent_type,
            permissions=permissions or [],
            db=self.db,
            **kwargs
        )

        self._agent_instances[instance_key] = agent_instance
        logger.info(f"Created agent instance: {instance_key}")

        return agent_instance

    async def start_workflow(
        self,
        agent_type: str,
        goal: str,
        entity_type: str = None,
        entity_id: int = None,
        context: Dict[str, Any] = None,
        trigger_event: str = None,
        created_by: int = None,
        permissions: List[str] = None
    ) -> Dict[str, Any]:
        """
        Start a new agent workflow.

        Args:
            agent_type: Type of agent to use
            goal: The goal/objective for the agent
            entity_type: Type of entity (lead, loan, etc.)
            entity_id: ID of the entity
            context: Additional context
            trigger_event: Event that triggered this workflow
            created_by: User ID who triggered this (if human-initiated)
            permissions: Agent permissions

        Returns:
            Dict with workflow_id, status, and results
        """
        try:
            from main import AgentWorkflow

            logger.info(f"Starting workflow: agent={agent_type}, goal='{goal}'")

            # Create workflow record
            workflow = AgentWorkflow(
                workflow_type="autonomous",
                agent_type=agent_type,
                entity_type=entity_type,
                entity_id=entity_id,
                status="running",
                state={},
                goal=goal,
                trigger_event=trigger_event,
                started_at=datetime.now(timezone.utc),
                created_by=created_by
            )

            self.db.add(workflow)
            self.db.commit()
            self.db.refresh(workflow)

            workflow_id = workflow.id
            logger.info(f"Created workflow {workflow_id}")

            # Get agent instance
            agent = self.get_agent(agent_type, permissions=permissions)

            if not agent:
                error_msg = f"Agent type not found: {agent_type}"
                workflow.status = "failed"
                workflow.error = error_msg
                workflow.completed_at = datetime.now(timezone.utc)
                self.db.commit()
                return {
                    "success": False,
                    "error": error_msg,
                    "workflow_id": workflow_id
                }

            # Run agent
            result = await agent.run(
                goal=goal,
                entity_type=entity_type,
                entity_id=entity_id,
                context=context,
                workflow_id=workflow_id
            )

            # Update workflow with results
            workflow.status = "completed" if result.get("success") else "failed"
            workflow.state = {
                "actions_taken": result.get("actions_taken", []),
                "messages": result.get("messages", []),
                "confidence": result.get("confidence", 1.0)
            }
            workflow.completed_at = datetime.now(timezone.utc)

            if result.get("error"):
                workflow.error = result["error"]

            self.db.commit()

            # Log all actions to agent_actions table
            await self._log_actions(
                workflow_id=workflow_id,
                agent_type=agent_type,
                actions=result.get("actions_taken", [])
            )

            # Create review items if needed
            if result.get("requires_review"):
                await self._create_review_items(
                    workflow_id=workflow_id,
                    agent_type=agent_type,
                    actions=result.get("actions_taken", [])
                )

            logger.info(f"Workflow {workflow_id} completed: success={result.get('success')}")

            return {
                "success": result.get("success"),
                "workflow_id": workflow_id,
                "actions_taken": result.get("actions_taken", []),
                "requires_review": result.get("requires_review", False),
                "confidence": result.get("confidence", 1.0),
                "error": result.get("error")
            }

        except Exception as e:
            logger.error(f"Workflow execution failed: {str(e)}", exc_info=True)

            # Update workflow as failed
            if 'workflow' in locals():
                workflow.status = "failed"
                workflow.error = str(e)
                workflow.completed_at = datetime.now(timezone.utc)
                self.db.commit()

            return {
                "success": False,
                "error": str(e),
                "workflow_id": workflow.id if 'workflow' in locals() else None
            }

    async def get_workflow_status(self, workflow_id: int) -> Optional[Dict[str, Any]]:
        """
        Get the current status of a workflow.

        Args:
            workflow_id: ID of the workflow

        Returns:
            Dict with workflow status and details
        """
        try:
            from main import AgentWorkflow

            workflow = self.db.query(AgentWorkflow).filter(AgentWorkflow.id == workflow_id).first()

            if not workflow:
                return None

            return {
                "workflow_id": workflow.id,
                "agent_type": workflow.agent_type,
                "status": workflow.status,
                "goal": workflow.goal,
                "entity_type": workflow.entity_type,
                "entity_id": workflow.entity_id,
                "state": workflow.state,
                "trigger_event": workflow.trigger_event,
                "started_at": workflow.started_at.isoformat() if workflow.started_at else None,
                "completed_at": workflow.completed_at.isoformat() if workflow.completed_at else None,
                "error": workflow.error
            }

        except Exception as e:
            logger.error(f"Failed to get workflow status: {str(e)}", exc_info=True)
            return None

    async def list_workflows(
        self,
        agent_type: str = None,
        status: str = None,
        entity_type: str = None,
        entity_id: int = None,
        limit: int = 50
    ) -> List[Dict[str, Any]]:
        """
        List workflows with optional filters.

        Args:
            agent_type: Filter by agent type
            status: Filter by status (pending, running, completed, failed)
            entity_type: Filter by entity type
            entity_id: Filter by entity ID
            limit: Maximum number of results

        Returns:
            List of workflow dicts
        """
        try:
            from main import AgentWorkflow

            query = self.db.query(AgentWorkflow)

            if agent_type:
                query = query.filter(AgentWorkflow.agent_type == agent_type)

            if status:
                query = query.filter(AgentWorkflow.status == status)

            if entity_type:
                query = query.filter(AgentWorkflow.entity_type == entity_type)

            if entity_id:
                query = query.filter(AgentWorkflow.entity_id == entity_id)

            workflows = query.order_by(AgentWorkflow.created_at.desc()).limit(limit).all()

            return [
                {
                    "workflow_id": w.id,
                    "agent_type": w.agent_type,
                    "status": w.status,
                    "goal": w.goal,
                    "entity_type": w.entity_type,
                    "entity_id": w.entity_id,
                    "trigger_event": w.trigger_event,
                    "started_at": w.started_at.isoformat() if w.started_at else None,
                    "completed_at": w.completed_at.isoformat() if w.completed_at else None
                }
                for w in workflows
            ]

        except Exception as e:
            logger.error(f"Failed to list workflows: {str(e)}", exc_info=True)
            return []

    async def _log_actions(
        self,
        workflow_id: int,
        agent_type: str,
        actions: List[Dict[str, Any]]
    ):
        """
        Log agent actions to the agent_actions table.

        Args:
            workflow_id: Workflow ID
            agent_type: Type of agent
            actions: List of actions taken
        """
        try:
            from main import AgentAction

            for action in actions:
                action_record = AgentAction(
                    workflow_id=workflow_id,
                    agent_type=agent_type,
                    action_type="tool_call",
                    tool_name=action.get("tool_name"),
                    input_data=action.get("arguments"),
                    output_data=action.get("result"),
                    status="completed" if action.get("result", {}).get("success") else "failed",
                    created_at=datetime.now(timezone.utc)
                )

                self.db.add(action_record)

            self.db.commit()
            logger.info(f"Logged {len(actions)} actions for workflow {workflow_id}")

        except Exception as e:
            logger.error(f"Failed to log actions: {str(e)}", exc_info=True)

    async def _create_review_items(
        self,
        workflow_id: int,
        agent_type: str,
        actions: List[Dict[str, Any]]
    ):
        """
        Create review queue items for actions requiring human approval.

        Args:
            workflow_id: Workflow ID
            agent_type: Type of agent
            actions: List of actions taken
        """
        try:
            from main import AgentReviewQueue

            for action in actions:
                # Only create review items for actions that need approval
                # For now, we'll create reviews for all actions as a safety measure
                review_item = AgentReviewQueue(
                    workflow_id=workflow_id,
                    agent_type=agent_type,
                    item_type="action_review",
                    title=f"Review {action.get('tool_name')} action",
                    description=f"Agent attempted to execute {action.get('tool_name')} with arguments: {action.get('arguments')}",
                    proposed_action={
                        "tool_name": action.get("tool_name"),
                        "arguments": action.get("arguments"),
                        "result": action.get("result")
                    },
                    context={},
                    confidence_score=1.0,
                    priority="medium",
                    status="pending",
                    created_at=datetime.now(timezone.utc)
                )

                self.db.add(review_item)

            self.db.commit()
            logger.info(f"Created {len(actions)} review items for workflow {workflow_id}")

        except Exception as e:
            logger.error(f"Failed to create review items: {str(e)}", exc_info=True)

    def get_registered_agents(self) -> List[str]:
        """Get list of all registered agent types"""
        return list(self._agent_registry.keys())

    def get_active_workflows_count(self, agent_type: str = None) -> int:
        """
        Get count of active (running) workflows.

        Args:
            agent_type: Optional filter by agent type

        Returns:
            Count of active workflows
        """
        try:
            from main import AgentWorkflow

            query = self.db.query(AgentWorkflow).filter(
                AgentWorkflow.status.in_(["pending", "running"])
            )

            if agent_type:
                query = query.filter(AgentWorkflow.agent_type == agent_type)

            return query.count()

        except Exception as e:
            logger.error(f"Failed to count active workflows: {str(e)}", exc_info=True)
            return 0


# Global agent manager instance (will be initialized with DB session)
_global_agent_manager: Optional[AgentManager] = None


def get_agent_manager(db: Session) -> AgentManager:
    """
    Get or create the global agent manager instance.

    Args:
        db: Database session

    Returns:
        AgentManager instance
    """
    global _global_agent_manager

    if _global_agent_manager is None:
        _global_agent_manager = AgentManager(db)
        logger.info("Created global AgentManager instance")

    # Update DB session
    _global_agent_manager.db = db

    return _global_agent_manager
