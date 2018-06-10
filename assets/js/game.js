var player = "X";
var score;
var board = createBoard(10, 10);

function generateBoard() {
    var boardCell = document.createElement('div');
    document.body.appendChild(boardCell);
    boardCell.setAttribute("class", "cell")
}

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


// function setCurrentPosition(x, y) {
//    return board[x][y] = player
// }
//
// setCurrentPosition(1,1);

window.addEventListener('keydown', function(event) {
    pressedKey = event.code;
    update();
});


function update() {
    var board = createBoard(10, 10);
    moves[pressedKey](playerPosition);
    board[playerPosition.y][playerPosition.x] = player;
    console.table(board)
}

