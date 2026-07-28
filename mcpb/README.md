# toolbench-mcp (MCPB Bundle)

FastMCP 3.1: Arcade ToolBench helper (links, rescoring, bundled Playwright scraper, Iron Shell webapp).

## Usage

Add to \claude_desktop_config.json\:
\\\json
{
  "mcpServers": {
    "toolbench-mcp": {
      "command": "uv",
      "args": ["run", "--directory", "\D:\Dev\repos", "python", "-m", "toolbench_mcp"],
      "env": { "PYTHONPATH": "\D:\Dev\repos/src" }
    }
  }
}
\\\

## Tools

- **health**: health
- **root**: root
- **capabilities**: capabilities
- **logs_query**: logs_query
- **logs_stats**: logs_stats
- **logs_export**: logs_export
- **logs_clear**: logs_clear
- **tools**: tools
- **local_llm_status**: local_llm_status
- **status**: status
- **discover**: discover
- **scrape_urls**: scrape_urls
- **full_run**: full_run
- **tree**: tree
- **read_file**: read_file
- **clear_output**: clear_output
- **toolbench_guide**: toolbench_guide

## Requirements

- Python 3.12+
- uv
