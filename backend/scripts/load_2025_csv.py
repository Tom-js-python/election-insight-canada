import pandas as pd
from pathlib import Path
from app.db import get_connection

# Constants
ELECTION_DATE = "April 28, 2025"
ELECTION_TYPE = "general"
ELECTION_LABEL = "45th General Election"

def main():

    conn = get_connection()

    query_path = Path(__file__).resolve().parents[1] / "db" / "queries"


    try:
        with conn:
            with conn.cursor() as cur:

                insert_an_election_file = query_path / "insert_an_election.sql"

                with open(insert_an_election_file, "r", encoding="utf-8") as f:
                    insert_an_election_query = f.read()

                cur.execute(insert_an_election_query,
                            {"election_date": ELECTION_DATE,
                             "election_type": ELECTION_TYPE,
                             "election_label": ELECTION_LABEL})
                election_id = cur.fetchone()[0]
                print("Inserted an election, id: %d" % election_id)


                directory = Path(__file__).resolve().parents[2] / "data" / "raw"

                for f in directory.iterdir():
                    if f.is_file():
                        df = pd.read_csv(f)
                        print(df.head())  # Preview first few rows
                        district_number_array = df['Electoral District Number/Numéro de circonscription'].unique()
                        if len(district_number_array) == 1:
                            district_number = int(district_number_array[0])
                        else:
                            raise ValueError("Invalid district number")
                        name_english_array = df['Electoral District Name_English/Nom de circonscription_Anglais'].unique()
                        if len(name_english_array) == 1:
                            name_english = name_english_array[0]
                        else:
                            raise ValueError("Invalid name english")
                        name_french_array = df['Electoral District Name_French/Nom de circonscription_Français'].unique()
                        if len(name_french_array) == 1:
                            name_french = name_french_array[0]
                        else:
                            raise ValueError("Invalid name french")
                        print(district_number, name_english, name_french)

                        insert_a_district_file = query_path / "insert_a_district.sql"

                        with open(insert_a_district_file, "r", encoding="utf-8") as f:
                            insert_a_district_query = f.read()

                        cur.execute(insert_a_district_query,
                                    {"district_number": district_number,
                                     "name_english": name_english,
                                     "name_french": name_french})

                        print("Inserted a district: %d" % district_number)

                        break

    finally:
        conn.close()


if __name__ == "__main__":
    main()





