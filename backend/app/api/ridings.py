from fastapi import APIRouter
from app.db import get_connection
from loaders.sql import load_sql

router = APIRouter(prefix="/ridings", tags=["ridings"])


@router.get("/results/2025")
def get_riding_results_2025():
    query = load_sql("get_all_riding_results_for_an_election.sql")

    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(query, {"election_label": "45th General Election"})
            rows = cur.fetchall()

        return [
            {
                "district_number": row[0],
                "district_name": row[1],
                "candidate_name": row[2],
                "party_name": row[3],
                "vote_count": row[4],
            }
            for row in rows
        ]
    finally:
        conn.close()