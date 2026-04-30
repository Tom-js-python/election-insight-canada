from loaders.paths import RAW_DATA_DIR
import pandas as pd
from loaders.cleaning import clean_data
from loaders.extractors import extract_district_from_dataframe, extract_political_parties_from_dataframe, extract_polling_divisions_from_dataframe
from loaders.inserts import insert_district, insert_political_parties, insert_polling_divisions, insert_election
from app.db import get_connection

LOAD_ONE_FILE_ONLY = False

def load_results_from_csv_files(cur, election_id) -> None:
    csv_files = sorted(RAW_DATA_DIR.glob("*.csv"))

    if not csv_files:
        raise FileNotFoundError(f"No CSV files found in {RAW_DATA_DIR}")

    for csv_file in csv_files:
        print(f"Loading {csv_file.name}")

        df = pd.read_csv(csv_file)
        df = clean_data(df, election_id)
        district = extract_district_from_dataframe(df)
        insert_district(cur, district)
        political_parties = extract_political_parties_from_dataframe(df)
        insert_political_parties(cur, political_parties)
        polling_divisions = extract_polling_divisions_from_dataframe(df)
        insert_polling_divisions(cur, polling_divisions)

        if LOAD_ONE_FILE_ONLY:
            break


def main():
    conn = get_connection()

    try:
        with conn:
            with conn.cursor() as cur:
                election_id = insert_election(cur)
                load_results_from_csv_files(cur, election_id)

    finally:
        conn.close()


if __name__ == "__main__":
    main()