var player = "X";
var toCollect = "P";
var wall = "O";
var score = 0;
var board = createBoard(10, 10);
var playerPosition = {
    x: 0,
    y: 0
};
var walls = [];
var moves = {
    ArrowRight: function(playerPosition) {
        playerPosition.x += 1
    },
    ArrowLeft: function(playerPosition) {
        playerPosition.x -= 1
    },
    ArrowUp: function(playerPosition) {
        playerPosition.y -= 1
    },
    ArrowDown: function(playerPosition) {
        playerPosition.y += 1
    }
};

var smallDot = {
    x: Math.floor(Math.random() * (board.length-1)),
    y: Math.floor(Math.random() * (board.length-1))
};

function setStartingPosition() {
    var board = createBoard(10, 10);
    board[playerPosition.x][playerPosition.y] = player;
    createWallsCoords();
    showWalls();
    console.table(board)
}
setStartingPosition();

window.addEventListener('keydown', function (event) {
    var newPosition = Object.assign({}, playerPosition);
    pressedKey = event.code;
    moves[pressedKey](newPosition);
    collision(newPosition);
});

function createBoard(x, y) {
    return Array(x).fill(0).map(function(element) {
        return Array(y).fill('');
    })
}

function createWallsCoords() {
    for (var i = 0; i < 33; i++) {
        wallX = Math.floor(Math.random() * (board.length-1));
        wallY = Math.floor(Math.random() * (board.length-1));
        walls.push({x: wallX, y: wallY});
    }
}

function showWalls() {
    for (var i = 0; i < walls.length; i++) {
        board[walls[i].y][walls[i].x] = wall;
    }
    console.table(board)
}

function update(pos) {
    var board = createBoard(10, 10);
    playerPosition = pos;
    board[pos.y][pos.x] = player;
    board[smallDot.y][smallDot.x] = toCollect;
    for (var i = 0; i < walls.length; i++) {
        board[walls[i].y][walls[i].x] = wall;
    }
    console.table(board)
}

function collision(playerPosition) {
    if ((inBoard(playerPosition.x) &&
            inBoard(playerPosition.y)) &&
            !wallCollision(playerPosition.x) &&
            !wallCollision(playerPosition.y))
    {
        updateScore(playerPosition)
        update(playerPosition);
    }
}

function wallCollision(playerPosition) {
    let wallColl;
    for (var i = 0; i < walls.length; i++) {
        wallColl = (playerPosition.x === walls[i].x) && (playerPosition.y === walls[i].y);
        return false;
    }
    return wallColl;
}


function updateScore(playerPosition){
    if (smallDot.x === playerPosition.x &&
        smallDot.y === playerPosition.y )
    {
        smallDot.x = Math.floor(Math.random() * (board.length-1));
        smallDot.y = Math.floor(Math.random() * (board.length-1));
        score++;
        console.log(score)
    }
}

setInterval(function () {
    collision(playerPosition)
}, 10500);

function inBoard(playerPosition) {
    return playerPosition >= 0 && playerPosition <= board.length - 1
}

