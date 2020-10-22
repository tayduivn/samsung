$(window).load(function () {
    // xóa sản phẩm
    $('.remove-cart').click(function() {
        var id = $(this).attr('psId');
        removeCart(id, true);
    });

// Tăng giảm số lượng
    $('.minus-cart').on('click', function() {
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

    $('.plus-cart').on('click', function() {
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

    $('.updateCart').change(function(event) {
        var products = [{
            'id' :  $(this).attr('psId'),
            'quantity' : $(this).val()
        }];
        addToCart(products, 2, function(rs) {
            window.location.href = '/cart';
        });
    });
});

function changeQtyCart(id, qty) {
        let products = [{ id: id, quantity: qty }];
        var formatVND = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        addToCart(products, 2, function(rs) {
            if(rs.status) {
                let totalPrice = 0;
                $totalItem = 0;
                $('.detail-cart').each(function() {
                    let t = $(this),
                        price = parseInt(t.attr('price')),
                        qty = parseInt(t.find('.updateCart').val());
                    t.find('.oder-price-cart').html(formatVND.format(price * qty));
                    totalPrice += price * qty;
                    $totalItem += qty;
                });
                $('.totals_price').html(formatVND.format(totalPrice));
            }
        });
    }
function removeCart (proId, delItem) {
    var check = confirm('Bạn có chắc muốn xóa sản phẩm này?');
    var formatVND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    if(check) {
        $.post('/cart/remove', { 'psId': proId },
            function(rp) {
                if(delItem) {
                    $('.cartItem_' + proId).remove();
                    var totalPrice = 0;
                    $totalItem = 0;
                    $('.detail-cart').each(function() {
                        var t = $(this),
                            price = parseInt(t.attr('price')),
                            qty = parseInt(t.find('.updateCart').val());
                        t.find('.oder-price-cart').html(formatVND.format(price * qty));
                        totalPrice += price * qty;
                        $totalItem += qty;
                    });
                    $('.totals_price').text(formatVND.format(totalPrice));
                    ajaxLoadView({
                        view: 'topCart',
                        onSuccess: function(rs) {
                            alert("Xóa sản phẩm thành công");
                        }
                    });
                } else {
                    document.location.href = '/cart';
                }
            });
    }
}
