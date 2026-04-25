/* -----------------------------------------------------------------
Script to create the Election Insight Canada database
*** Note this will delete all tables and therefore delete all data
-------------------------------------------------------------------*/

-- Assume database has been created and we are logged into the 
-- election_insight_canada database as user eic_computer_access

-- Drop tables in reverse order of creation
DROP TABLE IF EXISTS candidate_vote_counts;
DROP TABLE IF EXISTS candidate_elections;
DROP TABLE IF EXISTS polling_divisions;
DROP TABLE IF EXISTS political_parties;
DROP TABLE IF EXISTS electoral_districts;
DROP TABLE IF EXISTS elections;

-- CREATE TABLES
-- Start with tables that have no foreign keys - no dependencies on other tables

CREATE TABLE elections (
  id INT primary key GENERATED ALWAYS AS IDENTITY,
  election_date DATE NOT NULL UNIQUE,
  election_type TEXT NOT NULL CHECK (election_type IN ('general', 'by-election')),
  election_label TEXT NOT NULL UNIQUE
);

CREATE TABLE electoral_districts (
  district_number INT PRIMARY KEY,
  name_english TEXT NOT NULL,
  name_french TEXT NOT NULL
);

CREATE TABLE political_parties (
  id INT primary key GENERATED ALWAYS AS IDENTITY,
  name_english TEXT NOT NULL UNIQUE,
  name_french TEXT NOT NULL UNIQUE
);

CREATE TABLE polling_divisions (
  id INT primary key GENERATED ALWAYS AS IDENTITY,
  district_number INT NOT NULL REFERENCES electoral_districts(district_number),
  election_id INT NOT NULL REFERENCES elections(id),
  division_number TEXT NOT NULL,
  division_name TEXT NOT NULL,
  void_poll_indicator BOOLEAN NOT NULL DEFAULT FALSE,
  no_poll_held BOOLEAN NOT NULL DEFAULT FALSE,
  combined_with_number TEXT,
  rejected_ballots_for_poll INT NOT NULL CHECK (rejected_ballots_for_poll >= 0),
  electors_for_poll INT NOT NULL CHECK (electors_for_poll >= 0),
  CHECK (rejected_ballots_for_poll <= electors_for_poll),
  UNIQUE (election_id, district_number, division_number)
);

CREATE TABLE candidate_elections (
  id INT primary key GENERATED ALWAYS AS IDENTITY,
  election_id INT NOT NULL REFERENCES elections(id),
  family_name TEXT NOT NULL,
  middle_name TEXT,
  first_name TEXT NOT NULL,
  political_party_id INT NOT NULL REFERENCES political_parties(id),
  district_number INT NOT NULL REFERENCES electoral_districts(district_number),
  incumbent_indicator BOOLEAN NOT NULL DEFAULT FALSE,
  elected_candidate BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE NULLS NOT DISTINCT (election_id, family_name, middle_name, first_name, district_number)
);

CREATE TABLE candidate_vote_counts (
  polling_division_id INT NOT NULL REFERENCES polling_divisions(id),
  candidate_election_id INT NOT NULL REFERENCES candidate_elections(id),
  vote_count INT NOT NULL CHECK (vote_count >= 0),
  PRIMARY KEY (polling_division_id, candidate_election_id)
);



