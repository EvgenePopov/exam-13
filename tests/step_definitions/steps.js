const { I } = inject();
// Add in your custom step files

Given('я нахожусь на странице {string}', (page) => {
    switch (page) {
        case 'Регистрация':
            return I.amOnPage('/register');
        case 'Логин':
            return I.amOnPage('/login');
        case 'Добавление заведения':
            return I.amOnPage('/add-new-place');
        default:
            return I.amOnPage('/');
    }
});

Given('я ввожу в поля формы:', (table) => {
    table.rows.forEach(row => {
        row.cells[0];
        row.cells[1];
        I.fillField(row.cells[0].value, row.cells[1].value);
    });
});

Given('нажимаю на кнопку формы {string}', (buttonText) => {
    I.click(buttonText, {css: 'form'});
});

Given('я кликаю на текст {string}', (text) => {
    I.click(text);
});

Given('я должен увидеть текст {string}', (text) => {
    I.wait(2);
    I.see(text);
});

Given('я выбераю файл', (text) => {
    I.attachFile('form input[type=file]', 'test-images/test.webp');
});

