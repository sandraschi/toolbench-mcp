# Start backend (10817) then webapp (10816). Requires: uv sync, webapp npm install.
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
$BackendPort = 10817
$FrontendPort = 10816
try {
    npx --yes kill-port $BackendPort 2>$null
} catch {}
try {
    npx --yes kill-port $FrontendPort 2>$null
} catch {}

if (-not (Test-Path .venv)) {
    py -3 -m venv .venv
}
.\.venv\Scripts\Activate.ps1
pip install -e ".[dev]" -q

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; .\.venv\Scripts\Activate.ps1; python -m toolbench_mcp --serve"

Start-Sleep -Seconds 2
Set-Location webapp
npm install
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\webapp'; npm run dev"
Start-Sleep -Seconds 4
Start-Process "http://127.0.0.1:$FrontendPort/"
