from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)

DATA_LENGTH = 343

def test_riding_results_returns_200():
    """ Test that the ridings endpoint returns 200 """

    response = client.get("/ridings/all/2025")

    # Check status code of response
    assert response.status_code == 200

def test_riding_results_response_shape():
    """ Test that the ridings endpoint has the correct shape """

    response = client.get("/ridings/all/2025")
    data = response.json()

    # Check data has correct basic shape
    assert isinstance(data, list)
    assert len(data) == DATA_LENGTH

def test_riding_results_contains_expected_first_riding():
    """ Test that the ridings endpoint contains the expected first riding """

    # Check first riding has basic shape
    response = client.get("/ridings/all/2025")
    data = response.json()
    first_riding = data[0]
    first_result = first_riding["results"][0]

    assert "district_number" in first_riding
    assert "district_name" in first_riding
    assert "results" in first_riding

    assert isinstance(first_riding["results"], list)
    assert len(first_riding["results"]) > 0

    assert "candidate_name" in first_result
    assert "party_key" in first_result
    assert "party_name" in first_result
    assert "vote_count" in first_result
    assert "vote_share" in first_result
    assert "margin_votes" in first_result
    assert "margin_percentage_points" in first_result

def test_riding_results_contains_expected_last_riding():
    """ Test that the ridings endpoint contains the expected last riding """

    # Sanity check on last riding
    response = client.get("/ridings/all/2025")
    data = response.json()
    last_riding = data[DATA_LENGTH - 1]

    assert last_riding["district_number"] == 62001
    assert last_riding["district_name"]
    assert len(last_riding["results"]) > 0

def test_riding_results_exact_values():
    """ For one verified riding, test exact values """

    response = client.get("/ridings/all/2025")
    data = response.json()
    verified_riding = next((r for r in data if r.get("district_number") == 13002), None)

    assert isinstance(verified_riding, dict)
    assert verified_riding["district_name"] == "Beauséjour"
    assert isinstance(verified_riding["results"], list)

    # In order of descending votes - so first should be the winner
    results = verified_riding["results"]

    # Check that things should add up properly
    assert sum(result["vote_share"] for result in results) == pytest.approx(1.0, abs=1e-6)
    assert sum(result["outcome"] == "win" for result in results) == 1

    winner = results[0]

    # Check all values for the winner
    assert winner["party_key"] == "liberal"
    assert winner["party_name"] == "Liberal"
    assert winner["vote_count"] == 36139
    assert winner["vote_share"] == pytest.approx(0.60604383625966359779, abs=1e-6)
    assert winner["outcome"] == "win"
    assert winner["margin_votes"] == 16277
    assert winner["margin_percentage_points"] == pytest.approx(27.2962049940467207, abs=1e-6)

def test_riding_results_margin_behaviour():
    """ For a particular riding test the margin makes sense """

    response = client.get("/ridings/all/2025")
    data = response.json()
    riding = data[234]

    assert isinstance(riding, dict)

    results = riding["results"]

    assert isinstance(results, list)

    winner = results[0]
    runnerup = results[1]
    last = results[-1]

    assert winner["margin_votes"] == runnerup["margin_votes"]
    assert last["margin_votes"] == winner["vote_count"] - last["vote_count"]

    total_votes = sum(result["vote_count"] for result in results)
    assert runnerup["margin_percentage_points"] == pytest.approx(
        runnerup["margin_votes"] * 100 / total_votes, abs=1e-6
    )