"""
Test AI Receptionist Agent

Tests the AI Receptionist agent with a new lead workflow.
"""

import asyncio
import os
import sys
import logging
from datetime import datetime, timezone

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Ensure OpenAI API key is set
if not os.getenv("OPENAI_API_KEY"):
    print("❌ ERROR: OPENAI_API_KEY environment variable not set")
    print("Please set it with: export OPENAI_API_KEY='your-key-here'")
    sys.exit(1)


async def test_receptionist_agent():
    """Test the AI Receptionist agent with a sample lead"""
    print("\n" + "="*80)
    print("🤖 AI RECEPTIONIST AGENT TEST")
    print("="*80 + "\n")

    try:
        # Import after logging setup
        from sqlalchemy import create_engine
        from sqlalchemy.orm import sessionmaker
        from main import Lead, User
        from agents.setup import initialize_agent_system
        from agents.manager import get_agent_manager
        from agents.receptionist_agent import register_agents

        # Get database URL from environment
        database_url = os.getenv("DATABASE_URL")
        if not database_url:
            print("❌ ERROR: DATABASE_URL not set")
            sys.exit(1)

        # Create database session
        engine = create_engine(database_url)
        SessionLocal = sessionmaker(bind=engine)
        db = SessionLocal()

        print("✅ Connected to database")

        # Initialize agent system
        print("🔧 Initializing agent system...")
        initialize_agent_system(db)
        print("✅ Agent system initialized")

        # Create a test lead
        print("\n📝 Creating test lead...")
        test_lead = Lead(
            name="Sarah Johnson",
            email="sarah.johnson@example.com",
            phone="+14155551234",
            stage="new",
            source="website",
            loan_type="purchase",
            loan_amount=450000,
            property_value=550000,
            created_at=datetime.now(timezone.utc)
        )

        db.add(test_lead)
        db.commit()
        db.refresh(test_lead)

        print(f"✅ Created lead: {test_lead.name} (ID: {test_lead.id})")
        print(f"   - Email: {test_lead.email}")
        print(f"   - Phone: {test_lead.phone}")
        print(f"   - Loan Type: {test_lead.loan_type}")
        print(f"   - Loan Amount: ${test_lead.loan_amount:,.0f}")
        print(f"   - Property Value: ${test_lead.property_value:,.0f}")

        # Get agent manager and start workflow
        print("\n🚀 Starting AI Receptionist workflow...")
        agent_manager = get_agent_manager(db)
        register_agents(agent_manager)

        # Define the goal
        goal = f"Qualify and route new lead {test_lead.name} (ID: {test_lead.id}). Review contact info, send welcome message, and book initial consultation if qualified."

        # Start the workflow
        result = await agent_manager.start_workflow(
            agent_type="receptionist",
            goal=goal,
            entity_type="lead",
            entity_id=test_lead.id,
            context={
                "lead_id": test_lead.id,
                "name": test_lead.name,
                "email": test_lead.email,
                "phone": test_lead.phone,
                "source": test_lead.source,
                "loan_type": test_lead.loan_type,
                "loan_amount": test_lead.loan_amount,
                "property_value": test_lead.property_value
            },
            trigger_event="lead.created"
        )

        # Display results
        print("\n" + "="*80)
        print("📊 WORKFLOW RESULTS")
        print("="*80)
        print(f"\nStatus: {'✅ SUCCESS' if result.get('success') else '❌ FAILED'}")
        print(f"Workflow ID: {result.get('workflow_id')}")
        print(f"Requires Review: {result.get('requires_review')}")
        print(f"Confidence: {result.get('confidence', 0) * 100:.1f}%")

        if result.get("error"):
            print(f"\n⚠️  Error: {result['error']}")

        # Show actions taken
        actions = result.get("actions_taken", [])
        if actions:
            print(f"\n🎯 Actions Taken ({len(actions)}):")
            for i, action in enumerate(actions, 1):
                tool_name = action.get("tool_name")
                success = action.get("result", {}).get("success", False)
                status_icon = "✅" if success else "❌"
                print(f"   {i}. {status_icon} {tool_name}")

                # Show details for specific tools
                if tool_name == "send_sms":
                    msg_len = action.get("result", {}).get("message_length", 0)
                    print(f"      → SMS sent ({msg_len} chars)")
                elif tool_name == "send_email":
                    subject = action.get("arguments", {}).get("subject", "")
                    print(f"      → Email: {subject}")
                elif tool_name == "create_task":
                    title = action.get("arguments", {}).get("title", "")
                    print(f"      → Task: {title}")
                elif tool_name == "update_lead_stage":
                    new_stage = action.get("result", {}).get("new_stage", "")
                    print(f"      → Stage: {new_stage}")
                elif tool_name == "book_calendar_slot":
                    start_time = action.get("arguments", {}).get("start_time", "")
                    print(f"      → Appointment: {start_time}")

        # Show messages
        messages = result.get("messages", [])
        if messages and len(messages) > 0:
            print(f"\n💬 Agent Messages:")
            for msg in messages[-3:]:  # Show last 3 messages
                # Truncate long messages
                msg_str = str(msg)
                if len(msg_str) > 200:
                    msg_str = msg_str[:200] + "..."
                print(f"   {msg_str}")

        print("\n" + "="*80)
        print("✅ TEST COMPLETE")
        print("="*80 + "\n")

        # Clean up
        db.close()

        return result

    except Exception as e:
        logger.error(f"Test failed: {e}", exc_info=True)
        print(f"\n❌ TEST FAILED: {str(e)}\n")
        return None


if __name__ == "__main__":
    print("\n⚙️  Setting up test environment...")

    # Run the test
    result = asyncio.run(test_receptionist_agent())

    if result and result.get("success"):
        print("🎉 Test passed successfully!")
        sys.exit(0)
    else:
        print("❌ Test failed")
        sys.exit(1)
