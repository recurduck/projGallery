'use strict'
var gPacScaleX = 1;
var gPacRotate = 0;
var PACMAN = `<img style="transform: scaleX(${gPacScaleX}) rotate(${gPacRotate}deg);" src="img/packman.png"></img>`; //'😷'

var gPacman;
var gIsSuper = false;
var gSuperEated = false;


function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 10,
            j: 8
        },
        currCellContent: EMPTY,
        isSuper: false
    }
    gFoodCount += (board[gPacman.location.i][gPacman.location.j] === FOOD) ? -1 : 0 
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);

    var nextCell = gBoard[nextLocation.i][nextLocation.j];


    // return if cannot move
    if (nextCell === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (gGhostsAreBlue) {
            for (var i = 0; i < gGhosts.length; i++)
                if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                    var ghost = gGhosts.splice(i, 1)[0];
                    if (ghost.currCellContent === FOOD)
                        gFoodCount--; 
                        
                }
            gDeadGhosts++;
            //renderCell(gPacman.location, EMPTY)
        } else {
            gameOver()
            renderCell(gPacman.location, EMPTY)
            return
        }
    }
    // hitting a food?  updateScore
    if (nextCell === FOOD) {
        updateScore(1);
        gFoodCount--;
    }
    if (nextCell === CHERRY) {
        updateScore(10);
    }
    // hitting a super food?  Change color monsters - blue, kill gost from ghost array, end after 5 sec and ghosts isSuper(cant eat), 
    if (nextCell === SUPER_FOOD) {
        if (!gIsSuper) {
            gIsSuper = true;
            gSuperEated = true;
            for (var i = 0; i < gGhosts.length; i++)
                gGhosts[i].color = 'blue';
            gGhostsAreBlue = true;
            setTimeout(() => {
                for (var i = 0; i < gGhosts.length; i++)
                    gGhosts[i].color = getRandomColor();
                gGhostsAreBlue = false;
                for (var i = 0; i < gDeadGhosts; gDeadGhosts--)
                    createGhost(gBoard);
                gIsSuper = false;
                gSuperEated = false;
            }, 5000);
        }
    }
    // update the model 
    gBoard[gPacman.location.i][gPacman.location.j] = (!gSuperEated && gIsSuper && gPacman.currCellContent === SUPER_FOOD) ? SUPER_FOOD : EMPTY;
    // update the DOM
    renderCell(gPacman.location, (!gSuperEated && gIsSuper && gPacman.currCellContent === SUPER_FOOD) ? SUPER_FOOD : EMPTY)
    if (gSuperEated && gIsSuper && gPacman.currCellContent === SUPER_FOOD) gSuperEated = false; 
    // Move the pacman
    // update the model
    gPacman.location = nextLocation;
    gPacman.currCellContent = gBoard[gPacman.location.i][gPacman.location.j]
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

    // update the DOM
    renderCell(gPacman.location, PACMAN);


    if (gFoodCount === 0) {
        gItsVictory = true
        gameOver();
        return
    }
}

function countFoodOnBoard(board) {
    var count = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            count += (board[i][j] === '.') ? 1 : 0;
        }
    }
    return count;
}


function getNextLocation(ev) {
    // figure out nextLocation
    // console.log('ev.code', ev.code)
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (ev.code) {
        case 'ArrowUp':
            nextLocation.i--;
            gPacRotate = -90;
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPacRotate = 90;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            gPacRotate = 0;
            gPacScaleX = -1;
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacRotate = 0;
            gPacScaleX = 1;
            break;
        default: return null
    }
    PACMAN = `<img style="transform: scaleX(${gPacScaleX}) rotate(${gPacRotate}deg);" src="img/packman.png"></img>`
    return nextLocation;
}