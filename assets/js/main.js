$(function() {
    var $navigationList = $('.navigation-list');
    var $hamburger = $('.hamburger');
    var $page = $('html, body');

    function scrollPage(event) {
        event.preventDefault();
        var scrollDuration = 1400;

        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, scrollDuration);
        toggleMenu(event);
    }

    function toggleMenu(event) {
        event.preventDefault();
        $navigationList.slideToggle();
    }

    $(document).on('click', 'a[href^="#"]', scrollPage);
    $hamburger.on('click', toggleMenu);
});

