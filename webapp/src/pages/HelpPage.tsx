export function HelpPage() {
  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", marginTop: 0 }}>Documentation</h1>
      <div className="glass-panel" style={{ padding: "1.25rem", lineHeight: 1.65 }}>
        <h2 style={{ fontSize: "1.05rem", marginTop: 0 }}>toolbench-mcp</h2>
        <p>
          Companion server for <strong>ToolBench</strong> (Arcade’s MCP server grading site — see repo README).
          Playwright scraper: <code>scripts/scrape_toolbench_assessments.py</code> in this repository.
        </p>
        <h3>Standards</h3>
        <ul>
          <li>
            <a href="https://github.com/sandraschi/mcp-central-docs/blob/master/standards/WEBAPP_STANDARDS.md" target="_blank" rel="noreferrer">
              WEBAPP_STANDARDS.md
            </a>{" "}
            — Iron Shell, Apps/Tools/Help/Settings, Glom On, SOTA Chat (fleet reference)
          </li>
          <li>
            <a href="https://github.com/sandraschi/toolbench-mcp/blob/main/README.md" target="_blank" rel="noreferrer">
              toolbench-mcp README
            </a>{" "}
            — what ToolBench is, scraper, transports
          </li>
        </ul>
        <h3>Install Playwright (scraper)</h3>
        <pre
          style={{
            padding: "0.75rem",
            background: "hsl(220 18% 7%)",
            borderRadius: 8,
            fontSize: "0.82rem",
            overflow: "auto",
          }}
        >
          pip install -e &quot;.[scraper]&quot;
          {"\n"}
          python -m playwright install chromium
        </pre>
      </div>
    </div>
  );
}
