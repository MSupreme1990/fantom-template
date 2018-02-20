import $ from 'jquery';
import { formatMoney } from './product';

$(document)
    .on('click', '[data-cart-add]', function(e) {
        e.preventDefault();

        let $this = $(e.target).closest('a');
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: $this.attr('href'),
            data: {
                id: $this.attr('data-id'),
            },
            success: function(data) {
                if (data.status) {
                    mindy.notify('Товар добавлен в корзину');
                    $($this.attr('data-price-selector')).text(
                        formatMoney(data.cart.total_price)
                    );
                    $($this.attr('data-html-selector')).replaceWith(data.html);
                }
            },
        });
    })
    .on('click', '[data-cart-remove]', function(e) {
        e.preventDefault();
        let $this = $(e.target).closest('a');

        if (confirm($this.attr('data-confirm'))) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: $this.attr('href'),
                data: {
                    key: $this.attr('data-key'),
                },
                success: function(data) {
                    if (data.status) {
                        mindy.notify('Позиция удалена из корзины');
                        $($this.attr('data-price-selector')).text(
                            formatMoney(data.cart.total_price)
                        );
                        $($this.attr('data-html-selector')).replaceWith(
                            data.html
                        );
                    }
                },
            });
        }
    })
    .on('click', '[data-cart-counter]', function(e) {
        e.preventDefault();

        let $target = $(e.target).closest('a'),
            $container = $target.closest('.b-counter'),
            operation = $target.attr('data-cart-operation'),
            $text = $container.find($target.attr('data-cart-selector')),
            value = Number($text.text());

        if (operation === 'inc') {
            value += 1;
        } else if (operation === 'dec') {
            value -= 1;
            if (value <= 1) {
                value = 1;
            }
        } else {
            console.log('Unknown operation');
            return;
        }

        $text.text(value);

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: $target.attr('href'),
            data: {
                index: $target.attr('data-key'),
                quantity: value,
            },
            success: function(data) {
                if (data.status) {
                    $($target.attr('data-price-selector')).text(
                        formatMoney(data.cart.total_price)
                    );
                    $($target.attr('data-html-selector')).replaceWith(
                        data.html
                    );
                }
            },
        });
    });
