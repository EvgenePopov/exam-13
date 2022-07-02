#language:ru
#noinspection NonAsciiCharacters

Функционал: Добавление нового заведения
  Как обычный пользователь
  Я должен иметь возможность добавить новое заведение

  @add-new-place
  Сценарий: Логин
    Допустим  я нахожусь на странице "Логин"
    Если я ввожу в поля формы:
      | Email     | jack@test.com |
      | Password  | 123           |
    И нажимаю на кнопку формы "SIGN IN"
    То я должен увидеть текст "Login successful"
    Если я кликаю на текст "Add new place"
    То я должен увидеть текст "Add new place"
    И я ввожу в поля формы:
      | Name         | new place     |
      | Description  | new place     |
    Допустим я выбераю файл
    Если я кликаю на текст "I agree"
    И нажимаю на кнопку формы "Send"
    То я должен увидеть текст "new place"
