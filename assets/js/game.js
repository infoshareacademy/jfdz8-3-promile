var player;
var score;
var gameBoard = [
    '          ',
    '          ',
    '          ',
    '          ',
    '          ',
    '          ',
    '          ',
    '          ',
    '          ',
    '          '
];


function createBoard(x, y) {
    return Array(x).fill(0).map(function(element) {
        return Array(y).fill('');
    })
}

var board = createBoard(10, 10);