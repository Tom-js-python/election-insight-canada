from pathlib import Path
from app.db import get_connection


def main():
    schema_path = Path(__file__).resolve().parents[1] / "db" / "schema.sql"

    with open(schema_path, "r", encoding="utf-8") as f:
        schema_sql = f.read()

    conn = get_connection()

    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute(schema_sql)
        print("Schema created successfully.")
    finally:
        conn.close()


if __name__ == "__main__":
    main()