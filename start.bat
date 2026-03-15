@echo off
TITLE MTOZERO Services Starter
echo ==============================================
echo  Starting MTOZERO Local Development Servers
echo ==============================================
echo.
echo [1/2] Booting Laravel Backend (PostgreSQL/SQLite)
start cmd /k "TITLE MTOZERO Backend && cd api && php artisan serve"
echo.
echo [2/2] Booting Next.js 14 Frontend (AR/EN Client)
start cmd /k "TITLE MTOZERO Frontend && cd client && npm run dev"
echo.
echo Both servers are now running!
echo Backend:   http://localhost:8000
echo Frontend:  http://localhost:3000
echo.
echo Keep these new windows open to maintain the server instances.
echo Press any key to close this launcher...
pause >nul
