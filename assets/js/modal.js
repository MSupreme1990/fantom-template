import $ from 'jquery';
import 'magnific-popup';

$.extend(true, $.magnificPopup.defaults, {
    tClose: 'Закрыть (Esc)', // Alt text on close button
    tLoading: 'Загрузка...', // Text that is displayed during loading. Can contain %curr% and %total% keys
    gallery: {
        tPrev: 'Назад (&larr;)', // Alt text on left arrow
        tNext: 'Далее (&rarr;)', // Alt text on right arrow
        tCounter: '%curr% из %total%', // Markup for "1 of 7" counter
    },
    image: {
        tError: '<a href="%url%">Изображение</a> не может быть загружено.', // Error message when image could not be loaded
    },
    ajax: {
        tError: '<a href="%url%">Содержимое</a> не может быть загружено.', // Error message when ajax request failed
    },
});

function wrapModalContent(content) {
    let $content = $('<div class="b-modal__content"/>');
    $content.append(content);
    return $('<div/>').append($content);
}

function attachFormEvent(element) {
    let $element = $(element);

    $element.find('form').on('submit', e => {
        e.preventDefault();
        let $form = $(e.target);

        $.ajax({
            url: $form.attr('action'),
            method: 'POST',
            data: $form.serialize(),
            success: data => {
                let $newContent = wrapModalContent(data);
                $element.find('form').off('submit');

                let $container = $element.find('.b-modal__content');
                $container.replaceWith($newContent);

                attachFormEvent($newContent);
            },
        });
    });
}

$(document)
    .on('click', '[data-modal], .mmodal', e => {
        e.preventDefault();

        let $link = $(e.target).closest('a'),
            href = $link.attr('href'),
            type = href.charAt(0) == '#' ? 'inline' : 'ajax';

        $.magnificPopup.open(
            {
                items: {
                    src: href,
                },
                delegate: 'a',
                type: type,
                removalDelay: 0,
                midClick: true,
                mainClass: 'mfp-zoom-in',
                callbacks: {
                    open: function() {},
                    close: function() {
                        $(this.content)
                            .find('form')
                            .off('click');
                    },
                    parseAjax: function(resp) {
                        resp.data = wrapModalContent(resp.data);
                    },
                    ajaxContentAdded: function() {
                        attachFormEvent(this.content);
                    },
                },
            },
            0
        );
    })
    .on('click', '[data-video-modal]', e => {
        e.preventDefault();

        let $link = $(e.target).closest('a');

        $.magnificPopup.open({
            type: 'iframe',
            items: {
                src: $link.attr('href'),
            },
        });
    });
