$(window).load(function () {
    /*********************** Quantily up Down ***************************/
    $('.input-text').change(function () {
        var products = [], ps = {};
        ps['id'] = $(this).attr('psId');
        ps['quantity'] = $(this).val();
        products.push(ps);
        addToCart(products, 2, function (rs) {
            window.location.href = '/cart'
        });
    });
    $('.reduced_pop').on('click', function () {
        var item = $(this).parent().find('.input-text'),
            min = 1, qty = parseInt(item.val());
        if (qty > min) {
            qty--;
            item.val(qty);
            changeQtyCart(item.attr('psId'), qty);
        } else {
            alert('Bạn phải đặt số lượng tối thiểu là 1 sản phẩm !');
        }
    });
    $('.increase_pop').on('click', function () {
        var item = $(this).prev('.input-text'),
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

    $('.remove-itemx').click(function () {
        var id = $(this).attr('psId');
        removeCart(id, true);
    });
});

function changeQtyCart(id, qty) {
    var products = [{id: id, quantity: qty}];
    addToCart(products, 2, function (rs) {
        if (rs.status) {
            //window.location.reload();
            var totalPrice = 0;
            $totalItem = 0;
            $('.item-cart').each(function () {
                var t = $(this), price = parseInt(t.attr('price')),
                    qty = parseInt(t.find('.input-text').val());
                // console.log(price);
                t.find('.cart-price').html(numberFomart(price * qty) + 'VNĐ');
                totalPrice += price * qty;
                $totalItem += qty;
            });
            $('.totals_price').html(numberFomart(totalPrice) + 'VNĐ');
            $('.count_item').html($totalItem);
            $('.cartCount').html($totalItem);
            ajaxLoadView({
                view: 'littleCart',
                onSuccess: function (rs) {
                    $('.top-cart-content').html(rs);
                }
            });
        }
    });
}

function removeCart(prodId, delItem) {
    var check = confirm('bạn có muốn xóa sản phẩm này' + '?');
    if (check) {
        $.post('/cart/remove',{'psId' : prodId},
            function(rp) {
                if (delItem) {
                    $('.productid-' + prodId).remove();
                    var totalPrice = 0;
                    $totalItem = 0;
                    $('.cart-tbody .item-cart').each(function () {
                        var t = $(this), price = parseInt(t.attr('price')),
                            qty = parseInt(t.find('.input_qty_pr .number-sidebar').val());
                        t.find('.itemPrice .product-price').html(numberFomart(price * qty) + 'VNĐ');
                        totalPrice += price * qty;
                        $totalItem += qty;
                    });
                    $('.totals_price').text(numberFomart(totalPrice) + 'VNĐ');
                    $('.mr_top .cartCount.count_item_pr').html($totalItem);
                    ajaxLoadView({
                        view: 'littleCart',
                        onSuccess: function (rs) {
                            $('.top-cart-content').html(rs);
                        }
                    });
                    // document.location.href = '/cart';
                } else {
                    document.location.href = '/cart';
                }
            });
    }
}
$('.remove-item-cart.fa-times').click(function () {
    console.log('abc');
    var id = $(this).attr('psid');
    removeCartTop(id, true);
})
function removeCartTop(prodId, delItem) {
    var check = confirm('bạn có muốn xóa sản phẩm này' + '?');
    if (check) {
        $.post('/cart/remove',{'psId' : prodId},
            function(rp) {
                if (delItem) {
                    $('.cartItem_' + prodId).remove();
                    var totalPrice = 0;
                    $totalItem = 0;
                    $('.list-item-cart .item').each(function () {
                        var t = $(this), price = parseInt(t.attr('price')),
                            qty = parseInt(t.find('.item_quanty_count').val());
                        t.find('.product-price').html(numberFomart(price * qty) + 'VNĐ');
                        totalPrice += price * qty;
                        $totalItem += qty;
                    });
                    $('.top-subtotal .price').text(numberFomart(totalPrice) + 'VNĐ');
                    $('.mr_top .cartCount').html($totalItem);
                    ajaxLoadView({
                        view: 'littleCart',
                        onSuccess: function (rs) {
                            $('.top-cart-content').html(rs);
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