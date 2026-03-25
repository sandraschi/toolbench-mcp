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
        <h3>Scraper and Arcade policies</h3>
        <p>
          Use the scraper only for <strong>your own</strong> public assessment pages (e.g. archive feedback to improve your MCP server). Read Arcade’s terms (
          <a href="https://www.arcade.dev/terms-of-service" target="_blank" rel="noreferrer">
            Terms of Service
          </a>
          ,{" "}
          <a href="https://www.arcade.dev/privacy-policy" target="_blank" rel="noreferrer">
            Privacy
          </a>
          ). Prefer <code>scrape</code> with explicit URLs over broad <code>discover</code> if you want a minimal scope — details in the{" "}
          <a href="https://github.com/sandraschi/toolbench-mcp/blob/main/README.md#scraping-terms-of-service-and-intended-use" target="_blank" rel="noreferrer">
            README
          </a>
          .
        </p>
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
