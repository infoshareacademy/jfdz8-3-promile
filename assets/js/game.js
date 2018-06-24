var gameArea = document.querySelector('#gameArea');
var output = '';
var timerInterval;
var score = 0;

var playerPosition = {
    x: 1,
    y: 1
};

var skillPosition = {
    x: 9,
    y: 9
};

var gameBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0],
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
}, 250);

window.addEventListener('keydown', function (event) {
    var newPosition = Object.assign({}, playerPosition);
    pressedKey = event.code;
    moves[pressedKey](newPosition);
    collectSkill(playerPosition, skillPosition);
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
                case 5:
                    output += "<div class='ghost'></div>";
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
    collectElement(playerPosition);
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
        score++
        displayScore()
    }
}

function collectSkill(player, skill) {
    if (player.y === skill.y && player.x === skill.x) {
        score += 50;
        displayScore()
    }
}
//
// function collectCoin(pos) {
//     if (gameBoard[pos.y][pos.x] === 1) {
//         score +=1;
//         displayScore()
//     }
// }


function createElement() {
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'gameboard');
    gameArea.appendChild(newDiv)
}

function displayScore() {
    var scoreBoard = document.querySelector('#scoreboard');
    scoreBoard.innerHTML = '';
    scoreBoard.innerHTML = score;
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

// Random skill generate

function randomPos() {
    var randomNumY = Math.floor(Math.random() * (gameBoard.length - 2) + 1);
    var randomNumX = Math.floor(Math.random() * (gameBoard.length - 2) + 1);
    updatePos(randomNumY, randomNumX)
}

function updatePos(y ,x) {
    skillPosition.y = y;
    skillPosition.x = x;
    if (gameBoard[y][x] === 0 || gameBoard[y][x] === 2) {
        randomPos()
    } else {
        clearSkill()
    }
}

function insertSkill() {
    gameBoard[skillPosition.y][skillPosition.x] = 5;
}

function clearSkill() {
    var prevValue = gameBoard[skillPosition.y][skillPosition.x];
    for (var i = 0; i < gameBoard.length; i++) {
        for (var j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] === 5) {
                gameBoard[i][j] = prevValue ;
            }
        }
    }
    insertSkill()
}

var skillRandom = setInterval(function() {
    randomPos();
}, 5000);




