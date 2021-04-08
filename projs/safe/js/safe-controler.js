'use strict'

function onInit() {
    renderLoginBox();
}

function renderLoginBox() {
    var strHTML = `
    <div class="safe"><table>
        <h1>Sign in!</h1>
        <tbody>
        <tr>
            <td><label for="loginUser">User Name</label></td>
            <td><input class="input-name" id="loginUser" type="text" name="userName" /></td>
        </tr>
        <tr>
            <td><label for="loginUserPass">Password</label></td>
            <td><input class="input-pass" id="loginUserPass" type="password" name="pass" /></td>
        </tr>
        <span><tr><td colspan="2" class="login-modal"></td></tr></span>
        <tr>
            <td><button onclick="onLoginUser()">Login</button></td>
            <td><button onclick="onRegisterUser()">Register</button></td>
        </tr>
        </tbody>
    </table></div>`
    var elSafe = document.querySelector('.main')
    elSafe.innerHTML = strHTML;
}

function renderSecretContent(user) {
    var strHTML = `
    <div class="header">
        <h2>Welcome ${user.userName}</h2>
        <button onclick="logout()">logout</button>
        ${(user.isAdmin) ? '<a href="admin.html">Admin Section</a>' : ''}
    </div>
    <div class="main"><h3>Secret Content</h3></div>
    `;
    document.querySelector('.main').innerHTML = strHTML
}

function renderUsersTable() {
    var strHTML = `
    <table class="user-table">
    <tbody>
        <tr>
            <td>Username</td> 
            <td>Password</td> 
            <td>Last login time</td> 
            <td>is Admin</td> 
    </tr>`;
    var users = getUsersForDisplay()
    strHTML += users.map(user => {
        return `<tr class="userDisplay-${user.id}">
            <td>${user.userName}</td>
            <td>${user.password}</td>
            <td>${user.lastLoginTime}</td>
            <td>${user.isAdmin}</td>
            <td><button onclick="removeUser(">X</button></td>
            </tr>`;
    });
    strHTML += '</tbody></table>';

    document.querySelector('.main').innerHTML = strHTML
}


function logout() {
    window.location.href = 'index.html';
    _saveLoggenInUserToStorage('');
    renderLoginBox()
}

function onLoginUser() {
    var userName = document.querySelector('.input-name').value;
    var password = document.querySelector('.input-pass').value;
    var elLoginNote = document.querySelector('.login-modal')
    switch (validateDetails(userName, password)) {
        case -1: elLoginNote.innerText = '*user doesn\'t exist!'; break;
        case 0: elLoginNote.innerText = '*Wrong password Please try again..'; break;
        case 1:
            logIn(userName);
            break;
    }
}

function logIn(loggedUser) {
    var loggedUser = gUsers.find(user => user.userName === loggedUser);
    _saveLoggenInUserToStorage(loggedUser);
    renderSecretContent(loggedUser)
}

function onRegisterUser() {
    alert('Register');
}
