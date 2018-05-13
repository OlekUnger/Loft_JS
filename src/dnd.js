/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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
homeworkContainer.style.width = '100%';
homeworkContainer.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.height = '100%';
/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
let zIndex = 0;

function createDiv() {

    let clientWidth = document.body.clientWidth,
        clientHeight = document.body.clientHeight,
        elemWidth = getRandom(clientWidth, 10),
        elemHeight = getRandom(clientHeight, 10),

    const newDiv = document.createElement('div');

    newDiv.classList.add('draggable-div');

    Object.assign(newDiv.style, {
        width: elemWidth + 'px',
        height: elemHeight + 'px',
        backgroundColor: '#' + parseInt(Math.random() * 0xffffff).toString(16),
        border: '1px solid black',
        position: 'absolute',
        left: getRandom(clientWidth - elemWidth, 0) + 'px',
        top: getRandom(clientHeight - elemHeight, 100) + 'px',
        borderTopLeftRadius: getRandom(100, 0) + '%',
        borderBottomLeftRadius: getRandom(100, 0) + '%',
        borderBottomRightRadius: getRandom(100, 0) + '%',
        borderTopRightRadius: getRandom(100, 0) + '%',
        zIndex: zIndex++
    });

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('mousedown', (e) => {
        if (e.which === 1) {
            e.target.classList.add('draggable');
        }

        return;
    });
    target.addEventListener('mouseup', (e) => {
        e.target.classList.remove('draggable');
    });

    document.addEventListener('mousemove', (e) => {

        if (e.target.classList.contains('draggable')) {
            e.target.style.zIndex = zIndex++;
            e.target.style.left = e.pageX - e.target.offsetWidth / 2 + 'px';
            e.target.style.top = e.pageY - e.target.offsetHeight / 2 + 'px';
        }
    })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};

