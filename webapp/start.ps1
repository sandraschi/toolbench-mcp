# Vite on 10816 — proxies /health, /api, /mcp to backend 10817.
# If nothing is listening on 10817, starts the FastAPI server in a new window first.
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
$FrontendPort = 10816
$BackendPort = 10817
$RepoRoot = Split-Path $PSScriptRoot

function Test-PortListening([int]$Port) {
    $c = @(Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue).Count
    return $c -gt 0
}

if (-not (Test-PortListening $BackendPort)) {
    Write-Host "No backend on $BackendPort — launching toolbench-mcp --serve (new window)..."
    $activate = Join-Path $RepoRoot ".venv\Scripts\Activate.ps1"
    if (Test-Path $activate) {
        $inner = "cd '$RepoRoot'; . '$activate'; python -m toolbench_mcp --serve"
    } else {
        $inner = "cd '$RepoRoot'; py -3 -m toolbench_mcp --serve"
    }
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $inner
    $deadline = (Get-Date).AddSeconds(30)
    $ok = $false
    while ((Get-Date) -lt $deadline) {
        Start-Sleep -Milliseconds 500
        try {
            $r = Invoke-WebRequest -Uri "http://127.0.0.1:$BackendPort/health" -UseBasicParsing -TimeoutSec 2
            if ($r.StatusCode -eq 200) {
                $ok = $true
                Write-Host "Backend is up on $BackendPort."
                break
            }
        } catch {
            # still starting
        }
    }
    if (-not $ok) {
        Write-Warning "Backend did not become ready in 30s. In repo root run: python -m toolbench_mcp --serve"
    }
}

try {
    npx --yes kill-port $FrontendPort 2>$null
} catch {}

npm install
npm run dev
