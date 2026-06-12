from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_riding_results():
    """ Test that the health endpoint returns 200 and a healthy status
        Note that the health endpoint is in the main.py file """

    DATA_LENGTH = 343

    response = client.get("/ridings/results/2025")

    # Check status code of response
    assert response.status_code == 200

    data = response.json()

    # Check data has correct basic shape
    assert isinstance(data, list)
    assert len(data) == DATA_LENGTH

    # Check first riding has basic shape
    first_riding = data[0]
    assert "district_number" in first_riding
    assert "district_name" in first_riding
    assert "results" in first_riding

    assert isinstance(first_riding["results"], list)
    assert len(first_riding["results"]) > 0

    first_result = first_riding["results"][0]
    assert "candidate_name" in first_result
    assert "party_name" in first_result
    assert "vote_count" in first_result

    # Sanity check on last riding
    last_riding = data[DATA_LENGTH - 1]

    assert last_riding["district_number"] == 62001
    assert last_riding["district_name"]
    assert len(last_riding["results"]) > 0
