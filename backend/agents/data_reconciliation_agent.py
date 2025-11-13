"""
Data Reconciliation Agent

Parses emails, documents, and communications for relevant information
and proposes updates to lead/loan records.

Key Responsibilities:
1. Extract data from unstructured text (emails, messages, docs)
2. Identify missing or outdated information in CRM records
3. Propose updates with confidence scores
4. Learn from user approvals/rejections
5. Flag data discrepancies between systems
"""

import logging
from typing import Dict, Any
from datetime import datetime, timezone

from .base_agent import BaseAgent

logger = logging.getLogger(__name__)


class DataReconciliationAgent(BaseAgent):
    """
    AI Data Reconciliation Agent

    Persona: Meticulous data analyst. Carefully extracts structured data
    from unstructured sources (emails, messages, documents) and proposes
    updates to CRM records.

    Key Features:
    - Natural language understanding of financial data
    - Pattern recognition for loan terms, rates, amounts
    - Confidence scoring for extracted data
    - Learning from user feedback

    Tools Available:
    - get_lead_info: Retrieve current lead data
    - update_lead_stage: Update lead information
    - add_note: Document extraction and changes
    - create_task: Flag manual review needs
    """

    def __init__(self, **kwargs):
        # Set default permissions for data reconciliation
        default_permissions = [
            "leads:read",
            "leads:write",
            "loans:read",
            "loans:write",
            "notes:write",
            "tasks:write"
        ]

        # Use provided permissions or defaults
        permissions = kwargs.pop("permissions", default_permissions)

        super().__init__(
            agent_type="data_reconciliation",
            model_name=kwargs.pop("model_name", "gpt-4o"),  # Use GPT-4 for better data extraction
            temperature=kwargs.pop("temperature", 0.3),  # Lower temp for consistent extraction
            permissions=permissions,
            **kwargs
        )

    def get_system_prompt(self) -> str:
        """Define the data reconciliation agent's personality and role"""
        return """You are an AI Data Reconciliation Agent for a mortgage lending company. Your role is to extract structured financial data from unstructured sources and ensure CRM data accuracy.

Your Primary Goals:
1. **Accurate Extraction**: Extract loan data (amounts, rates, terms, dates) from text with high precision
2. **Data Validation**: Compare extracted data against existing CRM records
3. **Confidence Scoring**: Provide confidence scores for each extraction (0.0-1.0)
4. **Proposal Generation**: Suggest specific field updates with reasoning
5. **Discrepancy Detection**: Flag conflicts between sources

Your Personality:
- Methodical and detail-oriented
- Conservative with low-confidence data
- Transparent about uncertainty
- Data-driven decision maker
- Quality-focused over speed

Data You Can Extract:
**Lead/Client Information:**
- Name, email, phone
- Current address, mailing address
- Employment information, income
- Credit score estimates
- Co-borrowers

**Loan Details:**
- Loan type (purchase, refinance, cash-out, HELOC)
- Loan amount, property value
- Interest rate, APR
- Down payment, LTV ratio
- Closing date, lock expiration
- Property address

**Financial Data:**
- Monthly income, DTI ratio
- Assets, reserves
- Debts, liabilities
- HOA fees, property taxes
- Insurance costs

**Status Updates:**
- Appraisal ordered/completed
- Title cleared
- Conditions satisfied
- Underwriting decision
- Funding date

Available Tools:
- get_lead_info: Retrieve current CRM data
- add_note: Document findings and proposed changes
- create_task: Flag items needing manual review

Extraction Guidelines:
1. **Always provide confidence scores**:
   - 0.9-1.0: Explicitly stated, clear formatting
   - 0.7-0.9: Strongly implied, context supports
   - 0.5-0.7: Inferred, some ambiguity
   - <0.5: Guessed, low confidence - create task for human review

2. **Format dates consistently**: Use ISO 8601 (YYYY-MM-DD)

3. **Normalize amounts**: Always extract numbers without formatting
   - "$500,000" → 500000
   - "five hundred thousand" → 500000

4. **Validate ranges**:
   - Loan amounts: $10,000 - $10,000,000
   - Interest rates: 0.5% - 15%
   - Credit scores: 300 - 850
   - LTV: 0% - 100%

5. **Handle conflicts**:
   - If extracted data conflicts with CRM, flag both values
   - Always prefer more recent information
   - Note the source of each piece of data

6. **Create tasks for**:
   - Confidence < 0.6
   - Conflicting data between sources
   - Critical missing information
   - Unusual values outside typical ranges

Output Format:
For each extraction, provide:
- Field name
- Current value (from CRM)
- Extracted value
- Confidence score
- Reasoning
- Source reference (email, doc, message)

When you complete your analysis, provide a structured summary of proposed updates."""

    def get_goal_prompt(self, goal: str, context: Dict[str, Any]) -> str:
        """Convert a goal into a specific prompt for data reconciliation"""

        # Extract context information
        source_type = context.get("source_type", "unknown")  # email, message, document
        source_content = context.get("content", "")
        lead_id = context.get("lead_id")
        loan_id = context.get("loan_id")
        source_date = context.get("date", "")

        # Build prompt
        prompt_lines = [
            f"**Goal**: {goal}",
            "",
            f"**Source Type**: {source_type}",
            f"**Source Date**: {source_date}",
            ""
        ]

        if lead_id:
            prompt_lines.append(f"**Lead ID**: {lead_id}")
        if loan_id:
            prompt_lines.append(f"**Loan ID**: {loan_id}")

        prompt_lines.extend([
            "",
            "**Source Content**:",
            "```",
            source_content[:2000] if len(source_content) > 2000 else source_content,  # Limit length
            "```",
            "",
            "**Your Task**:",
            "1. Review the source content carefully",
            "2. Extract all relevant financial and loan data",
            "3. If lead_id or loan_id provided, retrieve current CRM data using get_lead_info",
            "4. Compare extracted data with CRM records (if available)",
            "5. For each field:",
            "   - Determine confidence score",
            "   - Note if it conflicts with CRM data",
            "   - Provide reasoning for extraction",
            "6. Create tasks for manual review when:",
            "   - Confidence < 0.6",
            "   - Data conflicts detected",
            "   - Critical information missing",
            "7. Add comprehensive notes documenting all findings",
            "",
            "**Important**: Do NOT update records directly. Only propose updates via notes and tasks.",
            "All actual data changes require human approval through the review queue.",
            "",
            "Provide a structured analysis with clear confidence scores and reasoning."
        ])

        return "\n".join(prompt_lines)


def register_data_reconciliation_agent(agent_manager):
    """
    Register the Data Reconciliation Agent with the agent manager.

    Args:
        agent_manager: AgentManager instance
    """
    agent_manager.register_agent_type("data_reconciliation", DataReconciliationAgent)
    logger.info("Registered Data Reconciliation Agent")
