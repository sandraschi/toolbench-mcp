export function HelpPage() {
  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", marginTop: 0 }}>Documentation</h1>
      <div className="glass-panel" style={{ padding: "1.25rem", lineHeight: 1.65 }}>
        <h2 style={{ fontSize: "1.05rem", marginTop: 0 }}>toolbench-mcp</h2>
        <p>
          Companion server for <strong>ToolBench</strong> (Arcade): links, rescoring workflow, optional
          Playwright UI for the fleet script under{" "}
          <code>mcp-central-docs/toolbench/scripts</code>.
        </p>
        <h3>Fleet standards</h3>
        <ul>
          <li>
            <a href="https://github.com/sandraschi/mcp-central-docs/blob/master/standards/WEBAPP_STANDARDS.md" target="_blank" rel="noreferrer">
              WEBAPP_STANDARDS.md
            </a>{" "}
            — Iron Shell, Apps/Tools/Help/Settings, Glom On, SOTA Chat
          </li>
          <li>
            <a href="https://github.com/sandraschi/mcp-central-docs/blob/master/toolbench/README.md" target="_blank" rel="noreferrer">
              toolbench/README.md
            </a>
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
