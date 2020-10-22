var storeId = $('#storeId').val();
$(document).ready(function () {
    checkInv();
    $('.button-5').click(function () {
        if ($(this).hasClass("hiden-1")) {
            $(this).parent().css('height', '1000px');
            $(this).removeClass("hiden-1");
            ($(this).parent()).find("span").removeClass("fa-angle-down");
            ($(this).parent()).find("span").addClass("fa-angle-up");
        } else {
            $(this).parent().css('height', '40px');
            $(this).addClass("hiden-1");
            ($(this).parent()).find("span").removeClass("fa-angle-up");
            ($(this).parent()).find("span").addClass("fa-angle-down");
        }
    })
    $('.nav>.mota').click(function () {
        $('.activee').removeClass("activee");
        $(this).addClass("activee");
        $('.content .mota').removeClass("hiden");
        $('.content .gioithieu').addClass("hiden");
        $('.content .danhgia').addClass("hiden");
    })
    $('.nav>.gioithieu').click(function () {
        $('.activee').removeClass("activee");
        $(this).addClass("activee");
        $('.content .mota').addClass("hiden");
        $('.content .gioithieu').removeClass("hiden");
        $('.content .danhgia').addClass("hiden");
    })
    $('.nav>.danhgia').click(function () {
        $('.activee').removeClass("activee");
        $(this).addClass("activee");
        $('.content .mota').addClass("hiden");
        $('.content .gioithieu').addClass("hiden");
        $('.content .danhgia').removeClass("hiden");
    })
    $(".button-pro-ind").click(function () {
        if ($(this).hasClass("hiden-1")) {
            ($(this).parent()).find("div.menu-pro-ind").css('height', '0px');
            $(this).removeClass("hiden-1");
        } else {
            ($(this).parent()).find("div.menu-pro-ind").css('height', 'auto');
            $(this).addClass("hiden-1");
        }
    });
    $(".button-pro-ind-2").click(function () {
        if ($(this).hasClass("hiden-1")) {
            ($(this).parent()).find("div.menu-pro-ind-2").css('height', '0px');
            $(this).removeClass("hiden-1");
        } else {
            ($(this).parent()).find("div.menu-pro-ind-2").css('height', 'auto');
            $(this).addClass("hiden-1");
        }
    })

    $('.item-5').owlCarousel({
        loop: false,
        margin: 10,
        nav: false,
        responsive: {
            0: {
                items: 4
            },
            600: {
                items: 4
            },
            800: {
                items: 4
            },
            1000: {
                items: 4
            }
        },
    });


    //sắp xếp danh sách sản phẩm
    var a = window.location.href
    if (a.includes('nameAsc')) {
        $('#m1').html("Tên A → Z");
    } else if (a.includes('nameDesc')) {
        $('#m1').html("Tên Z → A");
    } else if (a.includes('priceAsc')) {
        $('#m1').html("Giá tăng dần");
    } else if (a.includes('priceDesc')) {
        $('#m1').html("Giá giảm dần");
    } else if (a.includes('new')) {
        $('#m1').html(" Mới nhất");
    } else if (a.includes('old')) {
        $('#m1').html("Cũ nhất");
    }

    $('#list').click(function () {
        $('.product').attr('class', 'font-14 col-7 product')
        $('.product img').css('width','300px');
        $("#grid").css('background', 'gainsboro');
        $(this).css('background', '#67bd45');
    });
    $('#grid').click(function () {
        $('.product').attr('class', 'font-14 col-lg-3 col-md-4 col-6 product')
        $('.product img').css('width','100%');
        $("#list").css('background', 'gainsboro');
        $(this).css('background', '#67bd45');
    });

    //checkbox
    $('input[type=checkbox]').each(function () {
        var value = $(this).attr('id');
        var href = window.location.href;
        if (href.includes(value)) {
            $(this).attr('checked', '');
        }
    });

    /*loc san pham*/
    $('input[type=checkbox]').click(function () {
        var value = $(this).attr('value');
        var a = (value.indexOf('?'));
        var b = (value.indexOf('&'));
        if (a > b)
            value = value.substring(a + 1);
        else
            value = value.substring(b + 1);
        var href = window.location.href;
        if (href.includes('&' + value)) {
            var href1 = href.substring(0, href.indexOf(value) - 1);
            var href2 = href.substring(href.indexOf(value) + value.length, href.length);
            if (href2.length == 0) {
                window.location.href = href1;
            } else window.location.href = href1 + href2;
        } else if (href.includes('?' + value)) {
            var href1 = href.substring(0, href.indexOf(value));
            var href2 = href.substring(href.indexOf(value) + value.length, href.length);
            if (href2.length == 0) {
                href1 = href.substring(0, href.indexOf(value) - 1);
                window.location.href = href1;
            } else {
                href2 = href.substring(href.indexOf(value) + value.length + 1, href.length);
                window.location.href = href1 + href2;
            }
        } else {
            if (window.location.href.includes('?'))
                window.location.href += '&' + value;
            else
                window.location.href += '?' + value;
        }
    });

    $("button.btnAddToCart").click(function () {
        if ($(this).attr("ck") == 1) {
            console.log("run");
            var t = $(this);
            var products = [], ps = {};
            ps['id'] = $(this).attr('selid');
            if ($(this).hasClass('btnQuickCart')){
                ps['quantity'] = 1;
                check=false;
            } else {
                ps['quantity'] = $("#psQtt").val();
            }
            var qty = parseInt(ps['quantity']);
            var id = ($(this).attr('id'));
            products.push(ps);
            addToCart(products, 1, function (rs) {
                if (rs.status == 1) {
                    if (id == 'buynow') {
                        window.location.href = '/cart/checkout';
                    } else if(t.hasClass('btnQuickCart')){
                        var n =$('.badge.badge-primary.search_button');
                        n.attr('value',parseInt(n.attr('value'))+1);
                        n.text(n.attr('value'));
                        $('.top-cart-content').css('display','block');
                        ajaxLoadView({
                            view: 'topCart',
                            onSuccess: function (rs) {
                                $('.top-cart-content').html(rs);
                            }
                        });
                    }else {
                            window.location.href = '/cart'
                    }
                } else {
                    alert("vui lòng chọn màu sắc kích cỡ");
                }
            });
        }
    });

    /*---------size----*/
    $('.size a').parent().click(function () {
        var t = $(this), size = $('.size a').parent(), qtt = $('#psQtt'), atc = $('#addToCart'), attrs = {};
        if (atc.attr('value') > 0) {
            if (!t.hasClass('back-ground-active-2')) {
                if (!t.hasClass('deactive')) {
                    size.removeClass('back-ground-active-2');
                }
                attrs[$('.size').attr('column')] = t.attr('value');
                if ($('.color').length && !$('.color img.back-ground-active').length) {
                    size.attr('title', 'Vui lòng chọn màu trước!');
                    alert("Vui lòng chọn màu trước!");
                } else {
                    if (!t.hasClass('deactive')) {
                        t.addClass('back-ground-active-2');
                    }
                    if ($('.color').length) {
                        if (t.attr('qtt')) {
                            t.addClass('active');
                            if (t.attr('data-price') > 0) {
                                $('.current-price').text($.number(t.attr('data-price')) + ' đ ');
                            }
                            qtt.attr('max', t.attr('qtt'));
                            atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unset');
                        } else {
                            t.addClass('deactive').attr('title', 'out of stock');
                        }
                    } else {
                        $.post(
                            '/product/child?childId=' + t.attr('selId'),
                            {'attrs': attrs},
                            function (rs) {
                                if (rs.code == 1 && rs.data.available > 0) {
                                    t.addClass('active');
                                    qtt.attr('max', t.attr('qtt'));
                                    atc.attr('selId', t.attr('selId')).removeAttr('data-original-title').attr('ck', 1).removeClass('unset');
                                    if (t.attr('data-price') > 0) {
                                        $('.current-price').text($.number(t.attr('data-price')) + ' đ');
                                    }
                                } else {
                                    t.addClass('deactive').attr('title', 'out of stock');
                                }
                            },
                            'json'
                        );
                    }
                }
            }
        }
    });
    /*-------color-------*/
    $('.color img').click(function () {
        var t = $(this), size = $('.size a').parent(), qtt = $('#psQtt'), atc = $('#addToCart'), attrs = {};
        if (atc.attr('value') > 0) {
            if (!t.hasClass('back-ground-active')) {
                $('.color img').removeClass('back-ground-active');
                $('#img-01').attr('src', t.attr('src'));
                if (window.screen.width > 900) {
                    $("#img-01").ezPlus({
                        scrollZoom: true
                    });
                }
                if (size.length >= 1) {
                    size.removeClass('deactive').removeClass('back-ground-active-2');
                    t.addClass('back-ground-active');
                    size.removeAttr('title');
                    attrs[$('.color').attr('column')] = t.parent().attr('value');
                    size.each(function () {
                        var t = $(this);
                        attrs[$('.size').attr('column')] = t.attr('value');
                        $.post(
                            '/product/child?psId=' + $('#addToCart').attr('psid'),
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

                }
                else {
                    t.addClass('back-ground-active');
                    if (t.attr('data-price') > 0) {
                        $('.current-price').text($.number(t.attr('data-price')) + ' đ ');
                    }
                    atc.attr('selId', t.attr('selId')).removeAttr('tiltle').attr('ck', 1).removeClass('unset');
                    qtt.attr('max', t.attr('qtt'));

                }

            }
        }
    });


    /*lọc sản phẩm*/
    var searchbrand = document.getElementById('thuonghieu');
    if (searchbrand != null) {
        searchbrand.addEventListener('input', aaa);
        function aaa(e) {
            $('.filter-trademark-checkbox li').each(function () {
                var name = $(this).attr('name').toLowerCase();
                var search = e.target.value.toLowerCase();
                if (!name.includes(search)) {
                    $(this).css('display', 'none');
                } else {
                    $(this).css('display', 'block');
                }
            })
        }
    }
    var searchcolor = document.getElementById('input1');
    if(searchcolor != null){
        searchcolor.addEventListener('input',bbb);
        function bbb(e) {
            $('#list1 li').each(function () {
                var name = $(this).attr('name').toLowerCase();
                var search = e.target.value.toLowerCase();
                if (!name.includes(search)) {
                    $(this).css('display', 'none');
                } else {
                    $(this).css('display', 'block');
                }
            })
        }
    }

    var searchsize = document.getElementById('input2');
    if(searchsize != null){
        searchsize.addEventListener('input',ccc);
        function ccc(e) {
            $('#list2 li').each(function () {
                // console.log(searchsize)
                var name = $(this).attr('name').toLowerCase();
                var search = e.target.value.toLowerCase();
                if (!name.includes(search)) {
                    $(this).css('display', 'none');
                } else {
                    $(this).css('display', 'block');
                }
            })
        }
    }

    /*Đánh giá*/
    $('.star i').click(function () {
        var count = $(this).attr('data-alt');
        $('.star i').each(function () {
            var  data =$(this).attr('data-alt');
            if(data<=count){
                $(this).removeClass('fa-star-o').addClass('fa-star');
            }
            else {
                $(this).removeClass('fa-star').addClass('fa-star-o');
            }
        })
    });

});

function checkInv() {
    var req = $('.req').length, attrs = {}, atc = $('#addToCart'), qtt = $('#psQtt');
    if (atc.attr('value') > 0) {
        if (req == 1) {
            if ($('.color').length) {
                if ($('.color img.back-ground-active').length) {
                    attrs[$('.color').attr('column')] = $('.color img.back-ground-active').parent().attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                qtt.attr('max', rs.data.available);
                                atc.attr('selId', rs.data.id).removeAttr('title').attr('ck', 1).removeClass('unset');
                            } else {
                                atc.attr('title', 'out of stock');
                            }
                        },
                        'json'
                    );

                } else {
                    $('.color img').each(function () {
                        var t = $(this);
                        attrs[$('.color').attr('column')] = t.parent().attr('value');
                        $.post(
                            '/product/child?psId=' + atc.attr('psid'),
                            {'attrs': attrs},
                            function (rs) {
                                if (rs.code == 1 && rs.data.available > 0) {
                                    t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
                                } else {
                                    t.addClass('deactive').attr('tiltle', 'out of stock');
                                }
                            },
                            'json'
                        );
                    });
                }
            } else {
                if ($('.size .back-ground-active').length) {
                    attrs[$('.size').attr('column')] = $('.size a.active').attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                qtt.attr('max', rs.data.available);
                                atc.attr('selId', rs.data.id).removeAttr('tiltle').attr('ck', 1).removeClass('unset');
                            } else {
                                atc.attr('tiltle', 'out of stock');
                            }
                        },
                        'json'
                    );
                } else {
                    $('.size a').parent().each(function () {
                        var t = $(this);
                        attrs[$('.size').attr('column')] = t.attr('value');
                        $.post(
                            '/product/child?psId=' + atc.attr('psid'),
                            {'attrs': attrs},
                            function (rs) {
                                if (rs.code == 1 && rs.data.available > 0) {
                                    t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
                                } else {
                                    t.addClass('deactive').attr('tiltle', 'out of stock');
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
            var colorAt = $('.color img.back-ground-active'), sizeAt = $('.size .back-ground-active');
            if (colorAt.length && sizeAt.length) {
                attrs[$('.color').attr('column')] = colorAt.parent().attr('value');
                attrs[$('.size').attr('column')] = sizeAt.attr('value');
                $.post(
                    '/product/child?psId=' + atc.attr('psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            $('.size a').parent().attr('data-price', rs.data.price);
                            if ($('.size a').parent().attr('data-price') > 0) {
                                $('.current-price').text($.number($('.size a').parent().attr('data-price')) + 'đ');
                            }
                            qtt.attr('max', rs.data.available);
                            atc.attr('selId', rs.data.id).removeAttr('tiltle').attr('ck', 1).removeClass('unset');
                        } else {
                            atc.attr('tiltle', 'out of stock');
                        }
                    },
                    'json'
                );
                return false;
            }
            if (colorAt.length && !sizeAt.length) {
                attrs[$('.color').attr('column')] = colorAt.parent().attr('value');
                $('.size a').parent().each(function () {
                    var t = $(this);
                    attrs[$('.size').attr('column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
                            } else {
                                t.addClass('deactive').attr('tiltle', 'out of stock');
                            }
                        },
                        'json'
                    );
                });
                return false;
            }
            if (!colorAt.length && sizeAt.length) {
                attrs[$('.size').attr('column')] = sizeAt.attr('value');
                $('.color img').each(function () {
                    var t = $(this);
                    attrs[$('.color').attr('column')] = t.parent.attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
                            } else {
                                t.addClass('deactive').attr('tiltle', 'out of stock');
                            }
                        },
                        'json'
                    );
                });
                return false;
            }
        }
        if (req == 0) {
            atc.removeAttr('tiltle').attr('ck', 1).removeClass('unset');
        }
    }
}
