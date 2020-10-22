$(window).load(function () {
    /*********************** Quantily up Down ***************************/
    $('.updateCart').change(function () {
        var products = [], ps = {};
        ps['id'] = $(this).attr('psId');
        ps['quantity'] = $(this).val();
        products.push(ps);
        addToCart(products, 2, function (rs) {
            window.location.href = '/cart'
        });
    });
    $('.qtyminus').on('click', function () {
        var item = $(this).next('.updateCart'),
            min = 1, qty = parseInt(item.val());
        if (qty > min) {
            qty--;
            item.val(qty);
            changeQtyCart(item.attr('psId'), qty);
        } else {
            alert('Bạn phải đặt số lượng tối thiểu là 1 sản phẩm !');
        }
    });
    $('.qtyplus').on('click', function () {
        var item = $(this).prev('.updateCart'),
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

    $('.remove-item-cart').click(function () {
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
                    qty = parseInt(t.find('.updateCart').val());
                t.find('.itemPrice').html(numberFomart(price * qty) + 'VNĐ');
                totalPrice += price * qty;
                $totalItem += qty;
            });
            $('.totals_price').html(numberFomart(totalPrice) + 'VNĐ');
            $('.count_item').html($totalItem);
            $('.count-cart').html($totalItem);
            // ajaxLoadView({
            //     view: 'cartlist',
            //     onSuccess: function (rs) {
            //         $('#cartlist').html(rs);
            //     }
            // });
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
                    $('.item-cart').each(function () {
                        var t = $(this), price = parseInt(t.attr('price')),
                            qty = parseInt(t.find('.updateCart').val());
                        t.find('.itemPrice').html(numberFomart(price * qty) + 'VNĐ');
                        totalPrice += price * qty;
                        $totalItem += qty;
                    });
                    $('.totals_price').text(numberFomart(totalPrice) + 'VNĐ');
                    $('.count-cart span').html($totalItem);
                    ajaxLoadView({
                        view: 'topCart',
                        onSuccess: function (rs) {
                            $('.top-cart-content').html(rs);
                        }
                    });
                } else {
                    document.location.href = '/cart';
                }
            });
    }
}

