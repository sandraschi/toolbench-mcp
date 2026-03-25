import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API = "http://127.0.0.1:10817";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 10816,
    strictPort: true,
    proxy: {
      "/mcp": { target: API, ws: true },
      "/health": { target: API },
      "/api": { target: API },
    },
  },
});
