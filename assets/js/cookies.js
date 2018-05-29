
window.onload = function() {
    var container = document.createElement('div'), link = document.createElement('a');
    var cookiemonster = document.createElement('img');

    container.setAttribute('id', 'cookieinfo');
    container.setAttribute('class', 'cookie-notification');
    container.innerHTML = '<h6>Ta strona wykorzystuje pliki cookie</h6><p>Używamy informacji zapisanych za pomocą' +
        ' plików cookies w celu zapewnienia maksymalnej wygody w korzystaniu z naszego serwisu. Mogą też korzystać' +
        ' z nich współpracujące z nami firmy badawcze oraz reklamowe. Jeżeli wyrażasz zgodę na zapisywanie informacji' +
        ' zawartej w cookies kliknij na &bdquo;x&rdquo; w prawym górnym rogu tej informacji. Jeśli nie wyrażasz zgody,' +
        ' ustawienia dotyczące plików cookies możesz zmienić w swojej przeglądarce.</p>'

    link.setAttribute('href','');
    link.setAttribute('title', 'Zamknij');
    link.innerHTML = 'x';

    cookiemonster.setAttribute('id','cookiemonster');


    function clickHandler(e) {
        e.preventDefault();
        document.body.removeChild(container)
    }

    link.addEventListener('click', clickHandler);
    container.appendChild(link);
    container.appendChild(cookiemonster);
    document.body.appendChild(container);

    function monsterMove() {
        var element = document.getElementById('cookiemonster');
        var position = -250;
        var starter = setInterval(movement, 5);

        function movement() {
            if(position === 50) {
                clearInterval(starter);
            } else {
                position++;
                element.style.left = position + 'px';
            }
        }
    }
    return monsterMove();
};