

//load ảnh
document.addEventListener('DOMContentLoaded', function () {

    if ($(".gallery .gallery-item").length < 2) {
        $(".gallery").css("display", "none");
    }

    $(".gallery-item img").click(function () {
        $(".gallery-item").removeClass('active');
        $(this).parents('.gallery-item').addClass('active');
    });
    $(".gallery-item").first().addClass('active');

});
if ($(window).width() >= 769) {
    $('.req .tooltip').tooltip({
        position: {
            my: "center bottom-10",
            at: "center top",
            using: function (position, feedback) {
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .addClass(feedback.vertical)
                    .addClass(feedback.horizontal)
                    .appendTo(this);
            }
        }
    });
    $('.btn').tooltip({
        position: {
            my: "center bottom-10",
            at: "center top",
            using: function (position, feedback) {
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .addClass(feedback.vertical)
                    .addClass(feedback.horizontal)
                    .appendTo(this);
            }
        }
    });
}
var $storeId = $('#storeId').val();



/*--- size ---*/
$(document).ready(function () {
    var storeId = $('#storeId').val(),
        btnCart = $('#AddToCart'),
        // btnBuyCart = $('.buyCart, .pdp-mod-sbutton'),
        $colorReq = $('#product-select-watch .color.req'),
        $colorA = $('#product-select-watch .color.req .swatch-element'),
        $colorAt = $('#product-select-watch .color.req .swatch-element.active'),
        $sizeReq = $('#product-select-watch .size.req'),
        $sizeA = $('#product-select-watch .size.req .swatch-element'),
        $sizeAt = $('#product-select-watch .size.req .swatch-element.active');
    var msgOutofStock = "Sản phẩm tạm thời hết hàng";
    /*--- size ---*/
    $sizeA.click(function () {
        var t = $(this), size = $sizeA, qtt = $('#qtym'), atc = $('button.btnAddToCart'), attrs = {};
        if (!t.hasClass('active')) {
            size.removeClass('active');
            $sizeA.children('label').removeClass('sd');
            attrs[$('.size').attr('column')] = t.attr('value');
            if ($('.color').length && !$colorAt.length) {
                size.attr('data-original-title', msgColor);
                if (t.attr('qtt')) {
                    t.addClass('active');
                    t.children('label').addClass('sd');
                    qtt.attr('max', t.attr('qtt'));
                    atc.attr('selId', t.attr('selId')).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                    if (t.attr('data-price') > 0) {
                        $('.current-price').text($.number(t.attr('data-price')) + ' VNĐ');
                        $('.PriceSaving').text('(Bạn đã tiết kiệm được ' + $.number(t.attr('data-discount')) + ' VNĐ)');
                        $('.original-price s').text($.number(t.attr('data-old-price')) + '₫');
                    }
                    qtt.attr('max', t.attr('qtt'));
                    atc.attr('selId', t.attr('selId')).removeAttr('data-original-title', msgSizeandColor).attr('ck', 1).removeClass('unsel');
                }
                else {
                    t.addClass('soldout').attr('data-original-title', msgOutofStock);
                    atc.removeAttr('selId').attr('data-original-title', msgSizeandColor).attr('ck', 0).addClass('unsel');
                }
            } else {
                if ($('.color').length) {
                    if (t.attr('qtt')) {
                        t.addClass('active');
                        t.children('label').addClass('sd');
                        if(t.attr('data-price') > 0) {
                            $('.current-price').text($.number(t.attr('data-price'))+ ' VNĐ');
                            $('.PriceSaving').text('(Bạn đã tiết kiệm được ' + $.number(t.attr('data-discount')) + ' VNĐ)');
                            $('.original-price s').text($.number(t.attr('data-old-price')) + '₫');
                        }
                        qtt.attr('max', t.attr('qtt'));
                        atc.attr('selId', t.attr('selId')).removeAttr('data-original-title',msgSizeandColor).attr('ck', 1).removeClass('unsel');
                    } else {
                        t.addClass('soldout').attr('data-original-title', msgOutofStock);
                        atc.removeAttr('selId').attr('data-original-title', msgSizeandColor).attr('ck', 0).addClass('unsel');
                    }
                } else {
                    $.post(
                        '/product/child?childId=' + t.attr('selId'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code ==1  && rs.data.available > 0) {
                                t.addClass('active');
                                t.children('label').addClass('sd')
                                qtt.attr('max', t.attr('qtt'));
                                atc.attr('selId', t.attr('selId')).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                                if(t.attr('data-price') > 0) {
                                    $('.current-price').text($.number(t.attr('data-price'))+ ' VNĐ');
                                    $('.PriceSaving').text('(Bạn đã tiết kiệm được ' + $.number(t.attr('data-discount')) + ' VNĐ)');
                                    $('.original-price s').text($.number(t.attr('data-old-price')) + '₫');
                                }
                            } else {
                                t.addClass('soldout').attr('data-original-title', msgOutofStock);
                            }
                        },
                        'json'
                    );
                }
            }
        }
    });
    /*--- color ---*/
    $colorA.click(function () {
        var t = $(this), size = $('#product-select-watch .size.req .swatch-element'), qtt = $('#qtym'), atc = $('.btnAddToCart'), attrs = {}, $colorA = $('#product-select-watch .color.req .swatch-element'),
            $colorAt = $('#product-select-watch .color.req .swatch-element.active');
        if (!t.hasClass('active')) {
            $colorA.removeClass('active');

            $colorA.children('label').removeClass('sd');
            if (size.length > 1) {
                size.removeClass('active');
                size.children('label').removeClass('sd');
                atc.attr('selId', t.attr('selId')).attr('data-original-title', msgAddToCartSuccess).attr('ck', 0).addClass('unsel');
                t.addClass('active');
                t.children('label').addClass('sd');
                size.removeAttr('data-original-title');
                attrs[$('.color').attr('column')] = t.attr('value');
                size.each(function () {
                    var t = $(this);
                    attrs[$('.size').attr('column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + $('button.btnAddToCart').attr('psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('price', rs.data.price);
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price).attr('data-discount', rs.data.moneyDiscount).attr('data-old-price', parseInt(rs.data.moneyDiscount) + parseInt(rs.data.price));
                            } else {
                                atc.attr('selId', t.attr('selId')).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                                t.addClass('soldout').attr('data-original-title', msgOutofStock).removeAttr('qtt');
                            }
                        },
                        'json'
                    );
                });
            }
            else {
                (t.attr('qtt'));
                t.addClass('active');
                t.children('label').addClass('sd');
                if(t.attr('data-price') > 0) {
                    $('.current-price').text($.number(t.attr('data-price'))+ ' VNĐ');
                    $('.PriceSaving').text('(Bạn đã tiết kiệm được ' + $.number(t.attr('data-discount')) + ' VNĐ)');
                    $('.original-price s').text($.number(t.attr('data-old-price')) + '₫');
                }
                atc.attr('selId', t.attr('selId')).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                qtt.attr('max', t.attr('qtt'));
            }

            // get list image child ---------------
            var ps = [{
                id: t.children('input').attr('data-pids').split(','),
                bothImageSrc: true,
                code: 1,
                storeId: $storeId,
            }],

            pvImg = t.children('label').attr('data-src');

            if (ps.length) {
                getallchildimg(ps, function (rs) {
                    if (rs.images) {
                        var $pviewUri = $('#img_01'),
                            $owl = $(".thumb_gallary .owl-carousel .owl-stage "),
                            $lightbox = $(".thumbnailUri");

                        $pviewUri.addClass('fade').attr('src', pvImg).removeClass('fade');
                        $('#js-gall').attr('href', pvImg);

                        $owl.empty();
                        $lightbox.empty();
                        $.each(rs.images, function (key) {
                            var item = rs.images[key];


                            $owl.append('<div class="owl-item" style=" width: 77.5px; margin-right: 5px;" ><img data-src="' + item.srcUri + '" src="' + item.thumbnailUri + '" alt="alt"/></div>');
                            if (key > 0) {
                                $lightbox.append('<a href="' + item.srcUri + '" data-toggle="lightbox" data-gallery="gallery"></a>');
                            }
                        });





                        $(" .thumbnailUri").hover(function () {
                            $pviewUri.addClass('fade').attr('src', $(this).attr('data-src')).removeClass('fade');
                            body.find('.thumbnailUri').removeClass('active');
                            $(this).addClass('active');
                        });
                    }
                });
            }
        }


    });
})




$(document).ready(function(){
    $("button.btnAddToCart").on("click", function(){
        console.log('abc');
        if ($(this).attr("ck") == 1) {
            var products = [], ps = {};
            ps['id'] = $(this).attr('selid');
            ps['quantity'] = $("#qtym").val();
            var qty = parseInt(ps['quantity']);
            var id = ($(this).attr('id'));
            products.push(ps);

            addToCart(products, 1, function(rs){
                if (rs.status == 1) {

                    if (id == 'buynow'){
                        window.location.href = '/cart/checkout';

                    }else {
                        var totalqtt = parseInt(rs.data.totalQuantities + qty);
                        $('.count-cart span').text(totalqtt);
                        ajaxLoadView({
                            view: '',
                            onSuccess: function (rs) {
                                $('.top-cart-content').html(rs);
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
                        //     window.location.href = 'user/cart'
                        window.location.href = '/cart'
                        // }
                    }
                } else {
                    alert('phong12ww');
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
        $('.current-price strong').html($.number($price_op)+ '<span class="vnd"> VNĐ</span>');
    });
});

$(function checkInv() {
    var storeId = $('#storeId').val(),
        btnCart = $('#AddToCart'),
        // btnBuyCart = $('.buyCart, .pdp-mod-sbutton'),
        $colorReq = $('#product-select-watch .color.req'),
        $colorA = $('#product-select-watch .color.req .swatch-element'),
        $colorAt = $('#product-select-watch .color.req .swatch-element.active'),
        $sizeReq = $('#product-select-watch .size.req'),
        $sizeA = $('#product-select-watch .size.req .swatch-element'),
        $sizeAt = $('#product-select-watch .size.req .swatch-element.active');
    var msgOutofStock = "Sản phẩm tạm thời hết hàng";
    var req = $('.req').length, attrs = {}, atc = $('.btnAddToCart'), qtt = $('#qtym');

    if (req == 1) {
        if ($('.color').length) {
            if ($colorAt.length) {
                attrs[$('.color').attr('column')] = $colorAt.attr('value');
                $colorAt.children('label').addClass('sd');
                $.post(
                    '/product/child?psId=' + atc.attr('psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            qtt.attr('max', rs.data.available);
                            atc.attr('selId', rs.data.id).removeAttr('data-original-title', msgSizeandColor).attr('ck', 1).removeClass('unsel');
                            // if ($($colorAt.length == 1)) {
                            //     $('.btnBuyNow').attr('ck', 1).attr('selId', rs.data.id);
                            // }
                        } else {
                            atc.attr('', msgOutofStock);
                            // atc.html('Tạm hết hàng');
                            // $('#buy-now').hide();
                            // $('.large--one-third').hide();
                        }
                    },
                    'json'
                );

            } else {
                $colorA.each(function () {
                    var t = $(this);
                    attrs[$('.color').attr('column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price).attr('data-discount', rs.data.moneyDiscount).attr('data-old-price', parseInt(rs.data.moneyDiscount) + parseInt(rs.data.price));
                            } else {
                                t.addClass('soldout').attr('', msgOutofStock);
                                // atc.html('Tạm hết hàng');
                                // $('#buy-now').hide();
                                // $('.large--one-third').hide();
                            }
                        },
                        'json'
                    );
                });
            }
        } else {
            if ($('.size').length) {
                if ($sizeAt.length) {
                    $sizeAt.children('label').addClass('sd');
                    attrs[$('.size').attr('column')] = $sizeAt.attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                qtt.attr('max', rs.data.available);
                                atc.attr('selId', rs.data.id).removeAttr('data-original-title', msgSizeandColor).attr('ck', 1).removeClass('unsel');
                                // if ($($sizeAt.length == 1)) {
                                //     $('.btnBuyNow').attr('ck', 1).attr('selId', rs.data.id);
                                // }
                            } else {
                                atc.attr('', msgOutofStock);
                                // atc.html('Tạm hết hàng');
                                // $('#buy-now').hide();
                                // $('.large--one-third').hide();
                            }
                        },
                        'json'
                    );

                } else {
                    $sizeA.each(function () {
                        var t = $(this);
                        attrs[$('.size').attr('column')] = t.attr('value');
                        $.post(
                            '/product/child?psId=' + atc.attr('psid'),
                            {'attrs': attrs},
                            function (rs) {
                                if (rs.code == 1 && rs.data.available > 0) {
                                    t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price).attr('data-discount', rs.data.moneyDiscount).attr('data-old-price', parseInt(rs.data.moneyDiscount) + parseInt(rs.data.price));
                                } else {
                                    t.addClass('soldout').attr('', msgOutofStock);
                                    // atc.html('Tạm hết hàng');
                                    // $('#buy-now').hide();
                                    // $('.large--one-third').hide();
                                }
                            },
                            'json'
                        );
                    });
                }
            }
        }
        return false;
    }

    if (req > 1) {
        var colorAt = $('.color .active'), sizeAt = $('.size .active'),
            $sizeA = $('#product-select-watch .size.req .swatch-element');
        if (colorAt.length && sizeAt.length) {
            attrs[$('.color').attr('column')] = colorAt.attr('value');
            attrs[$('.size').attr('column')] = sizeAt.attr('value');
            $.post(
                '/product/child?psId=' + atc.attr('psid'),
                {'attrs': attrs},
                function (rs) {
                    if (rs.code == 1 && rs.data.available > 0) {
                        $colorA.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price).attr('data-discount', rs.data.moneyDiscount).attr('data-old-price', parseInt(rs.data.moneyDiscount) + parseInt(rs.data.price));
                        if($sizeA.attr('data-price') > 0){
                            $('.ProductPrice').text($.number($sizeA.attr('data-price')) + ' VNĐ');
                        }
                        qtt.attr('max', rs.data.available);
                        atc.attr('selId', rs.data.id).removeAttr('data-original-title', msgSizeandColor).attr('ck', 1).removeClass('unsel');
                        // if (colorAt.length == 1 && sizeAt.length == 1) {
                        //     $('.btnBuyNow').attr('ck', 1).attr('selId', rs.data.id)
                        // }
                    } else {
                        atc.attr('data-original-title', msgOutofStock);
                    }
                },
                'json'
            );

            return false;
        }
        if (colorAt.length && !sizeAt.length) {
            $('.color .active').children('label').addClass('sd');
            attrs[$('.color').attr('column')] = colorAt.attr('value');
            $sizeA.each(function () {
                var t = $(this);
                attrs[$('.size').attr('column')] = t.attr('value');
                $.post(
                    '/product/child?psId=' + atc.attr('psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price).attr('data-discount', rs.data.moneyDiscount).attr('data-old-price', parseInt(rs.data.moneyDiscount) + parseInt(rs.data.price));
                        } else {
                            t.addClass('soldout').attr('', msgOutofStock);
                        }
                    },
                    'json'
                );
            });
            return false;
        }
        if (!colorAt.length && sizeAt.length) {
            var colorAt = $('.color .active'), sizeAt = $('.size .active');
            $('.size .active').children('label').addClass('sd');
            attrs[$('.size').attr('column')] = sizeAt.attr('value');
            $colorA.each(function () {
                var t = $(this);
                attrs[$('.color').attr('column')] = t.attr('value');
                $.post(
                    '/product/child?psId=' + atc.attr('psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price).attr('data-discount', rs.data.moneyDiscount).attr('data-old-price', parseInt(rs.data.moneyDiscount) + parseInt(rs.data.price));
                        } else {
                            t.addClass('soldout').attr('', msgOutofStock);
                        }
                    },
                    'json'
                );
            });
            return false;
        }
    }
});





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

