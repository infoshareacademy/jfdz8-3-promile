var gameArea = document.querySelector('#gameArea');
var controlPanel = document.querySelector('#controlPanel');
var scoreBoard = document.querySelector('#scoreboard');

var output = '';
var score;
var timerInterval;

var playerPosition = {
    x: 1,
    y: 1
};

var gameBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 3, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var moves = {
    ArrowRight: function (playerPosition) {
        playerPosition.x += 1
    },
    ArrowLeft: function (playerPosition) {
        playerPosition.x -= 1
    },
    ArrowUp: function (playerPosition) {
        playerPosition.y -= 1
    },
    ArrowDown: function (playerPosition) {
        playerPosition.y += 1
    }
};

var gameRender = setInterval(function () {
    displayBoard();
    getScore();
    displayScore();
}, 250);

window.addEventListener('keydown', function (event) {
    var newPosition = Object.assign({}, playerPosition);
    pressedKey = event.code;
    moves[pressedKey](newPosition);
    collision(newPosition);
});

function displayBoard() {
    output = '';
    emptyBoard(gameArea);
    createElement();
    for (var i = 0; i < gameBoard.length; i++) {
        output += "<div class='row'>";
        for (var j = 0; j < gameBoard[i].length; j++) {
            switch (gameBoard[i][j]) {
                case 0:
                    output += "<div class='wall'></div>";
                    break;
                case 1:
                    output += "<div class='coin'></div>";
                    break;
                case 2:
                    output += "<div class='pacman'></div>";
                    break;
                case 3:
                    output += "<div class='element'></div>";
                    break;
                case 4:
                    output += "<div class='collected'></div>";
                    break;
                default:
                    break;
            }
        }
        output += "</div>"
    }
    var gameDiv = document.getElementById('gameboard');
    gameDiv.innerHTML = output;
    addFlexClass()
}

function update(pos) {
    clearPacman();
    playerPosition = pos;
    gameBoard[pos.y][pos.x] = 2;
    getScore();
}

function collision(playerPosition) {
    if ((inBoard(playerPosition.x) && inBoard(playerPosition.y))) {
        if (wallCollision(playerPosition) === false) {
            update(playerPosition);
        }
    }
}

function inBoard(playerPosition) {
    return playerPosition >= 1 && playerPosition <= gameBoard.length - 2
}

function clearPacman() {
    for (var i = 0; i < gameBoard.length; i++) {
        for (var j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] === 2) {
                gameBoard[i][j] = 1;
            }
        }
    }
    collectElement(playerPosition)
}

function wallCollision(pos) {
    for (var i = 0; i < gameBoard.length; i++) {
        for (var j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[pos.y][pos.x] === 0) {
                return true
            }
        }
        return false
    }
}

function collectElement(pos) {
    if (gameBoard[pos.y][pos.x] === 1) {
        gameBoard[pos.y][pos.x] = 4;
    }
}

function createElement() {
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'gameboard');
    gameArea.appendChild(newDiv)
}

function getScore() {
    score = 0;
    for (var i = 0; i < gameBoard.length; i++) {
        for (var j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] === 4) {
                score++
            }
        }
    }
    return score;
}

function displayScore() {
    var scoreBoard = document.querySelector('#scoreboard');
    scoreBoard.innerHTML = '';
    scoreBoard.innerHTML = getScore()
}

function emptyBoard(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild)
    }
}
function setTimer(seconds) {
    var startTimer = Date.now();
    var endTimer = startTimer + seconds * 1000;
    displayTimer(seconds);
    timerInterval = setInterval(function(){
        var timeLeft = Math.round((endTimer - Date.now()) / 1000);
            if (timeLeft <= 0) {
                timeLeft=0;
                clearInterval(timerInterval);
            }
        displayTimer(timeLeft);
    }, 1000)
}

setTimer(60);

function addFlexClass() {
    var row = document.querySelectorAll('.row');
    for (var i = 0; i < row.length; i++) {
        var rowItem = Array.prototype.slice.call(row[i].childNodes);
        (rowItem).map(x => x.classList.add('flex-item'))
    }
}

function displayTimer(seconds) {
    var gameTimer = document.querySelector('#game-timer');
    gameTimer.innerHTML = seconds;
}
