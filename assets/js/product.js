import $ from 'jquery';
import accounting from 'accounting';

const generateId = $container => {
    let id = [];
    $container.find('select').each((i, el) => {
        let $select = $(el);
        id.push($select.attr('name'));
        id.push($select.val());
    });
    return id.join('-');
};

const formatMoney = (price, params = window.rise_accounting) => {
    return accounting.formatMoney(price, params);
};

$(document)
    .on('submit', '[data-product-cart-form]', e => {
        e.preventDefault();

        let $form = $(e.target);

        $.ajax({
            url: $form.attr('action'),
            data: {
                id: $form.find('#product_id').val(),
                quantity: $form.find('#quantity').val(),
            },
            method: 'POST',
            dataType: 'json',
            success: data => {
                const { status, html, cart } = data;

                if (status) {
                    mindy.notify('Товар добавлен в корзину');
                    $('[data-quantity-selector]').text(cart.quantity);
                    $('[data-price-selector]').text(
                        formatMoney(cart.total_price)
                    );
                }
            },
        });
    })
    .on('change', '[data-product-options] select', e => {
        let $target = $(e.target),
            id = generateId($target.closest('[data-product-options]')),
            variant = window.rise_product_variants[id],
            $submit = $('[data-product-cart-form]').find('[type=submit]'),
            $price = $('[data-product-price]'),
            $product = $('#product_id');

        if (variant) {
            let newPrice = formatMoney(variant.price);

            $price.text(newPrice);
            $product.val(variant.id);
            $submit.prop('disabled', false);
        } else {
            $product.val('');
            $submit.prop('disabled', true);
        }
    });

export { formatMoney };
