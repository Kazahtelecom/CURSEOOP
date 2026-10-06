@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
    py -3 app\server.py
) else (
    python app\server.py
)
echo.
if errorlevel 1 echo Не удалось запустить курс. Проверь, установлен ли Python 3.
echo Курс остановлен. Нажми любую клавишу, чтобы закрыть это окно.
pause >nul
