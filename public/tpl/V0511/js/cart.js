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
        var check = confirm('Bạn có muốn xóa sản phẩm?');
        if(check) {
            $.post(
                '/cart/remove',
                {
                    'psId' : id,
                },
                function(rp){
                    document.location.href= '/cart'
                }
            );
        }
    });
});

$(document).ready(function () {
    $('.continue').click(function () {
        window.location.href = "/product";
    })
});
function changeQtyCart(id, qty) {
    var products = [{id: id, quantity: qty}];
    addToCart(products, 2, function (rs) {
        window.location.href = '/cart'
    });
}

function removeCart(prodId, delItem) {
    var check = confirm('bạn có muốn xóa sản phẩm này ?');
    if(check) {
        $.post(
            '/cart/remove',
            {
                'psId' : id,
            },
            function(rp){
                document.location.href= '/cart'
            }
        );
    }
}

