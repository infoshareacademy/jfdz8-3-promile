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

    var mymap = L.map('mapid').setView([54.40315833, 18.56952222], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    var marker = L.marker([54.40315833, 18.56952222]).addTo(mymap);

    marker.bindPopup("<b>Hello user!</b><br>We are InfoShare Academy").openPopup();
});

