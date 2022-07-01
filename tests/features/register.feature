#language:ru
#noinspection NonAsciiCharacters

Функционал: Регистрация пользователя
  Для того, чтобы пользоваться приложением now-i-am
  Как обычный пользователь
  Я должен иметь возможность зарегистрироваться

  @register
  Сценарий: Регистрация
    Допустим я нахожусь на странице "Регистрация"
    Если я ввожу в поля формы:
      | Email           | shon@gmail.com |
      | Display name    | Shon           |
      | Password        | 123            |
      | Repeat password | 123            |
    И нажимаю на кнопку формы "REGISTER"
    То я должен увидеть текст "Register successful"
