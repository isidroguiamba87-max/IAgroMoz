@echo off
echo ========================================
echo   IAGROMOZ - Iniciando Backend Django
echo ========================================
echo.

cd backend

echo [1/4] Ativando ambiente virtual...
if not exist venv (
    echo Criando ambiente virtual...
    python -m venv venv
)
call venv\Scripts\activate

echo.
echo [2/4] Instalando dependencias...
pip install -r requirements.txt

echo.
echo [3/4] Aplicando migracoes...
python manage.py makemigrations
python manage.py migrate

echo.
echo [4/4] Iniciando servidor Django...
echo.
echo ========================================
echo   Backend rodando em http://localhost:8000
echo   Admin em http://localhost:8000/admin
echo ========================================
echo.
python manage.py runserver
