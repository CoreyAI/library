
// Initialize HTML elements for webpage interactivity. 
let table = document.getElementById("table");
let formContainer = document.getElementById("form-container");
let form = document.getElementById("book-form");
let formButton = document.getElementById("add-form");
let cancelButton = document.getElementById("cancel-button");

// Array to hold the book objects for the library table.
let myLibrary = [];

// Book object constructor. 
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// Boolean flag used to determine if the book object within the array
// has been added to the table on the webpage.
Book.prototype.isAddedToTable = false;

// Adds book object to library array.
function addBookToLibrary(book) {
  myLibrary[myLibrary.length] = book;
}

// Adds book objects from array into the HTML table.
// There could be potential to modify this algorithm to improve computational time.
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

      if (key == "title") {
        newRow.setAttribute("id", book[key])
      }

      let newCell = document.createElement("td");
      newCell.textContent = book[key];
      newCell.setAttribute("id", key);
      newRow.appendChild(newCell);
    }

    // Adds action buttons to each book.
    let cellId = ["remove", "read"];
    for (i = 0; i < cellId.length; i++) {
      let newCell = document.createElement("td");
      let newButton = document.createElement("button");
      newButton.setAttribute("class", `${cellId[i]}-button`);
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

// Modifies HTML attributes to hide form data and show the library table.
function showTable() {
  formContainer.setAttribute("hidden", "hidden");
  formButton.removeAttribute("hidden");
  table.removeAttribute("hidden");
}

// Modifies HTML attributes to hide library table and show form data. 
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

// Capitalizes the first character in the 'Remove' and 'Read' buttons.
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


// Scans button clicks and assigns the appropriate cases. This code could
// potentially allow for refactoring of the 'Add Book', 'Submit', and 
// cancel buttons.
function buttonScan() {
  let buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      switch (this.className) {
        case "read-button":
          console.log("read");
          changeReadStatus(e.currentTarget.parentElement.parentElement)
          break;
        case "remove-button":
          deleteBook(e.currentTarget.parentElement.parentElement.id);
          e.currentTarget.parentElement.parentElement.remove();
          break; 
      }
    }); 
  });
}

// Deletes the specified book by it's unique title.
// TODO: Deletion is based upon the book's title. Potential bug if there's 2+
//       books with the same name. Need better algorithm/method to attribute
//       remove button with the proper <tr> row in table.
function deleteBook(id) {
  for (i = 0; i < myLibrary.length; i++) {
    // console.log("test");
    if (id === myLibrary[i].title) {
      myLibrary.splice(i, 1);
    }
  }
}

// Changes the read state of the book.
// Could potentially refactor this code to include the innerHTML revision in the
// addLibraryToTable function (may require an additional boolean flag to state a
// revision occurred for proper modification).
function changeReadStatus(tr) {
  for (i = 0; i < myLibrary.length; i++) {
    if (tr.id === myLibrary[i].title) {
      if (myLibrary[i].read === "yes") {
        myLibrary[i].read = "no";
        tr.children['read'].innerText = "no";
      } else {
        myLibrary[i].read = "yes";
        tr.children['read'].innerText = "yes";
      }
    }
  }
}


// Adds two books to the library list upon first load of the page.
const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "yes");
addBookToLibrary(book1);
const book2 = new Book("test", "me", 100, "no");
addBookToLibrary(book2);

// Adds initial book array to the table and activates the button event listener.
addLibraryToTable();
buttonScan();