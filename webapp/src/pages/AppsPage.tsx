import { useEffect, useState } from "react";
import { useLogger } from "../context/LoggerContext";

type Glama = {
  name?: string;
  version?: string;
  description?: string;
  repository?: { url?: string };
  mcp?: { url?: string; transport?: string };
  fleet?: { ports?: Record<string, number>; docs?: string };
};

export function AppsPage() {
  const [data, setData] = useState<Glama | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const { append } = useLogger();

  useEffect(() => {
    fetch("/glama.json")
      .then((r) => r.json())
      .then((j) => {
        setData(j as Glama);
        append("INFO", "Loaded glama.json (fleet discovery)");
      })
      .catch((e) => {
        setErr(String(e));
        append("ERROR", `glama.json: ${String(e)}`);
      });
  }, [append]);

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", marginTop: 0 }}>Fleet Discovery</h1>
      <p style={{ color: "var(--muted)" }}>
        Glama-style manifest at <code>/glama.json</code> (WEBAPP_STANDARDS §1.3 / §2 Apps).
      </p>
      {err && <p style={{ color: "hsl(0 70% 55%)" }}>{err}</p>}
      {data && (
        <div className="glass-panel" style={{ padding: "1rem" }}>
          <h2 style={{ marginTop: 0 }}>{data.name}</h2>
          <p>{data.description}</p>
          <ul style={{ lineHeight: 1.8 }}>
            <li>
              Version: <code>{data.version}</code>
            </li>
            <li>
              Repo:{" "}
              {data.repository?.url ? (
                <a href={data.repository.url} target="_blank" rel="noreferrer">
                  {data.repository.url}
                </a>
              ) : (
                "—"
              )}
            </li>
            <li>
              MCP: <code>{data.mcp?.transport}</code> →{" "}
              <code>{data.mcp?.url}</code>
            </li>
            <li>
              Fleet docs:{" "}
              {data.fleet?.docs ? (
                <a href={data.fleet.docs} target="_blank" rel="noreferrer">
                  mcp-central-docs/toolbench
                </a>
              ) : (
                "—"
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
