'use strict';

var STORAGE_KEY = 'todosDB';
var gFilterBy = 'all';
var gSortBy = 'created'
var gImportanceBy = '1';
var gUsers;
_createTodos();

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gUsers;
    var todos = gUsers.filter(function (todo) {
        return todo.isDone && gFilterBy === 'done' ||
            !todo.isDone && gFilterBy === 'active'

    })
    return todos;
}

function getTotalCount() {
    return gUsers.length;
}
function getActiveCount() {
    var todos = gUsers.filter(function (todo) {
        return !todo.isDone;
    })
    return todos.length;
}

function removeTodo(todoId) {
    var idx = gUsers.findIndex(function (todo) {
        return todo.id === todoId
    })
    gUsers.splice(idx, 1);
    _saveUsersToStorage();
}

function toggleTodo(todoId) {
    var todo = gUsers.find(function (todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone;
    _saveUsersToStorage();
}

function addTodo(txt) {
    var todo = _createTodo(txt);
    gUsers.unshift(todo);
    _saveUsersToStorage();
}


function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSorter(SortBy) {
    gSortBy = SortBy
    switch(gSortBy) {
        case 'txt': 
            gUsers.sort((a, b) => a.txt.localeCompare(b.txt));
            break;
        case 'created':
            gUsers.sort((a, b) => a.createdAt - b.createdAt);
            break;
        case 'importance':
            gUsers.sort((a, b) => a.importance - b.importance);
    }
}

function setImportance(importanceBy) {
    gImportanceBy = importanceBy
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveUsersToStorage() {
    saveToStorage(STORAGE_KEY, gUsers);
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY)
    if (!todos || todos.length === 0) {
        var todos = [
            _createTodo('Study HTML'),
            _createTodo('Learn CSS'),
            _createTodo('Master Javascript')
        ];
    }
    gUsers = todos;
    _saveUsersToStorage();
}

function _createTodo(txt) {
    var todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: gImportanceBy        
    }
    return todo;
}