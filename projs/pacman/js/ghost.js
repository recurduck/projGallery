'use strict'
const GHOST = '&#9780;';
const GHOST_COLOR = ['yellow']

var gGhosts = []
var gIntervalGhosts;
var gDeadGhosts = 0;
var gGhostsAreBlue = false;

function createGhost(board) {
    // TODO
    var ghost = {
        location: {
            i: 8,
            j: 8
        },
        currCellContent: EMPTY,
        color: getRandomColor()
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;

}

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    gFoodCount--;
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);
    createGhost(board);
    gIntervalGhosts = setInterval(moveGhosts, 500)

}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}
function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff();

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j

    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCell === WALL) {moveGhost(ghost); return;}
    if (nextCell === GHOST) return

    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        if(gGhostsAreBlue) {
            //renderCell(gPacman.location, EMPTY)
        } else {
            gameOver()
            renderCell(gPacman.location, EMPTY)
            return
        }
        return
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);

    // Move the ghost
    // update the model

    ghost.location = nextLocation;
    ghost.currCellContent = nextCell;

    gBoard[ghost.location.i][ghost.location.j] = GHOST;

    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))

}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span style="color: ${ghost.color}">${GHOST}</span>`
}