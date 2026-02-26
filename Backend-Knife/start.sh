#!/bin/bash

# Имя screen сессии
#SESSION_NAME="knifeclub-backend"

# Проверяем, существует ли уже сессия
#if screen -list | grep -q "$SESSION_NAME"; then
#    echo "Сессия $SESSION_NAME уже существует. Подключаюсь..."
#    screen -r "$SESSION_NAME"
#else
#    echo "Запускаю бэкенд в screen сессии $SESSION_NAME..."
    
    # Запускаем JAR в новой screen сессии
#    screen -dmS "$SESSION_NAME" java -jar ./target/JavaServer-0.0.1-SNAPSHOT.jar
    
#    if [ $? -eq 0 ]; then
#        echo "✅ Бэкенд запущен в screen сессии: $SESSION_NAME"
#        echo "📌 Для подключения к сессии используйте: screen -r $SESSION_NAME"
#        echo "📌 Для выхода из сессии (без остановки): Ctrl+A, затем D"
#        echo "📌 Для остановки: войдите в сессию и нажмите Ctrl+C"
#    else
#        echo "❌ Ошибка при запуске бэкенда"
#    fi
#fi


#!/bin/bash

SESSION_NAME="knifeclub-backend"
LOG_FILE="backend.log"

if screen -list | grep -q "$SESSION_NAME"; then
    echo "Сессия $SESSION_NAME уже существует. Подключаюсь..."
    screen -r "$SESSION_NAME"
else
    echo "Запускаю бэкенд в screen сессии $SESSION_NAME..."
    echo "Логи будут сохраняться в $LOG_FILE"

    # Запускаем с перенаправлением вывода в файл
    screen -dmS "$SESSION_NAME" bash -c "java -jar ./target/JavaServer-0.0.1-SNAPSHOT.jar 2>&1 | tee -a $LOG_FILE"

    if [ $? -eq 0 ]; then
        echo "✅ Бэкенд запущен в screen сессии: $SESSION_NAME"
        echo "📌 Логи доступны в файле: $LOG_FILE"
        echo "📌 Для просмотра логов: tail -f $LOG_FILE"
        echo "📌 Для подключения к сессии: screen -r $SESSION_NAME"
    else
        echo "❌ Ошибка при запуске бэкенда"
    fi
fi
