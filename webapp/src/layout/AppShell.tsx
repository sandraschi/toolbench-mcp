import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ChatFab } from "../components/ChatFab";
import { LoggerPanel } from "../components/LoggerPanel";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/tools", label: "Tools" },
  { to: "/apps", label: "Apps" },
  { to: "/help", label: "Help" },
  { to: "/settings", label: "Settings" },
] as const;

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/tools": "MCP Inspector",
  "/apps": "Fleet Discovery",
  "/help": "Documentation",
  "/settings": "Configuration",
};

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const loc = useLocation();
  const title = titles[loc.pathname] ?? "toolbench-mcp";

  return (
    <div className="shell">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div
          style={{
            padding: "0 0.5rem 0.75rem",
            fontWeight: 700,
            fontSize: collapsed ? "0.7rem" : "0.95rem",
            whiteSpace: collapsed ? "normal" : "nowrap",
          }}
        >
          {collapsed ? "tb" : "toolbench-mcp"}
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ width: "100%", marginBottom: 8, fontSize: "0.75rem" }}
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? "→" : "← Collapse"}
        </button>
        <ul className="sidebar-nav">
          {NAV.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {collapsed ? label.slice(0, 1) : label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      <div className="shell-main">
        <header className="topbar">
          <div className="breadcrumbs">
            Fleet / <strong>{title}</strong>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="status-pill" id="mcp-status-pill">
              MCP
            </span>
          </div>
        </header>
        <main className="page-scroll">
          <Outlet />
        </main>
        <LoggerPanel />
      </div>
      <ChatFab />
    </div>
  );
}
