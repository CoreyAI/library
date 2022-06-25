let table = document.getElementById("table");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary[myLibrary.length] = book;
}

function addLibraryToTable() {
  myLibrary.forEach(book => {
    let newRow = document.createElement("tr");
    for (key in book) {
      // console.log(`${key}: ${book[key]}`);
      let newCell = document.createElement("td");
      newCell.textContent = `${book[key]}`;
      newRow.appendChild(newCell);
    }
    table.appendChild(newRow);
  });
}


const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "yes");
const book2 = new Book("test", "me", 100, "no");

addBookToLibrary(book1);
addBookToLibrary(book2);

addLibraryToTable();