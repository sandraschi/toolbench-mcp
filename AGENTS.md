# toolbench-mcp — Agent Guide

FastMCP 3.2+: Arcade ToolBench workflow companion (links, rescoring, Playwright scraper, Iron Shell webapp).

## Ports

| Role | Port |
|------|------|
| Vite frontend | 10816 |
| FastAPI + MCP `/mcp` | 10817 |

## Quick start

```powershell
cd D:\Dev\repos\toolbench-mcp\webapp
.\start.ps1
```

## Verify

```powershell
cd D:\Dev\repos\toolbench-mcp
uv run pytest tests/ -q
```

## Entry points

- `uv run toolbench-mcp` → `toolbench_mcp.__main__:main`
- HTTP: `http://127.0.0.1:10817/mcp`
- Stdio: `uv run python -m toolbench_mcp --stdio`
- Portmanteau tool: `toolbench_guide`

## Fleet APIs

- `GET /health`
- `GET /api/capabilities` — runtime MCP introspection
- `GET /api/logs` — ring buffer (WEBAPP_LOGS_PAGE.md)
- `GET /api/meta/tools`, `GET /api/meta/local-llm`
- `POST /api/scraper/*` — Playwright scraper (optional `.[scraper]`)

## Standards

- FastMCP 3.2+ portmanteau tool pattern — tools use `operation` enum param
- Responses: structured dicts with `success`, `message`, domain-specific fields
- Dual transport: stdio (Claude Desktop) + HTTP (`--serve` or `MCP_TRANSPORT=http`)
- See [mcp-central-docs](https://github.com/sandraschi/mcp-central-docs) for fleet-wide coding standards

## Key files

- `README.md` — full documentation
- `pyproject.toml` — build config and entry points
- `CLAUDE.md` — Claude Code context (if present)

Install docs: follow mcp-central-docs/standards/AGENT_INSTALL_REFERENCE.md
