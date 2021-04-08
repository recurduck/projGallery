'use strict'
const WALL = '<div class="wall"></div>';'⬜️'
const FOOD = '<div class="food"></div>';
const EMPTY = ' ';
const SUPER_FOOD = '🥙';
const CHERRY = '🍒'


var gBoard;
var gGame = {
    score: 0,
    isOn: false
}


var gItsVictory = false;
var gModal = document.querySelector('.modal');
var gFoodCount = 0;
var gIntervalCherry;

//Initialize Game
function init() {
    gItsVictory = false;
    gFoodCount = 0;
    gBoard = buildBoard()
    console.log(gBoard)
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    gIntervalCherry = setInterval(createCherry, 15000)
}

//Build Board
function buildBoard() {
    var SIZE = 17;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gFoodCount++;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                ((j === 4 || j === 12) && i === 1) ||
                ((j === 4 || j === 12 || j === 2 || (j >=6 && j <= 10) || j === 14) && (i === 2)) ||
                ((j < 3 || j === 4 || j === 6 || j === 8 || j === 10 || j === 12 || j > 13) && i === 4) ||
                ((j === 4 || j === 12) && i === 5) ||
                ((j >= 2 && j <= 4 || j >= 6 &&  j <= 10 || j >= 12 && j <= 14) && (i === 6 || i === 14)) ||
                ((j === 2 || j === 4 ||  j === 7 ||  j === 9 || j === 12 || j === 14) && i === 8) ||
                ((j === 2 || j === 4 ||  j >= 7 &&  j <= 9 || j === 12 || j === 14) && i === 9) ||
                ((j === 2 || j === 4 ||  j === 7 ||  j === 9 || j === 12 || j === 14) && i === 10) ||
                ((j === 2 || j === 14) && i === 13) ||
                ((j === 2 || j === 4 || j > 5 && j < 11 || j === 12 || j === 14 ) && i === 12)
                ) {
                board[i][j] = WALL;
                gFoodCount--
            }
            if ((i === 1 && j === 1) ||
                (i === SIZE - 2 && j === 1) ||
                (i === 1 && j === SIZE - 2) ||
                (i === SIZE - 2 && j === SIZE - 2)) {
                board[i][j] = SUPER_FOOD;
                gFoodCount--;
            }
            
        }
    }
    // var SIZE = 10;
    // var board = [];
    // for (var i = 0; i < SIZE; i++) {
    //     board.push([]);
    //     for (var j = 0; j < SIZE; j++) {
    //         board[i][j] = FOOD;
    //         gFoodCount++;
    //         if (i === 0 || i === SIZE - 1 ||
    //             j === 0 || j === SIZE - 1 ||
    //             (j === 3 && i > 4 && i < SIZE - 2)) {
    //             board[i][j] = WALL;
    //             gFoodCount--
    //         }
    //         if ((i === 1 && j === 1) ||
    //             (i === SIZE - 2 && j === 1) ||
    //             (i === 1 && j === SIZE - 2) ||
    //             (i === SIZE - 2 && j === SIZE - 2)) {
    //             board[i][j] = SUPER_FOOD;
    //             gFoodCount--;
    //         }
    //     }
    // }
    return board;
}


function updateScore(diff) {
    // update model
    gGame.score += diff;
    // and dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    clearInterval(gIntervalCherry);
    gIntervalCherry = null;
    openModal()
}

function playAgainClicked() {
    closeModal();
    updateScore(-gGame.score)
    init();
}

function closeModal() {
    gModal.style.display = 'none';
}

function openModal() {
    document.getElementById('gameover').innerText = (gItsVictory) ? 'Victory!' : 'GAME OVER';
    document.querySelector('.score').innerText = gGame.score;
    gModal.style.display = 'block';
}

function createCherry() {
    var emptyCells = getEmptyCells();
    if(emptyCells.length != 0) {   
        var emptyCell = emptyCells[getRandomIntInclusive(0,emptyCells.length-1)];
        //update the Model
        gBoard[emptyCell.i][emptyCell.j] = CHERRY;
        // update the DOM
        renderCell(emptyCell, getCherryHTML())
    }
}

function getCherryHTML() {
    return `<span>${CHERRY}</span>`
}

function getEmptyCells() {
	var emptyCells = [];
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[0].length; j++) {
			var currCellPos = { i, j };
			var currCell = gBoard[i][j];
			if (currCell === EMPTY) {
				emptyCells.push(currCellPos)
			}
		}
	}
	return emptyCells;
}
