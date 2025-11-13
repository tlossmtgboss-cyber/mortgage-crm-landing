"""
CRM Tools for Agents

Core tools that agents can use to interact with the CRM system.
These tools are registered with the ToolRegistry and made available to agents
based on their permissions.
"""

import logging
from typing import Dict, Any, Optional
from datetime import datetime, timezone
from sqlalchemy.orm import Session

from .tools import tool

logger = logging.getLogger(__name__)


# ============================================================================
# LEAD MANAGEMENT TOOLS
# ============================================================================

@tool(
    name="update_lead_stage",
    description="Update the stage of a lead in the CRM pipeline",
    parameters={
        "type": "object",
        "properties": {
            "lead_id": {"type": "integer", "description": "ID of the lead to update"},
            "new_stage": {"type": "string", "description": "New stage (new, contacted, qualified, pre_approved, application, processing, approved, funded, closed)"},
            "notes": {"type": "string", "description": "Optional notes about the stage change"}
        },
        "required": ["lead_id", "new_stage"]
    },
    permissions=["leads:write"]
)
async def update_lead_stage(lead_id: int, new_stage: str, notes: str = None, db: Session = None) -> Dict[str, Any]:
    """Update lead stage"""
    try:
        from main import Lead

        lead = db.query(Lead).filter(Lead.id == lead_id).first()
        if not lead:
            return {"success": False, "error": f"Lead {lead_id} not found"}

        old_stage = lead.stage
        lead.stage = new_stage
        lead.updated_at = datetime.now(timezone.utc)

        # Add note if provided
        if notes:
            from main import Note
            note = Note(
                lead_id=lead_id,
                content=f"Stage changed from {old_stage} to {new_stage}: {notes}",
                created_at=datetime.now(timezone.utc)
            )
            db.add(note)

        db.commit()

        logger.info(f"Updated lead {lead_id} stage from {old_stage} to {new_stage}")

        return {
            "success": True,
            "lead_id": lead_id,
            "old_stage": old_stage,
            "new_stage": new_stage
        }

    except Exception as e:
        logger.error(f"Failed to update lead stage: {e}", exc_info=True)
        return {"success": False, "error": str(e)}


@tool(
    name="get_lead_info",
    description="Get detailed information about a lead including contact details, stage, and recent activity",
    parameters={
        "type": "object",
        "properties": {
            "lead_id": {"type": "integer", "description": "ID of the lead to retrieve"}
        },
        "required": ["lead_id"]
    },
    permissions=["leads:read"]
)
async def get_lead_info(lead_id: int, db: Session = None) -> Dict[str, Any]:
    """Get lead information"""
    try:
        from main import Lead

        lead = db.query(Lead).filter(Lead.id == lead_id).first()
        if not lead:
            return {"success": False, "error": f"Lead {lead_id} not found"}

        return {
            "success": True,
            "lead": {
                "id": lead.id,
                "name": lead.name,
                "email": lead.email,
                "phone": lead.phone,
                "stage": lead.stage,
                "source": lead.source,
                "loan_type": lead.loan_type,
                "loan_amount": lead.loan_amount,
                "property_value": lead.property_value,
                "created_at": lead.created_at.isoformat() if lead.created_at else None,
                "assigned_to_id": lead.assigned_to_id
            }
        }

    except Exception as e:
        logger.error(f"Failed to get lead info: {e}", exc_info=True)
        return {"success": False, "error": str(e)}


# ============================================================================
# TASK MANAGEMENT TOOLS
# ============================================================================

@tool(
    name="create_task",
    description="Create a new task in the CRM and assign it to a user",
    parameters={
        "type": "object",
        "properties": {
            "title": {"type": "string", "description": "Task title"},
            "description": {"type": "string", "description": "Detailed task description"},
            "assigned_to_id": {"type": "integer", "description": "User ID to assign the task to"},
            "priority": {"type": "string", "enum": ["low", "medium", "high"], "description": "Task priority"},
            "due_date": {"type": "string", "description": "Due date in ISO format (optional)"},
            "lead_id": {"type": "integer", "description": "Related lead ID (optional)"},
            "loan_id": {"type": "integer", "description": "Related loan ID (optional)"}
        },
        "required": ["title", "assigned_to_id"]
    },
    permissions=["tasks:write"]
)
async def create_task(
    title: str,
    assigned_to_id: int,
    description: str = None,
    priority: str = "medium",
    due_date: str = None,
    lead_id: int = None,
    loan_id: int = None,
    db: Session = None
) -> Dict[str, Any]:
    """Create a new task"""
    try:
        from main import AITask, TaskType

        task = AITask(
            title=title,
            description=description,
            assigned_to_id=assigned_to_id,
            priority=priority,
            type=TaskType.HUMAN_NEEDED,
            lead_id=lead_id,
            loan_id=loan_id,
            created_at=datetime.now(timezone.utc)
        )

        if due_date:
            from dateutil import parser
            task.due_date = parser.parse(due_date)

        db.add(task)
        db.commit()
        db.refresh(task)

        logger.info(f"Created task {task.id}: {title}")

        return {
            "success": True,
            "task_id": task.id,
            "title": title,
            "assigned_to_id": assigned_to_id
        }

    except Exception as e:
        logger.error(f"Failed to create task: {e}", exc_info=True)
        return {"success": False, "error": str(e)}


# ============================================================================
# COMMUNICATION TOOLS
# ============================================================================

@tool(
    name="send_sms",
    description="Send an SMS message to a contact",
    parameters={
        "type": "object",
        "properties": {
            "phone": {"type": "string", "description": "Phone number in E.164 format (+1234567890)"},
            "message": {"type": "string", "description": "Message content (max 160 chars for single SMS)"},
            "lead_id": {"type": "integer", "description": "Related lead ID (optional)"},
            "loan_id": {"type": "integer", "description": "Related loan ID (optional)"}
        },
        "required": ["phone", "message"]
    },
    permissions=["communications:send"]
)
async def send_sms(
    phone: str,
    message: str,
    lead_id: int = None,
    loan_id: int = None,
    db: Session = None
) -> Dict[str, Any]:
    """Send SMS via Twilio"""
    try:
        import os
        from twilio.rest import Client

        # Get Twilio credentials from environment
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        from_phone = os.getenv("TWILIO_PHONE_NUMBER")

        if not all([account_sid, auth_token, from_phone]):
            return {"success": False, "error": "Twilio not configured"}

        client = Client(account_sid, auth_token)

        # Send message
        twilio_message = client.messages.create(
            body=message,
            from_=from_phone,
            to=phone
        )

        # Log communication
        from main import Communication
        comm = Communication(
            type="sms",
            direction="outbound",
            contact_info=phone,
            message=message,
            lead_id=lead_id,
            loan_id=loan_id,
            status="sent",
            created_at=datetime.now(timezone.utc)
        )
        db.add(comm)
        db.commit()

        logger.info(f"Sent SMS to {phone}: {message[:50]}...")

        return {
            "success": True,
            "sid": twilio_message.sid,
            "phone": phone,
            "message_length": len(message)
        }

    except Exception as e:
        logger.error(f"Failed to send SMS: {e}", exc_info=True)
        return {"success": False, "error": str(e)}


@tool(
    name="send_email",
    description="Send an email to a contact",
    parameters={
        "type": "object",
        "properties": {
            "to_email": {"type": "string", "description": "Recipient email address"},
            "subject": {"type": "string", "description": "Email subject line"},
            "body": {"type": "string", "description": "Email body content"},
            "lead_id": {"type": "integer", "description": "Related lead ID (optional)"},
            "loan_id": {"type": "integer", "description": "Related loan ID (optional)"}
        },
        "required": ["to_email", "subject", "body"]
    },
    permissions=["communications:send"]
)
async def send_email(
    to_email: str,
    subject: str,
    body: str,
    lead_id: int = None,
    loan_id: int = None,
    db: Session = None
) -> Dict[str, Any]:
    """Send email (placeholder - needs email service integration)"""
    try:
        # TODO: Integrate with email service (SendGrid, AWS SES, etc.)

        # For now, just log the communication
        from main import Communication
        comm = Communication(
            type="email",
            direction="outbound",
            contact_info=to_email,
            subject=subject,
            message=body,
            lead_id=lead_id,
            loan_id=loan_id,
            status="queued",
            created_at=datetime.now(timezone.utc)
        )
        db.add(comm)
        db.commit()

        logger.info(f"Queued email to {to_email}: {subject}")

        return {
            "success": True,
            "to_email": to_email,
            "subject": subject,
            "status": "queued"
        }

    except Exception as e:
        logger.error(f"Failed to send email: {e}", exc_info=True)
        return {"success": False, "error": str(e)}


# ============================================================================
# CALENDAR TOOLS
# ============================================================================

@tool(
    name="book_calendar_slot",
    description="Book a calendar appointment for a lead",
    parameters={
        "type": "object",
        "properties": {
            "lead_id": {"type": "integer", "description": "Lead ID for the appointment"},
            "user_id": {"type": "integer", "description": "User ID (LO) for the appointment"},
            "start_time": {"type": "string", "description": "Start time in ISO format"},
            "duration_minutes": {"type": "integer", "description": "Duration in minutes (default 30)"},
            "title": {"type": "string", "description": "Appointment title"},
            "notes": {"type": "string", "description": "Optional appointment notes"}
        },
        "required": ["lead_id", "user_id", "start_time"]
    },
    permissions=["calendar:write"]
)
async def book_calendar_slot(
    lead_id: int,
    user_id: int,
    start_time: str,
    duration_minutes: int = 30,
    title: str = "Lead Consultation",
    notes: str = None,
    db: Session = None
) -> Dict[str, Any]:
    """Book calendar appointment (placeholder - needs calendar integration)"""
    try:
        from dateutil import parser

        start_dt = parser.parse(start_time)

        # TODO: Integrate with calendar service (Calendly, Google Calendar, etc.)

        # For now, create a task as a placeholder
        from main import AITask, TaskType

        task = AITask(
            title=f"📅 {title}",
            description=f"Scheduled appointment\nStart: {start_dt}\nDuration: {duration_minutes}min\n{notes or ''}",
            assigned_to_id=user_id,
            lead_id=lead_id,
            type=TaskType.AWAITING_REVIEW,
            due_date=start_dt,
            created_at=datetime.now(timezone.utc)
        )

        db.add(task)
        db.commit()
        db.refresh(task)

        logger.info(f"Booked calendar slot for lead {lead_id} with user {user_id}")

        return {
            "success": True,
            "appointment_id": task.id,
            "lead_id": lead_id,
            "user_id": user_id,
            "start_time": start_time,
            "duration_minutes": duration_minutes
        }

    except Exception as e:
        logger.error(f"Failed to book calendar slot: {e}", exc_info=True)
        return {"success": False, "error": str(e)}


# ============================================================================
# NOTE TOOLS
# ============================================================================

@tool(
    name="add_note",
    description="Add a note to a lead or loan record",
    parameters={
        "type": "object",
        "properties": {
            "content": {"type": "string", "description": "Note content"},
            "lead_id": {"type": "integer", "description": "Related lead ID (optional)"},
            "loan_id": {"type": "integer", "description": "Related loan ID (optional)"},
            "note_type": {"type": "string", "description": "Type of note (general, phone_call, meeting, etc.)"}
        },
        "required": ["content"]
    },
    permissions=["notes:write"]
)
async def add_note(
    content: str,
    lead_id: int = None,
    loan_id: int = None,
    note_type: str = "general",
    db: Session = None
) -> Dict[str, Any]:
    """Add a note to the CRM"""
    try:
        from main import Note

        note = Note(
            content=content,
            lead_id=lead_id,
            loan_id=loan_id,
            type=note_type,
            created_at=datetime.now(timezone.utc)
        )

        db.add(note)
        db.commit()
        db.refresh(note)

        logger.info(f"Added note to lead={lead_id} loan={loan_id}")

        return {
            "success": True,
            "note_id": note.id,
            "content": content[:100]
        }

    except Exception as e:
        logger.error(f"Failed to add note: {e}", exc_info=True)
        return {"success": False, "error": str(e)}
