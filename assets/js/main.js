$(function() {
    var $navigationList = $('.navigation-list');
    var $hamburger = $('.hamburger');
    var $page = $('html, body');
    var $icon = $('.form__icon');
    var $txt_form = $('.form__hidden');
    var $show_input = $(".show_inputs");
    var $form_inputs = $(".form__inputs");


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
            if ($(window).scrollTop() >= $('#anchor-form').offset().top - 150) {
                $(window).scrollTop();
                $icon.addClass('form--animate');
                    setTimeout(function() {
                        $txt_form.html('* Dbamy o Twoje dane lepiej niż Facebook');
                        $txt_form.addClass('typewrite');
                    }, 2000)
            }
    }));

    function showInputs() {
        $form_inputs.slideToggle(1000);
        $(this).remove();
}

    $(document).on('click', 'a[href^="#"]', scrollPage);
    $hamburger.on('click', toggleMenu);
    $show_input.on('click', showInputs);

    /* Map Script */

    var mymap = L.map('mapid').setView([54.40315833, 18.56952222], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    var marker = L.marker([54.40315833, 18.56952222]).addTo(mymap);
    marker.bindPopup("<b>Witaj!</b><br>Tu InfoShare Academy").openPopup();
});

