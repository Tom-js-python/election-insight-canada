from psycopg2 import sql
from common.sql import load_sql
from app.db import get_connection

def main(): 
  conn = get_connection()

  election_year = 2025
  election_label = "45th General Election"
  view_name = f"calculated_results_{election_year}"

  query = sql.SQL(load_sql("build_materialized_view_for_an_election.sql")).format(view_name=sql.Identifier(view_name))

  try:
    with conn:
      with conn.cursor() as cur:
        cur.execute(
          query,
          {"election_label": election_label}
        )
  finally:
    conn.close()

if __name__ == "__main__":
  main()

