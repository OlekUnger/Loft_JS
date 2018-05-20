/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
/* кнопка */
const reload = homeworkContainer.querySelector('#reload');
const reloadBlock = homeworkContainer.querySelector('#reload-block');
reloadBlock.style.display = 'none';
/*

 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */

function loadTowns() {

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest(),
            url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

        xhr.open('GET', url, true);
        xhr.send();
        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                let items = JSON.parse(xhr.responseText);

                items = items.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1
                    }

                    return 0;
                });

                resolve(items);
            } else {
                let error = new Error(this.statusText);

                error.code = this.status;
                reject(error);
            }
        })
    })
}

var towns = [];

loadTowns().then(
    (items) => {
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';
        reloadBlock.style.display = 'none';
        towns = items;
    }
).catch(
    reloadBlock.style.display = 'block',
    reload.addEventListener('click', () => {
        loadTowns();
    })
);

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();
    if (full.indexOf(chunk) + 1) {
        return true;
    }

    return false;
}

filterInput.addEventListener('keyup', function () {
    filterResult.innerHTML = '';
    let val = filterInput.value.trim();

    if (val.length) {
        for (let item of towns) {
            if (isMatching(item.name, val)) {
                let div = document.createElement('div');
                div.classList.add('newItem');
                div.textContent = item.name;
                div.style.cursor = 'pointer';
                filterResult.appendChild(div);
            }
        }
    } else {
        filterResult.innerHTML = '';
    }
});

filterResult.addEventListener('click', (e) => {
    if (e.target.classList.contains('newItem')) {
        filterInput.value = e.target.innerText;
        filterResult.innerHTML = '';
    }
})

export {
    loadTowns,
    isMatching
};
