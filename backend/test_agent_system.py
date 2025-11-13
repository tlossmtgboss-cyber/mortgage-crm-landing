"""
Comprehensive Agent System Test Suite

Tests all components of the agentic AI system:
- Database schema
- Tool registry
- Agent registration
- Workflow creation
- API endpoints
- Event bus
"""

import asyncio
import os
import sys
import logging
from datetime import datetime, timezone
import traceback

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Track test results
test_results = []


def record_test(test_name, success, error=None):
    """Record test result"""
    test_results.append({
        "test": test_name,
        "success": success,
        "error": str(error) if error else None
    })
    status = "✅" if success else "❌"
    print(f"{status} Test {len(test_results)}: {test_name}")
    if error:
        print(f"   Error: {str(error)[:200]}")


async def test_database_connection():
    """Test 1: Database connection"""
    try:
        from sqlalchemy import create_engine, text
        from sqlalchemy.orm import sessionmaker

        database_url = os.getenv("DATABASE_URL")
        if not database_url:
            raise Exception("DATABASE_URL not set")

        engine = create_engine(database_url)
        SessionLocal = sessionmaker(bind=engine)
        db = SessionLocal()

        # Test query
        result = db.execute(text("SELECT 1")).scalar()
        db.close()

        if result == 1:
            record_test("Database Connection", True)
            return db, engine, SessionLocal
        else:
            raise Exception("Query returned unexpected result")

    except Exception as e:
        record_test("Database Connection", False, e)
        raise


async def test_agent_tables_exist(engine):
    """Test 2: Verify agent system tables exist (create if missing)"""
    try:
        from sqlalchemy import inspect, text

        # Use SQLAlchemy's inspector (works with both PostgreSQL and SQLite)
        inspector = inspect(engine)
        existing_tables = inspector.get_table_names()

        tables_to_check = [
            "agent_workflows",
            "agent_actions",
            "agent_review_queue",
            "agent_memory",
            "agent_config"
        ]

        missing_tables = [t for t in tables_to_check if t not in existing_tables]

        if missing_tables:
            # Create the tables using the migration SQL
            logger.info(f"Creating missing agent tables: {missing_tables}")

            with engine.connect() as conn:
                # Import the migration script
                from migrations.create_agent_system import get_create_table_sql

                sqls = get_create_table_sql()

                for sql in sqls:
                    try:
                        conn.execute(text(sql))
                        conn.commit()
                    except Exception as create_error:
                        logger.warning(f"Error creating table: {create_error}")
                        # Continue even if some tables already exist

            # Check again
            inspector = inspect(engine)
            existing_tables = inspector.get_table_names()
            still_missing = [t for t in tables_to_check if t not in existing_tables]

            if still_missing:
                raise Exception(f"Failed to create tables: {still_missing}")

        record_test(f"Agent Tables Exist ({len(tables_to_check)} tables)", True)
        return True

    except Exception as e:
        record_test("Agent Tables Exist", False, e)
        raise


async def test_tool_registry_import():
    """Test 3: Import and initialize tool registry"""
    try:
        from agents.tools import tool_registry, ToolRegistry

        # Check registry exists
        if not isinstance(tool_registry, ToolRegistry):
            raise Exception("tool_registry is not a ToolRegistry instance")

        record_test("Tool Registry Import", True)
        return tool_registry

    except Exception as e:
        record_test("Tool Registry Import", False, e)
        raise


async def test_crm_tools_registered(tool_registry):
    """Test 4: Verify CRM tools are registered"""
    try:
        # Import CRM tools (this registers them)
        from agents import crm_tools

        # Get all tools
        all_tools = tool_registry.get_all_tools()

        # Expected tools
        expected_tools = [
            "update_lead_stage",
            "get_lead_info",
            "create_task",
            "send_sms",
            "send_email",
            "book_calendar_slot",
            "add_note"
        ]

        registered_names = [tool.name for tool in all_tools]

        missing = [t for t in expected_tools if t not in registered_names]

        if missing:
            raise Exception(f"Missing tools: {missing}")

        record_test(f"CRM Tools Registered ({len(all_tools)} tools)", True)
        return True

    except Exception as e:
        record_test("CRM Tools Registered", False, e)
        raise


async def test_agent_manager_init(SessionLocal):
    """Test 5: Initialize Agent Manager"""
    try:
        from agents.manager import get_agent_manager, AgentManager

        db = SessionLocal()
        agent_manager = get_agent_manager(db)

        if not isinstance(agent_manager, AgentManager):
            raise Exception("agent_manager is not an AgentManager instance")

        db.close()
        record_test("Agent Manager Init", True)
        return agent_manager

    except Exception as e:
        record_test("Agent Manager Init", False, e)
        raise


async def test_agent_registration(SessionLocal):
    """Test 6: Register agent types"""
    try:
        from agents.manager import get_agent_manager
        from agents.receptionist_agent import register_agents

        db = SessionLocal()
        agent_manager = get_agent_manager(db)

        # Register agents
        register_agents(agent_manager)

        # Check registered agents
        registered = agent_manager.get_registered_agents()

        if "receptionist" not in registered:
            raise Exception("Receptionist agent not registered")

        if "pipeline_ops" not in registered:
            raise Exception("Pipeline Ops agent not registered")

        db.close()
        record_test(f"Agent Registration ({len(registered)} agents)", True)
        return True

    except Exception as e:
        record_test("Agent Registration", False, e)
        raise


async def test_event_bus_init():
    """Test 7: Initialize Event Bus"""
    try:
        from agents.events import get_event_bus, EventBus, setup_default_handlers

        event_bus = get_event_bus()

        if not isinstance(event_bus, EventBus):
            raise Exception("event_bus is not an EventBus instance")

        # Set up default handlers
        setup_default_handlers()

        # Check handlers
        handlers = event_bus.get_handlers()

        if len(handlers) == 0:
            raise Exception("No event handlers registered")

        record_test(f"Event Bus Init ({len(handlers)} handlers)", True)
        return event_bus

    except Exception as e:
        record_test("Event Bus Init", False, e)
        raise


async def test_create_test_lead(SessionLocal):
    """Test 8: Create test lead in database"""
    try:
        from main import Lead

        db = SessionLocal()

        test_lead = Lead(
            name=f"Test Lead {datetime.now().strftime('%H%M%S')}",
            email="test@example.com",
            phone="+14155551234",
            stage="NEW",  # Use uppercase for enum
            source="test_suite",
            loan_type="purchase",
            loan_amount=350000,
            property_value=450000,
            created_at=datetime.now(timezone.utc)
        )

        db.add(test_lead)
        db.commit()
        db.refresh(test_lead)

        lead_id = test_lead.id
        db.close()

        record_test(f"Create Test Lead (ID: {lead_id})", True)
        return lead_id

    except Exception as e:
        record_test("Create Test Lead", False, e)
        raise


async def test_workflow_creation(SessionLocal, lead_id):
    """Test 9: Create agent workflow record"""
    try:
        from main import AgentWorkflow

        db = SessionLocal()

        workflow = AgentWorkflow(
            workflow_type="test",
            agent_type="receptionist",
            entity_type="lead",
            entity_id=lead_id,
            status="pending",
            state={},
            goal="Test workflow creation",
            trigger_event="test",
            started_at=datetime.now(timezone.utc)
        )

        db.add(workflow)
        db.commit()
        db.refresh(workflow)

        workflow_id = workflow.id
        db.close()

        record_test(f"Workflow Creation (ID: {workflow_id})", True)
        return workflow_id

    except Exception as e:
        record_test("Workflow Creation", False, e)
        raise


async def test_review_queue_item(SessionLocal, workflow_id):
    """Test 10: Create review queue item"""
    try:
        from main import AgentReviewQueue

        db = SessionLocal()

        review_item = AgentReviewQueue(
            workflow_id=workflow_id,
            agent_type="receptionist",
            item_type="test",
            title="Test Review Item",
            description="Testing review queue creation",
            proposed_action={"action": "test"},
            context={},
            confidence_score=0.95,
            priority="medium",
            status="pending",
            created_at=datetime.now(timezone.utc)
        )

        db.add(review_item)
        db.commit()
        db.refresh(review_item)

        item_id = review_item.id
        db.close()

        record_test(f"Review Queue Item (ID: {item_id})", True)
        return item_id

    except Exception as e:
        record_test("Review Queue Item", False, e)
        raise


async def run_test_suite():
    """Run all 10 tests"""
    print("\n" + "="*80)
    print("🧪 AGENT SYSTEM TEST SUITE - 10 Tests")
    print("="*80 + "\n")

    try:
        # Test 1: Database connection
        db, engine, SessionLocal = await test_database_connection()

        # Test 2: Agent tables exist
        await test_agent_tables_exist(engine)

        # Test 3: Tool registry import
        tool_registry = await test_tool_registry_import()

        # Test 4: CRM tools registered
        await test_crm_tools_registered(tool_registry)

        # Test 5: Agent manager init
        await test_agent_manager_init(SessionLocal)

        # Test 6: Agent registration
        await test_agent_registration(SessionLocal)

        # Test 7: Event bus init
        await test_event_bus_init()

        # Test 8: Create test lead
        lead_id = await test_create_test_lead(SessionLocal)

        # Test 9: Workflow creation
        workflow_id = await test_workflow_creation(SessionLocal, lead_id)

        # Test 10: Review queue item
        await test_review_queue_item(SessionLocal, workflow_id)

        # Summary
        print("\n" + "="*80)
        print("📊 TEST RESULTS")
        print("="*80)

        passed = sum(1 for r in test_results if r["success"])
        failed = len(test_results) - passed

        print(f"\n✅ Passed: {passed}/{len(test_results)}")
        print(f"❌ Failed: {failed}/{len(test_results)}")

        if failed > 0:
            print("\n❌ Failed Tests:")
            for r in test_results:
                if not r["success"]:
                    print(f"   - {r['test']}: {r['error']}")
            return False
        else:
            print("\n🎉 ALL TESTS PASSED!")
            return True

    except Exception as e:
        logger.error(f"Test suite failed: {e}", exc_info=True)
        print(f"\n❌ Test suite aborted: {str(e)}")
        return False


async def main():
    """Main test runner"""
    all_passed = await run_test_suite()

    print("\n" + "="*80)
    if all_passed:
        print("✅ TEST SUITE COMPLETE - ALL TESTS PASSED")
        print("="*80 + "\n")
        return 0
    else:
        print("❌ TEST SUITE COMPLETE - SOME TESTS FAILED")
        print("="*80 + "\n")
        return 1


if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(exit_code)
