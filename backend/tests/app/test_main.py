from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    """ Test that the health endpoint returns 200 and a healthy status
        Note that the health endpoint is in the main.py file """

    response = client.get("/health")
    data = response.json()

    assert response.status_code == 200
    assert data["status"] == "ok"

def test_cors_allows_vue_development_origin():
    """ Test cross-origin resource sharing allows frontend """
    response = client.get(
        "/health",
        headers={"Origin": "http://localhost:5173"},
    )

    assert response.status_code == 200
    assert (
        response.headers["access-control-allow-origin"]
        == "http://localhost:5173"
    )


def test_cors_does_not_allow_unknown_origin():
    """ Test cross-origin resource sharing does not allow an unknown """
    response = client.get(
        "/health",
        headers={"Origin": "https://unknown.example"},
    )

    assert response.status_code == 200
    assert "access-control-allow-origin" not in response.headers