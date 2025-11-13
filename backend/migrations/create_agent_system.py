"""
Migration: Create Agent System Tables

This migration creates the core tables for the agentic AI system:
1. agent_workflows - Tracks multi-step agent workflows
2. agent_actions - Logs individual agent actions (audit trail)
3. agent_tools - Registry of available tools for agents
4. agent_review_queue - Human-in-the-loop review items
5. agent_memory - Context and memory for agents (will migrate to vector store later)
"""

import os
import sys
from sqlalchemy import create_engine, text


def get_create_table_sql():
    """
    Get SQL statements to create agent tables (SQLite compatible).
    Returns list of SQL statements.
    """
    return [
        """
        CREATE TABLE IF NOT EXISTS agent_workflows (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            workflow_type VARCHAR NOT NULL,
            agent_type VARCHAR NOT NULL,
            entity_type VARCHAR,
            entity_id INTEGER,
            status VARCHAR DEFAULT 'pending',
            state TEXT,
            goal TEXT,
            trigger_event VARCHAR,
            started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            completed_at TIMESTAMP,
            error TEXT,
            created_by INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS agent_actions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            workflow_id INTEGER,
            agent_type VARCHAR NOT NULL,
            action_type VARCHAR NOT NULL,
            tool_name VARCHAR,
            input_data TEXT,
            output_data TEXT,
            status VARCHAR DEFAULT 'pending',
            reasoning TEXT,
            confidence_score REAL,
            requires_approval BOOLEAN DEFAULT 0,
            approved_by INTEGER,
            approved_at TIMESTAMP,
            error TEXT,
            duration_ms INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS agent_review_queue (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            workflow_id INTEGER,
            action_id INTEGER,
            agent_type VARCHAR NOT NULL,
            item_type VARCHAR NOT NULL,
            title VARCHAR NOT NULL,
            description TEXT,
            proposed_action TEXT NOT NULL,
            context TEXT,
            confidence_score REAL,
            priority VARCHAR DEFAULT 'medium',
            status VARCHAR DEFAULT 'pending',
            assigned_to INTEGER,
            reviewed_by INTEGER,
            reviewed_at TIMESTAMP,
            decision VARCHAR,
            feedback TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS agent_memory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            agent_type VARCHAR NOT NULL,
            entity_type VARCHAR,
            entity_id INTEGER,
            memory_type VARCHAR NOT NULL,
            content TEXT NOT NULL,
            metadata TEXT,
            embedding_vector TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS agent_config (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            agent_type VARCHAR NOT NULL UNIQUE,
            model_name VARCHAR DEFAULT 'gpt-4o-mini',
            temperature REAL DEFAULT 0.7,
            max_tokens INTEGER DEFAULT 2000,
            permissions TEXT NOT NULL,
            system_prompt TEXT,
            enabled BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    ]


def run_migration():
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ DATABASE_URL environment variable not set")
        return False

    engine = create_engine(database_url)

    print("🔄 Creating agent system tables...")

    try:
        with engine.connect() as conn:

            # 1. Agent Workflows Table
            print("  Creating agent_workflows table...")
            try:
                conn.execute(text("""
                    CREATE TABLE IF NOT EXISTS agent_workflows (
                        id SERIAL PRIMARY KEY,
                        workflow_type VARCHAR NOT NULL,
                        agent_type VARCHAR NOT NULL,
                        entity_type VARCHAR,
                        entity_id INTEGER,
                        status VARCHAR DEFAULT 'pending',
                        state JSONB,
                        goal TEXT,
                        trigger_event VARCHAR,
                        started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        completed_at TIMESTAMP WITH TIME ZONE,
                        error TEXT,
                        created_by INTEGER REFERENCES users(id),
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    )
                """))
                conn.commit()
                print("  ✅ Created agent_workflows table")
            except Exception as e:
                print(f"  ⚠️  agent_workflows might already exist: {e}")
                conn.rollback()

            # 2. Agent Actions Table (Audit Log)
            print("  Creating agent_actions table...")
            try:
                conn.execute(text("""
                    CREATE TABLE IF NOT EXISTS agent_actions (
                        id SERIAL PRIMARY KEY,
                        workflow_id INTEGER REFERENCES agent_workflows(id),
                        agent_type VARCHAR NOT NULL,
                        action_type VARCHAR NOT NULL,
                        tool_name VARCHAR,
                        input_data JSONB,
                        output_data JSONB,
                        status VARCHAR DEFAULT 'pending',
                        reasoning TEXT,
                        confidence_score FLOAT,
                        requires_approval BOOLEAN DEFAULT FALSE,
                        approved_by INTEGER REFERENCES users(id),
                        approved_at TIMESTAMP WITH TIME ZONE,
                        error TEXT,
                        duration_ms INTEGER,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    )
                """))
                conn.commit()
                print("  ✅ Created agent_actions table")
            except Exception as e:
                print(f"  ⚠️  agent_actions might already exist: {e}")
                conn.rollback()

            # 3. Agent Review Queue Table
            print("  Creating agent_review_queue table...")
            try:
                conn.execute(text("""
                    CREATE TABLE IF NOT EXISTS agent_review_queue (
                        id SERIAL PRIMARY KEY,
                        workflow_id INTEGER REFERENCES agent_workflows(id),
                        action_id INTEGER REFERENCES agent_actions(id),
                        agent_type VARCHAR NOT NULL,
                        item_type VARCHAR NOT NULL,
                        title VARCHAR NOT NULL,
                        description TEXT,
                        proposed_action JSONB NOT NULL,
                        context JSONB,
                        confidence_score FLOAT,
                        priority VARCHAR DEFAULT 'medium',
                        status VARCHAR DEFAULT 'pending',
                        assigned_to INTEGER REFERENCES users(id),
                        reviewed_by INTEGER REFERENCES users(id),
                        reviewed_at TIMESTAMP WITH TIME ZONE,
                        decision VARCHAR,
                        feedback TEXT,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        expires_at TIMESTAMP WITH TIME ZONE
                    )
                """))
                conn.commit()
                print("  ✅ Created agent_review_queue table")
            except Exception as e:
                print(f"  ⚠️  agent_review_queue might already exist: {e}")
                conn.rollback()

            # 4. Agent Memory Table (temporary - will move to vector store)
            print("  Creating agent_memory table...")
            try:
                conn.execute(text("""
                    CREATE TABLE IF NOT EXISTS agent_memory (
                        id SERIAL PRIMARY KEY,
                        agent_type VARCHAR NOT NULL,
                        memory_type VARCHAR NOT NULL,
                        entity_type VARCHAR,
                        entity_id INTEGER,
                        key VARCHAR NOT NULL,
                        value JSONB,
                        metadata JSONB,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        expires_at TIMESTAMP WITH TIME ZONE
                    )
                """))
                conn.commit()
                print("  ✅ Created agent_memory table")
            except Exception as e:
                print(f"  ⚠️  agent_memory might already exist: {e}")
                conn.rollback()

            # 5. Agent Config Table
            print("  Creating agent_config table...")
            try:
                conn.execute(text("""
                    CREATE TABLE IF NOT EXISTS agent_config (
                        id SERIAL PRIMARY KEY,
                        agent_type VARCHAR NOT NULL UNIQUE,
                        enabled BOOLEAN DEFAULT TRUE,
                        config JSONB NOT NULL,
                        permissions JSONB,
                        model_name VARCHAR DEFAULT 'gpt-4o-mini',
                        temperature FLOAT DEFAULT 0.7,
                        max_tokens INTEGER DEFAULT 2000,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    )
                """))
                conn.commit()
                print("  ✅ Created agent_config table")
            except Exception as e:
                print(f"  ⚠️  agent_config might already exist: {e}")
                conn.rollback()

            # Create indexes
            print("  Creating indexes...")
            try:
                indexes = [
                    "CREATE INDEX IF NOT EXISTS idx_agent_workflows_status ON agent_workflows(status)",
                    "CREATE INDEX IF NOT EXISTS idx_agent_workflows_entity ON agent_workflows(entity_type, entity_id)",
                    "CREATE INDEX IF NOT EXISTS idx_agent_workflows_agent_type ON agent_workflows(agent_type)",
                    "CREATE INDEX IF NOT EXISTS idx_agent_actions_workflow ON agent_actions(workflow_id)",
                    "CREATE INDEX IF NOT EXISTS idx_agent_actions_agent_type ON agent_actions(agent_type)",
                    "CREATE INDEX IF NOT EXISTS idx_agent_actions_status ON agent_actions(status)",
                    "CREATE INDEX IF NOT EXISTS idx_agent_review_queue_status ON agent_review_queue(status)",
                    "CREATE INDEX IF NOT EXISTS idx_agent_review_queue_assigned ON agent_review_queue(assigned_to)",
                    "CREATE INDEX IF NOT EXISTS idx_agent_memory_entity ON agent_memory(entity_type, entity_id)",
                    "CREATE INDEX IF NOT EXISTS idx_agent_memory_agent_type ON agent_memory(agent_type)"
                ]

                for index_sql in indexes:
                    conn.execute(text(index_sql))

                conn.commit()
                print("  ✅ Created indexes")
            except Exception as e:
                print(f"  ⚠️  Indexes might already exist: {e}")
                conn.rollback()

        print("\n✅ Agent system migration completed successfully!")
        return True

    except Exception as e:
        print(f"\n❌ Migration failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = run_migration()
    sys.exit(0 if success else 1)
