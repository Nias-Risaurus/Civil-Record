@echo off
title CivilRecord Runner
echo ========================================================
echo  CivilRecord: Public Facility Reporting System
echo  Tagline: Report. Record. Repair.
echo ========================================================
echo.
echo Starting Laravel API Backend (Port 8000)...
start "CivilRecord Backend API" cmd /k "cd backend && php artisan serve --port=8000"

echo Starting React Vite Frontend (Port 5173)...
start "CivilRecord Frontend" cmd /k "cd frontend && npm run dev -- --host --port 5173"

echo.
echo ========================================================
echo  CivilRecord is now booting!
echo  - Frontend Web : http://localhost:5173/
echo  - Backend API  : http://127.0.0.1:8000/api/reports
echo ========================================================
echo.
timeout /t 3 >nul
start http://localhost:5173/
