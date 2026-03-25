"""FastMCP 3.1 — ToolBench workflow helper tools."""

from __future__ import annotations

from typing import Any, Literal, assert_never

from fastmcp import FastMCP

from toolbench_mcp import content

mcp = FastMCP(
    "toolbench-mcp",
    instructions=(
        "Companion to Arcade ToolBench: rescoring workflow, methodology links, Glama contrast. "
        "Webapp on 10816 runs the fleet Playwright scraper via /api/scraper (install .[scraper]). "
        "Does not call ToolBench APIs. For bulk scores use Arcade Scoring API (request access). "
        "Arcade's own MCP product = their integrations runtime (docs), not this server."
    ),
)

GuideOperation = Literal[
    "get_help",
    "list_official_links",
    "rescoring_after_improvements",
    "glama_vs_toolbench",
    "arcade_mcp_product",
]


@mcp.tool()
async def toolbench_guide(operation: GuideOperation) -> dict[str, Any]:
    """TOOLBENCH_GUIDE — Curated ToolBench context for agents (links, rescoring, comparisons).

    PORTMANTEAU RATIONALE: One entry point so clients avoid tool sprawl; operations are discrete
    static lookups (no network I/O).

    Args:
        operation: get_help | list_official_links | rescoring_after_improvements |
            glama_vs_toolbench | arcade_mcp_product

    Returns:
        success, result (string or dict), recommendations.
    """
    rec: list[str] = [
        "Open methodology before large refactors: https://toolbench.arcade.dev/methodology",
        "This repo (README + scraper): https://github.com/sandraschi/toolbench-mcp",
    ]
    if operation == "get_help":
        return {
            "success": True,
            "result": content.help_text(),
            "recommendations": rec,
        }
    if operation == "list_official_links":
        return {
            "success": True,
            "result": dict(content.LINKS),
            "recommendations": rec,
        }
    if operation == "rescoring_after_improvements":
        return {
            "success": True,
            "result": content.RESCORING_STEPS.strip(),
            "recommendations": rec + ["Submit: https://toolbench.arcade.dev/submit"],
        }
    if operation == "glama_vs_toolbench":
        return {
            "success": True,
            "result": content.GLAMA_VS_TOOLBENCH.strip(),
            "recommendations": rec,
        }
    if operation == "arcade_mcp_product":
        return {
            "success": True,
            "result": (
                "Arcade.dev ships an MCP runtime / integrations platform (Gmail, Slack, GitHub, …) — "
                "see docs: MCP clients overview and quickstart 'Call tools in IDE/MCP clients'. "
                "That product is optional: use it when you need those hosted tools with Arcade auth. "
                "It does not replace reading your ToolBench report or running your own server tests. "
                "Python MCP API reference: https://docs.arcade.dev/en/references/mcp/python"
            ),
            "recommendations": [
                "https://docs.arcade.dev/en/get-started/mcp-clients",
                "https://docs.arcade.dev/en/get-started/quickstarts/call-tool-client",
            ],
        }
    assert_never(operation)
