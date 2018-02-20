import $ from 'jquery';

$(document)
    .on('click', '.b-menu__link_drop', e => {
        e.preventDefault();

        $('.b-menu__link')
            .removeClass('b-menu__link_active');
        $('.b-menu__dropdown_active')
            .removeClass('b-menu__dropdown_active');

        $(e.target)
            .toggleClass('b-menu__link_active')
            .closest('.b-menu__item')
            .find('.b-menu__dropdown')
            .toggleClass('b-menu__dropdown_active');
    })
    .on('click', e => {
        let $target = $(e.target);

        if ($target.closest('.b-menu').length === 0) {
            $('.b-menu__link')
                .removeClass('b-menu__link_active');
            $('.b-menu__dropdown_active')
                .removeClass('b-menu__dropdown_active');
        }
    });
