const myLibrary = [];
const bookGrid = document.querySelector(".book-grid");
const inputName = document.querySelector("#name");
const inputAuthor = document.querySelector("#author");
const inputGenre = document.querySelector("#genre");
const inputPages = document.querySelector("#pages");
const inputStatus = document.querySelector("#status");
const submitButton = document.querySelector("#submitButton");

function Book(name, author, genre, pages, status) {
    this.name = name;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.status = status;
}

function displayBook(book, index) {
    let card = document.createElement("div");
    card.innerHTML =
        `<h2>${book.name}</h2>
        <p>${book.author}</p>
        <p>${book.genre}</p>
        <p>${book.pages}</p>
        ${book.author ? "" : "<br>"}
        ${book.genre ? "" : "<br>"}
        ${book.pages ? "" : "<br>"}`;

    card.classList.add(book.status ? "read" : "unread");
    
    let buttons = document.createElement("div");

    let erase = document.createElement("i");
    erase.className = "fa-solid fa-trash clickable";
    erase.addEventListener("click", () => {
        removeBookfromLibrary(index);
    });

    let edit = document.createElement("a");
    edit.setAttribute("href", "#popup-window");
    let editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen-to-square clickable";
    edit.appendChild(editIcon);
    edit.addEventListener("click", () => {
        popupEditBook();
        editBook(index);
    });

    buttons.appendChild(edit);
    buttons.appendChild(erase);
    card.appendChild(buttons);
    bookGrid.appendChild(card);
}

function displayLibrary() {
    bookGrid.innerHTML = "";
    myLibrary.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        const statusA = a.status;
        const statusB = b.status;

        if(statusA == statusB) {
            if (nameA < nameB) 
                return -1;
            if (nameA > nameB) 
                return 1;
            return 0;
        }
        else
           return statusA ? 1 : -1;

    });

    for(let i=0; i<myLibrary.length; i++) {
        displayBook(myLibrary[i], i);
    }
}

function addBookToLibrary() {
    if(inputName.value != "") {
        let newBook = new Book(inputName.value, inputAuthor.value, inputGenre.value, inputPages.value, inputStatus.checked);
        inputName.value = inputAuthor.value = inputGenre.value = inputPages.value = inputStatus.checked = "";
        myLibrary.push(newBook);
        displayLibrary();
    }
}

function removeBookfromLibrary(index) {
    myLibrary.splice(Number(index), 1);
    displayLibrary();
}

function editBook(index) {
    const book = myLibrary[index];
    myLibrary.splice(Number(index), 1);
    inputName.value = book.name;
    inputAuthor.value = book.author; 
    inputGenre.value = book.genre;
    inputPages.value = book.pages;
    inputStatus.checked = book.status;
}

// Popup functions
const popup = document.querySelector("#popup-window h2");
function popupNewBook() {
    popup.textContent="Add Book";
}

function popupEditBook() {
    popup.textContent="Edit Book";
}

// Misc
function reset() {
    location.reload();
}