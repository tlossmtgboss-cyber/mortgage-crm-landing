"""
Event Bus System

Handles event-driven agent triggers including:
- Database events (new lead, stage change, etc.)
- Time-based triggers (scheduled tasks)
- External webhooks
- Manual triggers
"""

import logging
import asyncio
from typing import Dict, Any, List, Callable, Optional
from datetime import datetime, timezone
from enum import Enum
from pydantic import BaseModel
from sqlalchemy.orm import Session

logger = logging.getLogger(__name__)


class EventType(str, Enum):
    """Types of events that can trigger agents"""

    # Lead events
    LEAD_CREATED = "lead.created"
    LEAD_UPDATED = "lead.updated"
    LEAD_STAGE_CHANGED = "lead.stage_changed"
    LEAD_ASSIGNED = "lead.assigned"

    # Loan events
    LOAN_CREATED = "loan.created"
    LOAN_UPDATED = "loan.updated"
    LOAN_STATUS_CHANGED = "loan.status_changed"

    # Communication events
    INCOMING_CALL = "communication.incoming_call"
    INCOMING_SMS = "communication.incoming_sms"
    INCOMING_EMAIL = "communication.incoming_email"
    FORM_SUBMISSION = "communication.form_submission"

    # Task events
    TASK_CREATED = "task.created"
    TASK_OVERDUE = "task.overdue"
    TASK_COMPLETED = "task.completed"

    # Time-based events
    DAILY_PIPELINE_REVIEW = "schedule.daily_pipeline_review"
    HOURLY_CHECK = "schedule.hourly_check"
    WEEKLY_REPORT = "schedule.weekly_report"

    # External events
    WEBHOOK_RECEIVED = "webhook.received"
    MANUAL_TRIGGER = "manual.trigger"


class Event(BaseModel):
    """Event data structure"""
    event_type: EventType
    entity_type: Optional[str] = None
    entity_id: Optional[int] = None
    data: Dict[str, Any] = {}
    timestamp: datetime
    source: Optional[str] = None


class EventHandler(BaseModel):
    """Event handler registration"""
    event_type: EventType
    agent_type: str
    goal_template: str
    permissions: List[str] = []
    conditions: Optional[Dict[str, Any]] = None
    priority: int = 0

    class Config:
        arbitrary_types_allowed = True


class EventBus:
    """
    Central event bus for agent triggers.

    Routes events to appropriate agents based on registered handlers.
    """

    def __init__(self):
        self._handlers: Dict[EventType, List[EventHandler]] = {}
        self._event_queue: asyncio.Queue = asyncio.Queue()
        self._processing: bool = False
        logger.info("EventBus initialized")

    def register_handler(
        self,
        event_type: EventType,
        agent_type: str,
        goal_template: str,
        permissions: List[str] = None,
        conditions: Dict[str, Any] = None,
        priority: int = 0
    ):
        """
        Register an event handler.

        Args:
            event_type: Type of event to listen for
            agent_type: Type of agent to trigger
            goal_template: Template for the agent's goal (can use {variable} placeholders)
            permissions: List of permissions for the agent
            conditions: Optional conditions that must be met (e.g., {"stage": "new"})
            priority: Handler priority (higher = runs first)
        """
        handler = EventHandler(
            event_type=event_type,
            agent_type=agent_type,
            goal_template=goal_template,
            permissions=permissions or [],
            conditions=conditions,
            priority=priority
        )

        if event_type not in self._handlers:
            self._handlers[event_type] = []

        self._handlers[event_type].append(handler)

        # Sort by priority (descending)
        self._handlers[event_type].sort(key=lambda h: h.priority, reverse=True)

        logger.info(f"Registered handler: {event_type.value} → {agent_type}")

    async def emit(
        self,
        event_type: EventType,
        entity_type: str = None,
        entity_id: int = None,
        data: Dict[str, Any] = None,
        source: str = None
    ):
        """
        Emit an event to the bus.

        Args:
            event_type: Type of event
            entity_type: Type of entity (lead, loan, etc.)
            entity_id: ID of the entity
            data: Event data/payload
            source: Source of the event
        """
        event = Event(
            event_type=event_type,
            entity_type=entity_type,
            entity_id=entity_id,
            data=data or {},
            timestamp=datetime.now(timezone.utc),
            source=source
        )

        await self._event_queue.put(event)
        logger.info(f"Event emitted: {event_type.value} (entity={entity_type}:{entity_id})")

        # Start processing if not already running
        if not self._processing:
            asyncio.create_task(self._process_events())

    async def _process_events(self):
        """Process events from the queue"""
        self._processing = True

        try:
            while not self._event_queue.empty():
                event = await self._event_queue.get()
                await self._handle_event(event)
                self._event_queue.task_done()

        except Exception as e:
            logger.error(f"Event processing error: {str(e)}", exc_info=True)

        finally:
            self._processing = False

    async def _handle_event(self, event: Event):
        """
        Handle a single event by triggering appropriate agents.

        Args:
            event: Event to handle
        """
        try:
            handlers = self._handlers.get(event.event_type, [])

            if not handlers:
                logger.debug(f"No handlers registered for {event.event_type.value}")
                return

            logger.info(f"Processing event {event.event_type.value} with {len(handlers)} handlers")

            for handler in handlers:
                # Check conditions
                if handler.conditions and not self._check_conditions(handler.conditions, event.data):
                    logger.debug(f"Conditions not met for handler {handler.agent_type}")
                    continue

                # Format goal from template
                goal = handler.goal_template.format(**event.data)

                logger.info(f"Triggering agent {handler.agent_type} with goal: {goal}")

                # Note: Actual agent triggering will be done by AgentManager
                # This is a placeholder for the integration point
                # In practice, you'd call:
                # await agent_manager.start_workflow(
                #     agent_type=handler.agent_type,
                #     goal=goal,
                #     entity_type=event.entity_type,
                #     entity_id=event.entity_id,
                #     context=event.data,
                #     trigger_event=event.event_type.value,
                #     permissions=handler.permissions
                # )

        except Exception as e:
            logger.error(f"Failed to handle event {event.event_type.value}: {str(e)}", exc_info=True)

    def _check_conditions(self, conditions: Dict[str, Any], data: Dict[str, Any]) -> bool:
        """
        Check if event data meets handler conditions.

        Args:
            conditions: Required conditions
            data: Event data

        Returns:
            True if conditions are met
        """
        for key, value in conditions.items():
            if key not in data:
                return False

            if isinstance(value, list):
                # Check if data value is in list
                if data[key] not in value:
                    return False
            else:
                # Direct equality check
                if data[key] != value:
                    return False

        return True

    def get_handlers(self, event_type: EventType = None) -> List[EventHandler]:
        """
        Get registered handlers, optionally filtered by event type.

        Args:
            event_type: Optional event type to filter by

        Returns:
            List of handlers
        """
        if event_type:
            return self._handlers.get(event_type, [])

        # Return all handlers
        all_handlers = []
        for handlers in self._handlers.values():
            all_handlers.extend(handlers)

        return all_handlers


# Global event bus instance
_global_event_bus: Optional[EventBus] = None


def get_event_bus() -> EventBus:
    """
    Get or create the global event bus instance.

    Returns:
        EventBus instance
    """
    global _global_event_bus

    if _global_event_bus is None:
        _global_event_bus = EventBus()
        logger.info("Created global EventBus instance")

    return _global_event_bus


# Helper functions for common event emissions

async def emit_lead_created(lead_id: int, lead_data: Dict[str, Any]):
    """Emit a lead created event"""
    event_bus = get_event_bus()
    await event_bus.emit(
        event_type=EventType.LEAD_CREATED,
        entity_type="lead",
        entity_id=lead_id,
        data=lead_data,
        source="crm"
    )


async def emit_lead_stage_changed(lead_id: int, old_stage: str, new_stage: str):
    """Emit a lead stage changed event"""
    event_bus = get_event_bus()
    await event_bus.emit(
        event_type=EventType.LEAD_STAGE_CHANGED,
        entity_type="lead",
        entity_id=lead_id,
        data={"old_stage": old_stage, "new_stage": new_stage},
        source="crm"
    )


async def emit_incoming_communication(
    comm_type: str,
    lead_id: int = None,
    contact_info: str = None,
    message: str = None
):
    """Emit an incoming communication event"""
    event_bus = get_event_bus()

    event_type_map = {
        "call": EventType.INCOMING_CALL,
        "sms": EventType.INCOMING_SMS,
        "email": EventType.INCOMING_EMAIL
    }

    event_type = event_type_map.get(comm_type, EventType.FORM_SUBMISSION)

    await event_bus.emit(
        event_type=event_type,
        entity_type="lead",
        entity_id=lead_id,
        data={
            "contact_info": contact_info,
            "message": message,
            "comm_type": comm_type
        },
        source="communication"
    )


async def emit_task_overdue(task_id: int, lead_id: int = None, assigned_to_id: int = None):
    """Emit a task overdue event"""
    event_bus = get_event_bus()
    await event_bus.emit(
        event_type=EventType.TASK_OVERDUE,
        entity_type="task",
        entity_id=task_id,
        data={"lead_id": lead_id, "assigned_to_id": assigned_to_id},
        source="scheduler"
    )


async def emit_scheduled_event(event_type: EventType, context: Dict[str, Any] = None):
    """Emit a scheduled event (daily review, weekly report, etc.)"""
    event_bus = get_event_bus()
    await event_bus.emit(
        event_type=event_type,
        data=context or {},
        source="scheduler"
    )


def setup_default_handlers():
    """
    Set up default event handlers for the system.

    This should be called during application startup to register
    all agent triggers.
    """
    event_bus = get_event_bus()

    # AI Receptionist: Handle new leads
    event_bus.register_handler(
        event_type=EventType.LEAD_CREATED,
        agent_type="receptionist",
        goal_template="Qualify and route new lead {name} (ID: {lead_id}). Review contact info, send welcome message, and book initial consultation if qualified.",
        permissions=["leads:read", "leads:write", "communications:send", "calendar:write", "tasks:write"],
        priority=100
    )

    # AI Receptionist: Handle incoming communications
    event_bus.register_handler(
        event_type=EventType.INCOMING_SMS,
        agent_type="receptionist",
        goal_template="Respond to incoming SMS from {contact_info}. Message: {message}",
        permissions=["leads:read", "communications:send"],
        priority=100
    )

    event_bus.register_handler(
        event_type=EventType.INCOMING_CALL,
        agent_type="receptionist",
        goal_template="Handle incoming call from {contact_info}",
        permissions=["leads:read", "leads:write", "communications:send", "tasks:write"],
        priority=100
    )

    # AI Pipeline Ops: Daily pipeline review
    event_bus.register_handler(
        event_type=EventType.DAILY_PIPELINE_REVIEW,
        agent_type="pipeline_ops",
        goal_template="Conduct daily pipeline review: check for stalled deals, missing data, and upcoming milestones",
        permissions=["leads:read", "loans:read", "tasks:write", "communications:send"],
        priority=50
    )

    # AI Pipeline Ops: Task overdue
    event_bus.register_handler(
        event_type=EventType.TASK_OVERDUE,
        agent_type="pipeline_ops",
        goal_template="Handle overdue task {task_id}: notify assignee and escalate if needed",
        permissions=["tasks:read", "tasks:write", "communications:send"],
        priority=75
    )

    logger.info("Default event handlers registered")
