from common.paths import RAW_DATA_DIR, POLITICAL_PARTIES_DATA_FILE
import pandas as pd
from psycopg2.extensions import cursor
from loaders.cleaning import clean_data
from loaders.extractors import extract_district_from_dataframe, extract_polling_divisions_from_dataframe, \
    extract_candidates_from_dataframe, extract_vote_counts_from_dataframe
from loaders.inserts import insert_district,  insert_polling_divisions, \
    insert_election, insert_candidates, insert_vote_counts
from loaders.lookups import get_polling_division_lookup, get_candidate_lookup
from loaders.load_static_political_parties import load_static_political_parties
from app.db import get_connection

LOAD_ONE_FILE_ONLY = False

def load_results_from_csv_files(cur: cursor, election_id: int, party_lookup: dict[str, str]) -> None:
    csv_files = sorted(RAW_DATA_DIR.glob("*.csv"))

    if not csv_files:
        raise FileNotFoundError(f"No CSV files found in {RAW_DATA_DIR}")

    for csv_file in csv_files:
        print(f"Loading {csv_file.name}")

        df = pd.read_csv(csv_file)
        df = clean_data(df, election_id)

        district = extract_district_from_dataframe(df)
        insert_district(cur, district)

        polling_divisions = extract_polling_divisions_from_dataframe(df)
        insert_polling_divisions(cur, polling_divisions)
        polling_division_lookup = get_polling_division_lookup(cur)

        candidates = extract_candidates_from_dataframe(df, party_lookup)
        insert_candidates(cur, candidates)
        candidate_lookup = get_candidate_lookup(cur)

        vote_counts = extract_vote_counts_from_dataframe(df, polling_division_lookup, candidate_lookup)
        insert_vote_counts(cur, vote_counts)

        if LOAD_ONE_FILE_ONLY:
            break


def main():
    conn = get_connection()

    try:
        with conn:
            with conn.cursor() as cur:
                election_id = insert_election(cur)
                party_lookup = load_static_political_parties(cur, POLITICAL_PARTIES_DATA_FILE)
                load_results_from_csv_files(cur, election_id, party_lookup)

    finally:
        conn.close()


if __name__ == "__main__":
    main()