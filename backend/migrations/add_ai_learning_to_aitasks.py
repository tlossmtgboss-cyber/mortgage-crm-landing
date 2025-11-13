"""
Migration: Add AI Learning Columns to ai_tasks Table

This migration adds the AI learning columns to the ai_tasks table instead of tasks table.
"""

import os
import sys
from sqlalchemy import create_engine, text

def run_migration():
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ DATABASE_URL environment variable not set")
        return False

    engine = create_engine(database_url)

    print("🔄 Adding AI learning columns to ai_tasks table...")

    try:
        with engine.connect() as conn:
            # Add new columns to ai_tasks table
            print("  Adding columns to ai_tasks table...")

            columns_to_add = [
                ("task_type", "VARCHAR"),
                ("ai_drafted_message", "TEXT"),
                ("ai_completed", "BOOLEAN DEFAULT FALSE"),
                ("ai_approved", "BOOLEAN DEFAULT FALSE"),
                ("ai_edited", "BOOLEAN DEFAULT FALSE")
            ]

            for col_name, col_type in columns_to_add:
                try:
                    conn.execute(text(f"ALTER TABLE ai_tasks ADD COLUMN IF NOT EXISTS {col_name} {col_type}"))
                    conn.commit()
                    print(f"  ✅ Added column: {col_name}")
                except Exception as e:
                    print(f"  ⚠️  Column {col_name} might already exist: {e}")
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
