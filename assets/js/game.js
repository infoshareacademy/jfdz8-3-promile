var player = 2;
var toCollect = document.getElementsByClassName('element');
var body = document.querySelector('body');
var score = 0;
var gameDiv = document.getElementById('gameboard');

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
    clearPacman()
    console.log(playerPosition);
    playerPosition = pos;
    gameBoard[pos.y][pos.x] = 2;

    // gameBoard[smallDot.y][smallDot.x] = toCollect;
}

function collision(playerPosition) {
    if ((inBoard(playerPosition.x) && inBoard(playerPosition.y)) ) {
        update(playerPosition);
        // if (smallDot.x === playerPosition.x && smallDot.y === playerPosition.y ){
        //     smallDot.x = Math.floor(Math.random() * (gameBoard.length-1));
        //     smallDot.y = Math.floor(Math.random() * (gameBoard.length-1));
        //     score++;
        //     console.log(score)
        // }
    }
}

function inBoard(playerPosition) {
    return playerPosition >= 0 && playerPosition <= gameBoard.length - 1
}

function clearPacman() {
    for (var i = 0; i < gameBoard.length; i++) {
        for (var j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] === 2) {
                gameBoard[i][j] = 1;
            }
        }
    }
}






