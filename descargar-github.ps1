# Script para descargar cambios automáticamente desde GitHub

Write-Host "================================" -ForegroundColor Cyan
Write-Host "   Descargando desde GitHub..." -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Paso 1: Traer cambios del servidor
Write-Host "[1/2] Descargando cambios..." -ForegroundColor Yellow
git fetch origin

# Paso 2: Fusionar cambios
Write-Host "[2/2] Fusionando cambios..." -ForegroundColor Yellow
git pull origin master

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "   ¡Descargado desde GitHub!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
