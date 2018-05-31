
window.onload = function() {
    var notification = document.createElement('div'), link = document.createElement('a'),
        cookiemonster = document.createElement('img'), cookiebubble = document.createElement('p'),
        container = document.createElement('div'), monster_container = document.createElement('div');

    container.setAttribute('id','cookies');
    monster_container.setAttribute('id','monster-container');
    notification.setAttribute('id', 'cookieinfo');
    notification.setAttribute('class', 'cookie-notification');
    notification.innerHTML = '<h6>Ta strona wykorzystuje pliki cookie</h6><p>Używamy informacji zapisanych za pomocą' +
        ' plików cookies w celu zapewnienia maksymalnej wygody w korzystaniu z naszego serwisu. Mogą też korzystać' +
        ' z nich współpracujące z nami firmy badawcze oraz reklamowe. Jeżeli wyrażasz zgodę na zapisywanie informacji' +
        ' zawartej w cookies kliknij na &bdquo;x&rdquo; w prawym górnym rogu tej informacji. Jeśli nie wyrażasz zgody,' +
        ' ustawienia dotyczące plików cookies możesz zmienić w swojej przeglądarce.</p>'

    link.setAttribute('href','');
    link.setAttribute('title', 'Zamknij');
    link.innerHTML = 'x';

    cookiemonster.setAttribute('id','cookiemonster');
    cookiebubble.setAttribute('id','cookiebubble');

    function clickHandler(e) {
        e.preventDefault();
        document.body.removeChild(container)
    }

    link.addEventListener('click', clickHandler);
    container.appendChild(monster_container);
    container.appendChild(notification);
    notification.appendChild(link);
    monster_container.appendChild(cookiemonster);
    monster_container.appendChild(cookiebubble);
    document.body.appendChild(container);

    function monsterMove() {
        var element = document.getElementById('cookiemonster');
        var position = -250;
        var starter = setInterval(movement, 5);

        function movement() {
            return (position ===50 ? clearInterval(starter):(position++, element.style.left=position + 'px'));
        }
    }
    monsterMove();
};