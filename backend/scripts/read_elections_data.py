import pandas as pd
from pathlib import Path

# Constants
DIRECTORY = "./pollresults_resultatsbureauCanada"

directory = Path(DIRECTORY)
for f in directory.iterdir():
    if f.is_file():
        df = pd.read_csv(f)
        print(df.head())  # Preview first few rows
