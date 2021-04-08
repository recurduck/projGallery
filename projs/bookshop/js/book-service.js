'use strict'

console.log('Book Service loaded')
var KEY = 'books';
const PAGE_SIZE = 5;

var gPageIdx = 0;
var gBooks;
var gSortBy = 'txt';
var gBooksName = ['the kite runner', 'queen of gambit', 'harry potter and the philosopher\'s stone', 'harry potter and the secret chamber', 'harry potter and the prisoner of azkaban', 'harry potter and the goblet of fire', 'harry potter and the order of the phoenix', 'harry potter and the half-blood prince', 'harry potter and the deathly hallows', 'the da vinci code', 'in the sea there are crocodiles']
var gFilterBy = {
    bookTitle: '',
    price: Infinity
}
_createBooks();

function sortBooksBy(sortBy) {
    switch (sortBy) {
        case 'txt': gBooks.sort(function(a, b) {return a.bookTitle.localeCompare(b.bookTitle);});
            break;
        case 'price': gBooks.sort(function(a, b) {return a.price-b.price;});
            break;
    }
    gSortBy = sortBy
}

function raiseBookRate(bookId) {
    var book = getBookById(bookId);
    if(book.rate < 10) {
        book.rate++;
        _saveBooksToStorage();
    }
}

function decreseBookRate(bookId) {
    var book = getBookById(bookId)
    if(book.rate > 0) {
        book.rate--;
        _saveBooksToStorage();
    } 
}

function setFilter(filterBy) {
    gFilterBy.bookTitle = filterBy.bookTitle;
}

function getBooks() {
    // var books = gBooks.filter(function (book) {
    //     return book.bookTitle.includes(gFilterBy.bookTitle) &&
    //         book.price <= gFilterBy.price;
    // })

    // var startIdx = gPageIdx * PAGE_SIZE;
    // books.slice(startIdx, startIdx + PAGE_SIZE);
    return gBooks;
}

function getBooksName() {
    return gBooksName;
}

function deleteBook(bookId) {
    var bookId = gBooks.findIndex(function (book) {
        return bookId === book.id;
    })
    gBooks.splice(bookId, 1)
    _saveBooksToStorage();
}

function addBook(bookTitle, bookPrice) {
    var book = _createBook(bookTitle, bookPrice)
    gBooks.unshift(book);
    _saveBooksToStorage();
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id;
    })
    return book;
}

function updateBook(bookId, bookPrice) {
    var book = getBookById(bookId)
    book.price = bookPrice;
    _saveBooksToStorage();
}

function _createBook(bookTitle, price = getRandomIntInclusive(40, 200)) {
    return {
        id: makeId(),
        bookTitle: bookTitle,
        price: price,
        imgUrl: `img/${bookTitle.split(' ')[(bookTitle.split(' ').length)-1]}.jpg`,
        desc: makeLorem(),
        rate: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (var i = 0; i < 5; i++) {
            var bookTitle = gBooksName[getRandomIntInclusive(0, gBooksName.length - 1)]
            books.push(_createBook(bookTitle))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}


