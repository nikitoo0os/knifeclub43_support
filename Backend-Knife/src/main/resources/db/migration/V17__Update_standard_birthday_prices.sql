UPDATE knfc.birthday
SET description_price = 'от 5 человек - 1800 рублей с чел<br>от 8 человек - 1700 рублей с чел'
WHERE lower(trim(name)) = lower('Стандарт');
