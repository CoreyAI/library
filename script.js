let table = document.getElementById("table");
let formContainer = document.getElementById("form-container");
let form = document.getElementById("book-form");
let formButton = document.getElementById("add-form");
let cancelButton = document.getElementById("cancel-button");

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
      let newCell = document.createElement("td");
      newCell.textContent = `${book[key]}`;
      newRow.appendChild(newCell);
    }
    table.appendChild(newRow);
  });
}

formButton.addEventListener("click", function() {
  formContainer.removeAttribute("hidden");
  formButton.setAttribute("hidden", "hidden");
  table.setAttribute("hidden", "hidden");
});

// TODO: Create verification function to sanitize user input.
form.addEventListener("submit", function(e) {
  e.preventDefault();
  
  let validation = verification();
  if (validation == true) {
    // form.submit();
    let newBook = new Book(form.title.value, form.author.value, 
      form.pages.value, form.read.value);
    addBookToLibrary(newBook);
    addLibraryToTable();
    returnToTable();
    return;
  }

});

form.addEventListener("reset", function() {
  returnToTable();
});

function returnToTable() {
  formContainer.setAttribute("hidden", "hidden");
  formButton.removeAttribute("hidden");
  table.removeAttribute("hidden");
}

function verification() {
  // Insert validation code to allow for user input to be submitted
  // into the library.

  // Placeholder true value to proceed with form submission.
  return true;
}


const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "yes");
const book2 = new Book("test", "me", 100, "no");

addBookToLibrary(book1);
addBookToLibrary(book2);

addLibraryToTable();