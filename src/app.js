let titleError = document.getElementById("titleError");
let yearError = document.getElementById("yearError");
let authorError = document.getElementById("authorError");
let tableBody = document.getElementById("table-body");
let books = [];

// delete book
function deleteRow(event){
  books = books.filter(book => book.title !== event.currentTarget.id);
  addBook(books);
};

// add delete button to tr
function addButton(tr, book) {
  var td = document.createElement('TD')
  var btn = document.createElement('input');
  btn.type = "button";
  btn.id = book.title;
  btn.className = "w3-button w3-red";
  btn.value = 'Delete';
  btn.onclick = deleteRow;
  td.appendChild(btn);
  tr.appendChild(td);
}

// add books list
function addBook(books){
  tableBody.innerHTML = "";
  for(let book of books){
    var tr = document.createElement("TR");
    for(let key in book){
      var td = document.createElement('TD')
      td.appendChild(document.createTextNode(book[key]));
      tr.appendChild(td)
    }
    // add delete button
    addButton(tr, book)
    tableBody.appendChild(tr);
  }
}

function checkInputValue(event) {
  if(event.target.name === "title" && event.target.value){
      titleError.style.display = "none";
  }

  if(event.target.name === "year" && event.target.value){
      yearError.style.display = "none";
  }

  if(event.target.name === "author" && event.target.value){
      authorError.style.display = "none";
  }
}

let inps = document.getElementsByClassName("inp");
for(let inp of inps){
  inp.addEventListener('keyup', checkInputValue)
}

let _validateForm = book => {
  let status = false;
  if(!book.title){
    titleError.style.display = "block";
    titleError.textContent = "title is required!";
    return status;
  }
  if(!book.year){
    yearError.style.display = "block";
    yearError.textContent = "year is required!";
    return status;
  }
  if(!book.author){
    authorError.style.display = "block";
    authorError.textContent = "author is required!";
    return status;
  }

  for(let bk of books){
    if(bk.title === book.title){
      alert('book is added!!');
      return status;
    }
  }

  return true;
}

// form submit event
document.getElementById("book-Form").addEventListener("submit", function(event){
  debugger
  event.preventDefault();
  let book = {
    title: null,
    year: null,
    author: null
  };

  for(let item of event.currentTarget){

    if(item.name === 'title'){
      book.title = item.value;
    }

    if(item.name === 'year'){
      book.year = item.value;
    }

    if(item.name === 'author'){
      book.author = item.value;
    }
  }

  // validate form
  if(!_validateForm(book)) return;
  // add new book in array
  books.push(book);
  // add all books in table
  addBook(books);
  // reset input form
  event.currentTarget.reset();
})