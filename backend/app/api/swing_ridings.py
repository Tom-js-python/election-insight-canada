from typing import Annotated
from fastapi import APIRouter, Query
from app.db import get_connection
from common.sql import load_sql
from psycopg2.extras import RealDictCursor
from app.schemas.ridings import RidingResult, SwingRidingFilters

router = APIRouter(prefix="/ridings", tags=["ridings"])


@router.get("/swing/2025", response_model=list[RidingResult])
def get_swing_ridings_2025(filters: Annotated[SwingRidingFilters, Query()]):

    query = load_sql("get_riding_results_for_an_election_shared.sql",
                    "get_swing_riding_results_for_an_election_end.sql")

    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, {
                "election_label": "45th General Election",
                "party_key": filters.party_key,
                "outcome": filters.outcome,
                "max_margin_votes": filters.max_margin_votes,
                "max_margin_percentage_points": filters.max_margin_percentage_points
            })
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
                    "party_key": row["party_key"],
                    "party_name": row["party_name"],
                    "vote_count": row["vote_count"],
                    "vote_share": row["vote_share"],
                    "outcome": row["outcome"],
                    "margin_votes": row["margin_votes"],
                    "margin_percentage_points": row["margin_percentage_points"],
                }
            )

        return list(grouped_results.values())

    finally:
        conn.close()