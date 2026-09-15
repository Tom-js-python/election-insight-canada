from common.paths import QUERY_DIR

def load_sql(filename1: str, filename2: str | None = None) -> str:
    sql_path1 = QUERY_DIR / filename1
    text = sql_path1.read_text(encoding="utf-8").strip()

    if filename2 is not None:
        sql_path2 = QUERY_DIR / filename2
        text += "\n" + sql_path2.read_text(encoding="utf-8").strip()

    return text