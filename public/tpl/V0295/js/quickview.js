$(function () {
    checkInv();
    $('.slides li').click(function () {
       $('.p-imgfeature img').attr('src',$(this).attr('data-item'));
    });
    if($(window).width() > 768){
        $('.req a').tooltip({
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

        $('.buy').tooltip({
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
    $('#addToCart').click(function () {
        var t = $(this);
        if (t.attr('data-ck') == 1) {
            var products = [], ps = {};
            ps['id'] = t.attr('data-selId');
            ps['quantity'] = 1;
            products.push(ps);
            addToCart(products, 1, function(rs){
                if (rs.status == 1) {
                    $.fancybox.close();
                    ajaxLoadView({
                        view: 'miniCart',
                        onSuccess: function (rs) {
                            $('#site-cart').html(rs);
                        }
                    });
                    ajaxLoadView({
                        view: 'cartcount',
                        onSuccess: function (rs) {
                            $('.count-holder').html(rs);
                        }
                    });
                } else {
                    alert(rs.messages);
                }
            });
        }
        $('#site-nav--mobile').addClass('active');
        $('#site-overlay').addClass('active');

    });

    $('body').on('click','.size a',function(){
        var t = $(this), size = $('.size a'), qtt = $('#psQtt'), atc = $('#addToCart');
        if (!t.hasClass('active')) {
            size.removeClass('active');
            atc.attr('title', 'Vui lòng chọn màu sắc hoặc kích cỡ!').attr('data-ck', 0).addClass('unsel');
            if ($('.color').length && !$('.color a.active').length) {
                size.attr('title', 'Vui lòng chọn màu trước!');
            } else {
                if (t.attr('data-qtt')) {
                    t.addClass('active');
                    qtt.attr('data-max',t.attr('data-qtt'));
                    atc.attr('data-selId', t.attr('data-selId')).removeAttr('title').attr('data-ck', 1).removeClass('unsel');
                }
            }
        }
    });
    $('.color a').click(function () {
        var t = $(this), size = $('.size a'), atc = $('#addToCart'), attrs = {};
        if (!t.hasClass('active')) {
            $('.color a').removeClass('active');
            atc.attr('title', 'Vui lòng chọn màu sắc hoặc kích cỡ!').attr('data-ck', 0).addClass('unsel');
            if (size.length > 1) {
                size.removeClass('active deactive');
                t.addClass('active');
                size.removeAttr('title');
                attrs[$(this).parents('.select-swap.color').attr('data-column')] = t.attr('value');
                size.each(function () {
                    var t = $(this);
                    attrs[$('.size').attr('data-column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + $('#addToCart').attr('data-psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1) {
                                if(rs.data.available > 0){
                                    t.attr('data-qtt', rs.data.available).attr('data-selId', rs.data.id);
                                }else{
                                    t.addClass('deactive').removeAttr('data-qtt');
                                }

                            } else {
                                t.addClass('deactive').removeAttr('data-qtt');
                            }
                        },
                        'json'
                    );
                });

            } else {
                if (t.attr('data-qtt')) {
                    t.addClass('active');
                    atc.attr('data-selId', t.attr('data-selId')).removeAttr('title').attr('data-ck', 1).removeClass('unsel');
                    // qtt.attr('data-max', t.attr('data-qtt'));
                }
            }
        }
    });
})
function checkInv() {
    var req = $('.req').length, attrs = {}, atc = $('#addToCart'), qtt = $('#psQtt');
    if (req == 1) {
        if ($('.select-swap.color').length) {
            if ($('.select-swap.color a.active').length) {
                attrs[$('.select-swap.color').attr('data-column')] = $('.select-swap.color a.active').attr('value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1) {
                            qtt.attr('data-max', rs.data.available);
                            atc.attr('data-selId', rs.data.id).removeAttr('title').attr('data-ck', 1).removeClass('unsel');
                        } else {
                            atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
                        }
                    },
                    'json'
                );

            } else {
                $('.select-swap.color a').each(function () {
                    var t = $(this);
                    attrs[$('.select-swap.color').attr('data-column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('data-psid'),
                        {'attrs': attrs},
                        function (rs) {
                            t.attr('data-selId', rs.data.id);
                            if (rs.code == 1) {
                                t.attr('data-qtt', rs.data.available);
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
                attrs[$('.size').attr('data-column')] = $('.size a.active').attr('value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1) {
                            if(rs.data.available > 0){
                                qtt.attr('data-max', rs.data.available);
                                atc.attr('data-selId', rs.data.id).removeAttr('title').attr('data-ck', 1).removeClass('unsel');
                            }else{
                                atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
                            }
                        } else {
                            atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
                        }
                    },
                    'json'
                );
            } else {
                $('.size a').each(function () {
                    var t = $(this);
                    attrs[$('.size').attr('data-column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('data-psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1) {
                                if(rs.data.available > 0){
                                    t.attr('data-qtt', rs.data.available).attr('data-selId', rs.data.id);
                                }else{
                                    t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!');
                                }

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
        var colorAt = $('.select-swap.color a.active'), sizeAt = $('.size a.active');
        if (colorAt.length && sizeAt.length) {
            attrs[$('.select-swap.color').attr('data-column')] = colorAt.attr('value');
            attrs[$('.size').attr('data-column')] = sizeAt.attr('value');
            $.post(
                '/product/child?psId=' + atc.attr('data-psid'),
                {'attrs': attrs},
                function (rs) {
                    if (rs.code == 1) {
                        if( rs.data.available > 0){
                            qtt.attr('data-max', rs.data.available);
                            atc.attr('data-selId', rs.data.id).removeAttr('title').attr('data-ck', 1).removeClass('unsel');
                        }else{
                            atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
                        }
                    } else {
                        atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
                    }
                },
                'json'
            );
            return false;
        }
        if (colorAt.length && !sizeAt.length) {
            attrs[$('.select-swap.color').attr('data-column')] = colorAt.attr('value');
            $('.size a').each(function () {
                var t = $(this);
                attrs[$('.size').attr('data-column')] = t.attr('value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1) {
                            if( rs.data.available > 0){
                                t.attr('data-qtt', rs.data.available).attr('data-selId', rs.data.id);
                            }else{
                                t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!');
                            }

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
            attrs[$('.size').attr('data-column')] = sizeAt.attr('value');
            $('.select-swap.color a').each(function () {
                var t = $(this);
                attrs[$('.select-swap.color').attr('data-column')] = t.attr('value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1) {
                            if( rs.data.available > 0){
                                t.attr('data-qtt', rs.data.available).attr('data-selId', rs.data.id);
                            }else{
                                t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!');
                            }
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