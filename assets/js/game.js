var gameArea = document.querySelector('#gameArea');
var gameWindow = document.querySelector('.gameWindow');
var startScreen = document.querySelector('.startScreen');
var showInstruction = document.querySelector('.instructions');
var instructions = document.querySelector(".instructions__container");
var startButton = document.querySelector('#play-button');
var resetButton = document.querySelector('#reset-button');
var gameTimer = document.querySelector('#game-timer');
var selectedDifficulty = document.getElementById('difficultyLevels');
var goToGameButton = document.querySelector('.play');
gameBoard = selectedDifficulty;
var output = '';
var timerInterval;
var score = 0;
var highscores = [];
var highscoresNumber = 10;
var randomElementInterval = 4000;
var randomObstacleInterval = 7000;
var enemyInterval = 250;
var gameRenderInterval = 16;
var gameDuration = 30;
var gameRender;
var randomObstacle;
var showSkillAtRandomPosition;
var enemyMovement;
var activePlay = false;
var additionalTime = 0;

var playerPosition = {
    x: 1,
    y: 1
};

var skillPosition = {
    x: 9,
    y: 9
};

var enemyPosition = {
    x: gameBoard.length -2,
    y: gameBoard.length -2
};

var gameBoard = modes.mediumMode;

var clearGameBoard = cloneGameBoard(gameBoard);
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
    if (event.code === 'ArrowDown') {
        event.preventDefault();
        return false;
    } else {
        return true
    }
});

window.addEventListener('keydown', function (event) {
    if (activePlay) {
        var newPosition = Object.assign({}, playerPosition);
        pressedKey = event.code;
        moves[pressedKey](newPosition);
        collision(newPosition);
    }
});

goToGameButton.addEventListener('click', function() {
    if(screen.width > 968) {
        startScreen.style.display = 'none';
        gameWindow.style.display = 'block';
    } else {
        var youShallNotPass = document.createElement('div');
        var notPassText = document.createElement('p');
        startScreen.style.display = 'none';
        youShallNotPass.classList.add('no-pasaran');
        notPassText.innerHTML="Zainwestuj w większy ekran, bo nie przejdziesz....";
        youShallNotPass.appendChild(notPassText);
        document.body.appendChild(youShallNotPass)
    }
});

showInstruction.addEventListener('click', function () {
    instructions.style.display === 'block' ? instructions.style.display = 'none' : instructions.style.display = 'block';
});

selectedDifficulty.addEventListener('change', function(e) {
    clearEvents();
    gameBoard = modes[e.target.value];
    clearGameBoard = cloneGameBoard(gameBoard);
    displayBoard(gameBoard);
});

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

function cloneGameBoard(board) {
    return board.map(x => x.map(y => y))
}

function displayBoard(mode) {
    output = '';
    removeNodeContent(gameArea);
    createGameboard();
    for (var i = 0; i < mode.length; i++) {
        output += "<div class='row'>";
        for (var j = 0; j < mode[i].length; j++) {
            switch (mode[i][j]) {
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
                    output += "<div class='skill-html'></div>";
                    break;
                case 6:
                    output += "<div class='skill-css'></div>";
                    break;
                case 7:
                    output += "<div class='skill-js'></div>";
                    break;
                case 8:
                    output += "<div class='enemy'></div>";
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

displayBoard(modes.mediumMode);
generateEnemy();
checkLocalStorage();
putHighscoresInDOM(getFromLocalStorage());

function update(pos) {
    clearPacman();
    playerPosition = pos;
    gameBoard[pos.y][pos.x] = 2;
}

function collision(playerPosition) {
    pointCollection(playerPosition, skillPosition);
    if ((positionIsWithinBoard(playerPosition, gameBoard))) {
        if (wallCollision(playerPosition) === false) {
            update(playerPosition);
        }
    }
}

function positionIsWithinBoard(position, board) {
    return board[position.y] !== undefined && board[position.y][position.x] !== undefined
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
    if (positionsAreEqual(playerPos, elementPos)) {
        clearInterval(randomElementInterval);
        getCollectiblePointAmount ();
        displayScore();
        randomPos();
    } else if (gameBoard[playerPos.y][playerPos.x] === 1) {
        score += 1;
        displayScore()
    }
}

function getCollectiblePointAmount () {
    if (gameBoard[skillPosition.y][skillPosition.x] === 5) {
        clearInterval(showSkillAtRandomPosition);
        setSkillInterval();
        score += 10;
        additionalTime += 1;
    } else if (gameBoard[skillPosition.y][skillPosition.x] === 6) {
        clearInterval(showSkillAtRandomPosition);
        setSkillInterval();
        score += 50;
        additionalTime += 1
    } else {
        clearInterval(showSkillAtRandomPosition);
        setSkillInterval();
        score += 100;
        additionalTime += 1
    }
}

function createGameboard() {
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'gameboard');
    gameArea.appendChild(newDiv)
}

function displayScore() {
    var scoreBoard = document.querySelector('#scoreboard');
    scoreBoard.innerHTML = '';
    scoreBoard.innerHTML = score;
}

function displayLastScore() {
    var lastScore = score;
    var lastScoreContainer = document.querySelector('#last-score');
    lastScore !== 0 ? lastScoreContainer.innerHTML = lastScore : false;
}

function removeNodeContent(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild)
    }
}

function setTimer(seconds) {
    var startTimer = Date.now();
    var endTimer = startTimer + seconds * 1000;
    displayTimer(seconds);
    console.log(seconds)
    timerInterval = setInterval(function () {
        var timeLeft = additionalTime + Math.round((endTimer - Date.now()) / 1000);
        console.log('otrzymales dodatkowe: ' + additionalTime + ' sek')
        if (timeLeft <= 0) {
            timeLeft = 0;
            clearInterval(timerInterval);
            resetGame();
        }
        displayTimer(timeLeft);
        console.log(timeLeft)
    }, 1000)
}


function displayTimer(seconds) {
    gameTimer.innerHTML = seconds;
}

function addFlexClass() {
    var row = document.querySelectorAll('.row');
    for (var i = 0; i < row.length; i++) {
        var rowItem = Array.prototype.slice.call(row[i].childNodes);
        (rowItem).map(x => x.classList.add('game-element'))
    }
}
// Random skill generate

function randomNums() {
    var randomNumY = Math.floor(Math.random() * (gameBoard.length - 2) + 1);
    var randomNumX = Math.floor(Math.random() * (gameBoard.length - 2) + 1);
    return [randomNumY, randomNumX]
}

function randomPos() {
    var elementPosY = randomNums()[0];
    var elementPosX = randomNums()[1];
    updatePos(elementPosY, elementPosX)
}

function updatePos(y, x) {
    skillPosition.y = y;
    skillPosition.x = x;
    if (gameBoard[y][x] === 0 || gameBoard[y][x] === 2 || gameBoard[y][x] === 6) {
        randomPos()
    } else {
        clearSkill()
    }
}

function insertSkill() {
    var randomlyChosenElement = displayRandomizedCollectible ();
    gameBoard[skillPosition.y][skillPosition.x] = randomlyChosenElement;
}

function clearSkill() {
    var prevValue = gameBoard[skillPosition.y][skillPosition.x];
    gameBoard = gameBoard.map(row => row.map(function (column) {
        if (column === 5 || column === 6 || column === 7) {
            return prevValue
        } else {
            return column
        }
}));
    insertSkill()
}

function generateEnemy() {
    gameBoard[enemyPosition.y][enemyPosition.x] = 8;
}

function getRandomNumber(multiplier) {
    return Math.floor(Math.random() * multiplier) + 1;
}

function randomDirectionMovement() {
    var direction = getRandomNumber(4);
    var enemyPositionCandidate = {
        x: enemyPosition.x,
        y: enemyPosition.y
    };
    switch (direction) {
        case 1:
            enemyPositionCandidate.x += 1;
            break;
        case 2:
            enemyPositionCandidate.x -= 1;
            break;
        case 3:
            enemyPositionCandidate.y += 1;
            break;
        case 4:
            enemyPositionCandidate.y -= 1;
            break;
        default:
    }
    if (enemyCanMoveIntoPosition(enemyPositionCandidate, gameBoard)) {
        enemyPosition.x = enemyPositionCandidate.x;
        enemyPosition.y = enemyPositionCandidate.y;
        movement();
    } else {
        randomDirectionMovement();
    }
}

function enemyCanMoveIntoPosition(position, gameBoard) {
    return positionIsWithinBoard(position, gameBoard) && wallCollision(position) === false
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
    resetGame();
    activePlay = true;
    score = 0;
    additionalTime = 0;
    clearEvents();
    displayScore();
    gameRender = setInterval(function () {
        displayBoard(gameBoard);
        handlePlayerEnemyCollision(playerPosition, enemyPosition);
    }, gameRenderInterval);
    randomObstacle = setInterval(function () {
        obstacleCoords()
    }, randomObstacleInterval);
    setSkillInterval();
    enemyMovement = setInterval(function () {
        randomDirectionMovement()
    }, enemyInterval);
    setTimer(gameDuration)
}

function clearEvents() {
    gameBoard = cloneGameBoard(clearGameBoard);
    clearInterval(timerInterval);
    clearInterval(randomObstacle);
    clearInterval(showSkillAtRandomPosition);
    clearInterval(enemyMovement);
    playerPosition.x = 1;
    playerPosition.y = 1;
    skillPosition.x = 9;
    skillPosition.y = 9;
    enemyPosition.x = gameBoard.length -2;
    enemyPosition.y = gameBoard.length -2;
}

function resetGame() {
    activePlay = false;
    clearEvents();
    updateHighscores();
    displayLastScore();
    score = 0;
    displayScore();
    gameTimer.innerHTML = '0';

    function updateHighscores() {
        if(score !== 0) {
            highscores = [...getFromLocalStorage(), score];
            highscores.sort((a, b) => b - a);
            var highscoresToStore = validateHighscoreContent(highscores);
            putHighscoresInDOM(highscoresToStore)
        }
    }
}

function getFromLocalStorage() {
    var storedHighscores = localStorage.getItem('highscores');
    storedHighscores = storedHighscores.split(",").map(Number).filter(score => score !== 0);
    return storedHighscores;
}

function checkLocalStorage () {
    if (!localStorage.getItem('highscores')) {
        localStorage.setItem('highscores', highscores);
    }
}

function putHighscoresInDOM(array) {
    var highscoreRanking = document.querySelector('#highscore-ranking');
    removeNodeContent(highscoreRanking);
    array.forEach(function (element) {
        var newScore = document.createElement('p');
        newScore.innerHTML = element;
        highscoreRanking.appendChild(newScore)
    })
}

function validateHighscoreContent (highscoreArray) {
    var newHighscores = [...highscoreArray];
    newHighscores = newHighscores.slice(0, highscoresNumber);
    localStorage.setItem('highscores', newHighscores);
    return newHighscores
}

function movement() {
    clearEnemy();
    gameBoard[enemyPosition.y][enemyPosition.x] = 8;
}
function clearEnemy() {
    var prevValue = gameBoard[enemyPosition.y][enemyPosition.x];
    gameBoard = gameBoard.map(row => row.map(column => (column === 8 ? prevValue : column)));
}

function handlePlayerEnemyCollision(player, enemy) {
    if (positionsAreEqual(player, enemy)) {
        resetGame()
    }
}

function positionsAreEqual(a, b) {
    return a.x === b.x && a.y === b.y
}

function randomizeCollectibleElement () {
    if (getRandomNumber(100) >= 50) {
        return 0;
    } else if (getRandomNumber(100) <= 50 && getRandomNumber(100) >=10) {
        return 1;
    } else {
        return 2;
    }
}

function displayRandomizedCollectible () {
    var randomCollectible = randomizeCollectibleElement();
    switch (randomCollectible) {
        case 0:
            return 5;
        case 1:
            return 6;
        case 2:
            return 7;
        default:
    }
}

function setSkillInterval() {
    showSkillAtRandomPosition = setInterval(function () {
        randomPos();
    }, randomElementInterval);
}

