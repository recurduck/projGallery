'use strict'


function getProjs() {
    return gProjs;
}

function getProjById(projId) {
    var proj = gProjs.find(function (proj) {
        return projId === proj.id
    })
    return proj
}

var gProjs = [
    {
        'id': 'minesweeper',
        'name': 'Minesweeper',
        'title': 'Minesweeper',
        'desc': 'Minesweeper is a single-player puzzle video game. The objective of the game is to clear a rectangular board containing hidden \'mines\' or bombs without detonating any of them, with help from clues about the number of neighboring mines in each field. The game originates from the 1960s, and it has been written for many computing platforms in use today. It has many variations and offshoots.',
        'url': 'projs/minesweeper',
        'publishedAt': 1616926210000,
        'labels': ['Matrixes', 'click events']
    },
    {
        'id': 'pacman',
        'name': 'Pac-man',
        'title': 'Pac-man',
        'desc': 'Pac-Man is a Japanese video game franchise published, developed and owned by Bandai Namco Entertainment (formerly Namco). Entries have been developed by a wide array of other video game companies, including Midway Games, Atari and Mass Media, Inc.. The eponymous first entry was released in arcades in 1980 by Namco, and published by Midway Games in North America. Most Pac-Man games are maze chase games, however it has also delved into other genres, such as platformers, racing, and sports. Several games in the series have been released for a multitude of home consoles and are included in many Namco video game compilations.',
        'url': 'projs/pacman',
        'publishedAt': 1616580610000,
        'labels': ['Matrixes', 'keyboard events']
    },
    {
        'id': 'touchnum',
        'name': 'Touchnum',
        'title': 'Touch nums',
        'desc': 'This is a small game for learning the order of numbers',
        'url': 'projs/touchnum',
        'publishedAt': 1616407810000,
        'labels': ['Matrixes', 'click events']
    },
    {
        'id': 'guesswho',
        'name': 'GuessWho',
        'title': 'Guess Who',
        'desc': 'Guess the Person AI',
        'url': 'projs/guesswho',
        'publishedAt': 1617703810000,
        'labels': ['click events']
    },
    {
        'id': 'bookshop',
        'name': 'Bookshop',
        'title': 'Book shop',
        'desc': 'This is a small controler to manage your book shop',
        'url': 'projs/bookshop',
        'publishedAt': 1617617410000,
        'labels': ['CRUDL', 'click events']
    },
    {
        'id': 'safecontent',
        'name': 'SafeContent',
        'title': 'Safecontent',
        'desc': 'a way to login and manage this as an admin',
        'url': 'projs/safecontent',
        'publishedAt': 1617531010000,
        'labels': ['MVC', 'click events']
    },
    {
        'id': 'todo',
        'name': 'Todo',
        'title': 'Todo',
        'desc': 'Manage your todo list',
        'url': 'projs/todo',
        'publishedAt': 1617531010000,
        'labels': ['MVC', 'click events']
    },
    {
        'id': 'calculator',
        'name': 'Calculator',
        'title': 'Calculator',
        'desc': 'Help you calculate things',
        'url': 'projs/calculator',
        'publishedAt': 1616407810000,
        'labels': ['begining css', 'click events']
    },
    {
        'id': 'ballboard',
        'name': 'Ballboard',
        'title': 'Ballboard',
        'desc': 'Ball board game must take all the balls before they will spread',
        'url': 'projs/ballboard',
        'publishedAt': 1616494210000,
        'labels': ['begining css', 'click events']
    },
    
];

function convertTimestampToString(time) {
    var date = new Date(time); 
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
}
