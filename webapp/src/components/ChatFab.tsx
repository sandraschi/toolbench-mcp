import { useCallback, useEffect, useState } from "react";
import { useLogger } from "../context/LoggerContext";

const LS_HISTORY = "toolbench-chat-history";
const LS_PERSONALITY = "toolbench-chat-personality";

const PERSONAS = [
  { id: "reductionist", label: "Reductionist (Sandra)", hint: "Industrial, exhaustive" },
  { id: "debugger", label: "Debugger", hint: "Traces, edge cases" },
  { id: "explainer", label: "Explainer", hint: "Architecture, concepts" },
  { id: "custom", label: "Custom", hint: "User-defined" },
] as const;

const EXAMPLE_PROMPTS = [
  "Benchmark tool X",
  "Compare model Y and Z",
  "Run trace on tool A",
  "Show latest benchmark results",
  "What tools need review?",
];

export function ChatFab() {
  const [open, setOpen] = useState(false);
  const [persona, setPersona] = useState(() => localStorage.getItem(LS_PERSONALITY) || "reductionist");
  const [draft, setDraft] = useState("");
  const [history, setHistory] = useState<string[]>(() => {
    try { const s = localStorage.getItem(LS_HISTORY); if (s) return JSON.parse(s); } catch { return []; }
    return [];
  });
  const [backendOk, setBackendOk] = useState<boolean | null>(null);
  const { append } = useLogger();

  useEffect(() => { localStorage.setItem(LS_PERSONALITY, persona); }, [persona]);

  useEffect(() => {
    try { localStorage.setItem(LS_HISTORY, JSON.stringify(history)); } catch { /* ignore */ }
  }, [history]);

  useEffect(() => {
    fetch("/health").then(r => setBackendOk(r.ok)).catch(() => setBackendOk(false));
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const send = useCallback(() => {
    const text = draft.trim();
    if (!text) return;
    append("INFO", `Chat [${persona}]: ${text}`);
    setHistory((prev) => [...prev, `[${persona}] ${text}`]);
    setDraft("");
  }, [draft, persona, append]);

  const handleClear = useCallback(() => {
    setHistory([]);
    try { localStorage.removeItem(LS_HISTORY); } catch { /* ignore */ }
  }, []);

  const handleExport = useCallback(() => {
    const text = history.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `toolbench-chat-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click(); URL.revokeObjectURL(url);
  }, [history]);

  return (
    <>
      {!open && (
        <button
          data-testid="chat-fab-open"
          type="button"
          className="chat-fab"
          title="SOTA Chat (Ctrl+K / Cmd+K)"
          aria-label="Open chat"
          onClick={() => setOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </button>
      )}
      {open && (
        <div
          data-testid="chat-page"
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div className="flex items-center gap-2">
                <strong>SOTA Chat</strong>
                <span className="text-[10px] uppercase tracking-wider text-muted font-mono bg-muted px-1.5 py-0.5 rounded">skill:toolbench</span>
              </div>
              <div className="flex items-center gap-2">
                {backendOk === true && <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />}
                {backendOk === false && <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />}
                <button data-testid="chat-export" type="button" onClick={handleExport} disabled={history.length === 0} className="btn btn-secondary" style={{ padding: "0.2rem 0.3rem", fontSize: "0.75rem" }} title="Export">&#x2913;</button>
                <button data-testid="chat-clear" type="button" onClick={handleClear} disabled={history.length === 0} className="btn btn-secondary" style={{ padding: "0.2rem 0.3rem", fontSize: "0.75rem" }} title="Clear">&#x2421;</button>
                <button type="button" className="btn btn-secondary" style={{ padding: "0.2rem 0.5rem" }} onClick={() => setOpen(false)}>&#x2715;</button>
              </div>
            </div>

            <p style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: 0 }}>Personas & prompt refinement (WEBAPP_STANDARDS §4.1). Connect your model in the host IDE; this panel logs to the Logger.</p>

            <div data-testid="example-prompts" style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
              {EXAMPLE_PROMPTS.map((p) => (
                <button key={p} type="button" className="btn btn-secondary" style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem" }} onClick={() => setDraft(p)}>{p}</button>
              ))}
            </div>

            <div style={{ marginBottom: 8 }}>
              <select data-testid="personality-select" value={persona} onChange={(e) => setPersona(e.target.value)} className="select" style={{ fontSize: "0.82rem", width: "100%" }}>
                {PERSONAS.map((p) => <option key={p.id} value={p.id}>{p.label} ({p.hint})</option>)}
              </select>
            </div>

            {history.length > 0 && (
              <div style={{ maxHeight: 120, overflowY: "auto", marginBottom: 8, fontSize: "0.75rem", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: 4, padding: 4 }}>
                {history.map((h, i) => <div key={i} style={{ padding: "2px 0" }}>{h}</div>)}
              </div>
            )}

            <textarea data-testid="chat-input" className="textarea" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Message (logs only until LLM is wired)" rows={4} />
            <div style={{ marginTop: 8, display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>Close</button>
              <button data-testid="chat-send" type="button" className="btn btn-primary" onClick={send} disabled={!draft.trim()}>Send (log)</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
