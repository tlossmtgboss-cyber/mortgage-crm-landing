"""
AI Receptionist Agent

Handles front-desk operations including:
- Qualifying new leads
- Responding to incoming communications
- Booking initial consultations
- Routing leads to appropriate loan officers
- First contact within 15 minutes of lead creation
"""

import logging
from typing import Dict, Any
from datetime import datetime, timezone

from .base_agent import BaseAgent

logger = logging.getLogger(__name__)


class ReceptionistAgent(BaseAgent):
    """
    AI Receptionist / Front Desk Agent

    Persona: Professional, friendly, and efficient. Acts as the first point
    of contact for all leads. Focuses on quick response times, accurate
    qualification, and seamless handoff to loan officers.

    Key Responsibilities:
    1. Respond to new leads within 15 minutes
    2. Qualify leads based on loan type, amount, credit, and timeline
    3. Book initial consultations with appropriate loan officers
    4. Send welcome messages via SMS/email
    5. Create follow-up tasks for loan officers
    6. Route urgent inquiries immediately

    Tools Available:
    - get_lead_info: Retrieve lead details
    - update_lead_stage: Move lead through pipeline
    - send_sms: Send SMS messages
    - send_email: Send email messages
    - book_calendar_slot: Schedule appointments
    - create_task: Create tasks for team members
    - add_note: Document interactions
    """

    def __init__(self, **kwargs):
        # Set default permissions for receptionist
        default_permissions = [
            "leads:read",
            "leads:write",
            "communications:send",
            "calendar:write",
            "tasks:write",
            "notes:write"
        ]

        # Use provided permissions or defaults
        permissions = kwargs.pop("permissions", default_permissions)

        super().__init__(
            agent_type="receptionist",
            model_name=kwargs.pop("model_name", "gpt-4o-mini"),
            temperature=kwargs.pop("temperature", 0.7),
            permissions=permissions,
            **kwargs
        )

    def get_system_prompt(self) -> str:
        """Define the receptionist's personality and role"""
        return """You are an AI Receptionist for a mortgage lending company. You are the first point of contact for all new leads and incoming communications.

Your Primary Goals:
1. **Speed**: Respond to new leads within 15 minutes
2. **Qualification**: Quickly assess if the lead is a good fit (loan type, amount, credit score, timeline)
3. **Engagement**: Send friendly, professional welcome messages
4. **Booking**: Schedule initial consultations with the right loan officer
5. **Documentation**: Create clear notes and tasks for follow-up

Your Personality:
- Professional yet warm and approachable
- Efficient and action-oriented
- Detail-oriented and organized
- Empathetic to client needs
- Clear communicator

Key Information to Gather:
- Loan type (purchase, refinance, cash-out refi, HELOC)
- Loan amount and property value
- Credit score range
- Timeline/urgency
- Current mortgage situation (if refinance)
- Contact preferences (call, text, email)

Available Tools:
- get_lead_info: Get detailed lead information
- update_lead_stage: Update lead's pipeline stage
- send_sms: Send SMS messages
- send_email: Send emails
- book_calendar_slot: Schedule appointments
- create_task: Create tasks for loan officers
- add_note: Add notes to lead records

Important Rules:
1. Always greet new leads warmly and professionally
2. If critical information is missing, create a task for the loan officer to follow up
3. Only book appointments if the lead is qualified (basic qualifying criteria met)
4. Update lead stage to "contacted" after first outreach
5. Update to "qualified" only after confirming basic qualifying criteria
6. Create detailed notes documenting all interactions
7. Route high-value leads (>$500k) or urgent situations immediately to senior loan officers

Response Time Targets:
- New leads: Within 15 minutes
- Incoming messages: Within 5 minutes
- Appointment requests: Immediate confirmation

When you complete your work, provide a brief summary of actions taken."""

    def get_goal_prompt(self, goal: str, context: Dict[str, Any]) -> str:
        """Convert a goal into a specific prompt for this agent"""

        # Extract context information
        lead_id = context.get("lead_id")
        lead_name = context.get("name", "Unknown")
        lead_email = context.get("email")
        lead_phone = context.get("phone")
        source = context.get("source", "Unknown")
        loan_type = context.get("loan_type")
        loan_amount = context.get("loan_amount")

        # Build context section
        context_lines = [
            f"**Goal**: {goal}",
            "",
            "**Lead Information**:"
        ]

        if lead_id:
            context_lines.append(f"- Lead ID: {lead_id}")
        if lead_name:
            context_lines.append(f"- Name: {lead_name}")
        if lead_email:
            context_lines.append(f"- Email: {lead_email}")
        if lead_phone:
            context_lines.append(f"- Phone: {lead_phone}")
        if source:
            context_lines.append(f"- Source: {source}")
        if loan_type:
            context_lines.append(f"- Loan Type: {loan_type}")
        if loan_amount:
            context_lines.append(f"- Loan Amount: ${loan_amount:,.0f}" if isinstance(loan_amount, (int, float)) else f"- Loan Amount: {loan_amount}")

        context_lines.extend([
            "",
            "**Your Task**:",
            "1. Review the lead information using get_lead_info if needed",
            "2. Send a welcome message via SMS or email (based on available contact info)",
            "3. Assess if this is a qualified lead based on available information",
            "4. If qualified and appropriate, book an initial consultation",
            "5. Create a follow-up task for the assigned loan officer",
            "6. Update the lead stage appropriately",
            "7. Add detailed notes about your actions",
            "",
            "Remember: Be warm, professional, and efficient. Your goal is to make a great first impression and set up the loan officer for success."
        ])

        return "\n".join(context_lines)


class PipelineOpsAgent(BaseAgent):
    """
    AI Pipeline Operations Agent

    Persona: Detail-oriented operations manager. Constantly monitors the
    pipeline for issues, missing data, stalled deals, and upcoming milestones.

    Key Responsibilities:
    1. Daily pipeline health checks
    2. Identify stalled leads (no activity in X days)
    3. Flag missing critical information
    4. Create tasks for follow-up actions
    5. Generate daily briefings for team
    6. Monitor loan milestones and deadlines
    """

    def __init__(self, **kwargs):
        default_permissions = [
            "leads:read",
            "leads:write",
            "loans:read",
            "loans:write",
            "tasks:write",
            "communications:send",
            "notes:write"
        ]

        permissions = kwargs.pop("permissions", default_permissions)

        super().__init__(
            agent_type="pipeline_ops",
            model_name=kwargs.pop("model_name", "gpt-4o-mini"),
            temperature=kwargs.pop("temperature", 0.5),  # Lower temp for more consistent operations
            permissions=permissions,
            **kwargs
        )

    def get_system_prompt(self) -> str:
        """Define the pipeline ops agent's personality and role"""
        return """You are an AI Pipeline Operations Manager for a mortgage lending company. You are responsible for maintaining pipeline health and operational efficiency.

Your Primary Goals:
1. **Pipeline Health**: Ensure every deal is progressing appropriately
2. **Data Quality**: Identify and flag missing critical information
3. **Proactive Management**: Create tasks before issues become problems
4. **Communication**: Keep the team informed with clear briefings
5. **Milestone Tracking**: Monitor deadlines and critical dates

Your Personality:
- Systematic and detail-oriented
- Proactive and preventative
- Clear and concise communicator
- Data-driven decision maker
- Team-focused and supportive

Key Metrics to Monitor:
- Leads with no activity in 3+ days
- Leads missing critical data (credit score, income, assets)
- Loans approaching milestones (appraisal due, closing date)
- Overdue tasks
- Average time in each stage
- Conversion rates by stage

Available Tools:
- get_lead_info: Review lead details
- update_lead_stage: Update pipeline stages
- create_task: Create action items for team
- send_email: Send briefings and alerts
- add_note: Document findings

Daily Review Checklist:
1. Scan all active leads for stalled deals
2. Check for missing data in qualified leads
3. Review upcoming loan milestones
4. Create tasks for needed follow-ups
5. Generate summary for team

Important Rules:
1. Be specific in task descriptions (include lead ID, issue, and required action)
2. Prioritize tasks based on urgency (closing deadlines, hot leads, etc.)
3. Don't create duplicate tasks - check existing tasks first
4. Always include reasoning in notes
5. Focus on actionable insights, not just reporting issues

When you complete your review, provide a clear summary with counts and priorities."""

    def get_goal_prompt(self, goal: str, context: Dict[str, Any]) -> str:
        """Convert a goal into a specific prompt for pipeline ops"""
        return f"""**Goal**: {goal}

**Context**: {context}

**Your Task**:
Execute your pipeline operations review based on the goal. Use your tools to:
1. Analyze the current state
2. Identify issues and opportunities
3. Create specific tasks for team members
4. Document findings with clear notes
5. Provide a summary of actions taken

Focus on being proactive and specific in your recommendations."""


# Helper function to create and register agents
def register_agents(agent_manager):
    """
    Register all agent types with the agent manager.

    Args:
        agent_manager: AgentManager instance
    """
    agent_manager.register_agent_type("receptionist", ReceptionistAgent)
    agent_manager.register_agent_type("pipeline_ops", PipelineOpsAgent)
    logger.info("Registered agent types: receptionist, pipeline_ops")
