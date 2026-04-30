# Election constants
ELECTION_DATE = "2025-04-28"
ELECTION_TYPE = "general"
ELECTION_LABEL = "45th General Election"

# CSV column names
COL_ELECTION_ID = "election_id"
COL_DISTRICT_NUMBER = "Electoral District Number/Numéro de circonscription"
COL_DISTRICT_NAME_ENGLISH = "Electoral District Name_English/Nom de circonscription_Anglais"
COL_DISTRICT_NAME_FRENCH = "Electoral District Name_French/Nom de circonscription_Français"
COL_PARTY_NAME_ENGLISH = "Political Affiliation Name_English/Appartenance politique_Anglais"
COL_PARTY_NAME_FRENCH = "Political Affiliation Name_French/Appartenance politique_Français"
COL_DIVISION_NUMBER = "Polling Division Number/Numéro de section de vote"
COL_DIVISION_NAME = "Polling Division Name/Nom de section de vote"
COL_VOID_POLL_INDICATOR = "Void Poll Indicator/Indicateur de bureau supprimé"
COL_NO_POLL_HELD = "No Poll Held Indicator/Indicateur de bureau sans scrutin"
COL_COMBINED_WITH_NUMBER = "Combined with No./Résultats combinés à ceux du n°"
COL_REJECTED_BALLOTS_FOR_POLL = "Rejected Ballots for poll/Bulletins rejetés du bureau"
COL_ELECTORS_FOR_POLL = "Electors for poll/Électeurs du bureau"
COL_INCUMBENT_INDICATOR = "Incumbent Indicator/Indicateur_Candidat sortant"
COL_ELECTED_CANDIDATE = "Elected Candidate Indicator/Indicateur du candidat élu"
COL_FAMILY_NAME = "Candidate’s Family Name/Nom de famille du candidat"
COL_MIDDLE_NAME = "Candidate’s Middle Name/Second prénom du candidat"
COL_FIRST_NAME = "Candidate’s First Name/Prénom du candidat"
COL_VOTE_COUNT = "Candidate Vote Count/Votes du candidat"

# Column collections
BOOLEAN_COLUMNS = [COL_VOID_POLL_INDICATOR, COL_NO_POLL_HELD, COL_INCUMBENT_INDICATOR, COL_ELECTED_CANDIDATE]
INTEGER_COLUMNS = [COL_DISTRICT_NUMBER, COL_REJECTED_BALLOTS_FOR_POLL, COL_ELECTORS_FOR_POLL, COL_VOTE_COUNT]
POLITICAL_PARTIES_COLUMNS = [COL_PARTY_NAME_ENGLISH, COL_PARTY_NAME_FRENCH]
POLLING_DIVISION_COLUMNS = [COL_DISTRICT_NUMBER, COL_ELECTION_ID, COL_DIVISION_NUMBER, COL_DIVISION_NAME,
                            COL_VOID_POLL_INDICATOR, COL_NO_POLL_HELD, COL_COMBINED_WITH_NUMBER,
                            COL_REJECTED_BALLOTS_FOR_POLL, COL_ELECTORS_FOR_POLL]
