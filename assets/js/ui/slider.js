import $ from 'jquery';
import 'owl.carousel';

$(() => {
    $('.b-slider__homepage').owlCarousel({
        loop: false,
        items: 1,
        nav: true,
        navText: ['keyboard_arrow_left', 'keyboard_arrow_right'],
    });

    $('.b-homepage-sidebar-slider').owlCarousel({
        loop: false,
        items: 1,
        nav: true,
        navText: ['keyboard_arrow_left', 'keyboard_arrow_right'],
    });

    $('.b-partner-slider').owlCarousel({
        loop: true,
        autoplay: true,
        nav: false,
        responsive : {
            // breakpoint from 0 up
            0 : {
                items: 2,
            },
            // breakpoint from 480 up
            480 : {
                items: 3,
            },
            // breakpoint from 768 up
            768 : {
                items: 6,
            }
        }
    });
});
