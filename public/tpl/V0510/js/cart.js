$(window).load(function () {
    /*********************** Quantity up Down ***************************/
    $('.updateCart').change(function () {
        var products = [], ps = {};
        ps['id'] = $(this).attr('psId');
        ps['quantity'] = $(this).val();
        products.push(ps);
        addToCart(products, 2, function (rs) {
            window.location.href = '/cart'
        });
    });

    $('.btn-minus').on('click', function () {
        var id = $(this).next('.updateCart').attr('psId'),
            item = $('input[psId='+id+']'),
            min = 1, qty = parseInt(item.val());

        if (qty > min) {
            qty--;
            item.val(qty);
            changeQtyCart(item.attr('psId'), qty);
        } else {
            alert('Bạn phải đặt số lượng tối thiểu là 1 sản phẩm !');
        }
    });
    $('.btn-plus').on('click', function () {
        var id = $(this).prev('.updateCart').attr('psId'),
            item = $('input[psId='+id+']'),
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


    $('.removeCart').click(function () {
        var id = $(this).attr('rel');
            removeCart(id, true);
    });
});


function changeQtyCart(id, qty) {
    var products = [{id: id, quantity: qty}];
    addToCart(products, 2, function (rs) {
        if (rs.status) {
            //window.location.reload();
            var totalPrice = 0,
            totalItem = 0;
            $('.item-cart').each(function () {
                var t = $(this), price = parseInt(t.attr('price')),
                    discount = parseInt(t.attr('discount')),
                    qty = parseInt(t.find('.updateCart').val());
                if (discount > 0){
                    t.find('.itemPrice').html(numberFomart(((price -discount) * qty) + ' ₫'));
                    totalPrice += (price -discount) * qty;
                }else{
                t.find('.itemPrice').html(numberFomart((price * qty) + ' ₫'));
                    totalPrice += price * qty;
                }

                totalItem += qty;
            });
            $('.totals_price').html(numberFomart(totalPrice) + ' ₫');
            $('.countCart').html(totalItem);
            $('.badge').html(totalItem);
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
                    $('.productid-' + prodId).remove();
                    var totalPrice = 0,
                    totalItem = 0;
                    $('.item-cart').each(function () {
                        var t = $(this), price = parseInt(t.attr('price')),
                            qty = parseInt(t.find('.updateCart').val());
                        t.find('.itemPrice').html(numberFomart(price * qty) + ' ₫');
                        totalPrice += price * qty;
                        totalItem += qty;
                    });
                    $('.totals_price').text(numberFomart(totalPrice) + ' ₫');
                    $('.countCart').html(totalItem);
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

                    $('.countCart').html($totalItem);
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