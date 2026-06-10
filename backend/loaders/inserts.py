import sys

from common.sql import load_sql
from loaders.constants import ELECTION_DATE, ELECTION_TYPE, ELECTION_LABEL
from psycopg2 import extras
from psycopg2.extensions import cursor

def insert_election(cur: cursor) -> int:
    query = load_sql("insert_election.sql")

    cur.execute(
        query,
        {
            "election_date": ELECTION_DATE,
            "election_type": ELECTION_TYPE,
            "election_label": ELECTION_LABEL,
        },
    )

    row = cur.fetchone()

    if row is None:
        raise RuntimeError("failed to retrieve election ID after insert")

    election_id = int(row[0])

    print(f"Inserted/found election, id: {election_id}")
    return election_id

def insert_district(cur: cursor, district: dict) -> None:
    query = load_sql("insert_district.sql")
    cur.execute(query, district)

    print(f"Inserted/found district: {district['district_number']}")

def insert_political_parties(cur: cursor, political_parties: list[tuple]) -> None:
    query = load_sql("insert_political_parties.sql")
    extras.execute_values(cur, query, political_parties)

def insert_polling_divisions(cur: cursor, polling_divisions: list[tuple]) -> None:
    query = load_sql("insert_polling_divisions.sql")
    extras.execute_values(cur, query, polling_divisions)

def insert_candidates(cur: cursor, candidates: list[tuple]) -> None:
    query = load_sql("insert_candidates.sql")
    extras.execute_values(cur, query, candidates)

def insert_vote_counts(cur: cursor, vote_counts: list[tuple]) -> None:
    query = load_sql("insert_vote_counts.sql")
    extras.execute_values(cur, query, vote_counts)