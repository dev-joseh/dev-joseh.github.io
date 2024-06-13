const myLibrary = [];

function Book(name, author, genre, pages, status) {
    this.name = name;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
    let name = prompt("Book name");
    let author = prompt("Book author");
    let genre = prompt("Book genre");
    let pages = prompt("Book pages");
    let status = prompt("Book status");
    let newBook = new Book(name, author, genre, pages, status);
    myLibrary.push(newBook);
}

function logLibrary() {
    myLibrary.forEach((book)=> {
        console.log(book.name);
    })
}