import $ from 'jquery';

let _timer,
    MIN_LENGTH = 3;

const removeAutocompletePopup = () => {
    $('.b-autocomplete__popup').remove();
};

const openAutocompletePopup = ($form, html) => {
    let rect = $form.get(0).getBoundingClientRect();
    removeAutocompletePopup();
    let $container = $('<div class="b-autocomplete__popup"/>')
        .html(html)
        .appendTo(document.body);
    $container.css({
        top: rect.top + $form.height(),
        left: rect.left + $form.width() - $container.width(),
    });
};

const fetchAutocomplete = $input => {
    $.ajax({
        url: $input.closest('form').attr('data-autocomplete-url'),
        data: {
            q: $input.val(),
        },
        method: 'get',
        dataType: 'html',
        success: data => {
            openAutocompletePopup(
                $input.closest('.b-search-form__search'),
                data
            );
        },
    });
};

$(document)
    .on('click', e => {
        let $target = $(e.target);
        if (
            $target.closest('.b-autocomplete__popup').length === 0 &&
            $target.closest('.b-search-form__input').length === 0
        ) {
            removeAutocompletePopup();
        }
    })
    .on('click', '.b-autocomplete__item', e => {
        let $target = $(e.target).closest('.b-autocomplete__item'),
            url = $target.attr('data-url');
        removeAutocompletePopup();
        window.location = url;
    })
    .on('click', '.b-search-form__input', e => {
        let $input = $(e.target);
        if ($input.val().length >= MIN_LENGTH) {
            fetchAutocomplete($input);
        }
    })
    .on('keydown', '.b-search-form__input', e => {
        let $input = $(e.target);
        if ($input.val().length >= MIN_LENGTH) {
            if (_timer) {
                clearTimeout(_timer);
            }
            _timer = setTimeout(() => {
                fetchAutocomplete($input);
            }, Number($input.attr('data-timeout')) || 350);
        }
    });
