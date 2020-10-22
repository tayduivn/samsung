$(function () {
    $( ".js-drawer-open-right" ).click(function() {
        $('#NavDrawer').show(300);
        $('#NavDrawer').css('right', 0);

    });

    $(".drawer__close").click(function() {
        $('#NavDrawer').hide(300);
        $('#NavDrawer').css('right', '-300px');
    });

    $('#owl-home-slider').owlCarousel({
        autoplay:true,
        autoplaySpeed: 1000,
        autoplayTimeout: 3000,
        autoplayHoverPause:true,
        loop: true,
        nav:false,
        dots:true,
        items:1,
    });

    $('.owl-product').owlCarousel({
        nav:true,
        navSpeed:1000,
        loop:false,
        dots:false,
        rewind:true,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:3
            },
            1000:{
                items:3
            }
        }
    });

    $('#owl-section-brand-slider').owlCarousel({
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        autoplaySpeed:1500,
        nav:false,
        loop:true,
        dots:false,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:4
            },
            1000:{
                items:6
            }
        }
    });

    $('.article-carousel').owlCarousel({
        nav:true,
        loop:false,
        navSpeed:1000,
        dots:false,
        rewind:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });

    $('.mobile-nav__toggle').click(function (e) {
        if ($(this).parentsUntil('.mobile-nav').hasClass('active')) {
            $(this).parentsUntil('.mobile-nav').removeClass('active');
            $('#NavDrawer').css('transform', 'translateX(-300px)');
        } else {
            $(this).parentsUntil('.mobile-nav').addClass('active');
            $('#NavDrawer').css('transform', 'translateX(0px)');
        }
    });

    $(window).click(function (e) {
        var viewCart = document.getElementById('cart-top');
        if (e.target == viewCart) {
            $('#cart-top').hide();
        }
    })
    $('.hd-cart').click(function (e) {
        e.stopPropagation();
        $('.quickview-cart').toggle();
    })

    // if ($(window).width() <= 768) {
    //     $('.desktop-cart-wrapper1 .hd-cart').click(function () {
    //         window.location.href = "/cart";
    //     })
    // }
});

$(document).ready(function () {
    var ps = [];
    $('.owl-product .owl-item .product-item').each(function () {
        var t = $(this);
        ps.push({storeId: t.attr('data-storeId'), id: t.attr('data-pid')});
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
                        $('.product-item[data-pid = "' + key + '"] .out-stock').next().css('display', 'none');
                        $('.product-item[data-pid = "' + key + '"] .btnAddToCart').css('display', 'none');
                        $('.product-item[data-pid = "' + key + '"] .btnBuyNow').css('display', 'none');
                        $('.product-item[data-pid = "' + key + '"] .product-actions > div').css('display', 'flex').css('justify-content', 'center')
                    }
                });
            }
        });
    }
}

$(document).ready(function (){
    $(".btnAddToCart").on("click", function(e){
        e.preventDefault();
        if ($(this).attr('id') != 'AddToCart' && $(this).attr('id') != 'buy-now') {
            if ($(this).attr("ck") == 1) {
                var products = [], ps = {};
                var id = ($(this).attr('id'));
                ps['id'] = $(this).attr('selid');
                if (id == 'btnQuickCart' || id == 'buyNow') {
                    ps['quantity'] = 1;
                } else {
                    ps['quantity'] = $("#Quantity").val();
                }
                var qty = parseInt(ps['quantity']);
                products.push(ps);
                addToCart(products, 1, function(rs){
                    if (rs.status == 1) {
                        if (id == 'buy-now' || id == 'buyNow'){
                            window.location.href = '/cart/checkout?emptylayout=true';
                        } else if (id == 'btnQuickCart') {
                            $('.hd-cart-count').text(parseInt(rs.data.totalQuantities + ps['quantity']));
                            var totalqtt = parseInt(rs.data.totalQuantities + ps['quantity']);
                            ajaxLoadView({
                                view: 'cartTop',
                                onSuccess: function (rs) {
                                    $('.quickview-cart').html(rs);
                                }
                            });
                            ajaxLoadView({
                                view: 'topCart',
                                onSuccess: function (rs) {
                                    $('#modalAddComplete .modalAddComplete-content').html(rs);
                                    $('#modalAddComplete').fadeIn();
                                    $('#modalAddComplete .modal-cart-status h2').html('Giỏ hàng của bạn (Đang có ' + totalqtt + ' sản phẩm)')
                                }
                            });
                        }
                        else {
                            var totalqtt = parseInt(rs.data.totalQuantities + qty);
                            $('.hd-cart-count').text(totalqtt);
                            $('#mobile-bottom-navigation .mobile-nav-item .number').text(totalqtt)
                            ajaxLoadView({
                                view: 'cartTop',
                                onSuccess: function (rs) {
                                    $('.quickview-cart').html(rs);
                                }
                            });
                            ajaxLoadView({
                                view: 'topCart',
                                onSuccess: function (rs) {
                                    $('#modalAddComplete .modalAddComplete-content').html(rs);
                                    $('#modalAddComplete').fadeIn();
                                    $('#modalAddComplete .modal-cart-status h2').html('Giỏ hàng của bạn (Đang có ' + totalqtt + ' sản phẩm)')
                                }
                            });
                            // if(in_array($storeId,[58473,224])){
                            //     var mes = $('#dialogMessage');
                            //     mes.html('<p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 10px 40px 0;"></span>Thêm giỏ hàng thành công</p>');
                            //     mes.dialog({
                            //         title: "Thông báo!", modal: true, show: "explode", hide: "explode",
                            //         buttons: {
                            //             Ok: function () {
                            //                 $(this).dialog("close");
                            //             }
                            //         }
                            //     });
                            // }else {
                            //     window.location.href = '/cart'
                            // }
                        }
                    } else {
                        alert(msgSizeandColor);
                        // alert(msgSizeColorProduct);
                    }
                });
            } else {
                // alert(msgOutofStock);
                alert(msgSizeColorProduct);
                return false;
            }
        }
    });

    $('.childProducts').change(function () {
        var val = $(this).val(), data = val.split(","), $psId = data[0], $price_op = data[1];
        if ($psId != 1) {
            $('#addToCart').attr('ck', 1).attr('selId', $psId).removeClass('unsel').removeAttr('title').removeAttr('data-original-title');
        } else {
            $('#addToCart').attr('title', 'Vui lòng chọn sản phẩm!').attr('data-original-title', 'Vui lòng chọn sản phẩm!').attr('ck', 0);
        }
        $('.current-price strong').html($.number($price_op)+ '<span class="vnd"> VNĐ</span>');
    });
});