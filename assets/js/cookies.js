
window.onload = function() {
    var container = document.createElement('div'), link = document.createElement('a');
    container.setAttribute('id', 'cookieinfo');
    container.setAttribute('class', 'cookie-notification');
    container.innerHTML = '<h6>Ta strona wykorzystuje pliki cookie</h6><p>Używamy informacji zapisanych za pomocą' +
        ' plików cookies w celu zapewnienia maksymalnej wygody w korzystaniu z naszego serwisu. Mogą też korzystać' +
        ' z nich współpracujące z nami firmy badawcze oraz reklamowe. Jeżeli wyrażasz zgodę na zapisywanie informacji' +
        ' zawartej w cookies kliknij na &bdquo;x&rdquo; w prawym górnym rogu tej informacji. Jeśli nie wyrażasz zgody,' +
        ' ustawienia dotyczące plików cookies możesz zmienić w swojej przeglądarce.</p>'
    document.body.appendChild(container);

    link.setAttribute('href','#');
    link.setAttribute('title', 'Zamknij');
    link.innerHTML = 'x';
    container.appendChild(link);


    function clickHandler(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        document.body.removeChild(container)
    }
    if (link.addEventListener) {
        link.addEventListener('click', clickHandler);
    } else {
        link.attachEvent('onclick', clickHandler);
    }
    return true;
};
};