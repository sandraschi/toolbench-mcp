import { useEffect, useRef, useState } from "react";
import { useLogger } from "../context/LoggerContext";

export function LoggerPanel() {
  const { lines, clear } = useLogger();
  const [collapsed, setCollapsed] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const userPausedRef = useRef(false);

  useEffect(() => {
    if (userPausedRef.current) return;
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  function onScroll() {
    const el = bodyRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
    userPausedRef.current = !nearBottom;
  }

  return (
    <div className={`logger-panel ${collapsed ? "collapsed" : ""}`}>
      <div
        className="logger-header"
        onClick={() => setCollapsed((c) => !c)}
        onKeyDown={(e) => e.key === "Enter" && setCollapsed((c) => !c)}
        role="button"
        tabIndex={0}
      >
        <span>Logger</span>
        <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ fontSize: "0.7rem", padding: "0.15rem 0.45rem" }}
            onClick={(e) => {
              e.stopPropagation();
              clear();
            }}
          >
            Clear
          </button>
          <span>{collapsed ? "▲" : "▼"}</span>
        </span>
      </div>
      {!collapsed && (
        <div
          className="logger-body"
          ref={bodyRef}
          onScroll={onScroll}
          role="log"
        >
          {lines.length === 0 && (
            <div className="log-line" data-level="DEBUG">
              [ready] timestamped events (scraper, MCP, probes) appear here
            </div>
          )}
          {lines.map((l, i) => (
            <div key={i} className="log-line" data-level={l.level}>
              {l.ts} [{l.level}] {l.message}
            </div>
          ))}
          <div ref={endRef} />
        </div>
      )}
    </div>
  );
}
