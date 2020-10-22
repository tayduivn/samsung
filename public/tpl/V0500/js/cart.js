$(window).load(function (e) {
    /*********************** Quantity up Down ***************************/
    $('#Quantity').change(function () {
        if ($(this).hasClass('qty__cart__page')) {
            var products = [], ps = {};
            ps['id'] = $(this).attr('psid');
            ps['quantity'] = $(this).val();
            products.push(ps);
            addToCart(products, 2, function (rs) {
                window.location.href = '/cart'
            });
        }
    });

    $('.update-cart').click(function (e) {
        e.preventDefault();
        window.location.href = '/cart';
    })

    $('.js-qty__adjust--minus').on('click', function () {
        var item = $(this).next('#Quantity'),
            min = 1, qty = parseInt(item.val());
        if (qty > min) {
            qty--;
            item.val(qty);
            changeQtyCart(item.attr('psId'), qty);
        } else {
            alert('Bạn phải đặt số lượng tối thiểu là 1 sản phẩm !');
        }
    });
    $('.js-qty__adjust--plus').on('click', function () {
        var item = $(this).prev('#Quantity'),
            max = parseInt(item.attr('max')),
            qty = parseInt(item.val());
        qty++;
        if (qty <= max) {
            item.val(qty);
            changeQtyCart(item.attr('psId'), qty);
        } else {
            alert('Bạn không thể đặt quá số lượng còn lại của sản phẩm !');
        }
    });

    $('.cart__remove').click(function () {
        var id = $(this).attr('psid');
        if ($(this).hasClass('remove__top')) {
            removeCartTop(id, true);
        } else {
            removeCart(id, true);
        }
    });

    $('.cart__remove__all').click(function () {
        removeCart();
    });

    $('.btnCloseQVCart').click(function () {
        $('.quickview-cart').hide();
    })
});

function changeQtyCart(id, qty) {
    var products = [{id: id, quantity: qty}];
    addToCart(products, 2, function (rs) {
        if (rs.status) {
            //window.location.reload();
            var totalPrice = 0;
            $totalItem = 0;
            $('.cart__row.table__section').each(function () {
                var t = $(this), price = parseInt(t.attr('price')),
                    qty = parseInt(t.find('#Quantity').val());
                t.find('.itemPrice span').html(numberFomart(price * qty) + 'VNĐ');
                totalPrice += price * qty;
                $totalItem += qty;
                $('.mg-left-15').each(function () {
                    if (t.find('a').attr('href') == $(this).find('a').attr('href')) {
                        $(this).find('.quantity').html('Số lượng: ' + qty);
                    }
                });
                $('.qv-cart-total span').html(totalPrice + '₫');
            });
            $('.cart__subtotal').html(numberFomart(totalPrice) + 'VNĐ');
            $('.hd-cart-count').html($totalItem);
            $('#mobile-bottom-navigation .mobile-nav-item .number').html($totalItem)
            // $('.desktop-cart-wrapper1.wow.fadeInRight .hd-cart .hd-cart-count').html($totalItem);
            $('#cart-top h3').html('Giỏ hàng của tôi (' + $totalItem + ' sản phẩm)')
            $('.count-cart').html($totalItem);
        }
    });
}

function removeCart(prodId, delItem) {
    var check = confirm('bạn có muốn xóa sản phẩm này' + '?');
    if (check) {
        $.post('/cart/remove',{'psId' : prodId},
            function(rp) {
                if (delItem) {
                    $('.cartItem_' + prodId).remove();
                    var totalPrice = 0;
                    $totalItem = 0;
                    $('.cart-table tbody .cart__row').each(function () {
                        var t = $(this), price = parseInt(t.attr('price')),
                            qty = parseInt(t.find('#Quantity').val());
                        t.find('.itemPrice .current-price').html(numberFomart(price * qty) + 'VNĐ');
                        totalPrice += price * qty;
                        $totalItem += qty;
                    });
                    $('.cart__subtotal').text(numberFomart(totalPrice) + 'VNĐ');
                    $('.hd-cart-count').html($totalItem);
                    ajaxLoadView({
                        view: 'cartTop',
                        onSuccess: function (rs) {
                            $('.desktop-cart-wrapper #cart-top').html(rs);
                        }
                    });
                    // document.location.href = '/cart';
                } else {
                    document.location.href = '/cart';
                }
            });
    }
}

function removeCartTop(prodId, delItem) {
    var check = confirm('bạn có muốn xóa sản phẩm này' + '?');
    if (check) {
        $.post('/cart/remove',{'psId' : prodId},
            function(rp) {
                if (delItem) {
                    $('.cartItem_' + prodId).remove();
                    var totalPrice = 0;
                    $totalItem = 0;
                    $('#cart-top .cart-item').each(function () {
                        var t = $(this), price = parseInt(t.attr('price')),
                            qty = parseInt(t.find('.quantity').attr('data-qty'));
                        t.find('.cart-item-price-quantity .current-price').html(numberFomart(price * qty) + 'VNĐ');
                        totalPrice += price * qty;
                        $totalItem += qty;
                    });
                    $('.qv-cart-total > div span').text(numberFomart(totalPrice) + 'VNĐ');
                    $('.hd-cart-count').html($totalItem);
                    ajaxLoadView({
                        view: 'cartTop',
                        onSuccess: function (rs) {
                            $('.desktop-cart-wrapper #cart-top').html(rs);
                        }
                    });
                    // document.location.href = '/cart';
                } else {
                    document.location.href = '/cart';
                }
            });
    }
}

function numberFomart(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

