# Start the full stack for Target A (Mock upstream on :9000 + Sidecar :8081 + Frontend :5173)
Write-Host "[START A] Booting Target A stack..." -ForegroundColor Green

function Stop-Port($port) {
  try {
    $lines = netstat -ano | Select-String ":$port" | ForEach-Object { $_.Line }
    foreach ($l in $lines) {
      if ($l -match "LISTENING\s+(\d+)$") { $pid = $matches[1]; taskkill /PID $pid /F 2>$null | Out-Null }
    }
  } catch {}
}

# Kill common dev ports
foreach ($p in 5173,8081,9000,9001) { Stop-Port $p }

# Ensure Sidecar config points to Target A (upstream :9000)
if (Test-Path "sidecar\sidecar.config.yaml") {
    Copy-Item "sidecar\sidecar.config.yaml" "sidecar\sidecar.config.yaml.backup" -Force 2>$null | Out-Null
}
Copy-Item "sidecar\sidecar-target-a.config.yaml" "sidecar\sidecar.config.yaml" -Force

# Start services
Write-Host "[START A] Starting mock upstream on :9000" -ForegroundColor Yellow
Start-Process -WorkingDirectory "mock-upstream" node -ArgumentList "server.js"

Write-Host "[START A] Starting sidecar on :8081 (upstream :9000)" -ForegroundColor Yellow
Start-Process -WorkingDirectory "sidecar" node -ArgumentList "dist/index.js"

Write-Host "[START A] Starting frontend (Vite) on :5173" -ForegroundColor Yellow
Start-Process -WorkingDirectory "frontend" npm -ArgumentList "run","dev"

Write-Host "[START A] Ready:" -ForegroundColor Green
Write-Host "  Sidecar health:  http://localhost:8081/health" -ForegroundColor Cyan
Write-Host "  Frontend app:   http://localhost:5173" -ForegroundColor Cyan

