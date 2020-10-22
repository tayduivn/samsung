$(document).ready(function() {

    var itemfrs = $('.color a');

    $('.gallery').on('click', function() {
        $('.gallery').removeClass('js-active-img');
        $(this).addClass('js-active-img');
    });

    $('.js-text-size').on('click', function() {
        $('.js-text-size').removeClass('active');
        $(this).addClass('active');
        let js_size = $('.js-text-size');
        let js_size_active = $('.js-size').length;
        let size_parents = js_size.parents('.js-size.deactive').attr('title');
        if ($(this).hasClass('active') && size_parents === msgOutofStock) {
            $('a.btnAddToCart').addClass('unsel');
        }
        if (js_size_active == 1) {
            if (js_size_active.attr('qtt') > 0) {
                $('a.btnAddToCart').removeClass('unsel');
            }
        }

    });

    $('.gallery').click(function(event) {
        event.preventDefault();
        const wrapSlider = $('.p_src');
        const slickDetail = $('.slick-detail');
        const slickDetail_items = $('.carousel-thumb-slick');
        const sliderSlick = slickDetail.find('.slick-slide');
        const sliderSlick_items = slickDetail_items.find('.slick-slide');

        if (sliderSlick.hasClass('slick-active') && sliderSlick_items.hasClass('slick-active')) {
            let slider_1 = slickDetail.find('.slick-active');
            let slider_2 = slickDetail_items.find('.slick-active:first-child');
            slider_1.find('img').attr('src', $(this).attr('href'));
            slider_2.find('img').attr('src', $(this).attr('href'));
        }
        return false;
    });
    // splitChildimg(itemfrs.attr('data-pids').split(','));

    function productAmout() {
        const amout = $('.amout');
        const amoutInput = amout.find('.amout-qty');
        const amoutMinus = amout.find('.amout-minus');
        const amoutPlus = amout.find('.amout-plus');
        let amoutValue = parseInt(amoutInput.val());
        const amoutMin = parseInt(amoutInput.attr('min'));
        const amoutMax = parseInt(amoutInput.attr('max'));
        if (amoutValue === '' || amoutValue <= 0) {
            amoutValue = 1;
            amoutInput.val(amoutValue);
        }
        amoutMinus.on('click', function(event) {
            if (amoutValue <= amoutMin) return;
            amoutValue = amoutValue - 1;
            amoutInput.val(amoutValue);
        });
        $('.amout-plus').on('click', function(e) {
            if (amoutValue <= amoutMax) {
                amoutValue = amoutValue + 1;
                amoutInput.val(amoutValue);
            } else {
                alert(`Sản phẩm hết hàng `);
            }
        });
    }
    productAmout();

    $('.childProducts').change(function() {
        var val = $(this).val(),
            data = val.split(","),
            $psId = data[0],
            $price_op = data[1];
        if ($psId != 1) {
            $('#addToCart').attr('ck', 1).attr('selId', $psId).removeClass('unsel').removeAttr('title').removeAttr('data-original-title');
        } else {
            $('#addToCart').attr('title', 'Vui lòng chọn sản phẩm!').attr('data-original-title', 'Vui lòng chọn sản phẩm!').attr('ck', 0);
        }
        $('.product-detail__price').html($.number($price_op) + '<i>₫</i>');
    });

    $("a.btnAddToCart").on("click", function() {
        if ($(this).attr("ck") == 1) {
            var products = [],
                ps = {};
            ps['id'] = $(this).attr('selid');
            ps['quantity'] = $("#quatity").val();
            var qty = parseInt(ps['quantity']);
            var id = ($(this).attr('id'));
            products.push(ps);
            addToCart(products, 1, function(rs) {
                if (rs.status == 1) {
                    if (id == 'buynow') {
                        window.location.href = '/cart/checkout';
                    } else {
                        // var totalqtt = parseInt(rs.data.totalQuantities + qty);
                        // $('.count-cart span').text(totalqtt);
                        // ajaxLoadView({
                        //     view: 'topCart',
                        //     onSuccess: function(rs) {
                        //         $('.top-cart-content').html(rs);
                        //     }
                        // });
                        window.location.href = '/cart'
                    }
                } else {
                    alert(rs.messages);
                }
            });
        } else {
            let notification = $('#notification'),
                color = $('.size a'),
                size = $('.req js-size');
            if (!color.hasClass('js-active-img') && !size.hasClass('active')) {
                notification.text('Bạn chưa chọn size hoặc màu sắc').addClass('d-block');
            }
        }
    });

    $('.size a').click(function() {
        var t = $(this),
            size = $('.size a'),
            qtt = $('#quatity'),
            atc = $('.btnAddToCart'),
            attrs = {};
        if (!t.hasClass('active')) {
            size.removeClass('active');
            atc.attr('title', 'Vui lòng chọn màu sắc hoặc kích cỡ!').attr('ck', 0).addClass('unsel');
            attrs[$('.size').attr('column')] = t.attr('value');
            if ($('.color').length && !$('.color a.active').length) {
                size.attr('title', msgColor);
            } else {
                if ($('.color').length) {
                    if (t.attr('qtt')) {
                        t.addClass('active');
                        atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                        atc.attr('selId', t.attr('selId')).removeAttr('data-original-title');
                        if (t.attr('data-price') > 0) {
                            $('.product-detail__price').text($.number(t.attr('data-price')) + '₫');
                        }
                        qtt.attr('max', t.attr('qtt'));
                        atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                    } else {
                        t.addClass('deactive').attr('title', msgOutofStock);
                    }
                } else {
                    $.post(
                        '/product/child?childId=' + t.attr('selId'), { 'attrs': attrs },
                        function(rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.addClass('active');
                                qtt.attr('max', t.attr('qtt'));
                                atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                                if (t.attr('data-price') > 0) {
                                    $('.product-detail__price').text($.number(t.attr('data-price')) + '₫');
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
    $('.color a').click(function() {
        var t = $(this),
            size = $('.size a'),
            qtt = $('#quatity'),
            atc = $('.btnAddToCart'),
            attrs = {};

        if (!t.hasClass('active')) {
            $('.color a').removeClass('active');
            if (size.length > 1) {
                size.removeClass('active deactive');
                t.addClass('active');
                size.removeAttr('title');
                attrs[$('.color').attr('column')] = t.attr('value');
                size.each(function() {
                    var t = $(this);
                    attrs[$('.size').attr('column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('psid'), { 'attrs': attrs },
                        function(rs) {
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
                if (t.attr('qtt')) {
                    t.addClass('active');
                    atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                    atc.attr('selId', t.attr('selId')).removeAttr('data-original-title');
                    qtt.attr('max', t.attr('qtt'));
                }
            }
        }
        // splitChildimg(t.attr('data-pids').split(','));
    });

    function checkInv() {
        var req = $('.req').length,
            attrs = {},
            atc = $('#addToCart'),
            qtt = $('#quatity');
        if (req == 1) {
            if ($('.color').length) {
                if ($('.color a.js-active-img').length) {
                    attrs[$('.color').attr('column')] = $('.color a.js-active-img').attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('psid'), { 'attrs': attrs },
                        function(rs) {

                            if (rs.code == 1 && rs.data.available > 0) {
                                qtt.attr('max', rs.data.available);
                                atc.attr('selId', rs.data.id).removeAttr('title').attr('ck', 1).removeClass('unsel');
                            } else {
                                atc.attr('title', msgOutofStock);
                            }
                        },
                        'json'
                    );

                } else {
                    $('.color a').each(function() {
                        var t = $(this);
                        attrs[$('.color').attr('column')] = t.attr('value');
                        $.post(
                            '/product/child?psId=' + atc.attr('psid'), { 'attrs': attrs },
                            function(rs) {
                                if (rs.code == 1 && rs.data.available > 0) {
                                    // splitChildimg(t.attr('data-pids').split(','));
                                    t.attr('qtt', rs.data.available).attr('selid', rs.data.id).attr('data-price', rs.data.price);

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
                        '/product/child?psId=' + atc.attr('psid'), { 'attrs': attrs },
                        function(rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                qtt.attr('max', rs.data.available);
                                atc.attr('selId', rs.data.id).removeAttr('title').attr('ck', 1).removeClass('unsel');
                            } else {
                                atc.attr('title', msgOutofStock);
                            }
                        },
                        'json'
                    );
                } else {
                    $('.size a').each(function() {
                        var t = $(this);
                        attrs[$('.size').attr('column')] = t.attr('value');
                        $.post(
                            '/product/child?psId=' + atc.attr('psid'), { 'attrs': attrs },
                            function(rs) {
                                if (rs.code == 1 && rs.data.available > 0) {
                                    t.attr('qtt', rs.data.available).attr('selid', rs.data.id).attr('data-price', rs.data.price);
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
            var colorAt = $('.color a.js-active-img'),
                sizeAt = $('.size a.active');
            if (colorAt.length && sizeAt.length) {
                attrs[$('.color').attr('column')] = colorAt.attr('value');
                attrs[$('.size').attr('column')] = sizeAt.attr('value');
                $.post(
                    '/product/child?psId=' + atc.attr('psid'), { 'attrs': attrs },
                    function(rs) {
                        let letImg = $('.color a.gallery[value="' + colorAt.attr('value') + '"]');

                        if (rs.code == 1 && rs.data.available > 0) {
                            qtt.attr('max', rs.data.available);
                            atc.attr('selId', rs.data.id).removeAttr('title').removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                        } else {
                            atc.attr('title', msgOutofStock);
                        }
                    },
                    'json'
                );
                return false;
            }
            if (colorAt.length && !sizeAt.length) {
                attrs[$('.color').attr('column')] = colorAt.attr('value');
                $('.size a').each(function() {
                    var t = $(this);
                    attrs[$('.size').attr('column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('psid'), { 'attrs': attrs },
                        function(rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('selid', rs.data.id).attr('data-price', rs.data.price);
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
                $('.color a').each(function() {
                    var t = $(this);
                    attrs[$('.color').attr('column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('psid'), { 'attrs': attrs },
                        function(rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('selid', rs.data.id).attr('data-price', rs.data.price);
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
    }
    checkInv();

    // if (itemfrs.length < 1) {
    //     slider_Slick();
    // }
});

function splitChildimg(pIdsAttr) {
    let ps = [{
        id: pIdsAttr,
        code: 1,
        bothImageSrc: true,
        storeId: $('#storeId').val()
    }];
    let src = $('.color a').attr('href');
    if (ps.length) {
        getallchildimg(ps, function(rs) {
            if ($(window).width() > 1020) {
                var listZoom = $('body .carousel-thumb-slick');
                var body_img = $('body .slick-detail');
                listZoom.trigger("destroy");
                body_img.trigger("destroy");
                if (rs.images) {
                    listZoom.empty();
                    body_img.empty();
                    $.each(rs.images, vl => {
                        let $item = rs.images[vl];
                        listZoom.append('<div class="slick-item asd" data-src="' + $item.srcUri + '"><figure><img class="img img-full" src="' + $item.thumbnailUri + '"></figure></div>');

                        body_img.append('<div class="slick-item p_src"><figure><div href="' + $item.srcUri + '" type="button" class="carousel-link"><img class="img img-full" src="' + $item.thumbnailUri + '"></div></figure></div>');
                    });
                }
            } else {
                setTimeout(() => {
                    slider_Slick();
                }, 300);

            }
            setTimeout(() => {
                slider_Slick();
            }, 300);
        });
    }
}

function slider_Slick() {
    $('.carousel-slick').not('.slick-initialized').slick({
        infinite: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: $('.carousel-thumb-slick')
    });

    $('.carousel-thumb-slick').not('.slick-initialized').slick({
        infinite: true,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: $('.carousel-slick'),
        focusOnSelect: true
    });
}