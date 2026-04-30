import pandas as pd
from loaders.constants import COL_DISTRICT_NUMBER, COL_DISTRICT_NAME_ENGLISH, COL_DISTRICT_NAME_FRENCH, POLITICAL_PARTIES_COLUMNS, POLLING_DIVISION_COLUMNS


def get_single_unique_value(df: pd.DataFrame, column_name: str):
    values = df[column_name].dropna().unique()

    if len(values) != 1:
        raise ValueError(
            f"Expected exactly one unique value in column '{column_name}', "
            f"but found {len(values)}: {values}"
        )

    return values[0]

def get_multiple_unique_value(df: pd.DataFrame, column_list: list[str]) -> list[tuple]:
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

def extract_political_parties_from_dataframe(df: pd.DataFrame) -> list:
    return get_multiple_unique_value(df, POLITICAL_PARTIES_COLUMNS)

def extract_polling_divisions_from_dataframe(df: pd.DataFrame) -> list:
    return get_multiple_unique_value(df, POLLING_DIVISION_COLUMNS)
