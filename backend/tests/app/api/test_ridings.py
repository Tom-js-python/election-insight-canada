from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

DATA_LENGTH = 343

def test_riding_results_returns_200():
    """ Test that the ridings endpoint returns 200 """

    response = client.get("/ridings/results/2025")

    # Check status code of response
    assert response.status_code == 200

def test_riding_results_response_shape():
    """ Test that the ridings endpoint has the correct shape """

    response = client.get("/ridings/results/2025")
    data = response.json()

    # Check data has correct basic shape
    assert isinstance(data, list)
    assert len(data) == DATA_LENGTH

def test_riding_results_contains_expected_first_riding():
    """ Test that the ridings endpoint contains the expected first riding """

    # Check first riding has basic shape
    response = client.get("/ridings/results/2025")
    data = response.json()
    first_riding = data[0]
    first_result = first_riding["results"][0]

    assert "district_number" in first_riding
    assert "district_name" in first_riding
    assert "results" in first_riding

    assert isinstance(first_riding["results"], list)
    assert len(first_riding["results"]) > 0

    assert "candidate_name" in first_result
    assert "party_name" in first_result
    assert "vote_count" in first_result

def test_riding_results_contains_expected_last_riding():
    """ Test that the ridings endpoint contains the expected last riding """

    # Sanity check on last riding
    response = client.get("/ridings/results/2025")
    data = response.json()
    last_riding = data[DATA_LENGTH - 1]

    assert last_riding["district_number"] == 62001
    assert last_riding["district_name"]
    assert len(last_riding["results"]) > 0
