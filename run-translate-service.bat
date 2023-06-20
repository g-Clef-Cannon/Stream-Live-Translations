@echo off
start python -m http.server
timeout /t 2 /nobreak >nul
start chrome http://localhost:8000/translate.html
