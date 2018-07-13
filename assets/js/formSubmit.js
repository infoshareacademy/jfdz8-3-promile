const submitButton = document.querySelector('.submit');
const navigationLogo = document.querySelector('.center-logo');
const newLogoSource = 'assets/images/LOGO1_fire.png';
const normalLogoSource = 'assets/images/LOGO1.png';

submitButton.addEventListener('click', checkLocalStorage);
navigationLogo.addEventListener('mouseover', function() {
    changeLogo(newLogoSource)
});
navigationLogo.addEventListener('mouseout', function() {
    changeLogo(normalLogoSource)
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
