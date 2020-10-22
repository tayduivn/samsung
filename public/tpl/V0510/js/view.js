$(document).ready(function(){
    AppView.init();
    AppView.media();
    //AppView.eventCart();
    AppView.loadDepots();
});

let storeId = $('#storeId').val(),
    btnCart = $('#addCart');

let AppView = {
    init: function () {
        $(".num_1").on('click', function () {
            var $quantity = $('#qtym'), min = parseInt($quantity.attr('min')), val = parseInt($quantity.val());
            if (!isNaN(val) && val > min) {
                $quantity.val(val - 1);
            }
            return false;
        });

        $(".num_2").on('click', function () {
            let $quantity = $('#qtym'), max = parseInt($quantity.attr('max')), val = parseInt($quantity.val());
            if (!isNaN(val) && val < max) {
                $quantity.val(val + 1);
            } else {
                alert('Bạn chỉ có thể đặt tối đa ' + max + ' sản phẩm');
            }
            return false;
        });
        $('#qtym').on('keypress', function(){
            if ( isNaN(this.value + String.fromCharCode(event.keyCode) )) return false;
        })
        $('#qtym').on('change', function(){
            if(this.value == 0){this.value=1;}
        })
    },
    media:function () {
        if($(window).width() > 767){
            $('.thumb_product_details .owl-item .item img').click(function(){
                var t = $(this),
                    src = $(this).attr('src');
                if (!t.hasClass('active')) {
                    if (t.parent('div').attr('data-src').length) {
                        $('#single_image img').attr('src', src);
                    };
                };
            });
        }
        $('.color.req .select-swap .swatch-element').click(function () {
            $('.thumbnail-item').removeClass('thumbnail-border');
            var attr = $(this).children('input').attr('data-img-src');
            var t = $(this).children('.input-product').attr('data-img-src');
            $('#single_image img').attr('src', attr);
            $('.zoomWindow').css('background-image', 'url(' + attr + ')');
        })
    },

    loadDepots:function(qty,selId){
        if (qty){
            ajaxLoadView({
                view: 'loadInventory&psId='+selId,
                onSuccess: function (rs) {
                    $('.eachDepots').html(rs).show();
                }
            });
        }else{
            $('.eachDepots').hide();
        }
    },
};

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
    var msgColor = "vui lòng chọn màu sắc trước";
    var msgSizeandColor = "Vui lòng chọn màu và kích cỡ";
    /*--- size ---*/
    $sizeA.on('click', function () {
        var t = $(this), size = $sizeA, qtt = $('#psQtt'), atc = $('.btnAddToCart'), attrs = {};
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
                    // if (t.attr('data-price') > 0) {
                      //  $('.current-price').text($.number(t.attr('data-price')) + ' VNĐ');
                        //$('.PriceSaving').text('(Bạn đã tiết kiệm được ' + $.number(t.attr('data-discount')) + ' VNĐ)');
                       // $('.original-price s').text($.number(t.attr('data-old-price')) + '₫');
                    //}
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
                        atc.attr('selId', t.attr('selId')).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
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

    $colorA.click(function () {
        var t = $(this), size = $('#product-select-watch .size.req .swatch-element'), qtt = $('#psQtt'), atc = $('.btnAddToCart'), attrs = {}, $colorA = $('#product-select-watch .color.req .swatch-element'),
            $colorAt = $('#product-select-watch .color.req .swatch-element.active');
        if (!t.hasClass('active')) {
            $colorA.removeClass('active');
            size.removeClass('soldout');
            $colorA.children('label').removeClass('sd');
            if (size.length > 1) {
                size.removeClass('active');
                size.children('label').removeClass('sd');
                atc.attr('selId', t.attr('selId')).attr('data-original-title', msgSizeandColor).attr('ck', 0).addClass('unsel');
                t.addClass('active');
                t.children('label').addClass('sd');
                size.removeAttr('data-original-title');
                attrs[$('.color').attr('column')] = t.attr('value');
                size.each(function () {
                    var t = $(this);
                    attrs[$('.size').attr('column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + $('button.btnAddToCart').attr('psId'),
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
        }

        var ps = [{
            id: t.children('input').attr('data-pids').split(','),
            bothImageSrc: true,
            code: 1,
            storeId: storeId
        }];

        if (ps.length) {
            getallchildimg(ps, function (rs) {
                if (rs.images) {
                    var $pviewUri = $(this).attr('data-src'),
                        $owl = $('#ProductPhoto .owl-stage');
                    if ($(window).width() <= 480) {
                        var $lightbox = $('#ProductThumbs .inner .owl-stage');
                    } else {
                        var $lightbox = $('#ProductThumbs .inner');
                    }
                    $lightbox.empty();
                    $owl.empty();
                    $.each(rs.images, function (vl) {
                        var srcUri = rs.images[vl].srcUri,
                            thumbUri = rs.images[vl].thumbnailUri;
                        if ($(window).width() <= 480) {
                            $lightbox.append('<div class="owl-item" style="width: 96.667px;"><div class="item"><li class="thumbnail-item"><a class="product-single__thumbnail" data-pos="1"><img class="lazyload img-aside" src="'+ thumbUri +'" data-src="'+ thumbUri +'" /></a></li></div></div>');
                            // $('#ProductThumbs .inner').owlCarousel('destroy');
                            // $('#ProductThumbs .inner').owlCarousel({
                            //     autoplay:false,
                            //     loop: false,
                            //     nav:true,
                            //     dots:false,
                            //     navSpeed:1000,
                            //     items:3,
                            // });
                        } else {
                            $lightbox.append('<li class="thumbnail-item"><a class="product-single__thumbnail" data-pos="1"><img class="lazyload img-aside" src="'+ thumbUri +'" data-src="'+ thumbUri +'" /></a></li>');
                        }
                        $owl.append('<div class="owl-item" style="width: 469px;">' +
                            '                            <div class="item"><a><img class="lazyload" src="'+ srcUri +'" /></a></div>' +
                            '                            </div>').show('slow');
                    });

                    $('#ProductPhoto').owlCarousel('destroy');
                    $('#ProductPhoto').owlCarousel({
                        autoplay:false,
                        loop: false,
                        nav:false,
                        navSpeed:1000,
                        dots:false,
                        items:1,
                        rewind:true,
                    });

                    if ($('.inner .thumbnail-item').length >= 6) {
                        $('.product-thumb-control').show();
                    } else {
                        $('.product-thumb-control').hide();
                    }

                    $('.product-single__thumbnail').click(function () {
                        $('.thumbnail-item').removeClass('thumbnail-border');
                        $(this).parent().addClass('thumbnail-border');
                        var attr = $(this).children().attr('src');
                        $('#ProductPhoto .active .lazyloaded').attr('src', attr);
                        if ($('#ProductPhoto .owl-item').hasClass('active')) {
                            $('#ProductPhoto .zoom').removeClass('zoom');
                            $('.zoomWindow').css('background-image', 'url(' + attr + ')');
                        }
                    });
                    if ($('#ProductPhoto .owl-item').hasClass('active')) {
                        $('#ProductPhoto .active').children().children().children().addClass('zoom');
                    }

                    $('.zoom').elevateZoom({
                        scrollZoom: true
                    });
                    if ($('#ProductPhoto .active .item a img').attr('src') != $('#ProductPhoto .active .item a img').attr('data-src')) {
                        $(this).removeClass('zoom');
                    }
                }else{
                    // proThumList.append('<a data-hash="image'+k+'" href="'+ src +'" class="image-frame"><img class="cloudzoom" src="'+ src +'" alt="ThumbnailUri" /></a>');
                }
            });
        }
    });
});
$(document).ready(function (){
    $(".btnAddToCart").on("click", function(e){
        e.preventDefault();
        if ($(this).attr("ck") == 1) {
            var products = [], ps = {};
            var id = ($(this).attr('id'));
            ps['id'] = $(this).attr('selId');
            if (id == 'btnQuickCart' || id == 'buyNow') {
                ps['quantity'] = 1;
            } else {
                ps['quantity'] = $("#psQtt").val();
            }
            var $qty = parseInt(ps['quantity']);
            products.push(ps);
            addToCart(products, 1, function(rs){

                    if (id == 'buynow'){
                        window.location.href = '/cart/checkout';
                    }
                    if (id == 'addtoCart') {
                        var totalqtt = parseInt(rs.data.totalQuantities + $qty);
                        $('.countCart').text(totalqtt);
                        var $item = $('#psId_' + ps['id']);
                        ajaxLoadView({
                            view: 'cartTop',
                            onSuccess: function (rs) {
                                $('.top-cart-content').html(rs);
                            }
                        });
                        $('#alertFixed').html('<div class="alert alert-success fade in alert-dismissible clearfix" style="margin-top:18px;">\
                                        <a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>\
                                        <div class="alertFx"><div class="pull-left"><img src="' + $item.context.images["img-01"].currentSrc + '" alt="Images"></div>\
                                        <div class="pull-left"><div class="green">Đã thêm vào giỏ hàng thành công</div><strong>' + $item.attr('data-name') + '</strong><div><a href="/cart">Xem giỏ hàng <i class="fa fa-angle-double-right"></i></a></div></div>\
                                        <div class="pull-left"><i class="fa fa-check"></i></div></div></div>').fadeIn(100);
                        setTimeout(function () {
                            $('#alertFixed').fadeOut(300).empty();
                        }, 10000);
                    }
            });
        }
        else {
            // alert(msgOutofStock);
            // alert(msgSizeColorProduct);
            alert($(this).attr('data-original-title'));
            return false;
        }
    });
    function loadDepots (qty,selId){
        if (qty){
            ajaxLoadView({
                view: 'loadInventory&psId='+selId,
                onSuccess: function (rs) {
                    $('.eachDepots').html(rs).show();
                }
            });
        }else{
            $('.eachDepots').hide();
        }
    };
});
$(function checkInv() {
    var storeId = $('#storeId').val(),
        btnCart = $('#addtoCart'),
        // btnBuyCart = $('.buyCart, .pdp-mod-sbutton'),
        $colorReq = $('#product-select-watch .color.req'),
        $colorA = $('#product-select-watch .color.req .swatch-element'),
        $colorAt = $('#product-select-watch .color.req .swatch-element.active'),
        $sizeReq = $('#product-select-watch .size.req'),
        $sizeA = $('#product-select-watch .size.req .swatch-element'),
        $sizeAt = $('#product-select-watch .size.req .swatch-element.active');
    var msgOutofStock = "Sản phẩm tạm thời hết hàng";
    var req = $('.req').length, attrs = {}, atc = $('.btnAddToCart'), qtt = $('#psQtt');

    if (req == 1) {
        if ($('.color').length) {
            if ($colorAt.length) {
                attrs[$('.color').attr('column')] = $colorAt.attr('value');
                $colorAt.children('label').addClass('sd');
                $.post(
                    '/product/child?psId=' + atc.attr('psId'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            qtt.attr('max', rs.data.available);
                            atc.attr('selId', rs.data.id).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                             if ($($colorAt.length == 1)) {
                                 $('.btnBuyNow').attr('ck', 1).attr('selId', rs.data.id);
                             }
                        } else {
                            atc.attr('data-original-title', msgOutofStock);
                             atc.html('Tạm hết hàng');
                             $('#buynow').hide();
                             $('.large--one-third').hide();
                        }
                    },
                    'json'
                );

            } else {
                $colorA.each(function () {
                    var t = $(this);
                    attrs[$('.color').attr('column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('psId'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price).attr('data-discount', rs.data.moneyDiscount).attr('data-old-price', parseInt(rs.data.moneyDiscount) + parseInt(rs.data.price));
                            } else {
                                t.addClass('soldout').attr('data-original-title', msgOutofStock);
                                 atc.html('Tạm hết hàng');
                                 $('#buynow').hide();
                                 $('.large--one-third').hide();
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
                        '/product/child?psId=' + atc.attr('psId'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                qtt.attr('max', rs.data.available);
                                atc.attr('selId', rs.data.id).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                                 if ($($sizeAt.length == 1)) {
                                     $('.btnBuyNow').attr('ck', 1).attr('selId', rs.data.id);
                                 }
                            } else {
                                atc.attr('data-original-title', msgOutofStock);
                                 atc.html('Tạm hết hàng');
                                 $('#buynow').hide();
                                 $('.large--one-third').hide();
                            }
                        },
                        'json'
                    );

                } else {
                    $sizeA.each(function () {
                        var t = $(this);
                        attrs[$('.size').attr('column')] = t.attr('value');
                        $.post(
                            '/product/child?psId=' + atc.attr('psId'),
                            {'attrs': attrs},
                            function (rs) {
                                if (rs.code == 1 && rs.data.available > 0) {
                                    t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price).attr('data-discount', rs.data.moneyDiscount).attr('data-old-price', parseInt(rs.data.moneyDiscount) + parseInt(rs.data.price));
                                } else {
                                    t.addClass('soldout').attr('data-original-title', msgOutofStock);
                                     atc.html('Tạm hết hàng');
                                     $('#buynow').hide();
                                     $('.large--one-third').hide();
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
                '/product/child?psId=' + atc.attr('psId'),
                {'attrs': attrs},
                function (rs) {
                    if (rs.code == 1 && rs.data.available > 0) {
                        $colorA.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price).attr('data-discount', rs.data.moneyDiscount).attr('data-old-price', parseInt(rs.data.moneyDiscount) + parseInt(rs.data.price));
                        if($sizeA.attr('data-price') > 0){
                            $('.ProductPrice').text($.number($sizeA.attr('data-price')) + ' VNĐ');
                        }
                        qtt.attr('max', rs.data.available);
                        atc.attr('selId', rs.data.id).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                         if (colorAt.length == 1 && sizeAt.length == 1) {
                             $('.btnBuyNow').attr('ck', 1).attr('selId', rs.data.id)
                         }
                    } else {
                        atc.attr('data-original-title', msgOutofStock);
                        atc.html('Tạm hết hàng');
                        $('#buynow').hide();
                        $('.large--one-third').hide();
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
                    '/product/child?psId=' + atc.attr('psId'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price).attr('data-discount', rs.data.moneyDiscount).attr('data-old-price', parseInt(rs.data.moneyDiscount) + parseInt(rs.data.price));
                        } else {
                            t.addClass('soldout').attr('data-original-title', msgOutofStock);
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
                    '/product/child?psId=' + atc.attr('psId'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price).attr('data-discount', rs.data.moneyDiscount).attr('data-old-price', parseInt(rs.data.moneyDiscount) + parseInt(rs.data.price));
                        } else {
                            t.addClass('soldout').attr('data-original-title', msgOutofStock);
                        }
                    },
                    'json'
                );
            });
            return false;
        }
    }
})
