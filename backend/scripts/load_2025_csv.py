import numpy as np
import pandas as pd
from pathlib import Path
from app.db import get_connection
from psycopg2 import extras

# Election constants
ELECTION_DATE = "2025-04-28"
ELECTION_TYPE = "general"
ELECTION_LABEL = "45th General Election"

LOAD_ONE_FILE_ONLY = False

# Paths
BACKEND_DIR = Path(__file__).resolve().parents[1]
PROJECT_DIR = Path(__file__).resolve().parents[2]
QUERY_DIR = BACKEND_DIR / "db" / "queries"
RAW_DATA_DIR = PROJECT_DIR / "data" / "raw"

# CSV column names
COL_ELECTION_ID = "election_id"
COL_DISTRICT_NUMBER = "Electoral District Number/Numéro de circonscription"
COL_DISTRICT_NAME_ENGLISH = "Electoral District Name_English/Nom de circonscription_Anglais"
COL_DISTRICT_NAME_FRENCH = "Electoral District Name_French/Nom de circonscription_Français"
COL_PARTY_NAME_ENGLISH = "Political Affiliation Name_English/Appartenance politique_Anglais"
COL_PARTY_NAME_FRENCH = "Political Affiliation Name_French/Appartenance politique_Français"
COL_DIVISION_NUMBER = "Polling Division Number/Numéro de section de vote"
COL_DIVISION_NAME = "Polling Division Name/Nom de section de vote"
COL_VOID_POLL_INDICATOR = "Void Poll Indicator/Indicateur de bureau supprimé"
COL_NO_POLL_HELD = "No Poll Held Indicator/Indicateur de bureau sans scrutin"
COL_COMBINED_WITH_NUMBER = "Combined with No./Résultats combinés à ceux du n°"
COL_REJECTED_BALLOTS_FOR_POLL = "Rejected Ballots for poll/Bulletins rejetés du bureau"
COL_ELECTORS_FOR_POLL = "Electors for poll/Électeurs du bureau"
COL_INCUMBENT_INDICATOR = "Incumbent Indicator/Indicateur_Candidat sortant"
COL_ELECTED_CANDIDATE = "Elected Candidate Indicator/Indicateur du candidat élu"
COL_FAMILY_NAME = "Candidate’s Family Name/Nom de famille du candidat"
COL_MIDDLE_NAME = "Candidate’s Middle Name/Second prénom du candidat"
COL_FIRST_NAME = "Candidate’s First Name/Prénom du candidat"
COL_VOTE_COUNT = "Candidate Vote Count/Votes du candidat"

def clean_data(df: pd.DataFrame, election_id: int) -> pd.DataFrame:
    df[COL_ELECTION_ID] = election_id
    df[[COL_VOID_POLL_INDICATOR, COL_NO_POLL_HELD, COL_INCUMBENT_INDICATOR, COL_ELECTED_CANDIDATE]] = df[[COL_VOID_POLL_INDICATOR, COL_NO_POLL_HELD, COL_INCUMBENT_INDICATOR, COL_ELECTED_CANDIDATE]].replace({'Y': True, 'N': False})
    df = df.replace({np.nan: None})
    df[[COL_DISTRICT_NUMBER, COL_REJECTED_BALLOTS_FOR_POLL, COL_ELECTORS_FOR_POLL, COL_VOTE_COUNT ]] = df[[COL_DISTRICT_NUMBER, COL_REJECTED_BALLOTS_FOR_POLL, COL_ELECTORS_FOR_POLL, COL_VOTE_COUNT]].astype(int)
    return df

def load_sql(filename: str) -> str:
    sql_path = QUERY_DIR / filename
    return sql_path.read_text(encoding="utf-8")


def get_single_unique_value(df: pd.DataFrame, column_name: str):
    values = df[column_name].dropna().unique()

    if len(values) != 1:
        raise ValueError(
            f"Expected exactly one unique value in column '{column_name}', "
            f"but found {len(values)}: {values}"
        )

    return values[0]


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


def extract_district_from_dataframe(df: pd.DataFrame) -> dict:
    return {
        "district_number": int(get_single_unique_value(df, COL_DISTRICT_NUMBER)),
        "name_english": get_single_unique_value(df, COL_DISTRICT_NAME_ENGLISH),
        "name_french": get_single_unique_value(df, COL_DISTRICT_NAME_FRENCH),
    }


def insert_district(cur, district: dict) -> None:
    query = load_sql("insert_district.sql")
    cur.execute(query, district)

    print(f"Inserted/found district: {district['district_number']}")

def extract_political_parties_from_dataframe(df: pd.DataFrame) -> list:
    political_parties_df = df[[COL_PARTY_NAME_ENGLISH, COL_PARTY_NAME_FRENCH]].drop_duplicates()
    return list(political_parties_df.itertuples(index=False, name=None))

def insert_political_parties(cur, political_parties: list) -> None:
    query = load_sql("insert_political_parties.sql")
    extras.execute_values(cur, query, political_parties)

def extract_polling_divisions_from_dataframe(df: pd.DataFrame) -> list:
    polling_divisions_df = df[[COL_DISTRICT_NUMBER, COL_ELECTION_ID, COL_DIVISION_NUMBER, COL_DIVISION_NAME, COL_VOID_POLL_INDICATOR, COL_NO_POLL_HELD, COL_COMBINED_WITH_NUMBER, COL_REJECTED_BALLOTS_FOR_POLL, COL_ELECTORS_FOR_POLL]].drop_duplicates()
    return list(polling_divisions_df.itertuples(index=False, name=None))

def insert_polling_divisions(cur, polling_divisions: list) -> None:
    query = load_sql("insert_polling_divisions.sql")
    extras.execute_values(cur, query, polling_divisions)

def load_districts(cur, election_id) -> None:
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
                load_districts(cur, election_id)

    finally:
        conn.close()


if __name__ == "__main__":
    main()