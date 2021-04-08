var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'GLUE'

var GAMER_IMG = '<img src="img/Najiel.png" />';
var BALL_IMG = '<img src="img/hamas.png" />';
var GLUE_IMG = '<img src="img/candy.png" />';
var pop = new Audio('sound/pop.wav');

var gBoard;
var gGamerPos;
var gGameIsOn = false;
var gCurrBallsNum;
var gCollected;
var gIsGlue = false;

var gBallInterval = null
var gGlueInterval = null

function initGame() {
	gGameIsOn = false;
	gGamerPos = { i: 2, j: 9 };
	gCurrBallsNum = 2
	gCollected = 0;
	gBoard = buildBoard();
	renderBoard(gBoard);
	document.querySelector('h1 span').innerText = ''
	document.querySelector('.restart').style.display = 'none';
}


function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				if (i === 5 || j === 5) cell.type = FLOOR;
				else cell.type = WALL;
				// cell.type = WALL
			}

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;

	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			cellClass += (currCell.type === FLOOR) ? ' floor' : ' wall'

			strHTML += `\t<td class="cell ${cellClass}" onclick="moveTo(${i}, ${j})">\n`;

			switch (currCell.gameElement) {
				case GAMER: strHTML += GAMER_IMG; break;
				case BALL: strHTML += BALL_IMG; break;
			}
			
			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
	if (!gGameIsOn) {
		gGameIsOn = true
		gBallInterval = setInterval(addNewBall, 2000)
		gGlueInterval = setInterval(addNewGlue, 5000)
	}

	if (gIsGlue) return;
	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;
	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	// We also Allow the movement through passages
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)
		|| (((i === 0 || i === gBoard.length - 1) && j === gGamerPos.j)
			|| ((j === 0 || j === gBoard[0].length - 1) && i === gGamerPos.i))
	) {

		if (targetCell.gameElement === BALL) {
			collectBall();
		}
		else if (targetCell.gameElement === GLUE) {
			gIsGlue = true;
			setTimeout(function () { gIsGlue = false }, 3000);
		}

		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		// MOVING to selected position
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// DOM:
		renderCell(gGamerPos, GAMER_IMG);
		// console.log('gBoard[gGamerPos.i][gGamerPos.j]', gBoard[gGamerPos.i][gGamerPos.j])

	} else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;

	// Handle movement with keys
	// Also allow to move through passages (if inside case)
	switch (event.key) {
		case 'ArrowLeft':
			if (j === 0) moveTo(i, gBoard[0].length - 1);
			else moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			if (j === gBoard[0].length - 1) moveTo(i, 0);
			else moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			if (i === 0) moveTo(gBoard.length - 1, j);
			else moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			if (i === gBoard.length - 1) moveTo(0, j);
			else moveTo(i + 1, j);
			break;
	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function getEmptyCells(board) {
	var emptyCells = [];
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var currCellPos = { i, j };
			var currCell = board[i][j];
			if (currCell.type === FLOOR && !currCell.gameElement) {
				emptyCells.push(currCellPos)
			}
		}
	}
	return emptyCells;
}

// render new Ball to the board
function addNewBall() {
	var emptyCells = getEmptyCells(gBoard)
	if (!emptyCells.length) return
	var cell = emptyCells[getRandomInt(0, emptyCells.length - 1)]
	//Model
	gBoard[cell.i][cell.j].gameElement = BALL;
	//Dom
	renderCell({ i: cell.i, j: cell.j }, BALL_IMG)
	gCurrBallsNum++;
}

// render new Ball to the board
function addNewGlue() {
	var emptyCells = getEmptyCells(gBoard)
	if (!emptyCells.length) return
	var cell = emptyCells[getRandomInt(0, emptyCells.length - 1)]
	//Model
	gBoard[cell.i][cell.j].gameElement = GLUE;
	//Dom
	renderCell({ i: cell.i, j: cell.j }, GLUE_IMG)

	setTimeout(function () {
		if (gBoard[cell.i][cell.j].gameElement === GLUE) {
			//Model
			gBoard[cell.i][cell.j].gameElement = null;
			//Dom
			renderCell({ i: cell.i, j: cell.j }, '')
		}
	}, 3000);
}

function collectBall() {
	pop.play();
	document.querySelector('h1 span').innerText = `Collected: ${++gCollected}`
	gCurrBallsNum--;
	if (gCurrBallsNum === 0) {
		gGameIsOn = false
		clearInterval(gBallInterval)
		clearInterval(gGlueInterval)
		document.querySelector('.restart').style.display = 'block';
	}
}




