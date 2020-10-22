var bntAddCart = $('#addToCart, #buyCart');
$(document).ready(function () {
    /*slide sp liên quan*/
    if ($('.slide_pro_view').length) {
        $('.slide_pro_view').owlCarousel({
            loop: false,
            items: 5,
            nav: true,
            rewind: true,
            dots: false,
            autoplay: false,
            smartSpeed: 800,
            autoplayTimeout: 800,
            autoplaySpeed: 800,
            margin: 10,
            responsive: {
                0: {
                    items: 2,
                },
                600: {
                    items: 3,
                },
                1024: {
                    items: 4,
                },
                1250: {
                    items: 5,
                }
            }
        });
    }
    checkInv();
    $('#z').bind('click', function () {       // Bind a click event to a Cloud Zoom instance.
        var cloudZoom = $(this).data('CloudZoom');   // On click, get the Cloud Zoom object,
        $.fancybox.open(cloudZoom.getGalleryList(), {padding: 0}); // and pass Cloud Zoom's image list to Fancy Box.
        return false;
    });
    // slide child image
    if ($(window).width() > 1024) {
        $("#img-child").carouFredSel({
            items: 4,
            direction: "up",
            scroll: {
                items: 1,
                duration: 1000
            },
            auto: false,
            prev: "#prevSlideZ",
            next: "#nextSlideZ"
        });
        if ($('#imgView').length) {
            CloudZoom.quickStart({
                // zoomPosition: 'inside',
                // autoInside: true
            });
        }
    } else {
        $("#img-child").addClass('owl-carousel');
        $("#img-child").owlCarousel({
            items: 1,
            auto: false,
        });
    }
    /*if ($(window).width() <= 768) {
        $('#img-child-mobile').owlCarousel({
            autoPlay: true,
            loop: true,
            lazyLoad: true,
            items: 1,
            itemsDesktop: [960, 1],
            itemsDesktopSmall: [960, 1],
            itemsTablet: [768, 1],
            itemsMobile: [479, 1],
            slideSpeed: 500,
            paginationSpeed: 500,
            rewindSpeed: 500,
            navigation: false,
            stopOnHover: false,
            pagination: false,
            scrollPerPage: false
        });
    }*/

    $('.size a').click(function () {
        var t = $(this), size = $('.size a'), qtt = $('#quantity'),
            atc = $('#addToCart'), fsb = $('#buyCart');
        if (!t.hasClass('active')) {
            size.removeClass('active');
            atc.attr('title', 'Vui lòng chọn màu sắc hoặc kích cỡ!').attr('ck', 0).addClass('unsel');
            fsb.attr('title', 'Vui lòng chọn màu sắc hoặc kích cỡ!').attr('ck', 0).addClass('unsel');
            if ($('.color').length && !$('.color a.active').length) {
                size.attr('title', 'Vui lòng chọn màu trước!');
            } else if (t.attr('qtt')) {
                t.addClass('active');
                qtt.attr('max', t.attr('qtt'));
                atc.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                atc.attr('selId', t.attr('selId')).removeAttr('data-original-title');
                fsb.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                fsb.attr('selId', t.attr('selId')).removeAttr('data-original-title');
                if (t.attr('price') > 0) {
                    $('.price_view span').html($.number(t.attr('price')) + ' VNĐ');
                } else {
                    $('.price_view span').html('Liên hệ');
                }
            }
        }
    });
    $('.color a').click(function () {
        var t = $(this), size = $('.size a'), qtt = $('#quantity'),
            atc = $('#addToCart'), fsb = $('#buyCart'), attrs = {};
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
            var src = $(this).attr('data-src');
            var ids = t.attr('data-pids').split(',');
            var ps = [];
            var storeId = $('#storeId').val();
            var listImg = $('#img-child');
            var childsMobile = $('#img-child-mobile');
            ps.push({id: ids, getSrcUri: true, code: 1, storeId: storeId});
            if ($(window).width() > 1024) {
                listImg.trigger("destroy");
                $('#imgView img').data('CloudZoom').destroy();
                listImg.empty().removeAttr('style');
                if (ps.length) {
                    getallchildimg(ps, function (rs) {
                        listImg.empty();
                        var useZoom = "'.cloudzoom'";
                        if (rs.images != "") {
                            $.each(rs.images, function (vl) {
                                var img = "'" + rs.images[vl] + "'";
                                listImg.append(
                                    '<div data-src="' + rs.images[vl] + '" class="thumbnail"><img class="cloudzoom cloudzoom-gallery" src="' + rs.images[vl] + '" data-cloudzoom="useZoom: ' + useZoom + ',image: ' + img + ',zoomImage: ' + img + '"></div>'
                                );
                            });
                        } else {
                            listImg.append(
                                '<div data-src="' + src + '" class="thumbnail"><img class="cloudzoom cloudzoom-gallery" src="' + src + '" data-cloudzoom="useZoom: ' + useZoom + ',image: ' + src + ',zoomImage: ' + src + '"></div>'
                            );
                        }
                        listImg.carouFredSel({
                            items: 5,
                            direction: "up",
                            scroll: {
                                items: 1,
                                duration: 1000
                            },
                            auto: false,
                            prev: "#prevSlideZ",
                            next: "#nextSlideZ"
                        });

                        $('#imgView').empty();
                        $('#imgView').append('<img id="z" src="' + src + '" width="100%" class="cloudzoom" ' +
                            'data-cloudzoom="zoomImage: \'' + src + '\',animationTime: 50,easeTime: 0,easing: 0,zoomFlyOut: false,zoomWidth: 400,zoomHeight: 400,disableOnScreenWidth:768"/>');
                        if ($('#imgView').length) {
                            CloudZoom.quickStart();
                        }

                    });

                }
            } else {
                if (ps.length) {
                    getallchildimg(ps, function (rs) {
                        listImg.empty();

                        var useZoom = "'.cloudzoom'";
                        if (rs.images != "") {
                            $.each(rs.images, function (vl) {
                                var img = "'" + rs.images[vl] + "'";
                                listImg.append(
                                    '<div data-src="' + rs.images[vl] + '" class="thumbnail"><img class="cloudzoom cloudzoom-gallery" src="' + rs.images[vl] + '" data-cloudzoom="useZoom: ' + useZoom + ',image: ' + img + ',zoomImage: ' + img + '"></div>'
                                );
                            });
                        } else {
                            listImg.append(
                                '<div data-src="' + src + '" class="thumbnail"><img class="cloudzoom cloudzoom-gallery" src="' + src + '" data-cloudzoom="useZoom: ' + useZoom + ',image: ' + src + ',zoomImage: ' + src + '"></div>'
                            );
                        }
                        listImg.data('owl.carousel').destroy();
                        setTimeout(function () {
                            listImg.owlCarousel({
                                items: 1
                            });
                        }, 150);

                    });
                }
            }
        }
    });

    // add to cart
    $('.btnCart').on('click',function () {
        var t = $(this);
        if (t.attr('ck') === "1") {
            var products = [], ps = {};
            ps['id'] = parseInt(t.attr('selId'));
            ps['quantity'] = parseInt($('#quantity').val());
            products.push(ps);
            addToCart(products, 1, function (rs) {
                if (rs.status === 1) {
                    if (t.attr('id') === 'addToCart') {
                        ajaxLoadView({
                            view: 'popupCart',
                            onSuccess: function (rs) {
                                $('#modal_car_quick').html(rs);
                                $('#modal_car_quick').modal('show');
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

});


function checkInv() {
    var req = $('.req').length, attrs = {}, atc = $('#addToCart'),
        fsb = $('#buyCart'), qtt = $('#quantity');
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
