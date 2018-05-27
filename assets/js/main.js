$(function() {
    var $navigationList = $('.navigation-list');
    var $hamburger = $('.hamburger');
    var $page = $('html, body');
    var $icon = $('.form__icon');
    var $txt_form = $('.form__hidden');
    var $show_input = $(".show_inputs");
    var $form_inputs = $(".form__inputs");

    var anchors = document.querySelectorAll('[id^="anchor"]');
    var navi = document.querySelectorAll('li.hover');
    const sectionPosition = [];

    function takePosition() {
        for (var i = 0; i < anchors.length; i++) {
            sectionPosition.push(anchors[i].getBoundingClientRect().top)
        }
        return sectionPosition
    }

    function navHighlight() {
        var scrollDist = window.pageYOffset;
        for (var i = 0; i < anchors.length; i++) {
            if (takePosition()[i] <= scrollDist) {
                navi.forEach(function(n) {
                    n.classList.remove('highlight')
                });
                navi[i].classList.add('highlight');
            }
        }
    };

    function scrollPage(event) {
        event.preventDefault();
        var scrollDuration = 1400;

        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, scrollDuration);
        if ($navigationList.is(":visible") && $(window).width() < 968) {
            toggleMenu(event)
        }
    }

    function toggleMenu(event) {
        event.preventDefault();
        $navigationList.slideToggle();
    }

    $(window).on('scroll', (function() {
        if ($(window).scrollTop() >= $('#anchor-form').offset().top - 250) {
            $(window).scrollTop();
            $icon.addClass('form--animate');
            setTimeout(function() {
                $txt_form.html('* Dbamy o Twoje dane lepiej niż Facebook');
                $txt_form.addClass('typewrite');
            }, 2000)
        }
    }));

    function showInputs() {
        $form_inputs.slideToggle();
        $(this).remove();
    }

    $(document).on('click', 'a[href^="#"]', scrollPage);
    $hamburger.on('click', toggleMenu);
    $show_input.on('click', showInputs);
    window.addEventListener('scroll', navHighlight);

    /* Map Script */

    var mymap = L.map('mapid').setView([54.40315833, 18.56952222], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    var marker = L.marker([54.40315833, 18.56952222]).addTo(mymap);
    marker.bindPopup("<b>Witaj!</b><br>Tu InfoShare Academy").openPopup();
});