import $ from 'jquery';

let _timer;

$(document).on(
    'click',
    '.b-product-sidebar__value input, .b-product-sidebar__value select, .b-product-sidebar__value textarea',
    e => {
        let $input = $(e.target),
            $form = $input.closest('form'),
            $container = $('[data-filter-ajax-container]');

        if (_timer) {
            clearTimeout(_timer);
        }

        _timer = setTimeout(() => {
            $container.addClass('b-loading');
            $.ajax({
                url: $form.attr('action'),
                data: $form.serialize(),
                method: 'GET',
                dataType: 'html',
                success: data => {
                    $container.replaceWith(data);
                },
            });
        }, 350);
    }
);
