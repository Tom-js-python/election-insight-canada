INSERT INTO political_parties (name_english, name_french)
VALUES %s
ON CONFLICT (name_english) DO NOTHING;