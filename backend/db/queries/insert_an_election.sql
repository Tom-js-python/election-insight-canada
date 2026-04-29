INSERT INTO elections (election_date, election_type, election_label)
VALUES (%(election_date)s, %(election_type)s, %(election_label)s)
RETURNING id;