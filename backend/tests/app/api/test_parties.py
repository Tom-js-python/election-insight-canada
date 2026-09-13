from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

NUMBER_OF_PARTIES = 18

def test_parties_returns_200():
  """ Test that the parties endpoint returns 200 """

  response = client.get("/political-parties")

  # Check status code of response
  assert response.status_code == 200

def test_riding_results_response_shape():
  """ Test that the parties endpoint has the correct shape """

  response = client.get("/political-parties")
  parties = response.json()

  assert isinstance(parties, list)
  assert len(parties) == NUMBER_OF_PARTIES
  assert isinstance(parties[0], dict)

  expected_fields = {
    "party_key",
    "source_name_english",
    "source_name_french",
    "long_display_name_english",
    "long_display_name_french",
    "short_display_name_english",
    "short_display_name_french",
  }

  # Running set on a dictionary in Python returns a set containing only the dictionary's keys
  assert set(parties[0]) == expected_fields


def test_political_parties_contains_expected_bloc_mapping():
  """ Test a known party - in this case BQ - since it has spaces and accents """

  response = client.get("/political-parties")
  parties = response.json()

  # Next statement will only get the first entry with this party_key
  bloc = next((p for p in parties if p.get("party_key") == "bloc"), None)
  
  assert isinstance(bloc,dict) 

  assert bloc["source_name_english"] == "Bloc Québécois"
  assert bloc["short_display_name_english"] == "BQ"
  assert bloc["short_display_name_french"] == "BQ"


def test_political_parties_maps_source_name_to_dipslay_name():
  """ Test the NDP party - since it's source name is different from it's long display name """

  response = client.get("/political-parties")
  parties = response.json()

  # Next statement will only get the first entry with this party_key
  ndp = next((p for p in parties if p.get("party_key") == "ndp"), None)

  assert isinstance(ndp,dict) 

  assert ndp["source_name_english"] == "NDP-New Democratic Party"
  assert ndp["long_display_name_english"] == "New Democratic Party"
  assert ndp["short_display_name_french"] == "NPD"

