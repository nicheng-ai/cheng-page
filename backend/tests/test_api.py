"""Basic API tests"""
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_root():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "running"


def test_get_profile_zh():
    """Test profile endpoint with Chinese language"""
    response = client.get("/api/profile?lang=zh")
    assert response.status_code == 200
    data = response.json()
    assert "name" in data
    assert "email" in data


def test_get_profile_en():
    """Test profile endpoint with English language"""
    response = client.get("/api/profile?lang=en")
    assert response.status_code == 200
    data = response.json()
    assert "name" in data
    assert "email" in data


def test_get_research():
    """Test research endpoint"""
    response = client.get("/api/research?lang=zh")
    assert response.status_code == 200
    data = response.json()
    assert "interests" in data
    assert "questions" in data


def test_get_news():
    """Test news endpoint"""
    response = client.get("/api/news?lang=zh")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert isinstance(data["items"], list)


def test_get_social_links():
    """Test social links endpoint"""
    response = client.get("/api/social-links")
    assert response.status_code == 200
    data = response.json()
    assert "links" in data
    assert isinstance(data["links"], list)
