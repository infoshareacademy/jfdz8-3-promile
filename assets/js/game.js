var player = document.getElementsByClassName('pacman');
var toCollect = document.getElementsByClassName('element');
var body = document.querySelector('body');
var score = 0;
var playerPosition = {
    x: 1,
    y: 1
};

var gameBoard = [
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,2,1,1,1,1,1,1,1,3,0],
  [0,1,0,1,0,1,0,1,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,1,0,1,0,1,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,1,0,1,0,1,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,1,0,1,0,1,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0]
];

var output = '';

function displayBoard() {
  output = '';
  emptyBoard(body);
  createElement();
  for (var i = 0; i < gameBoard.length; i++) {
    output += "<div class='row'>";
    for (var j = 0; j < gameBoard[i].length; j++) {
      if (gameBoard[i][j] == 0) {
        output += "<div class='wall'></div>";
      } else if (gameBoard[i][j] == 1) {
        output += "<div class='coin'></div>";
      } else if (gameBoard[i][j] === 2) {
        output += "<div class='pacman'></div>";
      } else if (gameBoard[i][j] === 3) {
        output += "<div class='element'></div>";
      }
  }
    output += "</div>"
  }
  var gameDiv = document.getElementById('gameboard');
  gameDiv.innerHTML = output;
}


function createElement() {
  var newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'gameboard');
  body.appendChild(newDiv)
}

setInterval(function () {
  displayBoard()
}, 1000);

function emptyBoard(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}
//
//
// var smallDot = {
//     x: Math.floor(Math.random() * (gameBoard.length-1)),
//     y: Math.floor(Math.random() * (gameBoard.length-1))
// };
//
// function setStartingPosition() {
//     gameBoard[playerPosition.x][playerPosition.y] = player;
// }
// setStartingPosition();
//
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

window.addEventListener('keydown', function (event) {
    var newPosition = Object.assign({}, playerPosition);
    pressedKey = event.code;
    moves[pressedKey](newPosition);
    collision(newPosition);
});

function update(pos) {
  console.log(playerPosition);
    playerPosition = pos;
    gameBoard[pos.y][pos.x] = pos.classList.add('pacnan');
    gameBoard[smallDot.y][smallDot.x] = toCollect;
}

function collision(playerPosition) {
    if ((inBoard(playerPosition.x) && inBoard(playerPosition.y)) ) {
        update(playerPosition);
        if (smallDot.x === playerPosition.x && smallDot.y === playerPosition.y ){
            smallDot.x = Math.floor(Math.random() * (gameBoard.length-1));
            smallDot.y = Math.floor(Math.random() * (gameBoard.length-1));
            score++;
            console.log(score)
        }
    }
}

function inBoard(playerPosition) {
    return playerPosition >= 0 && playerPosition <= gameBoard.length - 1
}






