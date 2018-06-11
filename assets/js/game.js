var player = "X";
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

function setStartingPosition() {
    var board = createBoard(10, 10);
    board[playerPosition.x][playerPosition.y] = player;
    console.table(board)
}
setStartingPosition();

var moves = {
    ArrowRight: function() {
      playerPosition.x += 1
},
ArrowLeft: function() {
    playerPosition.x -= 1
},
ArrowUp: function() {
    playerPosition.y -= 1
},
ArrowDown: function() {
    playerPosition.y += 1
}
};

window.addEventListener('keydown', function(event) {
    pressedKey = event.code;
    moves[pressedKey](playerPosition);
    collision();
});

function update() {
    var board = createBoard(10, 10);
    console.log(playerPosition);
    board[playerPosition.y][playerPosition.x] = player;
    console.table(board)
}

function collision() {
    if (inBoard(playerPosition.x) && inBoard(playerPosition.y)) {
        update();
    }
}

function inBoard(position) {
    return position >= 0 && position <= board.length - 1
}

