"""FastAPI: health + FastMCP streamable HTTP."""

from __future__ import annotations

from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from toolbench_mcp.activity_log import install_log_handler, log_activity
from toolbench_mcp.capabilities import build_capabilities
from toolbench_mcp.config import load_settings
from toolbench_mcp.logs_api import build_router as build_logs_router
from toolbench_mcp.meta_api import build_router as build_meta_router
from toolbench_mcp.scraper_api import build_router as build_scraper_router
from toolbench_mcp.server import mcp

mcp_http = mcp.http_app(path="/")


def build_app() -> FastAPI:
    settings = load_settings()
    install_log_handler()
    log_activity("system", "toolbench-mcp backend starting", level="INFO")
    app = FastAPI(
        title="toolbench-mcp",
        version="0.3.0",
        lifespan=mcp_http.lifespan,
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            f"http://127.0.0.1:{settings.webapp_port}",
            f"http://localhost:{settings.webapp_port}",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/health")
    async def health() -> dict[str, Any]:
        path = settings.mcp_http_path.strip() or "/mcp"
        return {
            "ok": True,
            "service": "toolbench-mcp",
            "port": settings.port,
            "mcp_http": f"http://{settings.host}:{settings.port}{path}",
            "webapp": f"http://127.0.0.1:{settings.webapp_port}",
        }

    @app.get("/")
    async def root() -> dict[str, Any]:
        path = settings.mcp_http_path.strip() or "/mcp"
        return {
            "service": "toolbench-mcp",
            "version": "0.3.0",
            "mcp_http": f"http://{settings.host}:{settings.port}{path}",
            "webapp": f"http://127.0.0.1:{settings.webapp_port}",
            "docs": "/docs",
            "scraper_api": "/api/scraper/status",
            "meta_tools": "/api/meta/tools",
        }

    @app.get("/api/capabilities")
    async def capabilities() -> dict[str, Any]:
        """Fleet SOTA capability introspection (WEBAPP_STANDARDS §1.4)."""
        return await build_capabilities(mcp, version="0.3.0")

    app.include_router(build_meta_router())
    app.include_router(build_scraper_router())
    app.include_router(build_logs_router())

    path = settings.mcp_http_path.strip() or "/mcp"
    app.mount(path, mcp_http)

    return app


app = build_app()
