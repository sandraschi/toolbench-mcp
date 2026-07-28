import { useEffect, useState } from "react";
import { useLogger } from "../context/LoggerContext";

const PERSONAS = [
  { id: "reductionist", label: "Reductionist (Sandra)", hint: "Industrial, exhaustive" },
  { id: "debugger", label: "Debugger", hint: "Traces, edge cases" },
  { id: "explainer", label: "Explainer", hint: "Architecture, concepts" },
] as const;

export function ChatFab() {
  const [open, setOpen] = useState(false);
  const [persona, setPersona] = useState<(typeof PERSONAS)[number]["id"]>("reductionist");
  const [draft, setDraft] = useState("");
  const { append } = useLogger();

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  function send() {
    const text = draft.trim();
    if (!text) return;
    append("INFO", `Chat [${persona}]: ${text}`);
    setDraft("");
    append(
      "SOTA-WARN",
      "SOTA chat: wire to your LLM or MCP client — UI shell only (WEBAPP_STANDARDS §4).",
    );
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          className="chat-fab"
          title="SOTA Chat (Ctrl+K / Cmd+K)"
          aria-label="Open chat"
          onClick={() => setOpen(true)}
        >
          💬
        </button>
      )}
      {open && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <strong>SOTA Chat</strong>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: "0.2rem 0.5rem" }}
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: 0 }}>
              Personas & prompt refinement (WEBAPP_STANDARDS §4.1). Connect your model in the host
              IDE; this panel logs to the Logger.
            </p>
            <div style={{ marginBottom: 8 }}>
              {PERSONAS.map((p) => (
                <label
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                    fontSize: "0.85rem",
                  }}
                >
                  <input
                    type="radio"
                    name="persona"
                    checked={persona === p.id}
                    onChange={() => setPersona(p.id)}
                  />
                  {p.label}{" "}
                  <span style={{ color: "var(--muted)", fontSize: "0.78rem" }}>({p.hint})</span>
                </label>
              ))}
            </div>
            <textarea
              className="textarea"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Message (logs only until LLM is wired)"
              rows={4}
            />
            <div style={{ marginTop: 8, display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={send}>
                Send (log)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
