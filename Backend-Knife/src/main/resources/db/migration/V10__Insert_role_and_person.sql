-- Проверка, существует ли роль 'Админ'
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM role WHERE name = 'Админ') THEN
        INSERT INTO role(name) VALUES ('Админ');
    END IF;
END $$;

-- Проверка, существует ли роль 'Тренер'
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM role WHERE name = 'Тренер') THEN
        INSERT INTO role(name) VALUES ('Тренер');
    END IF;
END $$;

-- Проверка, существует ли пользователь с логином 'kukold'
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM person WHERE login = 'kukold') THEN
        INSERT INTO person(login, id_role, token) VALUES ('kukold', (SELECT id FROM role WHERE name = 'Админ'), '123');
    END IF;
END $$;