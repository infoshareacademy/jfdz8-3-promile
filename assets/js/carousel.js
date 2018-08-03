const heroImg = document.querySelector('.hero__image');
const heroDots = document.querySelector('.hero__dots');
const heroDot = document.getElementsByClassName('image_dot');
const leftButton = document.querySelector('.left_arrow');
const rightButton = document.querySelector('.right_arrow');
const imgLocations = ['assets/images/slideshow_photo/gdansk.jpg',
                      'assets/images/slideshow_photo/gdynia.jpg',
                      'assets/images/slideshow_photo/sopot.png',];
function createDots() {
    for(let i =0; i < imgLocations.length; i++) {
        const spanDot = document.createElement('span');
        spanDot.classList = "image_dot";
        spanDot.setAttribute("id", i);
        heroDots.appendChild(spanDot)
    }
    heroDot[0].classList.add("image_dot_active")
}
createDots();

function addClass() {
    for(let i = 0; i < heroDot.length; i++) {
        heroDot[sliderNum].classList.add("image_dot_active");
    }
}

function clearClass() {
    for (let i = 0; i < heroDot.length; i++) {
        heroDot[sliderNum].classList.remove("image_dot_active")
    }
}

let sliderNum = 0;
let sliderInterval = setInterval(nextImg,6000);

function nextImg() {
    imgChange(sliderNum + 1);
}

function prevImg() {
    imgChange(sliderNum - 1)
}

function imgChange(x) {
    clearClass();
    heroImg.classList.remove("fade");
    heroImg.offsetHeight;
    sliderNum = (x + imgLocations.length) % imgLocations.length;
    heroImg.src = imgLocations[sliderNum];
    heroImg.classList.add("fade");
    addClass()
}

function pauseSlideShow() {
    clearInterval(sliderInterval);
}

rightButton.addEventListener('click', function() {
    nextImg(); pauseSlideShow();
});
leftButton.addEventListener('click', function() {
    prevImg(); pauseSlideShow();
});

function dotEventAdd() {
    for (let i = 0; i < heroDot.length; i++) {
        heroDot[i].addEventListener("click", function(e) {
            imgChange(e.target.id); pauseSlideShow()
        })
    }
}

dotEventAdd();









