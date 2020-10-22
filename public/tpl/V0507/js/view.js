var bntAddCart = $('#addToCart, #buyCart');

$(document).ready(function () {
    $('.imgBox').elevateZoom({
        scrollZoom: true
    });

    checkInv();
    // tăng giảm số lượng
    $('#qtyDown').click(function () {
        var qtt = $('#quantity'), max = parseInt(qtt.attr('max')), n = parseInt(qtt.val());
        if (n > 1) {
            qtt.val(n - 1);
            qtt.attr('val', n - 1);
        } else
            alert('Bạn phải đặt số lượng tối thiểu là 1 sản phẩm !');
    });

    $('#qtyUp').click(function () {
        var qtt = $('#quantity'), max = parseInt(qtt.attr('max')), n = parseInt(qtt.val());
        if (n < max) {
            qtt.val(n + 1);
            qtt.attr('val', n + 1);
        } else
            alert('Bạn không thể đặt quá số lượng còn lại của sản phẩm !');
    });

    $('#quantity').keyup(function () {
        var t = $(this), max = parseInt(t.attr('max')), v = parseInt(t.val());
        if (v >= max) {
            alert('Bạn không thể đặt quá số lượng còn lại của sản phẩm !');
            t.val(max);
        }
    });

    $('.btn-buy').on('click', function() {
        if ($(this).attr("ck") == 1) {
            var products = [],
                ps = {};
            ps['id'] = $(this).attr('selid');
            ps['quantity'] = $('#quantity').val();
            var qty = parseInt(ps['quantity']);
            var id = ($(this).attr('id'));
            products.push(ps);
            addToCart(products, 1, function (rs) {
                if (rs.status == 1) {
                    if (id == 'addToCart') {
                        ajaxLoadView({
                            view: 'viewCart',
                            onSuccess: function (rs) {
                                $('#show__cart--top').html(rs);
                                $('#show__cart--top').modal('show');
                                ajaxLoadView({
                                    view: 'countcart',
                                    onSuccess: function (rs) {
                                        $(".count_cart").html(rs);
                                    }
                                });
                            }
                        });
                    } else {
                        window.location.href = '/cart/checkout?emptylayout=true';
                    }
                } else {
                    alert('Sản phẩm hết hàng!');
                }
            });
            // addToCart(products, 1, function(rs) {
            //     if (rs.status == 1) {
            //         if (id == 'buyCart'){
            //              window.location.href = '/cart/checkout?emptylayout=true';
            //         } else {
            //             // var totalqtt = parseInt(rs.data.totalQuantities + qty);
            //             // $('.count-cart span').text(totalqtt);
            //             // ajaxLoadView({
            //             //     view: 'topCart',
            //             //     onSuccess: function(rs) {
            //             //         $('.top-cart-content').html(rs);
            //             //     }
            //             // });
            //             window.location.href = '/cart'
            //         }
            //     } else {
            //         alert('Sản phẩm hết hàng !');
            //     }
            // });
        } else {
            alert('vui lòng chọn màu sắc và kích cỡ !');
        }
    });
    $('.childProduct-size').change(function () {
        var val = $(this).val(), data = val.split(","), $psId = data[0], $price_op = data[1];
        if ($psId != 1) {
            $('.btn-buy').attr('ck', 1).attr('selId', $psId).removeClass('unsel').removeAttr('title').removeAttr('data-original-title');
        } else {
            $('.btn-buy').attr('title', 'Vui lòng chọn sản phẩm!').attr('data-original-title', 'Vui lòng chọn sản phẩm!').attr('ck', 0);
        }
        $('.current-price').html( $.number($price_op) + ' ₫');
    });

    $('.size a').click(function() {
        var t = $(this),
            size = $('.size a'),
            qtt = $('#quatity'),
            atc = $('#addToCart'),
            fsb = $('#buyCart'),
            attrs = {};
        if (!t.hasClass('active')) {
            size.removeClass('active');
            attrs[$('.size').attr('column')] = t.attr('value');
            if ($('.color').length && !$('.color a.active').length) {
                // size.attr('title', msgColor);
                alert(msgColor);
            } else {
                if ($('.color').length) {
                    if (t.attr('qtt')) {
                        t.addClass('active');
                        if (t.attr('data-price') > 0) {
                            $('.current-price').text($.number(t.attr('data-price')) + ' ₫');  
                        } 
                        qtt.attr('max', t.attr('qtt'));
                        atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                        fsb.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
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
                                fsb.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                                if (t.attr('price') > 0) {
                                    $('.current-price').text($.number(t.attr('price')) + ' ₫');
                                }
                                else if (t.attr('price') == 0) {
                                    $('.current-price').text('Liên hệ');
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
            qtt = $('#quantity'),
            atc = $('#addToCart'),
            fsb = $('#buyCart'),
            attrs = {};
            name_select = $(this).attr('data-name');

        $('.name__product').text(name_select);
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
                        '/product/child?psId=' + atc.attr('psid'),
                        { 'attrs': attrs },
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
                (t.attr('qtt'));
                t.addClass('active');
                if (t.attr('data-price') > 0) {
                    $('.current-price strong').text($.number(t.attr('data-price')) + ' VNĐ');
                }
                atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                fsb.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                qtt.attr('max', t.attr('qtt'));

            }
        }
    });

    // add to cart
    function checkInv() {
        var req = $('.req').length,
        attrs = {}, atc = $('#addToCart'),
        fsb = $('#buyCart'),
        qtt = $('#quantity');
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
                                fsb.attr('title', 'Sản phẩm tạm thời hết hàng!');
                            }
                        },
                        'json'
                    );
    
                } else {
                    $('.color a img').each(function () {
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
});
