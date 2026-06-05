Param([switch]$Headless)

Write-Host ""
Write-Host "DEPRECATED: toolbench-mcp" -ForegroundColor Yellow
Write-Host "Superseded by scraper-mcp (grades + ToolBench guide + archiver)." -ForegroundColor White
Write-Host ""
Write-Host "  Web UI:  http://127.0.0.1:10999" -ForegroundColor Cyan
Write-Host "  MCP:     http://127.0.0.1:10998/mcp" -ForegroundColor Cyan
Write-Host "  Start:   D:\Dev\repos\scraper-mcp\webapp\start.ps1" -ForegroundColor Green
Write-Host ""
Write-Host "See DEPRECATED.md" -ForegroundColor Gray
Write-Host ""

if (-not $Headless) {
    $open = Read-Host "Open scraper-mcp start folder? [y/N]"
    if ($open -eq 'y') {
        Start-Process explorer.exe -ArgumentList "D:\Dev\repos\scraper-mcp\webapp"
    }
}

exit 1
