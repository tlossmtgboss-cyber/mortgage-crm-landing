"""
Agent System Setup

Initializes the agent system by registering all tools and event handlers.
This should be called during application startup.
"""

import logging
from sqlalchemy.orm import Session

from .manager import get_agent_manager
from .events import get_event_bus, setup_default_handlers
from .receptionist_agent import register_agents

# Import CRM tools to ensure they're registered
from . import crm_tools

logger = logging.getLogger(__name__)


def initialize_agent_system(db: Session = None):
    """
    Initialize the agent system.

    This should be called during application startup to:
    1. Import and register all CRM tools
    2. Set up event handlers
    3. Register agent types

    Args:
        db: Optional database session
    """
    try:
        logger.info("Initializing agent system...")

        # CRM tools are automatically registered via their @tool decorators
        # when the module is imported above

        # Set up default event handlers
        setup_default_handlers()
        logger.info("Event handlers registered")

        # Register agent types (if db session provided)
        if db:
            agent_manager = get_agent_manager(db)
            register_agents(agent_manager)
            logger.info("Agent types registered")

        logger.info("Agent system initialized successfully")

    except Exception as e:
        logger.error(f"Failed to initialize agent system: {e}", exc_info=True)
        raise


def get_agent_system_info():
    """
    Get information about the agent system configuration.

    Returns:
        Dict with system information
    """
    try:
        from .tools import tool_registry

        event_bus = get_event_bus()

        # Get registered tools
        all_tools = tool_registry.get_all_tools()

        # Get event handlers
        all_handlers = event_bus.get_handlers()

        return {
            "tools": {
                "count": len(all_tools),
                "names": [tool.name for tool in all_tools]
            },
            "event_handlers": {
                "count": len(all_handlers),
                "types": list(set([h.event_type.value for h in all_handlers]))
            },
            "status": "initialized"
        }

    except Exception as e:
        logger.error(f"Failed to get system info: {e}", exc_info=True)
        return {"status": "error", "error": str(e)}
