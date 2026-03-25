"""Environment-driven settings."""

from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    host: str
    port: int
    mcp_http_path: str
    webapp_port: int

    @classmethod
    def from_env(cls) -> Settings:
        return cls(
            host=os.getenv("TOOLBENCH_MCP_HOST", "127.0.0.1"),
            port=int(os.getenv("TOOLBENCH_MCP_PORT", "10817")),
            mcp_http_path=os.getenv("TOOLBENCH_MCP_HTTP_PATH", "/mcp"),
            webapp_port=int(os.getenv("TOOLBENCH_MCP_WEBAPP_PORT", "10816")),
        )


def load_settings() -> Settings:
    return Settings.from_env()
