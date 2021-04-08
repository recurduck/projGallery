'use strict';

console.log('book controler uploaded')

window.onload = function () {
    renderBooks();
}

function onSortBy(sortBy) {
    sortBooksBy(sortBy);
    renderBooks();
}

function renderBooksDesc(bookId, modal) {
    var book = getBookById(bookId);
    var strHTML = `<div class="desc">
    <p><img src="${book.imgUrl}">${book.desc}</p>
    <button onclick="onReduceRate(event, '${book.id}')">-</button>
    <span class="book-rate">${book.rate}</span>
    <button onclick="onAddRate(event, '${book.id}')">+</button>
    </div>`
    modal.innerHTML = strHTML;
}

function toogleAddBook(btn) {
    btn.innerText = (btn.innerText === '+') ? '-' : '+';
    addBookBarToogle();
}

function addBookBarToogle() {
    var elBar = document.querySelector('.add-bar')
    elBar.classList.toggle('add-bar-visible')
}

function onAddRate(ev, bookId) {
    ev.stopPropagation();
    raiseBookRate(bookId);
    document.querySelector('.book-rate').innerText = `${getBookById(bookId).rate}`
}

function onReduceRate(ev, bookId) {
    ev.stopPropagation();
    decreseBookRate(bookId);
    document.querySelector('.book-rate').innerText = `${getBookById(bookId).rate}`
}

function onReadBook(bookId = null) {
    var elModal = document.querySelector('.modal');
    elModal.classList.toggle('visible');
    if(elModal.classList.contains('visible')) setTimeout(() => renderBooksDesc(bookId, elModal),1000);
    else clearModal(elModal);
}

function onAddBook() {
    var bookTitle = document.getElementById('input-booktitle').value
    var bookPrice = +document.getElementById('input-bookprice').value
    if(bookTitle === '' || !bookPrice) return;
    addBook(bookTitle, bookPrice);
    document.getElementById('input-booktitle').value = '';
    document.getElementById('input-bookprice').value = '';
    renderBooks();
}

function onUpdateBook(bookId) {
    //var bookPrice = +prompt('please insert updated Price: ')
    var elPrice = document.querySelector(`.bookId-${bookId} .book-price`);
    var strHTML = `<input type="number"/>`
    elPrice.innerHTML = strHTML;
    elPrice.addEventListener('focusin', (event) => {
        event.target.style.background = 'pink';
      });
      
      elPrice.addEventListener('focusout', (event) => {
        event.target.style.background = '';
        onUpdatedBook(bookId, +event.target.value);
      });
}

function onUpdatedBook(bookId, price) {
    updateBook(bookId, price);
    renderBooks();
}

function onRemoveBook(bookId) {
    deleteBook(bookId)
    renderBooks();
}

function renderBooks() {
    var strHTML = `
    <table class="books-table darkTable">
        <thead>
            <tr>
                <th>Id</th> 
                <th>Image</th> 
                <th><button onclick="onSortBy('txt')">Title</button></th> 
                <th><button onclick="onSortBy('price')">Price</button></th> 
                <th colspan="3">Actions</th>
            </tr>
        </thead>
    <tbody>`;
    var books = getBooks();
    var booksRow = books.map(book => {
        return `
        <tr class="bookId-${book.id}">
        <td>${book.id}</td>
        <td><img src="${book.imgUrl}" alt="${book.bookTitle.split(' ')[0]}"></td>
        <td>${book.bookTitle}</td>
        <td class="book-price">$${book.price}</td>
        <td><button onclick="onReadBook('${book.id}')">Read</button></td>
        <td><button onclick="onUpdateBook('${book.id}')">Update</button></td>
        <td><button onclick="onRemoveBook('${book.id}')">Delete</button></td>            
        </tr>`;
    });
    strHTML += booksRow.join('') 
    strHTML += `
    <tr>
    <td class="page-nav" colspan="7">
    <button>《</button>
    <span class="curr-page">1</span>
    <button onclick="onNextPage()">》</button>
    </td> 
    </tr></tbody>
    </table>`;
    document.querySelector('.main').innerHTML = strHTML
}

function clearModal(modal) {
    modal.innerHTML = '';
}

function onNextPage() {
    console.log('next page')
    nextPage();
    renderBooks();
}