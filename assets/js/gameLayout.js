
var playButton = document.querySelector(".play");
var instructionsButton = document.querySelector(".instructions");
var instructionsBackButton = document.querySelector('.back');
var buttonsContainer = document.querySelector('.buttons__container');
var instructions = document.querySelector(".instructions__container");
var gameContainer = document.querySelector(".gameContainer");
var startScreen = document.querySelector(".startScreen");
var chooseLevel = document.querySelector(".chooseLevel");
var levelButton = document.querySelectorAll(".level");


playButton.addEventListener('click', function () {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
});

instructionsButton.addEventListener('click', function () {
    var instructions = document.querySelector(".instructions__container");
    buttonsContainer.style.display = 'none';
    instructions.style.display = 'block';
});

instructionsButton.addEventListener('click', function () {
    instructions.style.display = 'block';
    buttonsContainer.style.display = 'none';
});

instructionsBackButton.addEventListener('click', function () {
    buttonsContainer.style.display = 'flex';
    instructions.style.display = 'none';
});

levelButton.addEventListener('click', function () {
    gameContainer.style.display = 'block';
    chooseLevel.style.display = 'none';
});



