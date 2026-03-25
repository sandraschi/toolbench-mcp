"""Static ToolBench / fleet context (no scraping; links to official Arcade surfaces)."""

from __future__ import annotations

TOOLBENCH_BASE = "https://toolbench.arcade.dev"
MCP_CENTRAL_TOOLBENCH = (
    "https://github.com/sandraschi/mcp-central-docs/tree/master/toolbench"
)

LINKS: dict[str, str] = {
    "toolbench_home": f"{TOOLBENCH_BASE}/",
    "methodology": f"{TOOLBENCH_BASE}/methodology",
    "improve": f"{TOOLBENCH_BASE}/improve",
    "submit_rescoring": f"{TOOLBENCH_BASE}/submit",
    "scoring_api": f"{TOOLBENCH_BASE}/api-access",
    "patterns": "https://arcade.dev/patterns",
    "arcade_mcp_clients": "https://docs.arcade.dev/en/get-started/mcp-clients",
    "arcade_call_tools_mcp": "https://docs.arcade.dev/en/get-started/quickstarts/call-tool-client",
    "arcade_mcp_python_ref": "https://docs.arcade.dev/en/references/mcp/python",
    "mcp_central_toolbench": MCP_CENTRAL_TOOLBENCH,
}

RESCORING_STEPS = """
1. Merge fixes to the default branch ToolBench indexes.
2. Open Submit: https://toolbench.arcade.dev/submit (or Improve → Submit for rescoring).
3. Sign in with an Arcade account. On the report card, use "Sign in to request rescan" when shown.
4. Wait for async re-analysis; scores can lag commits.
5. Record the new report URL in mcp-central-docs/toolbench/improvements/.
"""

GLAMA_VS_TOOLBENCH = """
Glama (glama.ai) and similar directories are useful for discovery; scores can feel opaque.
ToolBench publishes methodology weights, Improve-page ecosystem stats, per-server report cards,
and links to Arcade Agentic Tool Patterns — usually more actionable for maintainers.
Use ToolBench for backlog triage; use Arcade's own MCP only when you need their hosted integrations.
"""


def help_text() -> str:
    return (
        "toolbench-mcp exposes curated ToolBench / rescoring context. "
        "It does not call Arcade APIs or replace the Playwright scraper in mcp-central-docs/toolbench/scripts. "
        "Arcade's product MCP (integrations runtime) is separate from ToolBench grading."
    )
