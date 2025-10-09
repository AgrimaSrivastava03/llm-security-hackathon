# Start the full stack for Target B (Azure upstream on :9001 + Sidecar :8081 + Frontend :5173)
Write-Host "[START B] Booting Target B stack..." -ForegroundColor Green

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

# Ensure .env exists for Azure shim
if (-not (Test-Path "mock-upstream\.env")) { Copy-Item "mock-upstream\azure.env" "mock-upstream\.env" -Force }

# Point sidecar to Target B config (upstream :9001)
Copy-Item "sidecar\sidecar.config.yaml" "sidecar\sidecar.config.yaml.backup" -Force 2>$null | Out-Null
Copy-Item "sidecar\sidecar-target-b.config.yaml" "sidecar\sidecar.config.yaml" -Force

Write-Host "[START B] Starting Azure shim on :9001" -ForegroundColor Yellow
# Load env vars from .env then launch the shim in the same process so variables are available
$shimCmd = @"
$envFile = '.env'
if (Test-Path $envFile) {
  Get-Content $envFile | ForEach-Object {
    if ($_ -match '^(?<k>[A-Za-z_][A-Za-z0-9_]*)=(?<v>.*)$') {
      $name = $Matches['k']
      $val = $Matches['v']
      [System.Environment]::SetEnvironmentVariable($name, $val, 'Process')
    }
  }
}
node azure-server-vulnerable.js
"@
Start-Process powershell -WorkingDirectory "mock-upstream" -ArgumentList "-NoProfile","-Command",$shimCmd | Out-Null

Write-Host "[START B] Starting sidecar on :8081 (upstream :9001)" -ForegroundColor Yellow
Start-Process -WorkingDirectory "sidecar" node -ArgumentList "dist/index.js"

Write-Host "[START B] Starting frontend (Vite) on :5173" -ForegroundColor Yellow
Start-Process -WorkingDirectory "frontend" npm -ArgumentList "run","dev"

Write-Host "[START B] Ready:" -ForegroundColor Green
Write-Host "  Sidecar health:  http://localhost:8081/health" -ForegroundColor Cyan
Write-Host "  Frontend app:   http://localhost:5173" -ForegroundColor Cyan

