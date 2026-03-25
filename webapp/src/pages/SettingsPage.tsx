import { useEffect, useState } from "react";
import { useLogger } from "../context/LoggerContext";
import { useTheme } from "../context/ThemeContext";

export function SettingsPage() {
  const { theme, setTheme, toggle } = useTheme();
  const { append } = useLogger();
  const [llm, setLlm] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch("/api/meta/local-llm")
      .then((r) => r.json())
      .then((j) => {
        setLlm(j);
        append("INFO", "Local LLM probe (Ollama / LM Studio ports)");
      })
      .catch((e) => append("ERROR", String(e)));
  }, [append]);

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", marginTop: 0 }}>Configuration</h1>

      <div className="glass-panel" style={{ padding: "1rem", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "1rem", marginTop: 0 }}>Theme</h2>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
          Dark mode default (WEBAPP_STANDARDS §1.2). Stored in <code>localStorage</code>.
        </p>
        <label style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
          <span>Mode:</span>
          <select
            className="input"
            style={{ maxWidth: 200 }}
            value={theme}
            onChange={(e) => setTheme(e.target.value as "dark" | "light")}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
          <button type="button" className="btn btn-secondary" onClick={toggle}>
            Toggle
          </button>
        </label>
      </div>

      <div className="glass-panel" style={{ padding: "1rem" }}>
        <h2 style={{ fontSize: "1rem", marginTop: 0 }}>Local LLM — Glom On</h2>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
          Probes <code>127.0.0.1:11434</code> (Ollama) and <code>127.0.0.1:1234</code> (LM Studio) —
          WEBAPP_STANDARDS §3.
        </p>
        <pre style={{ fontSize: "0.78rem", overflow: "auto" }}>
          {llm ? JSON.stringify(llm, null, 2) : "…"}
        </pre>
      </div>
    </div>
  );
}
