$(function() {
    var $navigationList = $('.navigation-list');
    var $hamburger = $('.hamburger');
    var $page = $('html, body');
    var $icon = $('.form__icon')

    function scrollPage(event) {
        event.preventDefault();
        var scrollDuration = 1400;

        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, scrollDuration);
        if ($(window).width() < 968) {
            toggleMenu(event)
        }
    }

    function toggleMenu(event) {
        event.preventDefault();
        $navigationList.slideToggle();
    }

    $(window).on('scroll', (function () {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 500) {
            $('.form__icon').toggleClass('form--animate');
        }
    }));

    $(document).on('click', 'a[href^="#"]', scrollPage);
    $hamburger.on('click', toggleMenu);
});

