import pandas as pd
from loaders.constants import COL_DISTRICT_NUMBER, COL_DISTRICT_NAME_ENGLISH, COL_DISTRICT_NAME_FRENCH, \
    COL_PARTY_NAME_ENGLISH, COL_PARTY_ID, \
    COL_FAMILY_NAME, COL_MIDDLE_NAME, COL_FIRST_NAME, \
    COL_ELECTION_ID, COL_DIVISION_NUMBER, \
    POLITICAL_PARTY_COLUMNS, POLLING_DIVISION_COLUMNS, \
    CANDIDATE_COLUMNS_FOR_EXTRACT, CANDIDATE_COLUMNS_FOR_INSERT, \
    VOTE_COUNT_COLUMNS_FOR_INSERT, VOTE_COUNT_COLUMNS_FOR_EXTRACT


def get_single_unique_value(df: pd.DataFrame, column_name: str):
    values = df[column_name].dropna().unique()

    if len(values) != 1:
        raise ValueError(
            f"Expected exactly one unique value in column '{column_name}', "
            f"but found {len(values)}: {values}"
        )

    return values[0]

def get_multiple_unique_values(df: pd.DataFrame, column_list: list[str]) -> list[tuple]:
    values = df[column_list].drop_duplicates()
    if len(values) == 0:
        raise ValueError(
            f"Expected one or more unique values in columns '{column_list}', "
            f"but found {len(values)}: {values}"
        )

    return list(values.itertuples(index=False, name=None))

def extract_district_from_dataframe(df: pd.DataFrame) -> dict:
    return {
        "district_number": int(get_single_unique_value(df, COL_DISTRICT_NUMBER)),
        "name_english": get_single_unique_value(df, COL_DISTRICT_NAME_ENGLISH),
        "name_french": get_single_unique_value(df, COL_DISTRICT_NAME_FRENCH),
    }

def extract_political_parties_from_dataframe(df: pd.DataFrame) -> list[tuple]:
    return get_multiple_unique_values(df, POLITICAL_PARTY_COLUMNS)

def extract_polling_divisions_from_dataframe(df: pd.DataFrame) -> list[tuple]:
    return get_multiple_unique_values(df, POLLING_DIVISION_COLUMNS)

def extract_candidates_from_dataframe(df: pd.DataFrame, party_lookup: dict[str, int]) -> list[tuple]:
    candidates_df = df[CANDIDATE_COLUMNS_FOR_EXTRACT].drop_duplicates()

    if len(candidates_df) == 0:
        raise ValueError(
            f"Expected one or more unique values in columns '{CANDIDATE_COLUMNS_FOR_EXTRACT}', "
            f"but found {len(candidates_df)}: {candidates_df}"
        )

    candidates_df[COL_PARTY_ID] = candidates_df[COL_PARTY_NAME_ENGLISH].map(party_lookup)

    if candidates_df["political_party_id"].isna().any():
        missing = candidates_df[candidates_df["political_party_id"].isna()][COL_PARTY_NAME_ENGLISH].unique()
        raise ValueError(f"Missing political party IDs for: {missing}")

    candidates_df = candidates_df[CANDIDATE_COLUMNS_FOR_INSERT]

    return list(candidates_df.itertuples(index=False, name=None))

def extract_vote_counts_from_dataframe(
        df: pd.DataFrame,
        polling_division_lookup: dict,
        candidate_lookup: dict
)-> list[tuple]:

    vote_counts_df = df[VOTE_COUNT_COLUMNS_FOR_EXTRACT]

    vote_counts_df["polling_division_id"] = vote_counts_df.apply(
        lambda row: polling_division_lookup[
            (
                row[COL_ELECTION_ID],
                row[COL_DISTRICT_NUMBER],
                row[COL_DIVISION_NUMBER],
            )
        ],
        axis=1,
    )

    vote_counts_df["candidate_id"] = vote_counts_df.apply(
        lambda row: candidate_lookup[
            (
                row[COL_ELECTION_ID],
                row[COL_FAMILY_NAME],
                row[COL_MIDDLE_NAME],
                row[COL_FIRST_NAME],
                row[COL_DISTRICT_NUMBER],
            )
        ],
        axis=1,
    )

    vote_counts_df = vote_counts_df[VOTE_COUNT_COLUMNS_FOR_INSERT]

    return list(vote_counts_df.itertuples(index=False, name=None))