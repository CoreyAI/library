
let table = document.getElementById("table");
let formContainer = document.getElementById("form-container");
let form = document.getElementById("book-form");
let formButton = document.getElementById("add-form");
let cancelButton = document.getElementById("cancel-button");
let removeButton = document.getElementById("remove");
let readButton = document.getElementById("read");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Boolean flag used to determine if the book object within the array
// has been added to the table on the webpage.
Book.prototype.isAddedToTable = false;

function addBookToLibrary(book) {
  myLibrary[myLibrary.length] = book;
}

function addLibraryToTable() {
  myLibrary.forEach(book => {
    // Skips adding book if it's already on the table.
    if (book.isAddedToTable == true) {
      return;
    }
    
    // Creates row element to be populated by the proceeding for-loops.
    let newRow = document.createElement("tr");

    // Adds user's book to the table.
    for (key in book) {
      if (key == "isAddedToTable") {
        continue;
      }

      let newCell = document.createElement("td");
      newCell.textContent = `${book[key]}`;
      newRow.appendChild(newCell);
    }

    // Adds action buttons to each book.
    let cellId = ["remove", "read"];
    for (i = 0; i < cellId.length; i++) {
      let newCell = document.createElement("td");
      let newButton = document.createElement("button");
      newButton.setAttribute("id", cellId[i]);
      newButton.textContent = capitalize(cellId[i]);
      newCell.appendChild(newButton);
      newRow.appendChild(newCell);
    }

    // Appends the new row into the main table, and adds a boolean
    // flag to the book to indicate that it's been added to the table.
    table.appendChild(newRow);
    book.isAddedToTable = true;
  });
}


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
    showTable();
    buttonScan();
    return;
  }
  
});

formButton.addEventListener("click", function() {
  showForm();
});

form.addEventListener("reset", function() {
  showTable();
});

function showTable() {
  formContainer.setAttribute("hidden", "hidden");
  formButton.removeAttribute("hidden");
  table.removeAttribute("hidden");
}

function showForm() {
  formContainer.removeAttribute("hidden");
  formButton.setAttribute("hidden", "hidden");
  table.setAttribute("hidden", "hidden");
}

function verification() {
  // Insert validation code to allow for user input to be submitted
  // into the library.

  // Placeholder true value to proceed with form submission.
  return true;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// removeButton.addEventListener("click", function() {
//   console.log("remove button activated");
// });

// readButton.addEventListener("click", function() {
//   console.log("read button activated");
// });

function buttonScan() {
  let buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      tableButtonLogic(this.id);
    }); 
  });
}

function tableButtonLogic(id) {
  switch (id) {
    case "read":
      console.log("read");
      break;
    case "remove":
      console.log("remove");
      break; 
  }
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "yes");
const book2 = new Book("test", "me", 100, "no");

addBookToLibrary(book1);
addBookToLibrary(book2);

addLibraryToTable();
buttonScan();