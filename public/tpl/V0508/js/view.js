const CLASSVIEW = {
    show: 'show',
    ovl_hidden: 'ovl-hidden',
    active: 'active',
}
$(function () {
    //===auto click===
        $('color req a:first-child').trigger('click');
    //===end auto click===
    $('.childProduct-size').change(function () {
        var val = $(this).val(), data = val.split(","), $psId = data[0], $price_op = data[1];
        if ($psId != 1) {
            $('.btnCart').attr('ck', 1).attr('selId', $psId).removeClass('unsel').removeAttr('title').removeAttr('data-original-title');
        } else {
            $('.btnCart').attr('title', 'Vui lòng chọn sản phẩm!').attr('data-original-title', 'Vui lòng chọn sản phẩm!').attr('ck', 0);
        }
        $('.textselectsize').html($.number($price_op)+ ' ₫');
    });

    //===select color===
    $('.color a').on('click',function () {
        var price_main =$(this).attr('price');
        var price_color = $(this).attr('price');
        var qtt_color = $(this).attr('qtt');
       var img_attbt = $(this).attr('data-src-img');
       var img_attbt_name = $(this).attr('data-name');
       // $('#list-item-1 img').attr({
       //     'src': img_attbt
       // });
       $('.name-color-select').text(img_attbt_name);
       $('.qtt-count').text(qtt_color);
       if(price_color > 0){
           $('.textselectsize').text(new Intl.NumberFormat('vi-VN', { maximumSignificantDigits: 3 }).format(price_color)+' ₫');
       }else if(price_main == 0){
           $('.textselectsize').text('Liên Hệ');
       }

    });
    //===end select color===

    //=== =chuyen doi gia 0 ₫ thanh lien he===
    $('.textselectsize').each(function () {
        var price_textselect = $(this).attr('data-price');
        if(price_textselect === "0"){
            $(this).text('Liên Hệ');
        }
    })
    //===end chuyen doi gia 0 ₫ thanh lien he===

    //===Select size===
    $('.size a').on('click',function () {
       var pr_attbt = $(this).attr('price');
       var pr_saving = $('.price-saving').attr('price-saving');
       var pr_cost = $('.price-cost').attr('price-cost');
       var pr_qtt = $(this).attr('qtt');
        if(!pr_attbt){
            alert("vui lòng chọn màu trước khi chọn kích cỡ !");
        }else if (pr_attbt === "0"){
            $('.textselectsize').text('Liên Hệ');
        }
        else if(pr_attbt === pr_cost){
            var pr_minus= pr_attbt - pr_cost;
                $('.product-rice-discount.price-saving').text('Tiết Kiệm '+pr_minus +' ₫');
            $('.qtt-count').text(pr_qtt);
            $('.textselectsize').text(new Intl.NumberFormat('vi-VN', { maximumSignificantDigits: 3 }).format(pr_attbt)+' ₫');
        }
        else{
            $('.qtt-count').text(pr_qtt);
            $('.textselectsize').text(new Intl.NumberFormat('vi-VN', { maximumSignificantDigits: 3 }).format(pr_attbt)+' ₫');
            $('.price-saving').text('Tiết Kiệm '+new Intl.NumberFormat('vi-VN', { maximumSignificantDigits: 3 }).format(pr_saving)+' ₫');
        }
    });
    //===end Select size===
    if($(window).width() <= 992 ) {
        $('.total-slide').removeClass('magic-popup-img-child');
    }

    //===scroll spy===
    $('.total-slide').on('click','.item a', function() {
        console.log('click');
        var scrollAnchor = $(this).attr('data-scroll'),
            scrollPoint = $('img[data-anchor="' + scrollAnchor + '"]').offset().top - 28;
        $('body,html').animate({
            scrollTop: scrollPoint
        }, 500);
        return false;
    });

    $(window).scroll(function() {
        var windscroll = $(window).scrollTop();
        if (windscroll >= 100) {
            $('.display-content-product .list-display-content-product').each(function(i) {
                if ($(this).position().top <= windscroll - 20) {
                    $('.total-slide .item.active').removeClass(CLASSVIEW.active);
                    $('.total-slide .item').eq(i).addClass(CLASSVIEW.active);
                }
            });
        } else {

            $('.total-slide .item.active').removeClass(CLASSVIEW.active);
            $('.total-slide .item.active:first').addClass(CLASSVIEW.active);
        }

    }).scroll();

    $('.icon-view-click-js').click(function () {
        var location_img = $('.total-slide .item.active a img').attr('src');
        console.log(location_img);
        $('.total-display-content-product .item.slick-active img').trigger('click');
        $('img.mfp-img').attr({
                'src': location_img
            });
        $('.navbar').addClass('z-index-1000');
    });
    $('.mfp-close').click(function () {
        $('.navbar').removeClass('z-index-1000');
    });
    //===end scroll spy===

    //===addClass opacity for last image===
    // $(window).scroll(function() {
    //     var location_fixed_view = $('html, body').scrollTop();
    //     var loaction_opacity = $('.list-display-content-product:last-child').offset().top;
    //     if(location_fixed_view >= loaction_opacity){
    //         $('.icon-view-click-js').addClass('opacity');
    //     }else{
    //         $('.icon-view-click-js').removeClass('opacity');
    //     }
    // });
    $(window).scroll(function() {
        var location_fixed_view = $('html, body').scrollTop();
        var loaction_lastchild = $('.list-display-content-product:last-child');
        var count_imgdisplay = $('.list-display-content-product').length;
        var many_img = ($('.status-many-img').offset() || { "top": NaN }).top;
        var little_img = ($('.status-little-img').offset() || { "top": NaN }).top;
        if(count_imgdisplay >= 2){
            //*status-many-img*
            loaction_lastchild.addClass('status-many-img');
        }else if(count_imgdisplay <=1){
            //*status-little-img*
            loaction_lastchild.addClass('status-little-img');
        }
        if(location_fixed_view >= many_img){
            $('.icon-view-click-js').addClass('opacity');
        }else if(location_fixed_view >= little_img){
            $('.icon-view-click-js').addClass('opacity');
        }else{
            $('.icon-view-click-js').removeClass('opacity');
        }
    });
    //=== end addClass opacity for last image ===

    //=== slide for @media max-width 992px ===
    $('.display-content-product').slick({
            infinite: false,
            slidesToShow: 10,
            slidesToScroll: 10,
            vertical: true,
            infinite: true,
            button:true,
            unslick:true,
            prevArrow:'.icon .fa-angle-left',
            nextArrow:'.icon .fa-angle-right',
            appendArrows: '.contron-pre-next',
            responsive: [{
                breakpoint: 992,
                settings: {
                    unsiick:false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    vertical: false,
                }
            },
            ]
    });
    //=== end slide for @media max-width 992px ===

    checkInv();
    $('.Down').click(function () {
        var qtt = $('.result-input'), max = parseInt(qtt.attr('max')), v = parseInt(qtt.val());

        if (v > 1) {
            qtt.val(v - 1);
            qtt.attr('val', v - 1);
        } else {
            alert('Bạn phải đặt số lượng tối thiểu là 1 sản phẩm !');
        }

    });
    $('.Plus').click(function () {
        var qtt = $('.result-input'), max = parseInt(qtt.attr('max')), v = parseInt(qtt.val());

        if (v < max) {
            qtt.val(v + 1);
            qtt.attr('val', v + 1);
        } else {
            alert('Bạn không thể đặt quá số lượng còn lại của sản phẩm !');
        }

    });
    $('.size a').click(function () {
        var t = $(this), size = $('.size a'), qtt = $('#quantity'),
            atc = $('#addToCart'), fsb = $('#addToCartLive');
        if (!t.hasClass(CLASSVIEW.active)) {
            size.removeClass(CLASSVIEW.active);
            atc.attr('title', 'Vui lòng chọn màu sắc hoặc kích cỡ!').attr('ck', 0).addClass('unsel');
            fsb.attr('title', 'Vui lòng chọn màu sắc hoặc kích cỡ!').attr('ck', 0).addClass('unsel');
            if ($('.color').length && !$('.color a.active').length) {
                size.attr('title', 'Vui lòng chọn màu trước!');
            } else if (t.attr('qtt')) {
                t.addClass(CLASSVIEW.active);
                qtt.attr('max', t.attr('qtt'));
                atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                atc.attr('selId', t.attr('selId')).removeAttr('data-original-title');
                fsb.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                fsb.attr('selId', t.attr('selId')).removeAttr('data-original-title');
                // if (t.attr('price') > 0) {
                //     $('.price_view span').html($.number(t.attr('price')) + ' VNĐ');
                // } else {
                //     $('.price_view span').html('Liên hệ');
                // }
            }
        }
    });
    // $('.color a').click(function () {
    //     var t = $(this), size = $('.size a'), qtt = $('#quantity'),
    //         atc = $('#addToCart'), fsb = $('#addToCartLive'), attrs = {};
    //     if (!t.hasClass(CLASSVIEW.active)) {
    //         $('.color a').removeClass(CLASSVIEW.active);
    //         atc.attr('title', 'Vui lòng chọn màu sắc hoặc kích cỡ!').attr('ck', 0).addClass('unsel');
    //         fsb.attr('title', 'Vui lòng chọn màu sắc hoặc kích cỡ!').attr('ck', 0).addClass('unsel');
    //         if (size.length > 1) {
    //             size.removeClass('active deactive');
    //             t.addClass(CLASSVIEW.active);
    //             size.removeAttr('title');
    //             attrs[$('.color').attr('column')] = t.attr('value');
    //             size.each(function () {
    //                 var t = $(this);
    //                 attrs[$('.size').attr('column')] = t.attr('value');
    //                 $.post(
    //                     '/product/child?psId=' + atc.attr('psid'),
    //                     {'attrs': attrs},
    //                     function (rs) {
    //                         if (rs.code === 1 && rs.data.available > 0) {
    //                             t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('price', rs.data.price);
    //                         } else {
    //                             t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!').removeAttr('qtt');
    //                         }
    //                     },
    //                     'json'
    //                 );
    //             });
    //
    //         } else {
    //             if (t.attr('qtt')) {
    //                 t.addClass(CLASSVIEW.active);
    //                 atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
    //                 atc.attr('selId', t.attr('selId')).removeAttr('data-original-title');
    //                 fsb.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
    //                 fsb.attr('selId', t.attr('selId')).removeAttr('data-original-title');
    //                 qtt.attr('max', t.attr('qtt'));
    //             }
    //         }
    //     }
    // });
    //=== select color addtocard ===
    $('.color a').click(function () {
        var t = $(this), size = $('.size a'), qtt = $('#quantity'),
            atc = $('#addToCart'), fsb = $('#addToCartLive'), attrs = {};
        if (!t.hasClass('active')) {
            $('.color a').removeClass('active');
            atc.attr('title', 'Vui lòng chọn màu sắc hoặc kích cỡ!').attr('ck', 0).addClass('unsel');
            fsb.attr('title', 'Vui lòng chọn màu sắc hoặc kích cỡ!').attr('ck', 0).addClass('unsel');
            if (size.length > 1) {
                size.removeClass('active deactive');
                t.addClass('active');
                size.removeAttr('title');
                attrs[$('.color').attr('column')] = t.attr('value');
                size.each(function () {
                    var t = $(this);
                    attrs[$('.size').attr('column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code === 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('price', rs.data.price);
                            } else {
                                t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!').removeAttr('qtt');
                            }
                        },
                        'json'
                    );
                });

            } else {
                if (t.attr('qtt')) {
                    t.addClass('active');
                    atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                    atc.attr('selId', t.attr('selId')).removeAttr('data-original-title');
                    fsb.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                    fsb.attr('selId', t.attr('selId')).removeAttr('data-original-title');
                    qtt.attr('max', t.attr('qtt'));
                }
            }
            var ids = t.attr('data-pids').split(',');
            var ps = [];
            var storeId = $('.product-item').attr('data-storeId');
            var listImgSmall = $('.total-slide');
            var listImgBig = $('.display-content-product');
            ps.push({id: ids, getSrcUri: true, code: 1, storeId: storeId});
            if ($(window).width() > 1024) {
                listImgSmall.empty()
                listImgBig.empty()
                if (ps.length) {
                    getallchildimg(ps, function (rs) {
                        listImgSmall.empty();
                        listImgBig.empty();
                        if (rs.images != "") {
                            $.each(rs.images, function (vl) {
                                listImgSmall.append('<div class="item"><a href="javascript:" id="list-item-'+ vl +'" data-scroll="'+ rs.images[vl] +'"><img class="click-img" src="'+ rs.images[vl] +'" alt="'+ rs.images[vl] +'"></a></div>');
                                listImgBig.append('<div id="list-item-'+ vl +'" href="'+ rs.images[vl] +'" disabled type="button" data-scroll="'+ rs.images[vl] +'"  class="item list-display-content-product"><img src="'+ rs.images[vl] +'" data-anchor="'+ rs.images[vl] +'" alt="'+ rs.images[vl] +'" class="img-display-content-product"></div>')
                                console.log($('.img-display-content-product').attr('src'));
                            });
                        }
                    });
                }
            }
        }
    });
    //=== end select color addtocard ===

    //=== add to cart ===
    $('.btnCart').on('click',function () {
        var t = $(this);
        if (t.attr('ck') === "1") {
            var products = [], ps = {};
            ps['id'] = parseInt(t.attr('selId'));
            ps['quantity'] = parseInt($('#quantity').val());
            products.push(ps);
            console.log(ps['quantity']);
            addToCart(products, 1, function (rs) {
                if (rs.status === 1) {
                    if (t.attr('id') === 'addToCartLive') {
                        ajaxLoadView({
                            view: 'popupCart',
                            onSuccess: function (rs) {
                                $('.shopping-cart-ajax-content').html(rs);
                                $('.shopping-cart-ajax').addClass(CLASSVIEW.show);
                                $('.layer-shopping-cart-live').addClass(CLASSVIEW.show);
                                $('main, header, footer').addClass('push-shopping-cart');
                                $('body').addClass(CLASSVIEW.ovl_hidden);
                                $('html').addClass(CLASSVIEW.ovl_hidden);
                                ajaxLoadView({
                                    view: 'countcart',
                                    onSuccess: function (rs) {
                                        $(".count_cart").html(rs);
                                    }
                                });
                            }
                        });
                    } else {
                        window.location.href = "/cart";
                    }
                } else {
                    alert(rs.messages);
                }
            });
        } else {
            alert('Vui lòng chọn kích thước và màu sắc');
        }
    });
    //=== end add to cart ===

    $('.show-more-des-view').click(function () {
        $('.meta-description-product-details').toggleClass('ovl-hidden-content');
    });
    $('.show-more-des-view.xemthem').click(function () {
        $('.show-more-des-view').addClass('thugon').removeClass('xemthem');
        $('.show-more-des-view').text('Thu Gọn');
    });
    $('.show-more-des-view.thugon').click(function () {
        $('.show-more-des-view').removeClass('thugon').addClass('xemthem');
        $('.show-more-des-view').text('Xem Thêm');
    });
    $('.title-tutorial-product-size').click(function () {
        $('.navbar').addClass('z-index-1000');
        $('.layer-shopping-cart-live').addClass(CLASSVIEW.show);
        $('.box-modal-tutorial-select-size').addClass(CLASSVIEW.show);
        $('.box-modal-tutorial-layer').addClass(CLASSVIEW.show);
    });
    $('.close-box-modal, .layer-shopping-cart-live').click(function () {
        $('.navbar').removeClass('z-index-1000');
        $('.layer-shopping-cart-live').removeClass(CLASSVIEW.show);
        $('.box-modal-tutorial-select-size').removeClass(CLASSVIEW.show);
    });
});

//=== function inventory check ===
function checkInv() {
var req = $('.req').length, attrs = {}, atc = $('#addToCart'),
    fsb = $('#addToCartLive'), qtt = $('#quantity');
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
                        fsb.attr('selId', rs.data.id).removeAttr('title').attr('ck', 1).removeClass('unsel');
                    } else {
                        atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
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
                            t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('price', rs.data.price);
                        } else {
                            t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!');
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
                        atc.attr('selId', rs.data.id).removeAttr('title data-original-title').attr('ck', 1).removeClass('unsel');
                        fsb.attr('selId', rs.data.id).removeAttr('title data-original-title').attr('ck', 1).removeClass('unsel');

                    } else {
                        atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
                        fsb.attr('title', 'Sản phẩm tạm thời hết hàng!');
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
                            t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('price', rs.data.price);
                        } else {
                            t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!');
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
                    qtt.attr('max', rs.data.available);
                    atc.attr('selId', rs.data.id).removeAttr('title').removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                    fsb.attr('selId', rs.data.id).removeAttr('title').removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                } else {
                    atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
                    fsb.attr('title', 'Sản phẩm tạm thời hết hàng!');
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
                        t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('price', rs.data.price);
                    } else {
                        t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!');
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
                        t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('price', rs.data.price);
                    } else {
                        t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!');
                    }
                },
                'json'
            );
        });
        return false;
    }
}
}
//=== end function inventory check ===
