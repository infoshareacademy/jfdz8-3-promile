const submitButton = document.querySelector('.submit');
const navigationLogo = document.querySelector('.center-logo');
const centerLogo = document.querySelector('.anchor-link');
const newLogoSource = 'assets/images/LOGO1_fire.png';
const normalLogoSource = 'assets/images/LOGO1.png';
const linkToGame = 'http://www.3-promile.jfdz8.is-academy.pl/game.html';

submitButton.addEventListener('click', checkLocalStorage);
navigationLogo.addEventListener('mouseover', function() {
    changeLogo(newLogoSource)
});

navigationLogo.addEventListener('mouseout', function() {
    changeLogo(normalLogoSource)
});

centerLogo.addEventListener('click', function () {
    if (localStorage.getItem('submitted')) {
        putNewAttributes()
    }
});

function checkLocalStorage() {
    if (!localStorage.getItem('submitted')) {
        localStorage.setItem('submitted', 'submitted')
    }
}

function changeLogo(source) {
    if (localStorage.getItem(('submitted'))) {
        navigationLogo.src = source
    }
}

function putNewAttributes() {
    centerLogo.setAttribute('href', linkToGame);
    centerLogo.setAttribute('target', "_blank");
}
