"""
Migration: Add AI Task Learning Tables and Columns

This migration adds:
1. AITaskLearning table - tracks learning state per task type
2. TaskApproval table - tracks individual approvals
3. New columns to Task table for AI integration
"""

import os
import sys
from sqlalchemy import create_engine, text

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def run_migration():
    # Get database URL from environment
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ DATABASE_URL environment variable not set")
        return False

    engine = create_engine(database_url)

    print("🔄 Running AI Task Learning migration...")

    try:
        with engine.connect() as conn:
            # Add new columns to tasks table
            print("  Adding new columns to tasks table...")

            try:
                conn.execute(text("""
                    ALTER TABLE tasks
                    ADD COLUMN IF NOT EXISTS task_type VARCHAR,
                    ADD COLUMN IF NOT EXISTS ai_drafted_message TEXT,
                    ADD COLUMN IF NOT EXISTS ai_completed BOOLEAN DEFAULT FALSE,
                    ADD COLUMN IF NOT EXISTS ai_approved BOOLEAN DEFAULT FALSE,
                    ADD COLUMN IF NOT EXISTS ai_edited BOOLEAN DEFAULT FALSE
                """))
                conn.commit()
                print("  ✅ Added columns to tasks table")
            except Exception as e:
                print(f"  ⚠️  Columns might already exist: {e}")
                conn.rollback()

            # Create ai_task_learning table
            print("  Creating ai_task_learning table...")

            try:
                conn.execute(text("""
                    CREATE TABLE IF NOT EXISTS ai_task_learning (
                        id SERIAL PRIMARY KEY,
                        task_type VARCHAR NOT NULL UNIQUE,
                        ai_status VARCHAR DEFAULT 'new',
                        consecutive_approvals INTEGER DEFAULT 0,
                        total_approvals INTEGER DEFAULT 0,
                        total_rejections INTEGER DEFAULT 0,
                        last_approval_at TIMESTAMP WITH TIME ZONE,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    )
                """))
                conn.commit()
                print("  ✅ Created ai_task_learning table")
            except Exception as e:
                print(f"  ⚠️  Table might already exist: {e}")
                conn.rollback()

            # Create task_approvals table
            print("  Creating task_approvals table...")

            try:
                conn.execute(text("""
                    CREATE TABLE IF NOT EXISTS task_approvals (
                        id SERIAL PRIMARY KEY,
                        task_id INTEGER NOT NULL REFERENCES tasks(id),
                        task_type VARCHAR NOT NULL,
                        user_id INTEGER NOT NULL REFERENCES users(id),
                        approved BOOLEAN DEFAULT FALSE,
                        ai_message TEXT,
                        user_corrections TEXT,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    )
                """))
                conn.commit()
                print("  ✅ Created task_approvals table")
            except Exception as e:
                print(f"  ⚠️  Table might already exist: {e}")
                conn.rollback()

            # Create indexes
            print("  Creating indexes...")

            try:
                conn.execute(text("CREATE INDEX IF NOT EXISTS idx_ai_task_learning_task_type ON ai_task_learning(task_type)"))
                conn.execute(text("CREATE INDEX IF NOT EXISTS idx_task_approvals_task_type ON task_approvals(task_type)"))
                conn.execute(text("CREATE INDEX IF NOT EXISTS idx_task_approvals_task_id ON task_approvals(task_id)"))
                conn.commit()
                print("  ✅ Created indexes")
            except Exception as e:
                print(f"  ⚠️  Indexes might already exist: {e}")
                conn.rollback()

        print("\n✅ Migration completed successfully!")
        return True

    except Exception as e:
        print(f"\n❌ Migration failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = run_migration()
    sys.exit(0 if success else 1)
