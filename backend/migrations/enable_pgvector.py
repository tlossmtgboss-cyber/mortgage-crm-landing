"""
Enable pgvector extension in PostgreSQL
"""

import os
import sys
from sqlalchemy import create_engine, text

def enable_pgvector():
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ DATABASE_URL environment variable not set")
        return False

    engine = create_engine(database_url)

    print("🔄 Enabling pgvector extension...")

    try:
        with engine.connect() as conn:
            # Enable pgvector extension
            conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
            conn.commit()
            print("✅ pgvector extension enabled")

        return True

    except Exception as e:
        print(f"❌ Failed to enable pgvector: {e}")
        print("Note: pgvector might not be installed on the database server.")
        print("For now, we'll use JSONB for embeddings and migrate to pgvector later.")
        return False

if __name__ == "__main__":
    enable_pgvector()
