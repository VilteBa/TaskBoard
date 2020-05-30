const board = document.querySelector('.board-wrapper');
const mainCard = document.querySelector('#main-card');
const addCardButton = document.querySelector('.add-list');
addCardButton.addEventListener('click', AddCard);


function AddCard(event) {
    let cardTitle = document.querySelector('.list-title').value;
    if (cardTitle) {
        let card = CreateCard(cardTitle);
        board.insertBefore(card, mainCard);
        document.querySelector('.list-title').value = '';
    }
}

function CreateCard(cardTitle) {
    let card = document.createElement('div');
    card.classList.add('card');
    let deleteButton = document.createElement('span');
    deleteButton.textContent = '✖';
    deleteButton.classList.add('delete-card');
    deleteButton.addEventListener('click', DeleteCard);

    let cardHeader = document.createElement('h4');
    cardHeader.innerText = cardTitle;
    cardHeader.classList.add('list-header')
    cardHeader.setAttribute("draggable", "true");
    cardHeader.addEventListener('dragstart', dragStart);
    cardHeader.addEventListener('dragend', dragEnd);

    let list = document.createElement('ul');
    list.classList.add('list-items');

    let addListItemForm = document.createElement('div');
    addListItemForm.id = 'add-card-form';
    addListItemForm.classList.add('add-card-field');

    let textInput = document.createElement('input');
    textInput.classList.add('card-title');
    textInput.setAttribute('type', 'text');
    textInput.placeholder = 'Enter list item';

    let addButton = document.createElement('input');

    addButton.classList.add('add-card');
    addButton.setAttribute('type', 'button');
    addButton.value = '✚';
    addButton.addEventListener('click', AddListItem);

    addListItemForm.appendChild(textInput);
    addListItemForm.appendChild(addButton);

    card.appendChild(deleteButton);
    card.appendChild(cardHeader);
    card.appendChild(list);
    card.appendChild(addListItemForm);

    board.addEventListener('dragenter', dragEnter);
    board.addEventListener('dragover', dragOver);
    board.addEventListener('dragleave', dragLeave);
    board.addEventListener('drop', dragDrop);

    return card;
}

function AddListItem(event) {
    let parent = event.target.parentElement;
    let listItemText = parent.querySelector('.card-title');
    let card = parent.parentElement;

    if (!listItemText.value) return;
    let list = parent.parentElement.querySelector('.list-items');
    let listItem = document.createElement('li');
    listItem.setAttribute("draggable", "true");

    listItem.addEventListener('dragstart', dragStart);
    listItem.addEventListener('dragend', dragEnd);

    let itemTitle = document.createElement('span');
    itemTitle.textContent = listItemText.value;
    itemTitle.classList.add('name');

    let deleteButton = document.createElement('span');
    deleteButton.textContent = '✖';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', DeleteListIem);
    listItem.appendChild(deleteButton);
    listItem.appendChild(itemTitle);
    list.appendChild(listItem);
    listItemText.value = '';

    document.querySelector('.list-title').value = '';
}

function DeleteListIem(event) {
    let itemToDelete = event.target.parentElement;
    let list = itemToDelete.parentElement
    list.removeChild(itemToDelete);
}

function DeleteCard(event) {
    let cardToDelete = event.target.parentElement;
    board.removeChild(cardToDelete);
}

let task

const dragStart = (event) => {
    // console.log(event.target);
    task = event.target;

    if (task.tagName === "LI")
        setTimeout(() => (event.target.className = 'change-color'), 0);
    if (task.className === "list-header")
        setTimeout(() => (event.target.parentElement.style.visibility = 'hidden'), 0);
}

const dragEnd = (event) => {
    // console.log(event.target);
    if (task.tagName === "LI")
        event.target.removeAttribute('class');
    if (task.className === "list-header")
        event.target.parentElement.style.visibility = 'visible';
}

const dragEnter = (event) => {
    //console.log("ENTER");
    event.preventDefault();

    if (task.tagName === "LI") {
        if (event.target.tagName === "LI")
            event.target.parentElement.insertBefore(task, event.target);
        if (event.target.tagName === "UL")
            event.target.append(task);
    }

    if (task.className === "list-header") {
        if (event.target.parentElement.className === "card")
      /*let insertTarget=event.target.parentElement.parentElement;
      */board.insertBefore(task.parentElement, event.target.parentElement);
        if (event.target.parentElement.className === "board-wrapper")
            board.insertBefore(task.parentElement, event.target);
    }
}

const dragOver = (event) => {
    //console.log("OVER");
    event.preventDefault();
}

const dragLeave = (event) => {
    //console.log("LEAVE");
    event.preventDefault();
}

const dragDrop = (event) => {
    //console.log("DROP");
}