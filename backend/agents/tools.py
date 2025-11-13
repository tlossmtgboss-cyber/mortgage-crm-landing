"""
Tool Registry for Agent System

Provides a registry of callable tools that agents can use to interact with
the CRM system, external APIs, and perform actions.
"""

import logging
from typing import Any, Callable, Dict, List, Optional
from pydantic import BaseModel, Field
from datetime import datetime, timezone
import json

logger = logging.getLogger(__name__)


class ToolDefinition(BaseModel):
    """Definition of a tool that agents can call"""
    name: str
    description: str
    parameters: Dict[str, Any]
    required_permissions: List[str] = Field(default_factory=list)
    function: Optional[Callable] = None

    class Config:
        arbitrary_types_allowed = True


class ToolRegistry:
    """Registry for managing agent tools"""

    def __init__(self):
        self._tools: Dict[str, ToolDefinition] = {}
        logger.info("ToolRegistry initialized")

    def register(
        self,
        name: str,
        description: str,
        parameters: Dict[str, Any],
        permissions: List[str] = None
    ):
        """Decorator to register a tool function"""
        def decorator(func: Callable):
            tool_def = ToolDefinition(
                name=name,
                description=description,
                parameters=parameters,
                required_permissions=permissions or [],
                function=func
            )
            self._tools[name] = tool_def
            logger.info(f"Registered tool: {name}")
            return func
        return decorator

    def get_tool(self, name: str) -> Optional[ToolDefinition]:
        """Get a tool by name"""
        return self._tools.get(name)

    def get_all_tools(self, agent_permissions: List[str] = None) -> List[ToolDefinition]:
        """Get all tools, optionally filtered by permissions"""
        if agent_permissions is None:
            return list(self._tools.values())

        # Filter tools based on permissions
        return [
            tool for tool in self._tools.values()
            if all(perm in agent_permissions for perm in tool.required_permissions)
        ]

    def get_tool_schemas(self, agent_permissions: List[str] = None) -> List[Dict[str, Any]]:
        """Get OpenAI function calling schemas for tools"""
        tools = self.get_all_tools(agent_permissions)

        schemas = []
        for tool in tools:
            schema = {
                "type": "function",
                "function": {
                    "name": tool.name,
                    "description": tool.description,
                    "parameters": tool.parameters
                }
            }
            schemas.append(schema)

        return schemas

    async def execute_tool(
        self,
        name: str,
        arguments: Dict[str, Any],
        agent_type: str = None,
        workflow_id: int = None,
        db = None
    ) -> Dict[str, Any]:
        """Execute a tool by name with given arguments"""
        tool = self.get_tool(name)

        if not tool:
            error_msg = f"Tool not found: {name}"
            logger.error(error_msg)
            return {"error": error_msg, "success": False}

        try:
            start_time = datetime.now(timezone.utc)

            # Execute the tool function
            if db:
                result = await tool.function(db=db, **arguments)
            else:
                result = await tool.function(**arguments)

            duration_ms = int((datetime.now(timezone.utc) - start_time).total_seconds() * 1000)

            logger.info(f"Tool {name} executed successfully in {duration_ms}ms")

            return {
                "success": True,
                "result": result,
                "duration_ms": duration_ms
            }

        except Exception as e:
            error_msg = f"Tool execution failed for {name}: {str(e)}"
            logger.error(error_msg, exc_info=True)
            return {
                "success": False,
                "error": str(e),
                "tool_name": name
            }


# Global tool registry instance
tool_registry = ToolRegistry()

# Convenience decorator
def tool(name: str, description: str, parameters: Dict[str, Any], permissions: List[str] = None):
    """Decorator to register a tool"""
    return tool_registry.register(name, description, parameters, permissions)
