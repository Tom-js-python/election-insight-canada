import pandas as pd
from psycopg2.extensions import cursor
from pathlib import Path
from loaders.constants import COL_PARTY_SOURCE_NAME_ENGLISH_FROM_CSV, COL_PARTY_KEY, \
                              PARTIES_STATIC_REQUIRED_COLUMNS
from loaders.inserts import insert_static_political_parties

def read_and_validate_parties(csv_path: Path) -> pd.DataFrame:

  # Read data in from csv using pandas
  political_parties = pd.read_csv(
    csv_path,
    dtype=str,
    keep_default_na=False,
    encoding="utf-8"
  )

  # Perform checks - first to make sure the columns are correct
  column_list = [x[0] for x in PARTIES_STATIC_REQUIRED_COLUMNS]
  if set(political_parties.columns) != set(column_list):
    raise ValueError(str(csv_path) + " has unexpected columns")

  # Check to make sure there aren't any duplicates in any column
  for check_column in PARTIES_STATIC_REQUIRED_COLUMNS:
    if political_parties[check_column[0]].duplicated().any():
      raise ValueError(str(csv_path) + " contains duplicate " + check_column[1])

  # Strip leading and trailing whitespace from every field
  political_parties = political_parties.map(
    lambda value: value.strip() if isinstance(value, str) else value
  )

  return political_parties

def load_static_political_parties(cur: cursor, csv_path: Path) -> dict[str, str]:

  political_parties_df = read_and_validate_parties(csv_path)
  
  column_list = [x[0] for x in PARTIES_STATIC_REQUIRED_COLUMNS]
  political_parties_list = list(
    political_parties_df[column_list].itertuples(index=False, name=None)
  )

  insert_static_political_parties(cur, political_parties_list)

  return dict(
    zip(
      political_parties_df[COL_PARTY_SOURCE_NAME_ENGLISH_FROM_CSV],
      political_parties_df[COL_PARTY_KEY],
      strict = True
    )
  )