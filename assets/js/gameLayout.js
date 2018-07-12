
var playButton = document.querySelector(".play");
var instructionsButton = document.querySelector(".instructions");

playButton.addEventListener('click', function () {
    var gameContainer = document.querySelector(".gameContainer");
    var startScreen = document.querySelector(".startScreen");
    gameContainer.style.display = 'block';
    startScreen.style.display = 'none';
});

instructionsButton.addEventListener('click', function () {
    var instructions = document.querySelector(".instructions__container");
    instructions.style.display = 'block';
});