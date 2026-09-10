from common.paths import RAW_DATA_DIR
import pandas as pd
from psycopg2.extensions import cursor
from loaders.extractors import extract_political_parties_from_dataframe
from loaders.inserts import insert_political_parties
from app.db import get_connection


def find_party_names_in_csv_files(cur: cursor) -> None:
    csv_files = sorted(RAW_DATA_DIR.glob("*.csv"))

    if not csv_files:
        raise FileNotFoundError(f"No CSV files found in {RAW_DATA_DIR}")

    print("Finding unique party names...")

    for csv_file in csv_files:

        df = pd.read_csv(csv_file)

        political_parties = extract_political_parties_from_dataframe(df)
        insert_political_parties(cur, political_parties)

def main():
    conn = get_connection()

    try:
        with conn:
            with conn.cursor() as cur:
                find_party_names_in_csv_files(cur)

    finally:
        conn.close()


if __name__ == "__main__":
    main()