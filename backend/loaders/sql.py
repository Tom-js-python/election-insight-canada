from loaders.paths import QUERY_DIR

def load_sql(filename: str) -> str:
    sql_path = QUERY_DIR / filename
    return sql_path.read_text(encoding="utf-8")