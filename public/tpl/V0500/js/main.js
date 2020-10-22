$(function () {
    $(window).on('click',function (e) {
        var modal = document.getElementById('productQuickView');
        if (e.target == modal) {
            $('.modal').fadeOut();
        }
    });

    $(document).on('click','.quick-view',function (e) {
        e.stopPropagation();
        $('#loading').show();
        var t = $(this);
        $.post('/product/q' + t.attr('data-psId'),
            function (rs) {
                $('#loading').hide();
                $('#productQuickView .modal-content').html(rs);
                $('#productQuickView').fadeIn();
            }
        );
        return false;
    });

    $(document).on('click','.close',function () {
        $('.modal').fadeOut();
    });
});

$(document).ready(function () {
    var ps = [];
    $('.product-item').each(function () {
        var t = $(this);
        ps.push({storeId: t.attr('data-storeid'), id: t.attr('data-pid')});
    });
    InventoryLoad(ps);
});

function InventoryLoad(ps) {
    if (ps.length) {
        checkInventory(ps, function (rs) {
            if (rs.inventories != "") {
                var outOfStock = 'Hết hàng';
                $.each(rs.inventories, function (key, vl) {
                    if (vl <= 0) {
                        $('.product-item[data-pid = "' + key + '"] .out-stock').css('display', 'block').css('padding', '0 7px').css('margin-right', '5px');
                        $('.product-item[data-pid = "' + key + '"] .btnAddToCart').css('display', 'none');
                        $('.product-item[data-pid = "' + key + '"] .btnBuyNow').css('display', 'none');
                        $('.product-item[data-pid = "' + key + '"] .product-actions > div').css('display', 'flex').css('justify-content', 'center')
                    }
                });
            }
        });
    }
}
