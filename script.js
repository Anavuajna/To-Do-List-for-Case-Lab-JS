const inputField = document.querySelector('.inputField');
const addButton = document.querySelector('.addButton');
let toDoList = document.querySelector('.toDo-conteiner');
const btnEven = document.querySelector('.btn-even');
const btnOdd = document.querySelector('.btn-odd');
const btnDelLast = document.querySelector('.btn-delLast');
const btnDelFirst = document.querySelector('.btn-delFirst');


let arrayToDoList = [];
if (localStorage.getItem('todo')) {
    arrayToDoList = JSON.parse(localStorage.getItem('todo'));
    displayList();
    }

//СОЗДАЕМ ДЕЛО ПО КНОПКЕ
addButton.addEventListener('click', () => {
    if (inputField.value === '') return;
    let newTodo = {
        todo: inputField.value,
        completed: false,
        done: false
    };
    arrayToDoList.push(newTodo);
    displayList();
}) 

inputField.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        addButton.click();
    }
})

function displayList() {
let allElements = toDoList.querySelectorAll('.todo-item-container');
allElements.forEach(function (item, i) {toDoList.removeChild(item)});
arrayToDoList.forEach(function (item, i) {
    const todoItemContainer = document.createElement('div'); // Див для текста дела и кнопок
    todoItemContainer.classList.add('todo-item-container');
    toDoList.appendChild(todoItemContainer);

    // СОЗДАЕМ p И ДОБАВЛЯЕМ id = todo-text
    const todoText = document.createElement('p');
    todoText.id = 'todo-text';
    todoText.innerText = item.todo;
    todoItemContainer.appendChild(todoText);
    inputField.value = "";
    inputField.focus();

    // CОХРАНИТЬ В ЛОКАЛ СТОРИДЖ
    localStorage.setItem('todo', JSON.stringify(arrayToDoList));
    
    // СОЗДАЕМ КНОПКУ "СДЕЛАНО"
    const btnDone = document.createElement('button');
    btnDone.classList.add('btnDone');
    const btnDoneText = document.createTextNode('✔️');
    btnDone.appendChild(btnDoneText);
    todoItemContainer.appendChild(btnDone);
    
    // ДОБАВЛЯЕМ ПОДСЛУШКУ НА КНОПКУ СДЕЛАНО:
    btnDone.addEventListener('click', () => {
        item.completed = !item.completed

    // ПЕРЕНОСИМ ЭЛЕМЕНТ В КОНЕЦ СПИСКА
    arrayToDoList.push(arrayToDoList.splice(i, 1)[0]);
    displayList();
    })

    if (item.completed === true) {
        todoText.classList.add('done');
    }

    // СОЗДАЕМ КНОПКУ "УДАЛИТЬ"
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btnDelete');
    // const btnDeleteText = document.createTextNode('Delete');
    const btnDeleteText = document.createTextNode('❌');
    btnDelete.appendChild(btnDeleteText);
    todoItemContainer.appendChild(btnDelete);
    
    // ДОБАВЛЯЕМ ПОДСЛУШКУ НА КНОПКУ УДАЛИТЬ:
    btnDelete.addEventListener('click', () => {
        toDoList.removeChild(todoItemContainer);
        arrayToDoList.splice(i, 1)[0];

        // CОХРАНИТЬ В ЛОКАЛ СТОРИДЖ
        localStorage.setItem('todo', JSON.stringify(arrayToDoList));
    })
})
}

// ВЫДЕЛЯЕМ ЧЕТНЫЕ ЭЛЕМЕНТЫ
btnEven.addEventListener('click', () => {
    let allElements = toDoList.querySelectorAll('.todo-item-container');
    allElements.forEach(function(item, i) {
    if (i % 2 === 1) {
        item.classList.toggle('even')
    }
})
})

// ВЫДЕЛЯЕМ НЕЧЕТНЫЕ ЭЛЕМЕНТЫ
    btnOdd.addEventListener('click', () => {
        let allElements = toDoList.querySelectorAll('.todo-item-container');
        allElements.forEach(function(item, i) {
        if (i % 2 === 0) {
        item.classList.toggle('odd')
    }
})
})

// УДАЛЯЕМ ПОСЛЕДНИЙ ЭЛЕМЕНТ
btnDelLast.addEventListener('click', ()=> {
    arrayToDoList.pop();
    displayList();
})

// УДАЛЯЕМ ПЕРВЫЙ ЭЛЕМЕНТ
btnDelFirst.addEventListener('click', ()=> {
    arrayToDoList.shift();
    displayList();
})

