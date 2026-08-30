import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.mark.parametrize("outcome", ["win", "loss", "both"])
def test_swing_ridings_accepts_valid_outcomes(outcome):
    """ Test that all three valid outcomes are accepted """

    response = client.get(
        "/ridings/swing/2025",
        params={
            "party_name": "Conservative",
            "outcome": outcome,
            "margin": 1000,
        },
    )

    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.parametrize(
    "query",
    [
        "party_name=Conservative&outcome=neither&margin=1000",
        "party_name=Conservative&outcome=lost&margin=1000",
        "party_name=Conservative&outcome=win&margin=0",
        "party_name=Conservative&outcome=win&margin=-500",
        "party_name=Conservative&outcome=win&margin=abc",
        "outcome=win&margin=1000",
        "party_name=Conservative&margin=1000",
        "party_name=Conservative&outcome=win",
    ],
)
def test_swing_ridings_invalid_query_returns_422(query):
    """ Test that a variety of different invalid queries all return 422 """

    response = client.get(f"/ridings/swing/2025?{query}")
    assert response.status_code == 422

def test_swing_ridings_blank_party_name_returns_422():
    response = client.get(
        "/ridings/swing/2025",
        params={
            "party_name": "   ",
            "outcome": "win",
            "margin": 1000,
        },
    )
    assert response.status_code == 422

def test_swing_ridings_response_shape():
    """ Test that the swing ridings endpoint has the correct shape """

    response = client.get("/ridings/swing/2025?party_name=Conservative&outcome=loss&margin=1000")

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)
    assert len(data) > 0

    first_riding = data[0]

    assert set(first_riding) == {
        "district_number",
        "district_name",
        "results",
    }
    assert isinstance(first_riding["results"], list)
    assert len(first_riding["results"]) > 0

    first_result = first_riding["results"][0]

    assert set(first_result) == {
        "candidate_name",
        "party_name",
        "vote_count",
    }

def test_conservative_losses_within_1000_returns_expected_ridings():
    """ Test the correct ridings are returned for conservative losses of 1000 votes """

    response = client.get(
        "/ridings/swing/2025",
        params={
            "party_name": "Conservative",
            "outcome": "loss",
            "margin": 1000,
        },
    )

    assert response.status_code == 200

    data = response.json()
    district_numbers = {
        riding["district_number"]
        for riding in data
    }

    assert district_numbers == {
        35009,35012,35013,35026,35049,35060,62001
    }

def test_liberal_wins_within_700_returns_expected_ridings():
    """ Test the correct ridings are returned for liberal wins of 700 votes """

    response = client.get(
        "/ridings/swing/2025",
        params={
            "party_name": "Liberal",
            "outcome": "win",
            "margin": 700,
        },
    )

    assert response.status_code == 200

    data = response.json()
    district_numbers = {
        riding["district_number"]
        for riding in data
    }

    assert district_numbers == {
        24073, 35009, 35049, 35060
    }

def test_bq_all_within_2000_returns_expected_ridings():
    """ Test the correct ridings are returned for BQ wins or loss of 2000 votes """

    response = client.get(
        "/ridings/swing/2025",
        params={
            "party_name": "Bloc Québécois",
            "outcome": "both",
            "margin": 2000,
        },
    )

    assert response.status_code == 200

    data = response.json()
    district_numbers = {
        riding["district_number"]
        for riding in data
    }

    assert district_numbers == {
        24018, 24042, 24051, 24071, 24073
    }

    def test_larger_margin_includes_all_results_from_smaller_margin():
        """ Test that a larger margin contains all or more of smaller margin """

        common_params = {
            "party_name": "Conservative",
            "outcome": "both",
        }

        small_response = client.get(
            "/ridings/swing/2025",
            params={**common_params, "margin": 500},
        )
        large_response = client.get(
            "/ridings/swing/2025",
            params={**common_params, "margin": 1000},
        )

        assert small_response.status_code == 200
        assert large_response.status_code == 200

        small_districts = {
            riding["district_number"]
            for riding in small_response.json()
        }
        large_districts = {
            riding["district_number"]
            for riding in large_response.json()
        }

        assert small_districts <= large_districts