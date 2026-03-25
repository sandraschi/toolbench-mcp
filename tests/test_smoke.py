from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from toolbench_mcp.app import app


def test_health() -> None:
    c = TestClient(app)
    r = c.get("/health")
    assert r.status_code == 200
    j = r.json()
    assert j.get("ok") is True
    assert j.get("service") == "toolbench-mcp"


async def _fake_run_script(_args: list[str]) -> dict:
    return {"returncode": 0, "stdout": "", "stderr": "", "command": []}


def test_scraper_post_accepts_json_body(monkeypatch: pytest.MonkeyPatch) -> None:
    """Regression: parameter name `body` once made FastAPI expect a query param; JSON body must work."""
    import toolbench_mcp.scraper_api as sa

    monkeypatch.setattr(sa, "_run_script", _fake_run_script)
    c = TestClient(app)
    r = c.post(
        "/api/scraper/scrape",
        json={
            "urls_text": "https://toolbench.arcade.dev/tools/example",
            "out_subdir": "pytest_tmp",
        },
    )
    assert r.status_code == 200, r.json()
    assert r.json().get("success") is True


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
