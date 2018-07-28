
var playButton = document.querySelector(".play");
var instructionsButton = document.querySelector(".instructions");
var instructionsBackButton = document.querySelector('.back');
var buttonsContainer = document.querySelector('.buttons__container');
var instructions = document.querySelector(".instructions__container");
var gameContainer = document.querySelector(".gameContainer");
var startScreen = document.querySelector(".startScreen");
var chooseLevel = document.querySelector(".chooseLevel");
var levelButton = document.querySelector(".level");
var cityBackground = document.querySelector(".wall");
var skillToCollect = document.querySelector(".ghost");

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

// levelButton.addEventListener('click', function () {
//     gameContainer.style.display = 'block';
//     chooseLevel.style.display = 'none';
// });

function generateCity() {
    var randomCity = Math.floor(Math.random() * 10) + 1;
    var cityImages = [
        "url('assets/images/city_background/1.png')",
        "url('assets/images/city_background/2.png')",
        "url('assets/images/city_background/3.png')",
        "url('assets/images/city_background/4.png')",
        "url('assets/images/city_background/5.png')",
        "url('assets/images/city_background/6.png')",
        "url('assets/images/city_background/7.png')",
        "url('assets/images/city_background/8.png')",
        "url('assets/images/city_background/9.png')",
        "url('assets/images/city_background/10.png')"];
    cityBackground.style.backgroundImage = cityImages[randomCity];
}

function generateSkill() {
    var randomSkill = Math.floor(Math.random() * 5) + 1;
    var skillImages = [
        "url('assets/images/skills/react.png')",
        "url('assets/images/skills/css.png')",
        "url('assets/images/skills/html.png')",
        "url('assets/images/skills/javascript.png')",
        "url('assets/images/skills/nodejs.png')"];
    skillToCollect.style.backgroundImage = skillImages[randomSkill];
}