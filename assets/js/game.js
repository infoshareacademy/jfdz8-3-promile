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

function createBoard(x, y) {
    return Array(x).fill(0).map(function(element) {
        return Array(y).fill('');
    })
}

function createWallsCoords() {
    for (var i = 0; i < 15; i++) {
        wallX = Math.floor(Math.random() * (board.length-1));
        wallY = Math.floor(Math.random() * (board.length-1));
        walls.push({x: wallX, y: wallY});
    }
}

createWallsCoords();

function showWalls() {
    for (var i = 0; i < walls.length; i++) {
        board[walls[i].y][walls[i].x] = wall;
    }
    console.table(board)
}

var smallDot = {
    x: Math.floor(Math.random() * (board.length-1)),
    y: Math.floor(Math.random() * (board.length-1))
};

function setStartingPosition() {
    var board = createBoard(10, 10);
    board[playerPosition.x][playerPosition.y] = player;
    showWalls();
    console.table(board)
}
setStartingPosition();

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

setInterval(function () {
    collision(playerPosition)
}, 10500);

window.addEventListener('keydown', function (event) {
    var newPosition = Object.assign({}, playerPosition);
    pressedKey = event.code;
    moves[pressedKey](newPosition);
    collision(newPosition);
});

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
    if ((inBoard(playerPosition.x) && inBoard(playerPosition.y)) && !wallCollision(playerPosition)) {
        update(playerPosition);
        if (smallDot.x === playerPosition.x && smallDot.y === playerPosition.y ){
            smallDot.x = Math.floor(Math.random() * (board.length-1));
            smallDot.y = Math.floor(Math.random() * (board.length-1));
            score++;
            console.log(score)
        }
    }
}

function inBoard(playerPosition) {
    return playerPosition >= 0 && playerPosition <= board.length - 1
}

function wallCollision(playerPosition) {
    let wallColl;
    for (var i = 0; i < walls.length; i++) {
        if ((playerPosition.x === walls[i].x) && (playerPosition.y === walls[i].y)) {
            wallColl = true;
        } else {
            wallColl = false;
        }
    }
    return wallColl;
}


