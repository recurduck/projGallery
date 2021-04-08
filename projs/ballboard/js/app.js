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
var gGameIsOn;
var gCurrBallsNum = 2
var gCollected = 0;
var gFreeze = false;

function initGame() {
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
				if (i === 5 || j === 5) null; 
				else cell.type = WALL;
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

	console.log(board);
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

			cellClass += (currCell.type === FLOOR) ? ' floor' : (currCell.type === WALL) ? ' wall' : (currCell.type === WALL) ? ' glue' : null;

			strHTML += `\t<td class="cell ${cellClass}" onclick="moveTo(${i}, ${j})">\n`;

			switch (currCell.gameElement) {
				case GAMER: strHTML += GAMER_IMG; break;
				case BALL: strHTML += BALL_IMG; break;
				case GLUE: strHTML += GLUE_IMG; break;
			}
			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	console.log('strHTML is:');
	console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
	if (!gGameIsOn) {
		gGameIsOn = [setInterval(renderNewBall, 1000), setInterval(renderGlue, 5000)]
	}
	if (gFreeze) return;
	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;
	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

		if (targetCell.gameElement === BALL) {
			collected();
		}
		else if (targetCell.gameElement === GLUE) {
			gFreeze = true;
			setInterval(() => {gFreeze = false},3000);
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


	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

// render new Ball to the board
function renderNewBall() {
	var iBall = getRandomInt(1, gBoard.length - 2)
	var jBall = getRandomInt(1, gBoard[0].length - 2)
	if (gBoard[iBall][jBall].gameElement === null) {
		//Model
		gBoard[iBall][jBall].gameElement = BALL;
		//Dom
		renderCell({ i: iBall, j: jBall }, BALL_IMG)
		gCurrBallsNum++;
	} else {
		renderNewBall();
	}
}

// render new Ball to the board
function renderGlue() {
	var iGlue = getRandomInt(1, gBoard.length - 2)
	var jGlue = getRandomInt(1, gBoard[0].length - 2)
	if (gBoard[iGlue][jGlue].gameElement === null) {
		//Model
		gBoard[iGlue][jGlue].gameElement = GLUE;
		//Dom
		renderCell({ i: iGlue, j: jGlue }, GLUE_IMG)
		setInterval(() => {
		//Model
		gBoard[iGlue][jGlue].gameElement = FLOOR;
		//Dom
		renderCell({ i: iGlue, j: jGlue }, '')
		},3000);
	} else {
		renderGlue();
	}
}

function collected() {
	pop.play();
	document.querySelector('h1 span').innerText = `Collected: ${++gCollected}`
	gCurrBallsNum--;
	if (gCurrBallsNum === 0) {
		clearInterval(gGameIsOn[0])
		clearInterval(gGameIsOn[1])
		document.querySelector('.restart').style.display = 'block';
	}
}




