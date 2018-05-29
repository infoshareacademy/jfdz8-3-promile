const heroImg = document.querySelector('.hero__image');
const heroDots = document.querySelector('.hero__dots');
let heroDot = document.getElementsByClassName('image_dot');
let leftButton = document.querySelector('.left_arrow');
let rightButton = document.querySelector('.right_arrow');
const imgLocations = ['assets/images/slideshow_photo/gdansk.jpg',
                      'assets/images/slideshow_photo/gdynia.jpg',
                      'assets/images/slideshow_photo/sopot2.png',];

function createDots() {
    for(var i =0; i < imgLocations.length; i++) {
        const spanDot = document.createElement('span');
        spanDot.classList = "image_dot";
        heroDots.appendChild(spanDot)

    }
    heroDot[0].classList.add("image_dot_active")
}

createDots();
let sliderNum = 0;

function imgChange(x) {
    for (var i = 0; i < heroDot.length; i++) {
        heroDot[i].classList.remove("image_dot_active")
    }
    if (x > 0) {
        if (sliderNum === imgLocations.length - 1) {
            sliderNum = 0;
            heroImg.src = imgLocations[sliderNum];
        } else {
            sliderNum += x;
            heroImg.src = imgLocations[sliderNum];
        }
    } else {
        if (sliderNum === 0) {
            sliderNum = imgLocations.length - 1;
            heroImg.src = imgLocations[sliderNum];
        } else {
            sliderNum += x;
            heroImg.src = imgLocations[sliderNum];
        }
    }
    for(var i = 0; i < heroDot.length; i++) {
        heroDot[sliderNum].classList.add("image_dot_active");
    }

}

rightButton.addEventListener('click', function() {
    imgChange(1);
});
leftButton.addEventListener('click', function() {
    imgChange(-1)
});


