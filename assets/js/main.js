$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1400);
});

$(document).ready(function(){
    $(".hamburger").on('click', function(event) {
        event.preventDefault();
        $(".navigation-list").toggleClass('hide');
    });
});
/*
$('.carousel').carousel({
    interval: 4000,
    pause: false
});

*/