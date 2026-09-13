from fastapi import APIRouter
from app.db import get_connection
from common.sql import load_sql
from psycopg2.extras import RealDictCursor
from app.schemas.parties import PoliticalParty

router = APIRouter(tags=["parties"])


@router.get("/political-parties", response_model=list[PoliticalParty])
def get_all_political_parties():
    query = load_sql("get_all_political_parties.sql")

    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query)
            parties = cur.fetchall()

        return parties

    finally:
        conn.close()