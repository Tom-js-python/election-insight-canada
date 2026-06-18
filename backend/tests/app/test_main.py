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