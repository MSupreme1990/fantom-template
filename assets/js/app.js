import './bootstrap';

import $ from 'jquery';
import FastClick from 'fastclick';
import 'slick-carousel';
import 'nouislider';
import 'wnumb';

// UI
import './ui/menu';
import './ui/slider';

import './filter';
import './map';
import './product';
import './modal';
import './cart';

import './mindy';

import './notify';
import './tab';
import './autocomplete';

$(document)
    .on('click', '.b-product-sidebar__label', e => {
        e.preventDefault();

        $(e.target)
            .closest('.b-product-sidebar__row')
            .find('.b-product-sidebar__value')
            .toggleClass('b-product-sidebar__value_open');
    })
    .on('click', '.b-product-sidebar__reset', e => {
        if (!confirm('Вы уверены?')) {
            e.preventDefault();
        }
    })
    .on('click', '.b-header-menu__toggle', e => {
        e.preventDefault()

        let $target = $(e.target).closest('.b-header-menu__toggle')

        if ($target.hasClass('b-header-menu__toggle_open')) {
            $target.removeClass('b-header-menu__toggle_open')
            $('.b-header-menu__menu').removeClass('b-header-menu__menu_open')
        } else {
            $target.addClass('b-header-menu__toggle_open')
            $('.b-header-menu__menu').addClass('b-header-menu__menu_open')
        }
    })
    .on('click', '[data-video]', e => {
        e.preventDefault();

        let $target = $(e.target).closest('[data-video]');

        $.magnificPopup.open(
            {
                items: {
                    src: $target.attr('data-video'),
                },
                type: 'iframe',
            },
            0
        );
    })

    .on('click', '.b-spoiler__readmore', e => {
        e.preventDefault();

        let $target = $(e.target),
            $spoiler = $target.closest('.b-spoiler'),
            $container = $spoiler.find('.b-spoiler__container');

        $container.removeClass('b-spoiler__container');
        $target.remove();
    });

$(() => {
    FastClick.attach(document.body);

    $('[data-video]').magnificPopup({
        delegate: 'a',
        type: 'iframe',
    });
    $('.b-homepage-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        mobileFirst: true,
    });

    $('.b-product-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        mobileFirst: true,
    });

    /*Слайдер для карточки товара*/
    $('.b-product-image__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        fade: true,
        asNavFor: '.b-product-nav__slider',
    });

    $('.b-product-nav__slider').slick({
        autoplay: true,
        autoplaySpeed: 1500,
        infinite: true,
        mobileFirst: true,
        dots: false,
        focusOnSelect: true,
        asNavFor: '.b-product-image__slider',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    vertical: true,
                    slidesToShow: 6,
                    slidesToScroll: 6,
                },
            },
            {
                breakpoint: 320,
                settings: {
                    vertical: false,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
        ],
    });

    $('.b-header-media__slider').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
});
