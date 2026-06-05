# DEPRECATED: toolbench-mcp

**Superseded by [scraper-mcp](../scraper-mcp)** (June 2026).

All toolbench-mcp features were merged into scraper-mcp:

- `toolbench_guide` MCP tool
- Playwright ToolBench page archiver (`/api/scraper/*`, Tools page)
- Fleet `/logs`, `/api/capabilities`, `/api/meta/tools`

## Migration

| Was (toolbench-mcp) | Use (scraper-mcp) |
|---------------------|-------------------|
| Frontend `http://127.0.0.1:10816` | `http://127.0.0.1:10999` |
| Backend / MCP `http://127.0.0.1:10817/mcp` | `http://127.0.0.1:10998/mcp` |
| `D:\Dev\repos\toolbench-mcp\webapp\start.ps1` | `D:\Dev\repos\scraper-mcp\webapp\start.ps1` |

Update Cursor / Claude `mcp.json` entries: replace `toolbench-mcp` with `scraper-mcp` and port **10998**.

Ports **10816** and **10817** are quarantined in the fleet registry.
