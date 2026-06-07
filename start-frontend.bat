@echo off
echo ========================================
echo   IAGROMOZ - Iniciando Frontend React
echo ========================================
echo.

cd react-app

echo [1/2] Instalando dependencias...
if not exist node_modules (
    npm install
)

echo.
echo [2/2] Iniciando servidor Vite...
echo.
echo ========================================
echo   Frontend rodando em http://localhost:5173
echo ========================================
echo.
npm run dev
