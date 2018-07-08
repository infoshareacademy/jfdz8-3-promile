var body = document.body;
var anchors = document.querySelectorAll('[id^="anchor"]');
var naviElement = document.querySelectorAll('li.hover');
var naviBar = document.querySelector('.navigation');
var navBarHeight = naviBar.offsetHeight;

window.addEventListener('scroll', navHighlight);

function takePosition() {
    let sectionPosition = [];
    for (var i = 0; i < anchors.length; i++) {
        sectionPosition.push(anchors[i].offsetTop)
    }
    return sectionPosition
}

function navHighlight() {
    var scrollDist = window.pageYOffset;
    for (var i = 0; i < anchors.length; i++) {
        if (takePosition()[i] - navBarHeight <= scrollDist &&
            scrollDist !== body.offsetHeight + window.innerHeight) {
            naviElement.forEach(function(element) {
                element.classList.remove('highlight')
            });
            naviElement[i].classList.add('highlight');
        } else if (window.innerHeight + scrollDist >= body.offsetHeight) {
            naviElement.forEach(function(n) {
                n.classList.remove('highlight')
            });
            naviElement[naviElement.length - 1].classList.add('highlight')
        }
    }
};