from loaders.sql import load_sql

def get_party_lookup(cur) -> dict[str, int]:
    query = load_sql("get_political_parties.sql")
    cur.execute(query)
    return { name_english: party_id for name_english, party_id in cur.fetchall()}