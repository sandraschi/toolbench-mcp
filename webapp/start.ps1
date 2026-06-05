Param([switch]$Headless)

Write-Host ""
Write-Host "DEPRECATED: toolbench-mcp webapp" -ForegroundColor Yellow
Write-Host "Use scraper-mcp instead." -ForegroundColor White
Write-Host ""
Write-Host "  Start: D:\Dev\repos\scraper-mcp\webapp\start.ps1" -ForegroundColor Green
Write-Host "  UI:    http://127.0.0.1:10999/tools" -ForegroundColor Cyan
Write-Host ""

if (-not $Headless) {
    $open = Read-Host "Open scraper-mcp webapp folder? [y/N]"
    if ($open -eq 'y') {
        Start-Process explorer.exe -ArgumentList "D:\Dev\repos\scraper-mcp\webapp"
    }
}

exit 1
