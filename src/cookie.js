/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function (e) {
    let val = e.target.value.toLowerCase(),
        cookies = getCookies(),
        names = Array.from(Object.keys(cookies));

    newNames = names.filter((e) => {
        return e.toLowerCase().match(val);
    });

    createTable(newNames);
});

addButton.addEventListener('click', () => {
    let name = addNameInput.value,
        value = addValueInput.value;

    setCookie(name,value);
    refreshTable();

    addNameInput.value = '';
    addValueInput.value = '';
});

function setCookie(name, value, days=1) {

    var lastDate = new Date();
    lastDate.setDate(lastDate.getDate() + days);

    var value = escape(value) + ((days==null) ? "" : "; expires="+lastDate.toUTCString());
    document.cookie = name + "=" + value + ";"
}


let cookies = {};

function getCookies() {
    return document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        return prev;
    }, {});
}

function createRow(name, value) {

    let row = document.createElement('TR'),
        btnDel = document.createElement('BUTTON'),
        cellName = document.createElement('TD'),
        cellValue = document.createElement('TD'),
        cellDel = document.createElement('TD');

    row.classList.add('row');
    cellName.textContent = name;
    cellValue.textContent = value;
    btnDel.textContent = 'X';
    cellDel.appendChild(btnDel);

    row.appendChild(cellName);
    row.appendChild(cellValue);
    row.appendChild(cellDel);

    row.addEventListener('click', (e)=>{
        let cells = row.childNodes,
            name = cells[0].innerText,
            value = cells[1].innerText;

       if(e.target.tagName == 'BUTTON'){
            setCookie(name, value, -2);
           refreshTable();
        }

    });

    return row;
}

function createTable(arr) {
    let rows = document.getElementsByClassName('row');
    while (rows.length > 0) {
        rows[0].parentNode.removeChild(rows[0]);
    }

    for (let key in cookies) {
        if (arr.includes(key)) {
            let row = createRow(key, cookies[key]);
            listTable.appendChild(row);
        }
    }
}

function refreshTable() {
    cookies = getCookies();
    let names = Array.from(Object.keys(cookies));
    createTable(names);
}

refreshTable();


