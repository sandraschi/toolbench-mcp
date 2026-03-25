# toolbench-mcp

**FastMCP 3.1** helper: curated **ToolBench** links, **rescoring** steps, **Glama vs ToolBench** notes, and a short explanation of **Arcade’s own MCP product** (their integrations runtime — optional).

Not affiliated with Arcade. Does **not** call ToolBench APIs or replace the Playwright scraper in [mcp-central-docs/toolbench/scripts](https://github.com/sandraschi/mcp-central-docs/tree/master/toolbench/scripts).

## Should you use Arcade’s MCP?

**Only if you want their hosted integrations** (Gmail, Slack, GitHub, …) through [Arcade’s MCP clients](https://docs.arcade.dev/en/get-started/mcp-clients). That product is **separate** from **ToolBench** grading. It will **not** by itself raise scores on your GitHub MCP servers — use methodology + repo fixes for that.

## MCP tool

| Tool | Purpose |
|------|---------|
| `toolbench_guide` | `operation`: `get_help` \| `list_official_links` \| `rescoring_after_improvements` \| `glama_vs_toolbench` \| `arcade_mcp_product` |

## Playwright scraper UI

The **webapp** drives the fleet script `mcp-central-docs/toolbench/scripts/scrape_toolbench_assessments.py` via the backend:

- `GET /api/scraper/status` — script path, Playwright installed, output root
- `POST /api/scraper/discover` | `scrape` | `full` — same args as the CLI (JSON body)
- `GET /api/scraper/tree?subdir=…` — list output files under `scrape_out/<subdir>/`
- `GET /api/scraper/file?rel_path=…` — preview a file (path relative to output root)
- `DELETE /api/scraper/output?subdir=…` — clear one subfolder

Install Playwright into **this** venv: `pip install -e ".[scraper]"` then `python -m playwright install chromium`.

| Env | Purpose |
|-----|---------|
| `TOOLBENCH_SCRAPER_SCRIPT` | Override path to `scrape_toolbench_assessments.py` |
| `TOOLBENCH_SCRAPER_OUTPUT_ROOT` | Override output root (default: `<repo>/scrape_out`) |

Default script path: `<repo>/../mcp-central-docs/toolbench/scripts/scrape_toolbench_assessments.py`.

## Transports

- **stdio:** `toolbench-mcp` or `python -m toolbench_mcp`
- **HTTP:** `toolbench-mcp --serve` — MCP at `http://127.0.0.1:10817/mcp` (see `/health`)

## Webapp (fleet SOTA — WEBAPP_STANDARDS)

Iron Shell: **sidebar** (Home, Tools, Apps, Help, Settings), **topbar** + breadcrumbs, **main** scroll, **logger** panel (timestamped levels, auto-scroll with pause-on-scroll-up), **SOTA Chat** FAB (**Ctrl+K** / **Cmd+K**, personas: Reductionist / Debugger / Explainer — logs to panel until an LLM is wired). **Dark** default + **light** in Settings. **Glom On:** `GET /api/meta/local-llm` probes Ollama `11434` and LM Studio `1234`. **`/apps`** loads **`public/glama.json`**. **`/tools`** = MCP inspector + Playwright scraper.

| Backend | Path |
|--------|------|
| MCP manifest | `GET /api/meta/tools` |
| Local LLM probe | `GET /api/meta/local-llm` |

| Role | Port |
|------|------|
| Vite (UI) | **10816** |
| FastAPI + MCP | **10817** |

```powershell
cd D:\Dev\repos\toolbench-mcp
.\start.ps1
```

Double-click **`start.bat`** (repo root) or **`webapp\start.bat`** (frontend only) if you prefer a launcher without typing.

**`webapp\start.ps1`** alone: if **nothing** is listening on **10817**, it **opens a second PowerShell window** with `python -m toolbench_mcp --serve`, waits for `/health`, then starts Vite — so you avoid `ECONNREFUSED` on the proxy. If the backend never comes up (venv missing, wrong cwd), start it manually: `cd` to repo root, `.\.venv\Scripts\Activate.ps1`, `python -m toolbench_mcp --serve`.

Or: terminal A `python -m toolbench_mcp --serve`, terminal B `cd webapp; npm install; npm run dev`.

## Env

| Variable | Default |
|----------|---------|
| `TOOLBENCH_MCP_HOST` | `127.0.0.1` |
| `TOOLBENCH_MCP_PORT` | `10817` |
| `TOOLBENCH_MCP_HTTP_PATH` | `/mcp` |
| `TOOLBENCH_MCP_WEBAPP_PORT` | `10816` |

## Dev

```powershell
cd D:\Dev\repos\toolbench-mcp
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -e ".[dev]"
ruff check src
pytest
```

## License

MIT
