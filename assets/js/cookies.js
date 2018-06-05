
    window.onload = function() {
        if (!localStorage.getItem('tres-promiles-cookies')) {
            var notification = document.createElement('div'), link = document.createElement('a'),
                cookiemonster = document.createElement('div'), cookiebubble = document.createElement('p'),
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
            cookiebubble.innerHTML = 'Do you want some cookies?';

            function clickHandler(e) {
                e.preventDefault();
                document.body.removeChild(container);
                localStorage.setItem('tres-promiles-cookies', '1');
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
                var element2 = document.getElementById('cookiebubble');
                var position = -500;
                var starter = setInterval(movement, 8);

                function movement() {
                    return (position ===0 ? clearInterval(starter):(position++, element.style.bottom=position + 'px',
                        element2.style.bottom = position +'px'))
                }
            }
            return monsterMove();
        }
    };