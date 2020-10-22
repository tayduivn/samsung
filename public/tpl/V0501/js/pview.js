
    body = $('body');
    // btnCart = $('#addToCart');
    // btnBuyCart = $('.buyCart, .pdp-mod-sbutton'),


var msgOutofStock = "Sản phẩm tạm thời hết hàng";


/*--- size ---*/
$(function () {

    $('.size a').click(function () {
        var t = $(this), size = $('.size a'), qtt = $('.prd_quantity'), atc = $('button.add_to_cart'), attrs = {};
        if (!t.hasClass('active')) {
            size.removeClass('active');
            attrs[$('.size').attr('column')] = t.attr('value');
            if ($('.color').length && !$('.color a.active').length) {
                size.attr('title', msgColor);
            } else {
                if ($('.color').length) {
                    if (t.attr('qtt')) {
                        t.addClass('active');
                        if(t.attr('data-price') > 0) {
                            $('.special-price span').text($.number(t.attr('data-price'))+ ' VNĐ');
                        }
                        qtt.attr('max', t.attr('qtt'));
                        atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                    } else {
                        t.addClass('deactive').attr('title', msgOutofStock);
                    }
                } else {
                    $.post(
                        '/product/child?childId=' + t.attr('selId'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code ==1  && rs.data.available > 0) {
                                t.addClass('active');
                                qtt.attr('max', t.attr('qtt'));
                                atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                                if(t.attr('data-price') > 0) {
                                    $('.special-price span').text($.number(t.attr('data-price'))+ ' VNĐ');
                                }
                            } else {
                                t.addClass('deactive').attr('title', msgOutofStock);
                            }
                        },
                        'json'
                    );
                }
            }
        }
    });
})
/*--- color ---*/
$(function () {
    $('.child_imgs ').owlCarousel({
        loop: false,
        margin: 3,
        nav:false,
        dots:false,
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
    $('.color a').click(function () {
        var $storeId = $('#storeId').val();
        var t = $(this), size = $('.size a'), qtt = $('.prd_quantity'), atc = $('button.add_to_cart'), attrs = {};
        if(t.attr('data-src')) {
            $(".img-responsive").attr('src', t.attr('data-src'));
        }

        $(".item").removeClass('active');
        if (!t.hasClass('active')) {
            $('.color a').removeClass('active');
            if (size.length > 1) {
                size.removeClass('active deactive');
                t.addClass('active');
                size.removeAttr('title');
                attrs[$('.color').attr('column')] = t.attr('value');
                size.each(function () {
                    var t = $(this);
                    attrs[$('.size').attr('column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + $('button.add_to_cart').attr('psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('price', rs.data.price);
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
                            } else {
                                t.addClass('deactive').attr('title', msgOutofStock).removeAttr('qtt');
                            }
                        },
                        'json'
                    );
                });

            } else {
                (t.attr('qtt'));
                t.addClass('active');
                if(t.attr('data-price') > 0) {
                    $('.special-price span').text($.number(t.attr('data-price'))+ ' VNĐ');
                }
                atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                qtt.attr('max', t.attr('qtt'));

            }
            var pIdsAttr = t.attr('data-psIds').split(','),
                ps = [{id: pIdsAttr, code: 1, bothImageSrc: true, storeId: $storeId}];
                // pvImg = t.attr('data-src');

            if (ps.length) {

                getallchildimg(ps, function (rs) {
                    if (rs.images) {
                        // var $pviewUri = $('.img-responsive');
                          var $owl = $(".child_imgs.owl-carousel");
                            // $lightbox = $("#js-list-lightbox");

                        /*$pviewUri.addClass('fade').attr('src', pvImg).removeClass('fade');
                        $('#js-gall').attr('href', pvImg);*/

                        $owl.empty();
                        // $lightbox.empty();
                        $.each(rs.images, function (key) {
                            var item = rs.images[key];
                            $owl.append('<div class="item" style="width: 142.333px; margin-right: 4px;"> <a data-image="' + item.srcUri + '"data-zoom-image="' + item.srcUri + '" > <img class="child-img" data-img="' + item.srcUri + '" src="' + item.thumbnailUri + '" alt="{{ child.name }}"> </a> </div>');
                            // if (key > 0) {
                            //     $lightbox.append('<a href="' + item.srcUri + '" data-toggle="lightbox" data-gallery="gallery"></a>');
                            // }
                        });

                        $owl.owlCarousel('destroy');
                        $owl.owlCarousel({
                            loop: false,
                            margin: 0,
                            nav:false,
                            dots:false,
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
                        $('.owl_width .item').click(function () {

                            var attr = $(this).children().attr('data-image');
                            $('.img-responsive').attr('src', attr)
                        });
                        $('.owl_width .item').click(function () {
                            var t = $(this).children();
                            $(".zoomWindowContainer div").css("background-image", 'url(' + t.attr('data-image') + ')');
                        });

                        /*$("body .thumbnailUri").hover(function () {
                            $pviewUri.addClass('fade').attr('src', $(this).attr('data-src')).removeClass('fade');
                            body.find('.thumbnailUri').removeClass('active');
                            $(this).addClass('active');
                        });*/
                    }
                });
            }
        }
    });
})
/*--- addtocart ---*/
$(document).ready(function(){
    $('button.add_to_cart').click(function(e){
        e.preventDefault();
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
                                $('#modalShowCart .modal-content').html(rs);
                                $('#modalShowCart').fadeIn();
                            }
                        });
                    }
                    else {
                        var totalqtt = parseInt(rs.data.totalQuantities + qty);
                        $('.mr_top .cartCount').text(totalqtt);
                        ajaxLoadView({
                            view: 'littleCart',
                            onSuccess: function (rs) {
                                $('.top-cart-content').html(rs);
                            }
                        });
                        /*if(in_array($storeId,[58473,224])){
                            var mes = $('#dialogMessage');
                            mes.html('<p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 10px 40px 0;"></span>Thêm giỏ hàng thành công</p>');
                            mes.dialog({
                                title: "Thông báo!", modal: true, show: "explode", hide: "explode",
                                buttons: {
                                    Ok: function () {
                                        $(this).dialog("close");
                                    }
                                }
                            });
                        }else {*/
                            window.location.href = '/cart'
                        // }
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
            $('#addToCart').attr('ck', 1).attr('selId', $psId).removeClass('unsel').removeAttr('title');
        } else {
            $('#addToCart').attr('title', 'Vui lòng chọn sản phẩm!').attr('ck', 0);
        }
        $('.special-price span').html($.number($price_op)+ '<span class="vnd"> VNĐ</span>');
    });
});
//<<---load-->
$(document).ready(function checkInv () {
    var req = $('.req').length, attrs = {}, atc = $('#addToCart'), qtt = $('.prd_quantity');
    if (req == 1) {
        if ($('.color').length) {
            if ($('.color a.active').length) {
                attrs[$('.color').attr('column')] = $('.color a.active').attr('value');
                $.post(
                    '/product/child?psId=' + atc.attr('psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            qtt.attr('max', rs.data.available);
                            atc.attr('selId', rs.data.id).removeAttr('title').attr('ck', 1).removeClass('unsel');
                        } else {
                            $('.color a.active').addClass('deactive');
                            atc.attr('title', msgOutofStock);
                        }
                    },
                    'json'
                );

            } else {
                $('.color a').each(function () {
                    var t = $(this);
                    attrs[$('.color').attr('column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
                            } else {
                                t.addClass('deactive').attr('title', msgOutofStock);
                            }
                        },
                        'json'
                    );
                });
            }
        } else {
            if ($('.size a.active').length) {
                attrs[$('.size').attr('column')] = $('.size a.active').attr('value');
                $.post(
                    '/product/child?psId=' + atc.attr('psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            qtt.attr('max', rs.data.available);
                            atc.attr('selId', rs.data.id).removeAttr('title').attr('ck', 1).removeClass('unsel');
                        } else {
                            $('.size a.active').addClass('deactive');
                            atc.attr('title', msgOutofStock);
                        }
                    },
                    'json'
                );
            } else {
                $('.size a').each(function () {
                    var t = $(this);
                    attrs[$('.size').attr('column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
                            } else {
                                t.addClass('deactive').attr('title', msgOutofStock);
                            }
                        },
                        'json'
                    );
                });
            }
        }
        return false;
    }
    if (req > 1) {
        var colorAt = $('.color a.active'), sizeAt = $('.size a.active');
        if (colorAt.length && sizeAt.length) {
            attrs[$('.color').attr('column')] = colorAt.attr('value');
            attrs[$('.size').attr('column')] = sizeAt.attr('value');
            $.post(
                '/product/child?psId=' + atc.attr('psid'),
                {'attrs': attrs},
                function (rs) {
                    if (rs.code == 1 && rs.data.available > 0) {
                        $('.size a').attr('data-price', rs.data.price);
                        if($('.size a').attr('data-price') > 0){
                            $('.special-price span').text($.number($('.size a').attr('data-price')) + ' VNĐ');
                        }
                        qtt.attr('max', rs.data.available);
                        atc.attr('selId', rs.data.id).removeAttr('title').attr('ck', 1).removeClass('unsel');
                    } else {
                        sizeAt.addClass('deactive').attr('title', 'sản phẩm hết hàng');
                        atc.attr('title', msgOutofStock);
                    }
                },
                'json'
            );
            return false;
        }
        if (colorAt.length && !sizeAt.length) {
            attrs[$('.color').attr('column')] = colorAt.attr('value');
            $('.size a').each(function () {
                var t = $(this);
                attrs[$('.size').attr('column')] = t.attr('value');
                $.post(
                    '/product/child?psId=' + atc.attr('psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
                        } else {
                            t.addClass('deactive').attr('title', msgOutofStock);
                        }
                    },
                    'json'
                );
            });
            return false;
        }
        if (!colorAt.length && sizeAt.length) {
            attrs[$('.size').attr('column')] = sizeAt.attr('value');
            $('.color a').each(function () {
                var t = $(this);
                attrs[$('.color').attr('column')] = t.attr('value');
                $.post(
                    '/product/child?psId=' + atc.attr('psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
                        } else {
                            t.addClass('deactive').attr('title', msgOutofStock);
                        }
                    },
                    'json'
                );
            });
            return false;
        }
    }
})



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
$(document).ready(function () {
    $('.product-photo-thumbs ').owlCarousel({
        autoplay:false,
        autoplaySpeed: 1000,
        autoplayTimeout: 2000,
        autoplayHoverPause:true,
        loop: true,
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
                items:4
            }
        }
    });
})