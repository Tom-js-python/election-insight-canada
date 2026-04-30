import numpy as np
import pandas as pd

from loaders.constants import COL_ELECTION_ID, BOOLEAN_COLUMNS, INTEGER_COLUMNS


def clean_data(df: pd.DataFrame, election_id: int) -> pd.DataFrame:
    df[COL_ELECTION_ID] = election_id
    df[BOOLEAN_COLUMNS] = df[BOOLEAN_COLUMNS].replace({'Y': True, 'N': False})
    df = df.replace({np.nan: None})
    df[INTEGER_COLUMNS] = df[INTEGER_COLUMNS].astype(int)
    return df