from loaders.sql import load_sql

def get_party_lookup(cur) -> dict[str, int]:
    query = load_sql("get_political_parties.sql")
    cur.execute(query)
    return { name_english: party_id for name_english, party_id in cur.fetchall()}

def get_polling_division_lookup(cur) -> dict:
    query = load_sql("get_polling_divisions.sql")
    cur.execute(query)
    return { (election_id, district_number, division_number): polling_division_id
             for polling_division_id, election_id, district_number, division_number in cur.fetchall()}

def get_candidate_lookup(cur) -> dict:
    query = load_sql("get_candidates.sql")
    cur.execute(query)
    return { (election_id, family_name, middle_name, first_name, district_number): candidate_id
             for candidate_id, election_id, family_name, middle_name, first_name, district_number in cur.fetchall()}