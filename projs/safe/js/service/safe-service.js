'use strict'

var USERS_KEY = 'safeDB';
var LOGGED_USER_KEY = 'loggedinUser';
var gUsers;
_createUsers();

function validateDetails(userName, pass) {
    var userIdx = isUserExist(userName);
    if(userIdx > -1) {
        if(isPasswordValid(userIdx, pass)) return 1;
        else return 0;
    } else return -1;
}

function getUsersForDisplay() {
    return gUsers;
}

function isPasswordValid(idx, pass) {
    return (gUsers[idx].password === pass) ? true : false;
}

function isUserExist(userName) {
    return gUsers.findIndex(user => user.userName === userName)
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
    saveToStorage(USERS_KEY, gUsers);
}

function _saveLoggenInUserToStorage(user) {
    saveToStorage(LOGGED_USER_KEY, user);
}

function _createUsers() {
    var users = loadFromStorage(USERS_KEY)
    if (!users || users.length === 0) {
        var users = [
            _createUser('Jovanni', 'Studio59', true),
            _createUser('Banani', '123456789'),
            _createUser('Jeckson', '1234')
        ];
    }
    gUsers = users;
    _saveUsersToStorage();
}

function _createUser(name, pass, admin = false) {
    var todo = {
        id: _makeId(),
        userName: name,
        password: pass,
        lastLoginTime: Date.now(),
        createdAt: Date.now(),
        isAdmin: admin
    }
    return todo;
}

