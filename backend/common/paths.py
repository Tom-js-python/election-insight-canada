# Paths
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[1]
PROJECT_DIR = Path(__file__).resolve().parents[2]
QUERY_DIR = BACKEND_DIR / "db" / "queries"
RAW_DATA_DIR = PROJECT_DIR / "data" / "raw"
REFERENCE_DATA_DIR = PROJECT_DIR / "data" / "reference"

POLITICAL_PARTIES_DATA_FILE = REFERENCE_DATA_DIR / "political_parties.csv"