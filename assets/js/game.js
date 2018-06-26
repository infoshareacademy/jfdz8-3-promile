var gameArea = document.querySelector('#gameArea');
var startButton = document.querySelector('#play-button');
var resetButton = document.querySelector('#reset-button');
var gameTimer = document.querySelector('#game-timer');
var output = '';
var timerInterval;
var score = 0;
var randomElementInterval = 4000;
var randomObstacleInterval = 7000;
var gameRenderInterval = 250;
var gameRender;
var randomObstacle;
var showSkillAtRandomPosition;
var enemyMovement;
var getEnemyMovement;
var direction;

var enemyPosition = {
    x: 9,
    y: 1
}

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

var clearGameBoard = [...gameBoard];

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

window.addEventListener('keydown', function (event) {
    var newPosition = Object.assign({}, playerPosition);
    pressedKey = event.code;
    moves[pressedKey](newPosition);
    collision(newPosition);
});

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

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
                    break;
                case 6:
                    output += "<div class='enemy'></div>";
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

displayBoard();

function update(pos) {
    clearPacman();
    playerPosition = pos;
    gameBoard[pos.y][pos.x] = 2;
}

function collision(playerPosition) {
    pointCollection(playerPosition, skillPosition);
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
    gameBoard = gameBoard.map(row => row.map(column => (column === 2 ? 1 : column)));
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

function pointCollection(playerPos, elementPos) {
    if (playerPos.y === elementPos.y && playerPos.x === elementPos.x) {
        score += 50;
        displayScore();
        randomPos();
    } else if (gameBoard[playerPos.y][playerPos.x] === 1) {
        score += 1;
        displayScore()
    }
}

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

function addFlexClass() {
    var row = document.querySelectorAll('.row');
    for (var i = 0; i < row.length; i++) {
        var rowItem = Array.prototype.slice.call(row[i].childNodes);
        (rowItem).map(x => x.classList.add('flex-item'))
    }
}

function displayTimer(seconds) {
    gameTimer.innerHTML = seconds;
}

// Random skill generate

function randomNums() {
    var randomNumY = Math.floor(Math.random() * (gameBoard.length - 2) + 1);
    var randomNumX = Math.floor(Math.random() * (gameBoard.length - 2) + 1);
    return [randomNumY, randomNumX]
}

function randomPos() {
    var elementPosY  = randomNums()[0];
    var elementPosX = randomNums()[1];
    updatePos(elementPosY, elementPosX)
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
    gameBoard = gameBoard.map(row => row.map(column => (column === 5 ? prevValue : column)));
    insertSkill()
}

function generateEnemy() {
    gameBoard[enemyPosition.y][enemyPosition.x] = 6;
}
generateEnemy();

function getDirection() {
    direction = Math.floor(Math.random()*4)+1;
    randomDirectionMovement(direction);
    enemyCollision(enemyPosition)
}

function randomDirectionMovement(direction) {
    switch(direction) {
        case 1:
            enemyPosition.x += 1;
            break;
        case 2:
            enemyPosition.x -= 1;
            break;
        case 3:
            enemyPosition.y += 1;
            break;
        case 4:
            enemyPosition.y -= 1;
            break;
        default:
    }
}

function enemyCollision(element) {
    if ((inBoard(element.x) && inBoard(element.y))) {
        if (wallCollision(element) === false) {
            randomDirectionMovement(enemyPosition);
            console.log(enemyPosition)
        }
    } else {
        getDirection();
    }
}

// Random obstacle generate

function obstacleCoords() {
    var obstacleY = randomNums()[1];
    var obstacleX = randomNums()[0];
    if (gameBoard[obstacleY][obstacleX] === 2 || gameBoard[obstacleY][obstacleX] === 0) {
        obstacleCoords();
    } else {
        insertObstacle(obstacleY, obstacleX)
    }
}

function insertObstacle(y, x) {
    gameBoard[y][x] = 0;
}

function startGame() {
    score = 0;
    clearEvents();
    displayScore();
    gameRender = setInterval(function () {
        displayBoard();
    }, gameRenderInterval);
    randomObstacle = setInterval(function() {
        obstacleCoords()
    }, randomObstacleInterval);
    showSkillAtRandomPosition = setInterval(function() {
        randomPos();
    },randomElementInterval);
    enemyMovement = setInterval(function(){
        getDirection();

    }, 1000);
    setTimer(60)
}

function clearEvents() {
    gameBoard = clearGameBoard;
    clearInterval(timerInterval);
    clearInterval(randomObstacle);
    clearInterval(showSkillAtRandomPosition);
    playerPosition.x = 1;
    playerPosition.y = 1;
    skillPosition.x = 9;
    skillPosition.y = 9;
}


function resetGame() {
    clearEvents();
    score = 'SCORE';
    displayScore();
    gameTimer.innerHTML = 'TIMER'
}




