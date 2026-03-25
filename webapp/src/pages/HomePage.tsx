import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLogger } from "../context/LoggerContext";

const LINKS: { label: string; href: string }[] = [
  { label: "ToolBench", href: "https://toolbench.arcade.dev/" },
  { label: "Methodology", href: "https://toolbench.arcade.dev/methodology" },
  { label: "Improve", href: "https://toolbench.arcade.dev/improve" },
  { label: "Submit / rescoring", href: "https://toolbench.arcade.dev/submit" },
  { label: "toolbench-mcp (source)", href: "https://github.com/sandraschi/toolbench-mcp" },
];

export function HomePage() {
  const [health, setHealth] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const { append } = useLogger();

  useEffect(() => {
    fetch("/health")
      .then((r) => r.json())
      .then((j) => {
        setHealth(j as Record<string, unknown>);
        append("INFO", "Health check OK");
      })
      .catch((e) => {
        append("ERROR", `Health failed: ${String(e)}`);
        setHealth(null);
      })
      .finally(() => setLoading(false));
  }, [append]);

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", marginTop: 0 }}>Dashboard</h1>
      <p style={{ color: "var(--muted)", lineHeight: 1.55 }}>
        ToolBench workflow companion — SOTA Iron Shell (WEBAPP_STANDARDS §1). Use{" "}
        <strong>Tools</strong> for MCP inspector + Playwright scraper, <strong>Apps</strong> for{" "}
        <code>glama.json</code> discovery.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div className="glass-panel" style={{ padding: "1rem" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Backend</div>
          {loading ? (
            <div className="skeleton" style={{ height: 48, marginTop: 8 }} />
          ) : (
            <div style={{ fontSize: "0.85rem", marginTop: 8 }}>
              {health?.ok ? (
                <span className="status-pill">online</span>
              ) : (
                <span className="status-pill warn">offline</span>
              )}
            </div>
          )}
        </div>
        <div className="glass-panel" style={{ padding: "1rem" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>MCP HTTP</div>
          <div style={{ fontSize: "0.8rem", marginTop: 8, wordBreak: "break-all" }}>
            {(health?.mcp_http as string) ?? "—"}
          </div>
        </div>
        <div className="glass-panel" style={{ padding: "1rem" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Quick</div>
          <Link to="/tools" style={{ display: "block", marginTop: 8 }}>
            Open Tools →
          </Link>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: "1rem" }}>
        <h2 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" }}>
          /health JSON
        </h2>
        <pre style={{ fontSize: "0.75rem", overflow: "auto", maxHeight: 200 }}>
          {loading ? "…" : JSON.stringify(health, null, 2)}
        </pre>
      </div>

      <h2 style={{ fontSize: "1.05rem", marginTop: "1.5rem" }}>ToolBench links</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {LINKS.map(({ label, href }) => (
          <li key={href} style={{ marginBottom: "0.5rem" }}>
            <a href={href} target="_blank" rel="noreferrer">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
