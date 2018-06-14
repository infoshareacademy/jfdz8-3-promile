var player = "X";
var toCollect = "P";
var score;
var board = createBoard(10, 10);

function createBoard(x, y) {
    return Array(x).fill(0).map(function(element) {
        return Array(y).fill('');
    })
}

var playerPosition = {
    x: 0,
    y: 0
};


var smallDot = {
    x: Math.floor(Math.random() * (board.length-1)),
    y: Math.floor(Math.random() * (board.length-1))
};

function setStartingPosition() {
    var board = createBoard(10, 10);
    board[playerPosition.x][playerPosition.y] = player;
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
}, 1500);

window.addEventListener('keydown', function (event) {
    var newPosition = Object.assign({}, playerPosition);
    pressedKey = event.code;
    moves[pressedKey](newPosition);
    collision(newPosition);
});

function update(pos) {
    console.log(playerPosition,smallDot);
    var board = createBoard(10, 10);
    playerPosition = pos;
    board[pos.y][pos.x] = player;
    board[smallDot.y][smallDot.x] = toCollect;
    console.table(board)

}

function collision(playerPosition) {
    if ((inBoard(playerPosition.x) && inBoard(playerPosition.y))) {
        update(playerPosition);
        if (smallDot.x === playerPosition.x){
            smallDot.x = Math.floor(Math.random() * (board.length-1))
        }
    }
}

function inBoard(playerPosition) {
    return playerPosition >= 0 && playerPosition <= board.length - 1
}
