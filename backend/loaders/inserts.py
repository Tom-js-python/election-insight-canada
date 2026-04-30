from loaders.sql import load_sql
from loaders.constants import ELECTION_DATE, ELECTION_TYPE, ELECTION_LABEL
from psycopg2 import extras

def insert_election(cur) -> int:
    query = load_sql("insert_election.sql")

    cur.execute(
        query,
        {
            "election_date": ELECTION_DATE,
            "election_type": ELECTION_TYPE,
            "election_label": ELECTION_LABEL,
        },
    )

    election_id = cur.fetchone()[0]
    print(f"Inserted/found election, id: {election_id}")
    return election_id

def insert_district(cur, district: dict) -> None:
    query = load_sql("insert_district.sql")
    cur.execute(query, district)

    print(f"Inserted/found district: {district['district_number']}")

def insert_political_parties(cur, political_parties: list[tuple]) -> None:
    query = load_sql("insert_political_parties.sql")
    extras.execute_values(cur, query, political_parties)

def insert_polling_divisions(cur, polling_divisions: list[tuple]) -> None:
    query = load_sql("insert_polling_divisions.sql")
    extras.execute_values(cur, query, polling_divisions)

def insert_candidates(cur, candidates: list[tuple]) -> None:
    query = load_sql("insert_candidates.sql")
    extras.execute_values(cur, query, candidates)