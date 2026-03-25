from __future__ import annotations

from fastapi.testclient import TestClient

from toolbench_mcp.app import app


def test_health() -> None:
    c = TestClient(app)
    r = c.get("/health")
    assert r.status_code == 200
    j = r.json()
    assert j.get("ok") is True
    assert j.get("service") == "toolbench-mcp"


def test_scraper_status() -> None:
    c = TestClient(app)
    r = c.get("/api/scraper/status")
    assert r.status_code == 200
    j = r.json()
    assert "script_path" in j
    assert "playwright_available" in j
    assert j.get("script_exists") is True
    sp = str(j.get("script_path", "")).replace("\\", "/")
    assert sp.endswith("scripts/scrape_toolbench_assessments.py")


def test_meta_tools() -> None:
    c = TestClient(app)
    r = c.get("/api/meta/tools")
    assert r.status_code == 200
    j = r.json()
    assert j.get("success") is True
    assert any(t.get("name") == "toolbench_guide" for t in j.get("tools", []))


def test_meta_local_llm() -> None:
    c = TestClient(app)
    r = c.get("/api/meta/local-llm")
    assert r.status_code == 200
    j = r.json()
    assert "ollama" in j
    assert "lm_studio" in j
