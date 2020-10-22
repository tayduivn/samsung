$(document).ready(function() {
    $('body').on('click', ".quantity-partent .add-action", function () {
        var qta = $(this).parent().find('.item-quantity');
        var products = [], ps = {};
        if ($(this).hasClass('add-up')) {
            if (parseInt(qta.val()) < parseInt(qta.attr('max'))) {
                ps['id'] = qta.attr('data-id');
                ps['quantity'] = (parseInt(qta.val()) + 1);
                products.push(ps);
                addToCart(products, 2, function (rs) {
                    location.reload();
                });
            }
        } else {
            if (parseInt(qta.val()) > 1) {
                ps['id'] = qta.attr('data-id');
                ps['quantity'] = (parseInt(qta.val()) - 1);
                products.push(ps);
                addToCart(products, 2, function (rs) {
                    location.reload();
                });
            }
        }
    });

    if ($('.owlCollectionCart .owl-carousel').length) {
        $('.owlCollectionCart .owl-carousel').owlCarousel({
            items: 4,
            nav: true,
            dots: true,
            lazyLoad: true,
            touchDrag: true,
            margin: 10,
            responsive: {
                0: {
                    items: 2
                },
                767: {
                    items: 2
                },
                1024: {
                    items: 4
                }
            }
        });
    }

});