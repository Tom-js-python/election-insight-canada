INSERT INTO political_party_source_names (source_name_english, source_name_french)
VALUES %s
ON CONFLICT (source_name_english) DO NOTHING;