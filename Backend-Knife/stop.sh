#!/bin/bash

SESSION_NAME="knifeclub-backend"

if screen -list | grep -q "$SESSION_NAME"; then
    echo "Останавливаю сессию $SESSION_NAME..."
    screen -S "$SESSION_NAME" -X quit
    echo "✅ Сессия остановлена"
else
    echo "❌ Сессия $SESSION_NAME не найдена"
fi
