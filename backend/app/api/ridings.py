from fastapi import APIRouter
from app.db import get_connection
from common.sql import load_sql
from psycopg2.extras import RealDictCursor
from app.schemas.ridings import RidingResult

router = APIRouter(prefix="/ridings", tags=["ridings"])


@router.get("/results/2025", response_model=list[RidingResult])
def get_riding_results_2025():
    query = load_sql("get_all_riding_results_for_an_election.sql")

    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, {"election_label": "45th General Election"})
            rows = cur.fetchall()

        grouped_results = {}

        for row in rows:
            district_number = row["district_number"]

            if district_number not in grouped_results:
                grouped_results[district_number] = {
                    "district_number": district_number,
                    "district_name": row["district_name"],
                    "results": [],
                }

            grouped_results[district_number]["results"].append(
                {
                    "candidate_name": row["candidate_name"],
                    "party_name": row["party_name"],
                    "vote_count": row["vote_count"],
                }
            )

        return list(grouped_results.values())

    finally:
        conn.close()