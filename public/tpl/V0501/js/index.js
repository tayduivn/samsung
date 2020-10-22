//
// $(document).ready(function(){
//     $('.sidebar-blog-menu > li > i').click(function () {
//         $(this).parent().addClass('active');
//         if($('.sidebar-blog-menu .active .child-menu').css('display','none')){
//             $('.sidebar-blog-menu .active .child-menu').show();
//         } else {
//             $('.sidebar-blog-menu > li > i').removeClass('active');
//         }
//     })
// });
$(function () {
    $('.sidebar-blog-menu > li > i').click(function () {
            if ($(this).parent().hasClass('active-menu')){
                $(this).parent().removeClass('active-menu');
                $(this).parent().addClass('cdf');
                $('.cdf .fa-caret-right').show();
                $('.cdf .fa-caret-down').hide();
                $('.cdf .child-menu').hide(300);
            } else {
                $(this).parent().addClass('active-menu');
                $('.active-menu .fa-caret-right').hide();
                $('.active-menu .fa-caret-down').show();
                $('.active-menu .child-menu').show(300);
            }
        })
    $('.ct-mobile>li>i').click(function () {
        if ($(this).parent().hasClass('active')){
            $(this).parent().addClass('abc');
            $('.abc .fa-caret-right').show();
            $('.abc .fa-caret-down').hide();
            $(this).parent().removeClass('active');
            $('.abc .lv2-mobile').css('display','none');
        } else {
            $(this).parent().addClass('active');
            $('.active .fa-caret-right').hide();
            $('.active .fa-caret-down').show();
            $('.active .lv2-mobile').css('display','block');
        }
    })
    /*Menu mobile*/
    $('.menu-bar').click(function(e){
        e.stopPropagation();
        $('.menu_mobile').toggleClass('open_sidebar_menu');
        $('.opacity_menu').toggleClass('open_opacity');
    });
    $('.opacity_menu').click(function(e){
        $('.menu_mobile').removeClass('open_sidebar_menu');
        $('.opacity_menu').removeClass('open_opacity');
    });
    /*Open filter*/
    $('.open-filters').click(function(e){
        e.stopPropagation();
        $(this).toggleClass('openf');
        $('.opacity_filter').toggleClass('opacity_filter_true');
        $('.dqdt-sidebar').toggleClass('openf');
    });
    /*---*/
    $('.filter-group-price > ul li label input').click(function () {
        var attr = $(this).attr('value');
        window.location.href= attr;
    });
    $('.filter-group > ul li label input').click(function () {
        var attr = $(this).attr('value');
        window.location.href= attr;
    });
    $('.filter-group .color-filter > li label').click(function () {
        var attr = $(this).attr('value');
        window.location.href= attr;
    });
    //<---header-->

    $('#user').click(function () {
        if ($(this).hasClass('thanos')){
            $('.log').css('display','none');
            $(this).removeClass('thanos');
        } else {
            $(this).addClass('thanos');
            $('.log').css('display','flex');
        }
    })
    //modal
    $(document).on('click','.quick-view',function () {
        var t = $(this);
        $.post('/product/q' + t.attr('data-psId'),
            function (rs) {
                $('#quick-view-product .modal-content').html(rs);
                $('#quick-view-product').modal('show');

            }
        );
        return false;
    });
    $(document).ready(function(){
        $('button.add_to_cart').click(function(){
            if ($(this).attr("ck") == 1) {
                var products = [], ps = {};
                var id = ($(this).attr('id'));
                var t = $(this);
                if (t.hasClass('btnQuickCart')){
                    ps['quantity'] = 1;
                } else {
                    ps['quantity'] = $(".prd_quantity").val();
                }
                ps['id'] = $(this).attr('selid');
                var qty = parseInt(ps['quantity']);

                products.push(ps);
                addToCart(products, 1, function(rs){
                    if (rs.status == 1) {
                        if (id == 'buynow'){
                            window.location.href = '/cart/checkout?emptylayout=true';
                        } else if(t.hasClass('btnQuickCart')){
                            $('.mr_top .cartCount').text(totalqtt);
                            ajaxLoadView({
                                view: 'topCart',
                                onSuccess: function (rs) {
                                    $('#popup-cart').addClass('in');
                                    $('#popup-cart .modal-content').html(rs);
                                    $('#popup-cart').fadeIn();
                                }
                            });
                        }
                        else {
                            var totalqtt = parseInt(rs.data.totalQuantities + qty);
                            $('.mr_top .cartCount').text(totalqtt);
                            ajaxLoadView({
                                view: 'topCart',
                                onSuccess: function (rs) {
                                    $('.top-cart-content').html(rs);
                                }
                            });
                            window.location.href = '/cart'
                        }
                    } else {
                        alert(msgSizeColorProduct);
                    }
                });
            }
        });
        $('.childProducts').change(function () {
            var val = $(this).val(), data = val.split(","), $psId = data[0], $price_op = data[1];
            if ($psId != 1) {
                $('#addToCart').attr('ck', 1).attr('selId', $psId).removeClass('unsel').removeAttr('title').removeAttr('data-original-title');
            } else {
                $('#addToCart').attr('title', 'Vui lòng chọn sản phẩm!').attr('data-original-title', 'Vui lòng chọn sản phẩm!').attr('ck', 0);
            }
            $('.special-price span').html($.number($price_op)+ '<span class="vnd"> VNĐ</span>');
        });
    });
    $('.owl-carousel_').owlCarousel({
        autoplay:true,
        autoplaySpeed: 1000,
        autoplayTimeout: 2000,
        autoplayHoverPause:true,
        loop: true,
        margin: 3,
        nav:false,
        dots:false,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });
})

$(function () {
    if($(window).width() <=767){
        $('.nav-tabs').addClass('owl-carousel owl-theme');
        $('.nav-tabs li').wrap('<div class="item"></div>');
        $('.nav-tabs').owlCarousel({
            loop: false,
            items: 1,
            nav: true,
            dots: false,
            rewind: true,
        })
    }
})
//<!--little-cart-->
$(function () {
    $('.remove-item-cart.fa-times').click(function () {
        var id = $(this).attr('psid');
        removeCartTop(id, true);
        console.log('abc');
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
})




