// book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class
class UI {


  // add book to table list
  static addBookToList(book) {
    // grab the booklist
    const booklist = document.querySelector('#book-list');
    // create a row
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
    <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete"><i class="fa fa-remove"></i></a></td>`

    // append row to booklist
    booklist.appendChild(tableRow);
  }


  // clear input fields
  static clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }


  // show alert message
  static showAlert(msg, msgClass) {
    const div = document.createElement('div');
    div.className = `alert ${msgClass}`;
    div.textContent = msg;
    document.querySelector('.container').insertBefore(div, document.querySelector('#book-form'));

    window.setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000)
  }


  // delete book from book list
  static deleteBook(target) {
    if (target.parentElement.classList.contains('delete')) {
      target.parentElement.parentElement.parentElement.remove();
    }
  }
}


// local storage class
class Store {

  static getBooks() {
    // get books from local storage
    if (localStorage.getItem('books')){
      return JSON.parse(localStorage.getItem('books'));
    } else {
      return []
    }
  }

  static displayBooks(){
    const books = this.getBooks();
    books.forEach((book)=>UI.addBookToList(book));
  }

  static addBook(book){
    const books = this.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = this.getBooks();
    let bookToRemove;

    books.forEach((book) => {
      if (book.isbn === isbn){
        bookToRemove = book;
      }
    })


    books.splice(books.indexOf(bookToRemove), 1);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

Store.displayBooks();

// event to add book to list
document.getElementById('book-form').addEventListener('submit', function (e) {
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;


  if (title == '' || author == '' || isbn == '') {
    UI.showAlert('Please fill all fields', 'error');
  } else {

    const book = new Book(title, author, isbn);
    Store.addBook(book);

    UI.addBookToList(book);

    UI.clearFields();

    UI.showAlert('Successfully added book to the list', 'success');
  }

  e.preventDefault();
})


// event for removing the book from list
document.getElementById('book-list').addEventListener('click', function (e) {
  let isbn;
  isbn = e.target.parentElement.parentElement.previousElementSibling.textContent;
  UI.deleteBook(e.target);
  Store.removeBook(isbn);
  UI.showAlert('Book Removed!', 'success');
  e.preventDefault();
})
