# toolbench-mcp — MCP Server Capabilities

## Server Overview

toolbench-mcp is a companion MCP server for Arcade ToolBench, providing scraping rescoring workflows, methodology links, Glama comparison, and a bundled Playwright scraper for automated assessment collection. It serves as a helper for evaluating and improving tool descriptions across MCP benchmarks including ToolBench and Glama scoring platforms.

The server is built on FastMCP 3.1 and provides 17 tools organized into three categories: core system tools (health, root, capabilities, status, local_llm_status), log management tools (logs_query, logs_stats, logs_export, logs_clear), and scraper/tooling tools (tools, discover, scrape_urls, full_run, tree, read_file, clear_output, toolbench_guide). It also exposes a FastAPI web application with REST endpoints for the WebSocket scraper, meta API, and activity logging.

Key features include a bundled Playwright scraper that can collect ToolBench assessment pages for offline analysis, rescoring workflow guidance aligned with the ToolBench methodology, Glama vs ToolBench comparison documentation, activity logging with ring-buffer storage, local LLM auto-discovery, content management for scraped files, and tool introspection via MCP protocol.

## Tools

### health
Returns server health status including service name, port, MCP HTTP path, and webapp URL. Quick connectivity check for the server.

**Return Format:** success bool with ok flag, service string, port int, mcp_http string URL, webapp string URL

### root
Returns server root information including service name, version, available API endpoints, and links to webapp, scraper API, and meta tools.

**Return Format:** dict with service, version, mcp_http, webapp, docs, scraper_api, meta_tools URLs

### capabilities
Fleet SOTA capability introspection following WEBAPP_STANDARDS pattern. Returns full tool surface analysis including portmanteau vs atomic tool counts, feature flags (sampling, agentic workflows, prompts, resources, skills, local LLM), and runtime information.

**Return Format:** status string, server dict with name, version, fastmcp version, tool_surface dict with tool counts and categories, features dict with availability flags, inventory dict, runtime dict, timestamp

### logs_query
Query the activity log ring buffer. Supports pagination, level filtering, kind filtering, text search, and sorted results. The ring buffer stores recent MCP tool calls and system events.

**Parameters:** limit int (default 50, max 500), offset int (default 0), level string optional (INFO, WARNING, ERROR), kind string optional (tool, system, scraper), search string optional for text matching, sort string (asc or desc, default desc), after_id string optional for cursor pagination

**Return Format:** success bool, entries list of log dicts, total int, has_more bool

### logs_stats
Return statistics about the activity log including total entries, per-level breakdown, and per-kind breakdown.

**Return Format:** success bool with stats dict containing total, levels object, kinds object

### logs_export
Export log entries in JSON or CSV format with optional filtering. Useful for offline analysis or reporting.

**Parameters:** format string (json or csv, default json), level string optional, kind string optional, search string optional, sort string (asc or desc, default desc)

**Return Format:** success bool, entries list, format string, count int

### logs_clear
Clear all entries from the activity log ring buffer.

**Return Format:** success bool, message string confirming clearance

### tools
List all available MCP tools registered on the server via FastMCP introspection. Returns tool names and descriptions.

**Return Format:** success bool, tools list of {name, description} dicts, count int

### local_llm_status
Check connectivity to local LLM providers (Ollama on port 11434 and LM Studio on port 1234). Auto-discovers available models and reports which provider is reachable.

**Return Format:** success bool, ollama dict with available flag and model list, lm_studio dict with available flag and model list

### status
Comprehensive server status including log stats, webapp connectivity check, and scraper API availability.

**Return Format:** success bool, log_stats dict, webapp dict with reachable flag, scraper dict with available flag

### discover
Run a discovery scan on a ToolBench search URL. Uses Playwright to navigate and collect assessment page URLs from the ToolBench listing. Supports pagination and delay configuration for rate-limit compliance.

**Parameters:** search_url string (required, min 12 chars), out_subdir string optional, max_pages int (1-100, default 15), delay_seconds float (0.5-120, default 3.0), jitter_seconds float (0.0-60, default 2.0), headed bool (default false)

**Return Format:** success bool, run_id string, message string with results summary

### scrape_urls
Scrape specific ToolBench assessment URLs to extract detailed scoring and methodology data. Each URL is processed with configurable delays for rate-limit respect.

**Parameters:** urls_text string (required, one URL per line), out_subdir string optional, delay_seconds float (0.5-120, default 3.0), jitter_seconds float (0.0-60, default 2.0), save_html bool (default false), headed bool (default false)

**Return Format:** success bool, run_id string, message string with results

### full_run
Complete discovery-to-scrape pipeline. Runs search discovery first, then scrapes all discovered assessment URLs. Saves results with optional HTML capture.

**Parameters:** search_url string (required), out_subdir string optional, max_pages int (1-100, default 15), delay_seconds float (0.5-120, default 4.0), jitter_seconds float (0.0-60, default 2.0), save_html bool (default false), headed bool (default false)

**Return Format:** success bool, run_id string, message string with discovery count and scrape results

### tree
List the output directory tree for scraped files. Returns directory structure showing all scrape results organized by run.

**Parameters:** path string optional (relative path within scrape output root)

**Return Format:** success bool, tree dict with directory structure, root string

### read_file
Read a specific output file from the scrape results directory. Returns file contents as plain text.

**Parameters:** path string (required, relative path within scrape output root)

**Return Format:** success bool, content string, filename string, size int

### clear_output
Remove all files from the scrape output directory. Requires confirmation via force parameter.

**Parameters:** force bool (default false, must be true to execute)

**Return Format:** success bool, message string with confirmation

### toolbench_guide
Curated ToolBench context for agents providing links, rescoring methodology, and comparisons between Glama and ToolBench scoring systems. This is a portmanteau tool with multiple operations.

**Operations:**
- get_help: Comprehensive help text about ToolBench methodology
- list_official_links: Official ToolBench resource URLs and documentation links
- rescoring_after_improvements: Step-by-step guide for rescoring after tool description fixes
- glama_vs_toolbench: Detailed comparison between Glama AI and Arcade ToolBench scoring
- arcade_mcp_product: Information about Arcade.dev's MCP runtime and integration platform

**Parameters:** operation Literal (required): get_help, list_official_links, rescoring_after_improvements, glama_vs_toolbench, arcade_mcp_product

**Return Format:** success bool, result dict or string with relevant content, recommendations list of suggested URLs

## Configuration

### Environment Variables
- TOOLBENCH_PORT: Server port (default: 10817)
- TOOLBENCH_HOST: Server host (default: 127.0.0.1)
- TOOLBENCH_WEBAPP_PORT: Webapp port (default: 10816)
- TOOLBENCH_SCRAPER_SCRIPT: Path to custom scraper Python script
- TOOLBENCH_SCRAPER_OUTPUT_ROOT: Directory for scrape output files
- TOOLBENCH_MCP_HTTP_PATH: Path for MCP HTTP endpoint (default: /mcp)
- MCP_TRANSPORT: Transport protocol (stdio or http)

### Storage
Activity logs are stored in an in-memory ring buffer that persists for the server session. Scraped content is saved to the filesystem at the configured output root directory.

## Data Sources

### ToolBench API
The server does not call ToolBench APIs directly. It provides methodology documentation and uses Playwright to scrape public assessment pages. The bundled scraper respects rate limits through configurable delays and jitter.

### Arcade.dev Documentation
The toolbench_guide tool references Arcade.dev MCP documentation for the Arcade MCP product information. This is static documentation content bundled with the server.

### Local LLM Discovery
The server probes Ollama (port 11434) and LM Studio (port 1234) on localhost to discover available LLM models for potential integration.

## Integration Patterns

The recommended workflow pattern for using toolbench-mcp:
1. Start with toolbench_guide(operation="get_help") for context
2. Review current scores with Glama vs ToolBench comparison
3. Run discover on a ToolBench search URL
4. Scrape assessment pages with scrape_urls or full_run
5. Review results with tree and read_file
6. Make improvements to tool descriptions
7. Follow rescoring_after_improvements workflow
8. Submit updated scores via the ToolBench submission URL

## Error Handling

All tools return structured error responses:
- success: false on failure with descriptive error message
- HTTP endpoints return appropriate HTTP status codes (400, 404, 500)
- File operations validate paths to prevent directory traversal
- Scraper operations return error details if Playwright is unavailable

## Performance Characteristics

- Health checks: <50ms
- Log queries: <100ms for typical page sizes
- File reads: <10ms for cached files, varies for large files
- Scraper operations: 3-120 seconds per URL depending on delay configuration
- TLS: HTTP only (localhost), no TLS overhead

## Security Considerations

- File paths are validated to prevent directory traversal attacks using path resolution against the configured output root
- Output directory is restricted to the configured output root with traversal attempts returning 400 or 404 errors
- Scraper operations require explicit parameters with no arbitrary URL execution
- Authentication defaults to localhost-only for the webapp and API
- No API keys or secrets are stored by the server
- Activity logs may contain tool call parameters; sensitive data should not be passed in command parameters
- File output is stored on local filesystem with configurable root directory isolation

## Scraper API Reference

The scraper endpoints use Playwright to automate Chrome browser interaction with ToolBench assessment pages. All scraper operations are rate-limit aware with configurable delays and jitter. The delay_seconds parameter sets the base wait time between page actions. The jitter_seconds parameter adds random variation to the delay to appear more human-like. Operations run asynchronously in subprocess workers, each producing output in the configured output directory.

The DiscoverBody schema accepts search_url (min 12 characters), out_subdir for organizing output, max_pages (1-100), delay_seconds (0.5-120), jitter_seconds (0-60), and headed boolean for visible browser mode. The ScrapeBody schema accepts urls_text with one URL per line, out_subdir, delay_seconds, jitter_seconds, save_html boolean for HTML file capture, and headed boolean. The FullBody schema combines both with all parameters from both operations.

## Activity Log System

The server maintains an in-memory ring buffer for activity logging with the following structure. Each log entry includes an auto-incrementing ID, timestamp with millisecond precision, level (INFO, WARNING, ERROR), kind (tool, system, scraper), message string, and optional metadata dict. The ring buffer stores a maximum of 10,000 entries with oldest entries being dropped when the limit is exceeded. Log entries are searchable by level, kind, and text search. The logs_query tool supports pagination, cursor-based positioning via after_id, and ascending or descending sort order.

## Toolbench Guide Content Reference

The toolbench_guide tool provides five discrete information operations. The get_help operation returns comprehensive documentation about the ToolBench scoring methodology, quality signals, and how assessments work. The list_official_links operation returns curated URLs to the official ToolBench documentation, methodology page, and submission portal. The rescoring_after_improvements operation provides step-by-step instructions for requesting rescoring after tool descriptions have been improved based on assessment feedback. The glama_vs_toolbench operation provides a detailed comparison of the two scoring systems including their different weighting of docstring quality, protocol compliance, and definition completeness. The arcade_mcp_product operation documents Arcade.dev's MCP runtime platform and how it differs from the ToolBench evaluation service.

## Meta API Reference

The meta_api router provides tools information and help documentation. GET /api/meta/tools returns all available tools with their descriptions and parameter schemas. GET /api/meta/help provides general help documentation about using the server effectively. These endpoints support webapp-based discovery of server capabilities.

## Platform Scraper Architecture

The platform_scrapers module implements the core scraping logic for ToolBench pages. It uses Playwright's async API to navigate to assessment URLs, wait for page content to load, extract structured data from assessment pages including scores, criteria ratings, and methodology descriptions, and optionally save full HTML for offline analysis. The scraper respects robots.txt directives and implements polite crawling with configurable delays. Batch operations process URLs sequentially with delays between each request to avoid overwhelming the target server. The full_run operation chains discovery and scraping into a single pipeline, first discovering assessment URLs from search results and then scraping each discovered URL.

## Pipeline Execution Model

The full_run operation implements a two-phase pipeline. Phase one is discovery: the Playwright browser navigates to the ToolBench search URL, waits for results to load, extracts all assessment page links from the search results, and paginates through the specified number of result pages. Each extracted URL is validated against the expected assessment page pattern. Phase two is scraping: each discovered URL is visited sequentially with configurable delays, the assessment page content is extracted including scores, criteria ratings, tool descriptions, and methodology metadata. The complete pipeline logs each step to the activity log for monitoring and troubleshooting.

The discover operation is a lighter version of phase one only, suitable for when you want to review discovered URLs before committing to a full scrape. The scrape_urls operation skips discovery and goes directly to scraping provided URLs, which is useful for reassessment of known pages or targeted analysis.

## Output File Structure

Scrape results are organized in a directory structure under the configured output root. Each run creates a timestamped subdirectory containing the operation type, start time, and a unique identifier. Within each run directory, individual assessment pages are saved as markdown files with the assessment name or a numeric index. When save_html is enabled, the full HTML of each page is also saved for detailed analysis. A metadata file records the run configuration including URL, parameters, and timing.

## Glama vs ToolBench Scoring Deep Dive

The two scoring systems evaluate tools differently across several dimensions. Glama AI focuses exclusively on docstring quality across six dimensions: description completeness, parameter documentation, return value documentation, example quality, error documentation, and format consistency. Each dimension is scored on a numeric scale and the overall grade is weighted. ToolBench covers broader criteria including not only docstring quality but also protocol compliance, error handling patterns, pagination implementation, parameter constraints, naming conventions, and output schema documentation.

The practical implication is that a tool with excellent implementation but minimal docstrings will score well on ToolBench but poorly on Glama. Conversely, a tool with thorough documentation but basic implementation may score better on Glama than on ToolBench. The glama_vs_toolbench operation in toolbench_guide provides specific guidance on which criteria each platform emphasizes and how to optimize for both simultaneously.

## Rescoring Workflow Reference

When requesting rescoring after improving tool descriptions, follow this detailed process. First, document every change made with specific references to the criteria that were improved. Then re-run the assessment through ToolBench to verify improvements before submitting. Capture the new assessment results using the scraper for your records. Submit the rescoring request through the official ToolBench submission portal with the change documentation attached. Monitor the rescoring status by periodically checking the assessment page. If scores do not reflect improvements, review whether the changes address the specific criteria that ToolBench evaluates.

## Output Directory Management

The output directory structure follows a consistent pattern. The root output directory defaults to scrape_out relative to the repo root but can be overridden via TOOLBENCH_SCRAPER_OUTPUT_ROOT. Within this, each out_subdir creates a named subdirectory for organizing different analysis topics or servers. Within each subdirectory, individual run directories are created with timestamps. The tree tool provides a quick view of this structure without needing to navigate the filesystem manually. The read_file tool accesses files within this structure. The clear_output tool removes all output files when force is set to true.

## Performance Optimization Guide

To optimize scraper performance, balance delay settings against throughput requirements. Short delays of 2-3 seconds with minimal jitter allow faster collection but increase rate-limit risk. Long delays of 5-10 seconds with 3-5 seconds jitter are safer for production scraping but complete fewer pages per minute. For batch operations processing dozens of URLs, sequential scraping with moderate delays is recommended over parallel execution to avoid overwhelming the target server. Use headless mode for non-interactive scraping to reduce resource usage. Set appropriate max_pages limits to prevent excessively long scrape sessions.

## Error Handling Reference

The server provides comprehensive error handling across all operations. HTTP 400 errors indicate invalid input parameters with field-level validation details. HTTP 404 errors indicate missing files or resources with the specific path information. HTTP 500 errors indicate internal server failures with diagnostic information. Scraper operations return operation-specific errors when Playwright is unavailable, when search URLs are invalid, when pages fail to load, or when output directory permissions are insufficient. File operations validate paths against the output root to prevent directory traversal, returning 400 or 404 errors as appropriate.

## ToolBench Guide Reference Content

The toolbench_guide tool bundles the following reference documentation. The ToolBench methodology document covers how assessments are conducted, what quality signals are evaluated, and how scores are calculated across dimensions including definition quality, protocol compliance, error handling, pagination, parameter constraints, naming conventions, and output schema documentation. The rescoring workflow document provides step-by-step instructions for submitting improved tool descriptions for reassessment after fixing identified issues. The Glama comparison document details the differences between Glama AI's docstring-focused grading and ToolBench's comprehensive evaluation. The Arcade MCP product document explains how Arcade's runtime platform relates to ToolBench scoring.

## Activity Log Maintenance

Regular log maintenance ensures optimal server performance. Query logs daily to monitor server activity and catch issues early. Export logs weekly for long-term archival if needed. Clear logs after export to prevent the ring buffer from filling with stale entries. Use level and kind filters when querying to focus on relevant entries. The logs_export tool supports JSON and CSV formats for compatibility with analysis tools.

## API Route Design

The REST API routes follow a consistent design pattern. Scraper routes are grouped under /api/scraper/ with descriptive action names. Meta routes are under /api/meta/ for tool and help information. Log routes are under /api/logs for activity log access. Health and status routes are at the root level. Each route accepts and returns JSON. Error responses include HTTP status codes with descriptive error messages. CORS is configured to allow the webapp origin for browser-based access.

## Tool Registration and Discovery

The server registers tools with FastMCP at startup. Tools are introspectable through the MCP protocol's tools/list method. Each tool declaration includes its name, description, and parameter schema. The tools MCP tool provides a convenient way to list all registered tools. The capabilities API endpoint provides a comprehensive SOTA capability inventory including tool surface analysis, feature flags, and runtime information. Meta tools are listed under /api/meta/tools for webapp integration.

## Output Format Specifications

Scraped assessment data is saved in markdown format with structured sections. Each assessment file includes the assessment title and URL, overall score and grade, per-criteria breakdown with scores, methodology description, evaluated tool list, improvement suggestions if available, and the full assessment text. HTML files are saved with the complete page DOM for visual reference. The markdown format is designed for easy reading and further processing by LLMs and analysis tools.

## Multi-Platform Scraping Support

The scraper architecture is designed for ToolBench but can be extended to other platforms. The core scraping loop handles page navigation, content extraction, and file saving in a platform-agnostic way. Platform-specific logic is isolated in the content extraction module, which handles the specific DOM structure of ToolBench assessment pages. To support additional platforms, implement a new content extraction handler following the existing pattern and register it with the scraper.

## Scraper Platform Compatibility

The scraper is designed to work with the ToolBench assessment platform but can be adapted for other similar platforms. It navigates to assessment URLs, waits for structured content to load, extracts scores and criteria from the page DOM, and saves the extracted content as structured markdown. The scraper uses CSS selectors to identify assessment content elements. Adaptation for other platforms would require updating these selectors and parsing logic.

## Performance Guidelines

For optimal server performance, manage log buffer size by clearing logs after export. Use appropriate output subdirectory naming to avoid filesystem issues. Set max_pages limits to prevent excessively long discovery runs. Configure delays appropriately for your network conditions and rate-limit requirements. Use headless mode for production scraping to reduce resource consumption. Monitor output disk usage and clear obsolete files regularly.

## Output File Naming Convention

Scrape output files follow a consistent naming convention. Discovery results are saved as discover_results_TIMESTAMP.txt containing the discovered URLs. Assessment pages are saved as assessment_NNN.md with three-digit sequence numbers. When save_html is enabled, the HTML files are saved as assessment_NNN.html in the same directory. Metadata files record the operation configuration and timing. The filename structure enables easy sorting and identification of scrape runs.

## Configuration Validation

At startup, the server validates its configuration. The port and host settings are checked for availability and validity. The scraper script path is verified to exist if configured. The output root directory is created if it does not exist. The MCP HTTP path is validated for correct formatting. Invalid configurations produce startup errors with specific guidance for correction.

## Server Startup and Lifecycle

The server starts in two modes depending on configuration. In HTTP mode, the FastAPI application starts and mounts the MCP endpoint at the configured path. In stdio mode, the server runs as a standard MCP stdio transport. The server initializes the activity log system, loads configuration from environment variables, and registers all tools with the FastMCP instance. The scraper router is mounted only when Playwright is available. The server logs its startup configuration and readiness status.

## Content Reference Data

The content module provides static documentation and reference data for ToolBench operations. This includes LINKS containing curated URLs to official ToolBench documentation, methodology descriptions, and the submission portal. RESCORING_STEPS contains the step-by-step rescoring workflow instructions that guide users through the process of submitting improved tool descriptions for reassessment. GLAMA_VS_TOOLBENCH contains the comparative analysis of both scoring systems, explaining how Glama focuses on docstring quality across six dimensions while ToolBench covers broader quality signals including protocol implementation, error handling, pagination, and parameter constraints. This reference data is bundled with the server and does not require network access.
