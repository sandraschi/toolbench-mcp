# toolbench-mcp — User Guide

## Quick Start

toolbench-mcp helps you work with Arcade ToolBench assessment pages, providing scraping capabilities, methodology guidance, and log management. To get started:

1. Ensure Playwright is installed if you plan to use the scraper (pip install toolbench-mcp[scraper])
2. Start the server via HTTP or stdio mode
3. Run `health()` to verify the server is running
4. Run `toolbench_guide(operation="get_help")` for full context on ToolBench methodology
5. Try `local_llm_status()` to check if local LLMs are available

**First commands:**
```
health()
status()
toolbench_guide(operation="list_official_links")
tools()
```

## Tutorials

### Tutorial 1: Understanding ToolBench Scoring

Get oriented with ToolBench methodology and understand how your tools are scored.

**Steps:**
1. Start with the guide:
   `toolbench_guide(operation="get_help")`

2. Compare scoring systems:
   `toolbench_guide(operation="glama_vs_toolbench")`

3. List official resources:
   `toolbench_guide(operation="list_official_links")`

4. Check server capabilities:
   `capabilities()`

**Expected outcome:** Clear understanding of ToolBench scoring dimensions and how Glama differs.

### Tutorial 2: Running a Discovery Scan

Discover ToolBench assessment pages for a specific search query.

**Steps:**
1. Verify Playwright availability:
   `status()`

2. Run discovery on a search URL:
   `discover(search_url="https://toolbench.arcade.dev/search?q=your-server", max_pages=5, delay_seconds=3.0)`

3. Check discovery results:
   `tree()`

4. Read discovered URLs:
   `read_file(path="discovery_results.txt")`

**Expected outcome:** List of discovered assessment URLs saved to the output directory.

### Tutorial 3: Scraping Assessment Pages

Scrape individual ToolBench assessment pages for detailed analysis.

**Steps:**
1. Prepare a list of assessment URLs:
   `scrape_urls(urls_text="https://toolbench.arcade.dev/assess/server1\nhttps://toolbench.arcade.dev/assess/server2", save_html=true, delay_seconds=4.0)`

2. Monitor progress:
   `status()`

3. View scraped results:
   `tree(path="default")`

4. Read scraped content:
   `read_file(path="default/assessment1.md")`

**Expected outcome:** Structured assessment data saved for offline analysis.

### Tutorial 4: Full Pipeline Execution

Run the complete discover-and-scrape pipeline in one command.

**Steps:**
1. Execute the full pipeline:
   `full_run(search_url="https://toolbench.arcade.dev/search?q=mcp", max_pages=10, save_html=true)`

2. Review output structure:
   `tree()`

3. Read individual results:
   `read_file(path="default/assessment_001.md")`

4. Clear output for fresh run:
   `clear_output(force=true)`

**Expected outcome:** Complete scrape run with both discovery and assessment data.

### Tutorial 5: Monitoring Server Activity

Use the activity log system to track server operations.

**Steps:**
1. View recent activity:
   `logs_query(limit=20)`

2. Filter by error level:
   `logs_query(level="ERROR")`

3. Search for specific operations:
   `logs_query(search="scrape", kind="tool")`

4. Get log statistics:
   `logs_stats()`

5. Export logs for analysis:
   `logs_export(format="json")`

6. Clear logs when done:
   `logs_clear()`

**Expected outcome:** Complete visibility into server operations and activity history.

### Tutorial 6: Comparing Glama and ToolBench Scores

Understand the differences between Glama AI and Arcade ToolBench scoring systems.

**Steps:**
1. Get the comparison:
   `toolbench_guide(operation="glama_vs_toolbench")`

2. Review scoring dimensions documentation:
   `toolbench_guide(operation="get_help")`

3. Check official links for both platforms:
   `toolbench_guide(operation="list_official_links")`

4. Learn about Arcade MCP product:
   `toolbench_guide(operation="arcade_mcp_product")`

**Expected outcome:** Clear understanding of both scoring ecosystems and how to improve on each.

### Tutorial 7: Rescoring Workflow

Follow the correct workflow after improving your tool descriptions.

**Steps:**
1. Get rescoring instructions:
   `toolbench_guide(operation="rescoring_after_improvements")`

2. Review current assessment data:
   `read_file(path="previous_assessment.md")`

3. Document improvements based on ToolBench criteria:
   Follow the improvement steps documented in the rescoring guide

4. Submit for rescoring:
   Use the submission URL from the guide

**Expected outcome:** Properly submitted rescoring request with documented improvements.

### Tutorial 8: Local LLM Integration Check

Verify connectivity to local LLM providers for potential automation.

**Steps:**
1. Check LLM availability:
   `local_llm_status()`

2. If Ollama is detected, review available models from the response
3. Check capabilities for LLM integration features:
   `capabilities()`

**Expected outcome:** Confirmed connectivity to local LLM infrastructure.

### Tutorial 9: Organizing Scrape Outputs

Manage multiple scrape runs and organize results.

**Steps:**
1. Run discovery with named output directory:
   `discover(search_url="https://toolbench.arcade.dev/search?q=mcp-server", out_subdir="server1_analysis", max_pages=5)`

2. Run another discovery in a different directory:
   `discover(search_url="https://toolbench.arcade.dev/search?q=another", out_subdir="server2_analysis", max_pages=3)`

3. View organized results:
   `tree()`

4. Read from specific directory:
   `read_file(path="server1_analysis/pages.json")`

**Expected outcome:** Well-organized scrape output directories for different analysis targets.

### Tutorial 10: Automated Quality Checks

Set up a workflow for periodic quality assessment of your MCP tools.

**Steps:**
1. Check current capabilities:
   `capabilities()`

2. Run a test scrape on your own assessment:
   `scrape_urls(urls_text="https://toolbench.arcade.dev/assess/my-server", save_html=true)`

3. Review the scraped assessment against Glama criteria:
   `toolbench_guide(operation="glama_vs_toolbench")`

4. Apply improvements based on the comparison
5. Export activity log for record:
   `logs_export(format="csv")`

**Expected outcome:** Systematic approach to maintaining high tool quality scores.

## API Reference

### REST Endpoints

The toolbench-mcp server exposes the following HTTP API:

- GET /: Root endpoint with server info and API links
- GET /health: Health check with service status
- GET /api/capabilities: Fleet SOTA capability introspection
- GET /api/meta/tools: List available meta tools
- GET /api/meta/help: Get help documentation
- GET /api/scraper/status: Scraper availability and status
- POST /api/scraper/discover: Run discovery scan
- POST /api/scraper/scrape: Scrape assessment URLs
- POST /api/scraper/full-run: Full discover-and-scrape pipeline
- GET /api/scraper/tree: List output directory tree
- GET /api/scraper/read: Read output file
- POST /api/scraper/clear: Clear output directory
- GET /api/logs: Query activity logs
- GET /api/logs/stats: Log statistics
- GET /api/logs/export: Export log entries
- DELETE /api/logs: Clear activity logs

### Tool API (MCP)

All tools are accessible via MCP protocol through either stdio or HTTP transport at the /mcp path.

## Troubleshooting

### Scraper Issues

**Problem: Playwright not available**
Install the scraper extras: pip install toolbench-mcp[scraper], then run playwright install chromium

**Problem: Scraper timing out**
Increase delay_seconds and jitter_seconds parameters. Reduce max_pages for discovery.

**Problem: Assessment pages not found**
Verify the search URL is correct. ToolBench may have different URL patterns.

### File Management Issues

**Problem: Cannot read file**
Use tree() to verify the file path. The path must be relative to the output root.

**Problem: clear_output not working**
Set force=true to confirm. This prevents accidental data loss.

### Connection Issues

**Problem: Server not responding on HTTP**
Verify the port configuration. Default HTTP port is 10817, webapp is 10816.

**Problem: CORS errors from webapp**
The server is configured to allow the webapp origin. Verify webapp is on the expected port.

### Log Issues

**Problem: Logs show no entries**
The ring buffer starts empty. Perform some operations first.

**Problem: Too many log entries**
Use level and kind filters to narrow results. Use logs_clear() to reset.

## Advanced Scraper Configuration

For advanced users, the scraper behavior can be tuned through several configuration parameters. The delay_seconds parameter controls the base wait time between page interactions; longer delays reduce the risk of rate limiting but increase total run time. The jitter_seconds parameter adds randomness to the delay to appear more human-like, with the actual delay being delay_seconds plus a random value between 0 and jitter_seconds. The headed mode opens a visible browser window which is useful for debugging but requires a display server. The save_html option stores the full HTML of each scraped page alongside the extracted text, which is useful for detailed analysis but increases storage requirements.

The out_subdir parameter organizes scrape results into named subdirectories under the configured output root. This allows multiple scrape runs for different servers or topics to be stored separately. Subdirectory names must match the pattern [a-zA-Z0-9][a-zA-Z0-9._-]{0,62} for security. When out_subdir is not specified, results are stored in a "default" directory. Each scrape operation creates a new run directory with a timestamp-based name containing the operation results as markdown and text files.

## Using ToolBench Guide Effectively

The toolbench_guide tool is your primary reference for understanding ToolBench methodology and improving your tool scores. Start every session with get_help to get an overview of the scoring process and quality criteria. Use list_official_links to bookmark the official ToolBench resources for reference. When you've made improvements to your tool descriptions, follow the rescoring_after_improvements workflow step by step to ensure you submit correctly. Compare your current understanding against the glama_vs_toolbench documentation to understand which scoring system aligns with your current improvement goals.

## Log Management Best Practices

The activity log system helps you track server operations and diagnose issues. Query logs regularly during scrape operations to monitor progress and catch errors early. Use level filtering to focus on errors and warnings when troubleshooting. Use kind filtering to isolate scraper operations from system messages. Export logs before clearing to maintain an audit trail. The ring buffer stores the most recent 10,000 entries, so regular export is recommended for long-running operations.

For monitoring scrape progress, query logs with kind=scraper and search for "completed" or "failed" to track individual scrape outcomes. For diagnosing slow operations, search for time-related keywords. For understanding the full sequence of a complex multi-step operation, sort logs in ascending order.

## Workflow Planning

Before running scrapes, plan your workflow based on your assessment goals. For a quick overview of a server's ToolBench presence, use discover with a focused search query and low max_pages. For detailed analysis of known assessment pages, use scrape_urls with the specific URLs. For comprehensive evaluation of all assessments for a topic, use full_run to chain discovery and scraping in one operation. After scraping, review results with tree and read_file to identify areas for improvement.

For batch operations across multiple servers or topics, run separate full_run or discover operations with different out_subdir values to keep results organized. Use the delay and jitter parameters appropriately: for production ToolBench servers, use conservative delays (3-5 seconds) with moderate jitter (1-3 seconds). For testing against development instances, faster delays are acceptable.

## Rescoring Workflow Details

When you receive a ToolBench assessment and want to improve your score, follow these detailed steps. First, review the assessment results by scraping your assessment page with scrape_urls and reading the detailed criteria breakdown. Identify which quality signals scored lowest based on the ToolBench methodology. Make targeted improvements to your tool descriptions focusing on the specific criteria that were flagged. Common areas for improvement include adding complete docstrings with parameter descriptions, implementing structured error handling with recovery options, adding pagination to list/search tools, applying proper parameter constraints with Literal types and numeric bounds, and ensuring all tools return consistent structured responses.

After making improvements, document each change and its rationale for the rescoring submission. Run toolbench_guide with the rescoring_after_improvements operation to get the latest submission instructions. Submit your improved tool descriptions through the ToolBench submission portal. Monitor the submission status by periodically checking the assessment page.

## Tutorial: Performance Optimization

For optimal server performance, follow these guidelines. Keep the activity log size manageable by regularly exporting and clearing logs. Use appropriate delay settings for scraper operations to balance speed against rate-limit compliance. Organize scrape outputs into subdirectories to avoid filesystem performance issues with very large directories. Use the tree tool to quickly navigate output structures rather than traversing the filesystem manually. For long-running scrape sessions, check server status periodically to ensure the scraper has not stalled. Use headless mode for production operations to conserve system resources. Configure appropriate max_pages limits to prevent excessively long runs.

## Tutorial 11: Assessment Comparison

Compare assessments across multiple servers to identify best practices and improvement opportunities. Steps: scrape assessments for multiple servers using separate out_subdir values. Use read_file to examine each assessment's detailed criteria scores. Identify which servers score highest on each criterion. Compare docstring quality, error handling, pagination implementation, and parameter constraints across servers. Compile a comparison report documenting patterns and opportunities. Use the glama_vs_toolbench guide to understand how different scoring systems evaluate the same tool patterns differently.

## Tutorial 12: Automated Audit Workflow

Set up a periodic audit process for your fleet of MCP servers. Steps: create a list of server assessment URLs from ToolBench. Schedule regular scrape operations to capture updated assessments. Compare new results against previous baselines using the saved output files. Track scoring trends over time to identify improvements and regressions. Use the toolbench_guide rescoring workflow to submit improvements when scores don't reflect current capabilities. Export and archive each audit run's log entries for compliance and historical tracking.

## Tutorial 13: Output Analysis and Reporting

Analyze scraped assessment data to generate improvement reports for your MCP servers.

**Steps:**
1. Run full assessment pipeline on your server: full_run(search_url="https://toolbench.arcade.dev/search?q=your-server", out_subdir="my_server_audit", max_pages=3)
2. Review the assessment criteria breakdown: read_file(path="my_server_audit/assessment_001.md")
3. Identify low-scoring dimensions and note specific improvement areas
4. Run comparison across multiple servers: full_run(search_url="https://toolbench.arcade.dev/search?q=comparable-server", out_subdir="comparison")
5. Compare scoring patterns using read_file to identify best practices
6. Create an improvement plan based on the assessment findings
7. Apply improvements to your tool descriptions and follow the rescoring workflow

## Log-Based Diagnostics

Use the activity log system to diagnose scraper and server issues effectively. When a scraper operation fails, query logs with kind=scraper and level=ERROR to find the exact failure message. Search for specific job identifiers to trace the full lifecycle of an operation. Use ascending sort order to view operations in chronological sequence. Export relevant log sections for sharing with team members or including in bug reports. Regular log review helps identify patterns like recurring timeouts or specific URLs that consistently fail.

## Directory Organization Best Practices

Maintain organized output directories for efficient workflow management. Use descriptive out_subdir names that identify the analysis purpose, such as the server name or topic being assessed. Keep related scrape runs in the same subdirectory with timestamp-based organization. Use the tree tool to quickly navigate between different analysis directories. Periodically clean up old or obsolete output directories using clear_output to free disk space. Archive important assessment data externally before clearing.

## API Integration Patterns

The REST API can be integrated into automated workflows and CI/CD pipelines. For scheduled assessment checks, use curl or HTTP client libraries to call the health endpoint for server availability, then trigger scrape operations via the scraper API. For integration with monitoring systems, expose the health endpoint as a monitoring check. For integration with reporting tools, export log data via the logs_export endpoint in JSON or CSV format. For webhook-based notifications, poll the status endpoint after submitting scrape operations to detect completion.

## Manual Assessment Inspection

For detailed manual inspection of scraped assessment data, use the file management tools in sequence. Start by identifying the target assessment directory with tree(). Navigate to the specific assessment file with read_file(path="server_name/assessment_001.md"). Review the criteria breakdown and scores for each evaluated dimension. Compare assessments across different scrape runs by reading files from different directories. Use the saved HTML files for visual inspection of the original assessment page layout and formatting.

## Multi-Session Workflow Management

For complex analysis projects spanning multiple days, use a structured session approach. Start each session with a status check to verify server availability. Review previous scrape results before starting new operations. Use separate out_subdir values for each analysis day or topic update. Export logs at the end of each session for record-keeping. Archive completed analysis directories periodically to maintain output directory performance.

## Tutorial 14: Fleet-Wide Assessment Management

Manage ToolBench assessments across multiple servers in your fleet systematically.

**Steps:**
1. Create a list of all your MCP servers to assess
2. For each server, run: discover(search_url="https://toolbench.arcade.dev/search?q=server-name", out_subdir="fleet_assessment/server_name")
3. Review all discovery results: read_file(path="fleet_assessment/server_name/pages.json")
4. For each server with existing assessments, scrape them: full_run(search_url="https://toolbench.arcade.dev/search?q=server-name", out_subdir="fleet_assessment/server_name")
5. Compile a fleet-wide assessment report by reviewing each server's output
6. Prioritize improvements based on lowest-scoring criteria across the fleet
7. Track improvement progress over time with periodic re-assessment

## Webapp Dashboard Guide

The toolbench-mcp webapp provides a browser interface for the scraper and log viewer. The webapp runs on port 10816 by default and can be accessed at http://127.0.0.1:10816. The dashboard shows server status, recent activity logs, scraper controls, and output file browser. Use the webapp for visual monitoring of long-running scrape operations. The webapp communicates with the backend API on port 10817.

## Output Directory Structure Reference

The output directory follows a consistent hierarchy. The root is configured by TOOLBENCH_SCRAPER_OUTPUT_ROOT or defaults to scrape_out/. Within the root, out_subdir folders organize results by analysis topic. Each scrape run creates a folder named with the operation type and timestamp. Assessment files are named assessment_NNN.md starting from 001 for each run. Discovery results are named discover_results_TIMESTAMP.txt. Metadata files named run_METADATA.json contain the full operation configuration for reproducibility.

## Tutorial 15: Rescoring Verification Workflow

After submitting improved tool descriptions for rescoring, verify the updated assessment results.

**Steps:**
1. Wait for the rescoring to be processed by ToolBench (typically 24-48 hours)
2. Check for updated assessment pages using discover
3. Scrape the updated assessment: scrape_urls(urls_text="https://toolbench.arcade.dev/assess/your-server")
4. Compare new scores against previous baselines using the saved output files
5. If scores improved, document what changes contributed to the improvement
6. If scores did not improve, review which criteria still need attention
7. Repeat the improvement cycle for remaining low-scoring dimensions

## Tutorial 16: Assessment Report Generation

Generate structured reports from scraped assessment data for team review.

**Steps:**
1. Run full assessment on your server: full_run(search_url="https://toolbench.arcade.dev/search?q=your-server", out_subdir="assessment_report")
2. Read the assessment results: read_file(path="assessment_report/assessment_001.md")
3. Extract key scores and criteria ratings from the output
4. Run comparison assessments on competitor or benchmark servers
5. Create a side-by-side comparison document
6. Identify your server's strengths and weaknesses relative to peers
7. Develop an improvement plan targeting the largest gaps

## Tool Selection Guide

Choose the right tool for your task based on this guide. For server health verification, use health or status. For capability discovery, use capabilities or tools. For activity monitoring, use logs_query, logs_stats, logs_export, or logs_clear. For ToolBench methodology guidance, use toolbench_guide with the appropriate operation. For assessment discovery, use discover. For assessment scraping, use scrape_urls. For combined discovery and scraping, use full_run. For output browsing, use tree or read_file. For output cleanup, use clear_output. For LLM provider checking, use local_llm_status.

## Activity Log Monitoring Strategy

Establish a log monitoring strategy for operational awareness. Check logs at the start of each work session to review recent activity. Filter by level=ERROR to identify any failed operations since the last check. Monitor scraper-specific logs when running assessment collections. Export logs before clearing to maintain an audit trail. Use log patterns to identify recurring issues like consistent timeout patterns or specific URLs that frequently fail. Share relevant log exports with team members when collaborating on assessment analysis.

## Performance Benchmarking Scrapers

Benchmark scraper performance to find optimal settings for your environment. Test with a known set of URLs and measure completion time with different delay settings. Find the minimum delay that avoids rate limiting for reliable operation. Compare headless vs headed mode performance. Benchmark different max_pages values to understand time requirements for various result set sizes. Log benchmark results for reference when planning production scrape operations.

## Tutorial 17: Cross-Server Score Comparison

Compare ToolBench scores across multiple MCP servers in your fleet to identify fleet-wide improvement opportunities.

**Steps:**
1. Run assessment pipelines for each server in your fleet
2. Collect the overall scores and per-criteria breakdowns
3. Create a comparison table showing scores per criteria per server
4. Identify criteria where multiple servers score low (fleet-wide issues)
5. Identify best practices by examining high-scoring servers' patterns
6. Create a fleet-wide improvement plan targeting common weaknesses
7. Track fleet score improvements over time

## Output File Security

Output files from scraper operations contain assessment data that may include server names and tool descriptions. Consider the sensitivity of this information when sharing output files with third parties. The output directory should be access-controlled on multi-user systems. Clear output directories containing sensitive assessments after analysis is complete. Use log exports for audit trails without exposing assessment content.

## Best Practices Guide

Follow these best practices for effective ToolBench assessment management. Run baseline assessments before making changes to your tools. Document all improvements with timestamps and specific references to ToolBench criteria. Keep multiple assessment snapshots to track score history over time. Share assessment results with your team for collaborative improvement planning. Use consistent out_subdir naming across your team for shared analysis projects. Export logs regularly for compliance and audit purposes. Clear the output directory between major assessment cycles to avoid confusion with stale data.

## Integration with External Tools

The server's output files and API can be integrated with external tools. Assessment markdown files can be loaded into documentation systems. Log exports in CSV format can be loaded into spreadsheet tools for analysis. The HTTP API can be called from monitoring systems, CI/CD pipelines, and custom dashboards. Tool metadata from the tools endpoint can feed into server catalogs and registries. The guide tool's documentation content can be embedded into team wikis and knowledge bases.

## Data Export and Integration

Export scraped assessment data for integration with other tools and workflows. Use the logs_export tool to export operation logs in JSON or CSV format. Read assessment files directly from the output directory for programmatic access. Use the toolbench_guide tool's documentation content for reference in external tools. The HTTP API enables integration with CI/CD pipelines, monitoring systems, and custom dashboards. All tool outputs are structured JSON for easy programmatic consumption.

## Headless Mode Configuration

For server environments without a display, configure the scraper to run in headless mode by setting headed=false on scraper operations. Headless mode does not open a visible browser window and is suitable for automated and CI/CD workflows. Headless mode may behave differently from headed mode on some websites; test with headed mode first if encountering issues. Headless mode uses fewer system resources than headed mode. All scraper parameters work identically in both modes.

## Workflow Planning Template

When planning a ToolBench assessment workflow, follow this template. Discovery phase: determine the search query, set max_pages based on expected result volume, choose out_subdir for organization, configure delay parameters for rate-limit compliance. Scraping phase: prepare URL list or use discovered URLs, set save_html for detailed analysis, configure delay parameters. Analysis phase: review results with tree and read_file, compare scores across criteria, identify improvement areas. Improvement phase: apply fixes to tool descriptions, document changes, follow rescoring workflow.

## Quick Reference: Common Parameter Patterns

The scraper tools share common parameter patterns. search_url must be a valid ToolBench search URL with at least 12 characters. out_subdir must match the pattern [a-zA-Z0-9][a-zA-Z0-9._-]{0,62}. max_pages ranges from 1 to 100 with a default of 15. delay_seconds ranges from 0.5 to 120 with a default of 3.0. jitter_seconds ranges from 0 to 60. save_html adds HTML file output when true. headed enables visible browser mode for debugging.

## Learning from High-Scoring Servers

Study assessment pages of high-scoring MCP servers to identify best practices. Scrape assessments of top-rated servers in your category. Compare their tool documentation patterns against your own. Note how they document parameters, handle errors, implement pagination, and structure return formats. Apply similar patterns to your own tool descriptions while maintaining your server's unique functionality. The glama_vs_toolbench guide provides insight into what each scoring system prioritizes.

## Assessment Scoring Dimensions

ToolBench evaluates tools across multiple quality dimensions. Definition quality assesses the completeness and clarity of tool descriptions and documentation. Protocol compliance checks that tools follow MCP protocol standards correctly. Error handling evaluates how tools report and recover from failures. Pagination assesses how tools handle large result sets with proper continuation. Parameter constraints verify tools use appropriate types, Literal enums, and validation. Naming conventions ensure consistent and discoverable tool names. Output schema documentation provides machine-readable result formatting. Each dimension contributes to the overall assessment score.

## Log Export and Analysis

Export log data for external analysis using the logs_export tool. The JSON format preserves all log fields for programmatic processing. The CSV format is suitable for spreadsheet analysis and reporting. Filter by level, kind, or search term before exporting to reduce data volume. Use log analysis to identify patterns like recurring errors, slow operations, or usage trends. Export logs before clearing to maintain an audit trail for compliance purposes.

## Custom Scraper Script Integration

Advanced users can provide custom scraper scripts via the TOOLBENCH_SCRAPER_SCRIPT environment variable. Custom scripts must accept the same command-line arguments as the default scraper and produce output in the same format. The default scraper is located at scripts/scrape_toolbench_assessments.py in the repo root. Custom scripts enable specialized scraping logic, different output formats, or integration with alternative assessment platforms.

## Collaborative Workflow

For team-based assessment analysis, establish a shared workflow. Designate a shared output directory accessible to all team members. Use consistent out_subdir naming conventions for team-wide analysis topics. Document assessment findings in the output markdown files for shared reference. Use the guide tool to share methodology references with the team. Export and share log data for collaborative troubleshooting. The webapp provides a browser-based interface for team members who prefer visual tools over CLI interaction.

## Extended Tool Documentation

The toolbench_guide tool's get_help operation provides a comprehensive reference covering all major ToolBench concepts. The methodology section explains how assessments are conducted by human evaluators following defined rubrics. The quality signals section details each evaluated dimension including docstring completeness, parameter documentation, return value specifications, error handling, pagination, and output schema. The scoring section explains how individual criterion scores are combined into overall ratings. The improvement section provides specific guidance for raising scores in each dimension.

## Common Scraper Issues and Solutions

Issue: Playwright browser fails to start. Solution: Verify playwright is installed with pip install playwright && playwright install chromium. Check that system PATH includes the Playwright browser directory. For headless mode on servers without a display, ensure DISPLAY environment variable is set appropriately.

Issue: Discovery finds no URLs. Solution: Verify the search URL is correct and accessible from your network. Some ToolBench search pages may require specific query parameters. Try browsing to the URL manually in a regular browser to confirm it works.

Issue: Scrape produces empty results. Solution: The assessment page may have a different structure than expected. Try using save_html=true to capture the raw page for analysis. Check that the assessment page is publicly accessible without authentication.

Issue: Server returns 400 errors for output paths. Solution: Verify that out_subdir names match the required pattern: alphanumeric characters, dots, underscores, and hyphens only, starting with a letter or digit.

## Configuration Reference

TOOLBENCH_PORT (default 10817): the HTTP port for the MCP and REST API server. TOOLBENCH_HOST (default 127.0.0.1): the bind address for the server. TOOLBENCH_WEBAPP_PORT (default 10816): the port for the frontend web application. TOOLBENCH_SCRAPER_SCRIPT: custom path to a scraper Python script, useful for overriding the bundled scraper with a custom implementation. TOOLBENCH_SCRAPER_OUTPUT_ROOT: filesystem path for storing scrape output files, defaults to scrape_out/ in the repo root. TOOLBENCH_MCP_HTTP_PATH: URL path for mounting the MCP HTTP endpoint, defaults to /mcp. All configuration is read from environment variables at startup.

## FAQ

**Q: Does this server call ToolBench APIs?**
A: No. The server does not call ToolBench APIs. It uses Playwright to scrape public assessment pages and provides methodology documentation.

**Q: What is the rescoring_after_improvements workflow?**
A: After fixing tool descriptions, the recommended workflow is: document changes, re-run assessment via ToolBench, then follow the submission process documented in the guide.

**Q: How does Glama scoring differ from ToolBench?**
A: Glama grades purely on docstring quality across 6 dimensions with grade thresholds. ToolBench covers broader criteria including definition quality, protocol, and supportability.

**Q: Can I use this with CI/CD pipelines?**
A: Yes. The HTTP API supports programmatic access. Use the scraper endpoints in non-headed mode for CI environments.

**Q: How are scrape results stored?**
A: Results are saved as markdown and text files in the configured output directory, organized by run ID and subdirectory.

**Q: Is there rate limiting built in?**
A: Yes. The scraper uses configurable delays and jitter to respect ToolBench's rate limits. Default settings are conservative.

**Q: What's the Arcade MCP product mentioned in docs?**
A: Arcade.dev provides an MCP runtime/integrations platform. It's separate from ToolBench scoring. The toolbench_guide tool provides documentation about it.

**Q: Can I run without Playwright?**
A: Yes. All tools except the scraper operations (discover, scrape_urls, full_run) work without Playwright.

**Q: How do I improve my ToolBench score?**
A: Focus on the quality signals documented in toolbench_guide: complete docstrings, structured error handling, pagination, and parameter constraints.

**Q: Is there a web interface?**
A: Yes. The webapp runs on port 10816 and provides a UI for the scraper and log viewer.
