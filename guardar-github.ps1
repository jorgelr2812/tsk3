# Script para guardar cambios automáticamente en GitHub

Write-Host "================================" -ForegroundColor Cyan
Write-Host "   Guardando en GitHub..." -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Paso 1: Agregar todos los cambios
Write-Host "[1/3] Agregando cambios..." -ForegroundColor Yellow
git add .

# Paso 2: Hacer commit
$fecha = Get-Date -Format "dd-MM-yyyy HH:mm:ss"
Write-Host "[2/3] Creando commit..." -ForegroundColor Yellow
git commit -m "Actualización automática - $fecha"

# Paso 3: Hacer push al servidor
Write-Host "[3/3] Enviando a GitHub..." -ForegroundColor Yellow
git push origin master

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "   ¡Guardado en GitHub!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
