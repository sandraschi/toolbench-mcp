import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoggerProvider } from "./context/LoggerContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AppShell } from "./layout/AppShell";
import { AppsPage } from "./pages/AppsPage";
import { HelpPage } from "./pages/HelpPage";
import { HomePage } from "./pages/HomePage";
import { SettingsPage } from "./pages/SettingsPage";
import { ToolsPage } from "./pages/ToolsPage";

export default function App() {
  return (
    <ThemeProvider>
      <LoggerProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/apps" element={<AppsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LoggerProvider>
    </ThemeProvider>
  );
}
