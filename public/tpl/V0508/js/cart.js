$(function () {
    var numItems = $('.cart-product-table-item').length
    $('.count-items-product').text(numItems);
});

$(document).ready(function() {
    CART.init();
    // $('.updateCart').change(function () {
    //     var products = [
    //         {id: $(this).attr('data-id'), quantity: $(this).val()}
    //     ];
    //     addToCart(products, 2, function (rs) {
    //         changeQtyCart(item.attr('data-psId'), qty)
    //     });
    // });
    // $('.removeCart').click(function(){
    //     var psId = $(this).attr('data-id');
    //     if(psId > 0){
    //         removeCart(psId);
    //     }
    // });
    //button hover
    $('.button-redirect-checkout').hover(function () {
        $(this).addClass('push').removeClass('pull');
    },function () {
        $(this).addClass('pull').removeClass('push');
    });
//end button hover
});
/*** CART SCRIPT ***/
// function removeCart(prodId) {
//     var check = confirm('Bạn muốn xóa sản phẩm ra khỏi giỏ hàng ?');
//     if(check) {
//         $.post(
//             '/cart/remove',
//             {'psId' : prodId},
//             function(rp){
//                 window.location.reload();
//             }
//         );
//     }
// }
const CART = {
    init: function() {
        // Click reduce the number of product cart
        $('.amout-minus__checkout').on('click', function() {
            var item = $(this).next('.updateCart'),
                min = 1,
                qty = parseInt(item.val());
            if (qty > min) {
                qty--;
                item.val(qty);
                CART.changeQtyCart(item.attr('data-id'), qty);
            } else {
                alert('Bạn phải đặt số lượng tối thiểu là 1 sản phẩm !');
            }
        });

        // Click increasing the number product cart
        $('.amout-plus__checkout').on('click', function() {
            var item = $(this).prev('.updateCart'),
                max = parseInt(item.attr('max')),
                qty = parseInt(item.val());
            qty++;
            if (qty <= max) {
                item.val(qty);
                CART.changeQtyCart(item.attr('data-id'), qty);

            } else {
                alert('Bạn không thể đặt quá số lượng còn lại của sản phẩm !');
            }
        });
        // let itemfrs = $('.color a');
        // CART.splitChildimg(itemfrs.attr('data-pids').split(','));

        $('.removeCart').click(function() {
            let id = $(this).attr('psId');
            CART.removeCart(id, true);
        });

        $('.updateCart').change(function(event) {
            var products = [{
                'id': $(this).attr('data-id'),
                'quantity': $(this).val()
            }];
            addToCart(products, 2, function(rs) {
                window.location.href = '/cart';
            });
        });

    },
    changeQtyCart: function(id, qty) {
        let products = [{ id: id, quantity: qty }];
        var formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        addToCart(products, 2, function(rs) {
            if (rs.status) {
                let totalPrice = 0;
                $totalItem = 0;
                $('.cart-product-table-item').each(function() {
                    let t = $(this),
                        price = parseInt(t.data('price')),
                        qty = parseInt(t.find('.updateCart').val());
                    t.find('.price-ascending').html(formatter.format(price * qty));
                    totalPrice += price * qty;
                    $totalItem += qty;
                });
                $('.price-total-desktop .total .total-price').text(formatter.format(totalPrice));
            }
        });
    },
    removeCart: function(proId, delItem) {
        var check = confirm('Bạn có chắc muốn xóa sản phẩm này?');
        var formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        if (check) {
            $.post('/cart/remove', { 'psId': proId },
                function(rp) {
                    if (delItem) {
                        $('.cartItem_' + proId).remove();
                        var totalPrice = 0;
                        $totalItem = 0;
                        $('.cart-product-table-item').each(function() {
                            var t = $(this),
                                price = parseInt(t.attr('data-price')),
                                qty = parseInt(t.find('.updateCart').val());
                            t.find('.price-ascending').html(formatter.format(price * qty));
                            totalPrice += price * qty;
                            $totalItem += qty;
                        });
                        $('.price-total-desktop .total .total-price').text(formatter.format(totalPrice));
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
    },
}