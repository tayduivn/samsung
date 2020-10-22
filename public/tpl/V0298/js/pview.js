var $storeId = $('#storeId').val();
$(document).ready(function () {
    //--- tự động dếm số chi nhánh còn hàng
    if ($('.hidden-totalAvaiableStores').length) {
        $('.numberStore>span').html($('.hidden-totalAvaiableStores').val());
    }

    $(window).load(function () {
        if (in_array($storeId, [63398, 15113])) {
            $('.select-swap.attr-color.req .n-sd.swatch-element.color:first-child label').trigger('click');
        }

        if (!$(".tabUlRelate li.active").length) {
            $(".tabUlRelate li:first").trigger('click');
        }
    });

    /*----------- change depot Inventories ----------------------*/
    var city = $('#cityIdIvt');
    if (city.length) {
        city.select2();
        city.change(function () {
            showStore($(this).val());
        });
    }
    if(in_array($storeId,[22677,25088,72396,29770])){
        CloudZoom.quickStart();
    }
    /*----------- change depot Inventories ----------------------*/
    var $nav=true;
    if(in_array($storeId,[72396,29770])) {
        $nav=false;
    }

    var owl, soption = {
        items: 1,
        nav: $nav,
        dots: false,
        navText: ["", ""],
        transitionStyle: "fade",
        singleItem: true,
        afterInit: function (elem) {
            var current = this.currentItem;
        },
        afterMove: function (elem) {
            var current = this.currentItem;
        }
    };
    switchSlide(soption);


    if (!in_array($storeId,[41781,66]) && $('.pview-thumb-slide .thumbnail').size() > 8) {
        $('.pview-thumb-nav').removeClass('hidden');
        $(".pview-thumb-slide").carouFredSel({
            items: 8,
            direction: "up",
            scroll: {
                items: 1,
                duration: 500
            },
            auto: false,
            prev: ".pview-thumb-nav .prevSlideZ",
            next: ".pview-thumb-nav .nextSlideZ"
        });
    }

    $(document).on('click', '.thumbnails .thumbnail.clickItem', function () {
        owl = $("#slide-image").owlCarousel(soption);
        owl.trigger("to.owl.carousel", [$(this).attr('data-index'), 500, true]);
        $("#slide-image").show();
        if ($(".videoProduct").length) {
            $(".videoProduct").hide();
            $(".videoProduct iframe").attr("src", '');
        }
    });
    $(document).on('click', '.thumbnails .thumbnail', function () {
        $('.thumbnails .thumbnail').removeClass('active');
        $(this).addClass('active');
    });
    $(document).on("click", ".videoThumb", function () {
        var link = $(this).attr("data-video");
        $(".videoProduct iframe").attr("src", link + "?autoplay=1&loop=1&autopause=0");
        $("#slide-image").hide();
        $(".videoProduct").show();
    });

    $('.iWishAdd').click(function () {
        var t = $(this);
        if (!t.hasClass('iWishAdded')) {
            $.post('/wishlist/add?psId=' + $(this).attr('data-id'),
                function (rs) {
                    if (rs.code == 1) {
                        t.addClass('iWishAdded');
                        t.find('.fa').removeClass('fa-heart-o').addClass('fa-heart')
                    }
                    BootstrapDialog.show({
                        title: 'Thông báo',
                        message: rs.message,
                        buttons: [{
                            label: 'Đóng',
                            action: function(dialog) {
                                dialog.close();
                            }
                        }]
                    });
                },
                'json'
            );
        } else {
            if (confirm('Xóa sản phẩm khỏi danh sách yêu thích?') == true) {
                $.post('/wishlist/remove', { 'psId' : $(this).attr('data-id') },
                    function(rs){
                        if(rs.code == 1) {
                            t.removeClass('iWishAdded');
                            t.find('.fa').removeClass('fa-heart').addClass('fa-heart-o')
                        }
                        BootstrapDialog.show({
                            title: 'Thông báo',
                            message: rs.message,
                            buttons: [{
                                label: 'Đóng',
                                action: function(dialog) {
                                    dialog.close();
                                }
                            }]
                        });
                    }
                );
            }
        }
    });

    // if ($('.owlRelate1 .owl-carousel .itemslick').length) {
    //     $('.owlRelate1 .owl-carousel').owlCarousel({
    //         items: 4,
    //         nav: true,
    //         dots: true,
    //         lazyLoad: true,
    //         touchDrag: true,
    //         responsive: {
    //             0: {
    //                 items: 2
    //             },
    //             767: {
    //                 items: 2
    //             },
    //             1024: {
    //                 items: 4
    //             }
    //         }
    //     });
    // }

    $(".tabUlRelate li").click(function () {
        $(".tabUlRelate li").removeClass("active");
        $(this).addClass("active");
        var dataTab = $(this).attr("data-tab");
        $(".tabDetailProduct").hide();
        $(".tabDetailProduct[data-tab=" + dataTab + "]").show();
        if ($(".tabDetailProduct[data-tab=" + dataTab + "] .owl-carousel").length) {
            $(".tabDetailProduct[data-tab=" + dataTab + "] .owl-carousel").owlCarousel({
                items: 4,
                nav: true,
                dots: true,
                lazyLoad: true,
                touchDrag: true,
                responsive: {
                    0: {
                        items: 2
                    },
                    767: {
                        items: 2
                    },
                    1024: {
                        items: 4
                    }
                }
            });
            // nhanh.Main.colorVariant();
        }
    });

    $(".swatch .swatch-element input").click(function () {
        $("#slide-image").show();
        $(".videoProduct").hide();
    });

    $(".product-description .title-bl").click(function () {
        $(this).find(".icon-open").toggleClass("active");
        $(this).next().slideToggle();
    });

    $('#add-to-cart').click(function () {
        if ($(this).attr("data-ck") == 1) {
            var products = [], ps = {};
            ps['id'] = $(this).attr('data-selId');
            ps['quantity'] = document.getElementById('quantity').value;
            products.push(ps);
            addToCart(products, 1, function (rs) {
                if (rs.status == 1) {
                    ajaxLoadView({
                        view: 'cartSidebar',
                        onSuccess: function (rs) {
                            $("#site-cart>.site-nav-container-last").empty();
                            $("#site-cart>.site-nav-container-last").html(rs);
                            $('#myCart').modal('show');
                            $('.modal-backdrop').css({'height': jQuery(document).height(), 'z-index': '99'});
                            getCartModal()
                        }
                    });
                } else {
                    alert(rs.messages);
                }
            });
        }
        else{
            if(in_array($storeId,[41781])){
                var t = $(this);
                if (t.data('size') == 1) {
                    var conten_modal='<h2>Quý khách vui lòng chọn màu cho sản phẩm. Xin cảm ơn!</h2>';
                    if (($('.attr-color label.active').length && !$('.attr-size label.active').length)||(!$('.attr-color label').length && !$('.attr-size label.active').length)) {
                         conten_modal='<h2>Quý khách vui lòng chọn size cho sản phẩm. Xin cảm ơn!</h2>';
                    }
                    $('#modal-wrapper .main-content').html(conten_modal);
                    $('#modal-wrapper').modal('show');
                }
                else if (t.data('size') == 0) {
                    $('#modal-wrapper .main-content').html('<h2>Sản phẩm tạm thời hết hàng!</h2>');
                    $('#modal-wrapper').modal('show');
                }
            }
            if($(window).width() < 768){
                alert('Vui lòng chọn màu sắc hoặc kích cỡ !');
            }
        }
    });

    $('#addQuickCart,.btn-cart-bottom').click(function () {
        if ($(this).attr("data-ck") == 1) {
            var products = [], ps = {};
            ps['id'] = $(this).attr('data-selId');
            ps['quantity'] = document.getElementById('quantity').value;
            products.push(ps);
            addToCart(products, 1, function (rs) {
                if (rs.status == 1) {
                    if (in_array($storeId,[23832]) && $(window).width() <= 768){
                        window.location.href = '/cart'
                    }else{
                        window.location.href = '/cart/checkout'
                    }
                } else {
                    alert(rs.messages);
                }
            });
        }
        else{
            if(in_array($storeId,[41781])){
                var t = $(this);
                if (t.data('size') == 1) {
                    var conten_modal='<h2>Quý khách vui lòng chọn màu cho sản phẩm. Xin cảm ơn!</h2>';
                    if (($('.attr-color label.active').length && !$('.attr-size label.active').length)||(!$('.attr-color label').length && !$('.attr-size label.active').length)) {
                        conten_modal='<h2>Quý khách vui lòng chọn size cho sản phẩm. Xin cảm ơn!</h2>';
                    }
                    $('#modal-wrapper .main-content').html(conten_modal);
                    $('#modal-wrapper').modal('show');
                }
                else if (t.data('size') == 0) {
                    $('#modal-wrapper .main-content').html('<h2>Sản phẩm tạm thời hết hàng!</h2>');
                    $('#modal-wrapper').modal('show');
                }
            }

            if($(window).width() < 768){
                alert('Vui lòng chọn màu sắc hoặc kích cỡ !');
            }
        }
    });

    $('#quan-input').keyup(function () {
        $('[name="quantity"]').val($(this).val());
    });
    $('[name="quantity"]').on('keyup change', function () {
        $('#quan-input').val($(this).val());
    });

    if ($(window).width() < 768) {
        $(".removeMobile").remove();
    } else {
        $(".removeDesktop").remove();
    }

    $("#add-item-form .select-swap .color").hover(function () {
        var value = $(this).data("value");
        $(this).parents(".swatch").find(".header span").html(value);
    }, function () {
        var value = $("#add-item-form .select-swap .color label.sd span").html();
        $(this).parents(".swatch").find(".header span").html(value);
    });

    /*----- modalBuyMobile  -----*/
    $(".modalBuyMobile .select-swap .color").hover(function () {
        var valuea = $(this).data("value");
        $(this).parents(".swatch").find(".header span").html(valuea);
    }, function () {
        var valuea = $(".modalBuyMobile .select-swap .color label.sd span").html();
        $(this).parents(".swatch").find(".header span").html(valuea);
    });

    if ($(window).width() >= 769) {
        $('.req label').tooltip({
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
        $('.btnAddToCart,.btn-cart-bottom').tooltip({
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

    checkInv();
    // checkInvProduct({
    //     btnAddToCart: 'body .btnAddToCart',
    //     quantity: 'body #quantity',
    //     req: 'body .req',
    //     color: 'body .req.attr-color',
    //     colorItem: 'body .req.attr-color label',
    //     colorActiveItem: 'body .req.attr-color label.active',
    //     size: 'body .req.attr-size',
    //     sizeItem: 'body .req.attr-size label',
    //     sizeActiveItem: 'body .req.attr-size label.active',
    //     mainPrice: 'body #detail-product .product-price .pro-price',
    //     oldPrice: 'body #detail-product .product-price>del',
    //     percentClass: 'body #detail-product .pro-sale',
    //     currency: '₫',
    // });

    /*--- size ---*/
    $('.attr-size label').click(function () {
        var t = $(this), size = $('.attr-size label'), qtt = $('#quantity'), atc = $('.btnAddToCart,.btn-cart-bottom');
        if (!t.hasClass('active')) {
            size.removeClass('active');
            if ($('.attr-color').length && !$('.attr-color label.active').length) {
                size.attr('data-original-title', msgColor);
            } else {
                if (t.attr('qtt')) {
                    t.addClass('active');
                    qtt.attr('max', t.attr('qtt'));
                    atc.attr('data-selId', t.attr('data-selId')).removeAttr('title data-original-title').attr('data-ck', 1).removeClass('unsel');
                    // Gắn giá và hiển thị giá theo sản phẩm con
                    renderPrice(t.attr('data-price'),t.attr('data-oldPrice'),t.attr('data-moneydiscount'));

                    // loadProductPrice.change({
                    //     currency: '₫',
                    //     priceClass: 'body #detail-product .product-price .pro-price',
                    //     oldPriceClass: 'body #detail-product .product-price>del',
                    //     percentClass: 'body #detail-product .pro-sale',
                    //     moneyDiscountClass: 'body #detail-product .pro-sale',
                    //     price: t.attr('data-price'),
                    //     oldPrice: t.attr('data-oldPrice'),
                    //     moneyDiscount: t.attr('data-moneyDiscount')
                    // });
                }
            }
        }
    });

    /*--- color ---*/
    $('.attr-color label').click(function () {
        var t = $(this), size = $('.attr-size label'), src = $(this).attr('data-src'), qtt = $('#quantity'),
            atc = $('.btnAddToCart,.btn-cart-bottom'), attrs = {};
        if (!t.hasClass('active')) {
            $('.thumbnail[data-zoom="' + src + '"]').click();
            $('.attr-color label').removeClass('active');
            if (size.length > 1) {
                size.removeClass('active deactive').removeAttr('title').removeAttr('data-original-title');
                t.addClass('active');
                atc.addClass("unsel").attr("data-ck", 0);
                attrs[$('.attr-color').attr('data-column')] = t.attr('data-value');
                size.each(function () {
                    var t = $(this);
                    attrs[$('.attr-size').attr('data-column')] = t.attr('data-value');
                    $.post('/product/child?psId=' + atc.attr('data-psid'), {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr({
                                    'qtt': rs.data.available,
                                    'data-selId': rs.data.id,
                                    'data-price': rs.data.price,
                                    'data-oldPrice': rs.data.oldPrice,
                                    'data-moneyDiscount': rs.data.moneyDiscount,
                                });
                            } else {
                                t.addClass('deactive').attr('data-original-title', msgOutofStock).removeAttr('qtt');
                            }
                        },
                        'json'
                    );
                });
            } else {
                if (t.attr('qtt')) {
                    t.addClass('active');
                    atc.attr('data-selId', t.attr('data-selId')).removeAttr('title data-original-title').attr('data-ck', 1).removeClass('unsel');
                    qtt.attr('max', t.attr('qtt'));
                    //gắn giá
                    renderPrice(t.attr('data-price'),t.attr('data-oldPrice'),t.attr('data-moneydiscount'));

                    // loadProductPrice.change({
                    //     currency: '₫',
                    //     priceClass: 'body #detail-product .product-price .pro-price',
                    //     oldPriceClass: 'body #detail-product .product-price>del',
                    //     percentClass: 'body #detail-product .pro-sale',
                    //     moneyDiscountClass: 'body #detail-product .pro-sale',
                    //     price: t.attr('data-price'),
                    //     oldPrice: t.attr('data-oldPrice'),
                    //     moneyDiscount: t.attr('data-moneyDiscount')
                    // });
                }
            }
            //===== get list image child===========
            var pIdsAttr = ($(this).attr('psIds')).split(',');
            var ps = [];
            ps.push({id: pIdsAttr, code: 1, storeId: $storeId});
            if (ps.length) {
                var t = 0;
                getallchildimg(ps, function (rs) {
                    var img_child = $('.pview-thumb-slide'),
                    img_slide_main=$('.images');
                    if (rs.images.length>0) {
                        img_child.empty();
                        img_slide_main.empty();
                        $.each(rs.images, function (vl) {
                            img_slide_main.append('<div class="item itemdelete" data-original="' + rs.images[vl] + '"' +
                                'data-option="do" data-variant="">' +
                                '<a href="' + rs.images[vl] + '"' +
                                'title="Click để xem" data-option="do" ' +
                                'data-image="' + rs.images[vl] + '" ' +
                                'data-zoom-image="' + rs.images[vl] + '" ' +
                                'rel="lightbox-do">' +
                                '<img class="img-fluid img-responsive" src="' + rs.images[vl] + '" alt="">' +
                                '<p class="click-p" href="' + rs.images[vl] + '"' +
                                'data-zoom-image="' + rs.images[vl] + '" rel="lightbox-do">' +
                                '<i class="fa fa-search" aria-hidden="true"></i> Click xem hình lớn hơn </p></a></div>');
                            img_child.append('<div class="thumbnail thumdelete clickItem" data-index="' + t + '" ' +
                                'data-option="do" data-zoom="' + rs.images[vl] + '">' +
                                '<img class="img-fluid img-thumbnail" src="' + rs.images[vl] + '">' +
                                '</div>');
                            t++;
                        });
                        switchSlide(soption);
                    }
                });
            }
        }
    });
    $('.btn-closePlugin').click(function () {
        $('#pbImage').addClass('img-hidden').fadeOut(500);
        $('#pbOverlay,#pbBottom,.btn-closePlugin').css('display','none');
        setTimeout(function () {
            $('#pbImage').removeClass('img-hidden');
        },1000);
    });
});

/*------  check màu và size trong mobile popup  -------*/
if ($(window).width() <= 767) {
    $(document).ready(function () {
        $(".buyNowModalBuyMobile").click(function () {
            $("#add-to-cart").click();
        });

        $(".overModalBuyMobile").click(function () {
            $(this).addClass("notShow");
            $(".modalBuyMobile").addClass("notShow");
        });
        $(".closeModalBuyMobile").click(function () {
            $(".overModalBuyMobile").addClass("notShow");
            $(".modalBuyMobile").addClass("notShow");
        });

        /*======= add to cart mobile =======*/
        $('#add-to-cartbottom').click(function () {
            if ($(this).attr("data-m-ck") == 1) {
                var products = [], ps = {};
                ps['id'] = $(this).attr('data-selId');
                ps['quantity'] = document.getElementById('quantity').value;
                products.push(ps);
                addToCart(products, 1, function (rs) {
                    if (rs.status == 1) {
                        ajaxLoadView({
                            view: 'cartSidebar',
                            onSuccess: function (rs) {
                                $("#site-cart>.site-nav-container-last").empty().html(rs);
                                $('#myCart').modal('show');
                                $('.modal-backdrop').css({'height': jQuery(document).height(), 'z-index': '99'});
                                getCartModal()
                            }
                        });
                    } else {
                        alert(rs.messages);
                    }
                });
            } else {
                $('.modalBuyMobile, .overModalBuyMobile').removeClass('notShow')
            }
        });

        /*--- size ---*/
        $('.m-attr-size label').click(function () {
            var t = $(this), size = $('.m-attr-size label'), qtt = $('#quantity'),
                atc = $('.btnAddToCart,.btn-cart-bottom');
            if (!t.hasClass('active')) {
                size.removeClass('active');
                if ($('.m-attr-color').length && !$('.m-attr-color label.active').length) {
                    size.attr('title', msgColor);
                } else {
                    if (t.attr('qtt')) {
                        t.addClass('active');
                        qtt.attr('max', t.attr('qtt'));
                        atc.attr('data-selId', t.attr('data-selId')).removeAttr('title').removeAttr('data-original-title').attr('data-ck', 1).removeClass('unsel');
                    }
                }
            }
        });

        /*--- color ---*/
        $('.m-attr-color label').click(function () {
            var t = $(this), size = $('.m-attr-size label'), qtt = $('#quantity'),
                atc = $('.btnAddToCart,.btn-cart-bottom'), attrs = {};
            if (!t.hasClass('active')) {
                $('.m-attr-color label').removeClass('active');
                if (size.length > 1) {
                    size.removeClass('active deactive').removeAttr('title').removeAttr('data-original-title');
                    t.addClass('active');
                    atc.addClass("unsel").attr("data-ck", 0);
                    attrs[$('.m-attr-color').attr('data-column')] = t.attr('data-value');
                    size.each(function () {
                        var t = $(this);
                        attrs[$('.m-attr-size').attr('data-column')] = t.attr('data-value');
                        $.post(
                            '/product/child?psId=' + atc.attr('data-psid'),
                            {'attrs': attrs},
                            function (rs) {
                                if (rs.code == 1 && rs.data.available > 0) {
                                    t.attr('qtt', rs.data.available).attr('data-selId', rs.data.id);
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
                        atc.attr('data-selId', t.attr('data-selId')).removeAttr('title').removeAttr('data-original-title').attr('data-ck', 1).removeClass('unsel');
                        qtt.attr('max', t.attr('qtt'));
                    }
                }
            }
        });

        mCheckInv();
    });

    function mCheckInv() {
        var req = $('.m-req').length, attrs = {}, atc = $('.btnAddToCart,.btn-cart-bottom'), qtt = $('#quantity');
        if (req == 1) {
            if ($('.m-attr-color').length) {
                if ($('.m-attr-color label.active').length) {
                    attrs[$('.m-attr-color').attr('data-column')] = $('.m-attr-color label.active').attr('data-value');
                    $.post(
                        '/product/child?psId=' + atc.attr('data-psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                qtt.attr('max', rs.data.available);
                                atc.attr('data-selId', rs.data.id).removeAttr('title').removeAttr('data-original-title').attr('data-ck', 1).removeClass('unsel');
                            } else {
                                atc.attr('title', msgOutofStock);
                            }
                        },
                        'json'
                    );

                } else {
                    $('.m-attr-color label').each(function () {
                        var t = $(this);
                        attrs[$('.m-attr-color').attr('data-column')] = t.attr('data-value');
                        $.post(
                            '/product/child?psId=' + atc.attr('data-psid'),
                            {'attrs': attrs},
                            function (rs) {
                                if (rs.code == 1 && rs.data.available > 0) {
                                    t.attr('qtt', rs.data.available).attr('data-selId', rs.data.id);
                                } else {
                                    t.addClass('deactive').attr('title', msgOutofStock);
                                }
                            },
                            'json'
                        );
                    });
                }
            } else {
                if ($('.m-attr-size label.active').length) {
                    attrs[$('.m-attr-size').attr('data-column')] = $('.m-attr-size label.active').attr('data-value');
                    $.post(
                        '/product/child?psId=' + atc.attr('data-psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                qtt.attr('max', rs.data.available);
                                atc.attr('data-selId', rs.data.id).removeAttr('title').removeAttr('data-original-title').attr('data-ck', 1).removeClass('unsel');
                            } else {
                                atc.attr('title', msgOutofStock);
                            }
                        },
                        'json'
                    );
                } else {
                    $('.m-attr-size label').each(function () {
                        var t = $(this);
                        attrs[$('.m-attr-size').attr('data-column')] = t.attr('data-value');
                        $.post(
                            '/product/child?psId=' + atc.attr('data-psid'),
                            {'attrs': attrs},
                            function (rs) {
                                if (rs.code == 1 && rs.data.available > 0) {
                                    t.attr('qtt', rs.data.available).attr('data-selId', rs.data.id);
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
            var colorAt = $('.m-attr-color label.active'), sizeAt = $('.m-attr-size label.active');
            if (colorAt.length && sizeAt.length) {
                attrs[$('.m-attr-color').attr('data-column')] = colorAt.attr('data-value');
                attrs[$('.m-attr-size').attr('data-column')] = sizeAt.attr('data-value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            qtt.attr('max', rs.data.available);
                            atc.attr('data-selId', rs.data.id).removeAttr('title').removeAttr('data-original-title').attr('data-ck', 1).removeClass('unsel');
                        } else {
                            sizeAt.addClass('deactive').attr('title', msgOutofStock);
                            atc.attr('title', msgOutofStock);
                        }
                    },
                    'json'
                );
                return false;
            }
            if (colorAt.length && !sizeAt.length) {
                attrs[$('.m-attr-color').attr('data-column')] = colorAt.attr('data-value');
                $('.m-attr-size label').each(function () {
                    var t = $(this);
                    attrs[$('.m-attr-size').attr('data-column')] = t.attr('data-value');
                    $.post(
                        '/product/child?psId=' + atc.attr('data-psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('data-selId', rs.data.id);
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
                attrs[$('.m-attr-size').attr('data-column')] = sizeAt.attr('data-value');
                $('.m-attr-color label').each(function () {
                    var t = $(this);
                    attrs[$('.m-attr-color').attr('data-column')] = t.attr('data-value');
                    $.post(
                        '/product/child?psId=' + atc.attr('data-psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('data-selId', rs.data.id);
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
}


function showStore (cityId) {
    if (cityId) {
        $.post('/store/depotproduct', {
                cityId: cityId,
                storeId: $('#storeId').val(),
            },
            function (rs) {
                $("#stock-box").empty();
                if(rs.length){
                    var inner="";
                    for(var i = 0; i < rs.length; i++) {

                        var obj = rs[i];
                        inner += '<div class="stock">';
                        inner += '<span class="dist"><img src="/tpl/V0298/img/tmp/maps-and-flags.png" alt="icon store">' +obj.depotName+ ':</span>\n' +
                            '<span class="street">'+obj.phone+'</span>';

                        if (obj.showOnlineQtt > 0){
                            inner += '<span class="timeStore">' + obj.address + ' <strong>(Còn hàng)</strong></span>';
                        } else{
                            inner += '<span class="timeStore">' + obj.address + ' <strong class="red">(Hết hàng)</strong></span>';
                        }

                        inner += '</div>';
                    }
                    $("#stock-box").append(inner);
                }else{
                    $("#stock-box").append('<span style="display: block;text-align: center; font-weight: normal">Chưa có cửa hàng nào !!!</span>');
                }
            }
        );
    }
}
function switchSlide(opt) {
    // var imagelast = '';
    if ($("#slide-image").data('owlCarousel')) {
        owl.data('owlCarousel').destroy();
    }
    $("#slide-image").html('');
    $('#slide-image .item').remove();
    $('.images .item').clone().appendTo('#slide-image');
    owl = $("#slide-image").owlCarousel(opt);
    $("a[rel^='lightbox']").picbox({}, null, function (el) {
        return (this == el) || ((this.rel.length > 8) && (this.rel == el.rel));
    });
    // $(".thumbnails .row").css({'max-height': $('#slide-image').innerHeight(), 'overflow': 'hidden'})
}
function checkInv() {
    var req = $('.req').length, attrs = {}, atc = $('.btnAddToCart,.btn-cart-bottom'), qtt = $('#quantity');
    if (req == 1) {
        if ($('.attr-color').length) {
            if ($('.attr-color label.active').length) {
                attrs[$('.attr-color').attr('data-column')] = $('.attr-color label.active').attr('data-value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            qtt.attr('max', rs.data.available);
                            atc.attr('data-selId', rs.data.id).removeAttr('title data-original-title').attr('data-ck', 1).removeClass('unsel');
                        } else {
                            atc.attr('title', msgOutofStock);
                        }
                    },
                    'json'
                );

            } else {
                $('.attr-color label').each(function () {
                    var t = $(this);
                    attrs[$('.attr-color').attr('data-column')] = t.attr('data-value');
                    $.post(
                        '/product/child?psId=' + atc.attr('data-psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr({
                                    'qtt': rs.data.available,
                                    'data-selId': rs.data.id,
                                    'data-price': rs.data.price,
                                    'data-oldPrice': rs.data.oldPrice,
                                    'data-moneyDiscount': rs.data.moneyDiscount,
                                });
                            } else {
                                t.addClass('deactive').attr('title', msgOutofStock);
                            }
                        },
                        'json'
                    );
                });
            }
        } else {
            if ($('.attr-size label.active').length) {
                attrs[$('.attr-size').attr('data-column')] = $('.attr-size label.active').attr('data-value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            qtt.attr('max', rs.data.available);
                            atc.attr('data-selId', rs.data.id).removeAttr('title').removeAttr('data-original-title').attr('data-ck', 1).removeClass('unsel');
                        } else {
                            atc.attr('data-original-title', msgOutofStock);
                        }
                    },
                    'json'
                );
            } else {
                $('.attr-size label').each(function () {
                    var t = $(this);
                    attrs[$('.attr-size').attr('data-column')] = t.attr('data-value');
                    $.post(
                        '/product/child?psId=' + atc.attr('data-psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr({
                                    'qtt': rs.data.available,
                                    'data-selId': rs.data.id,
                                    'data-price': rs.data.price,
                                    'data-oldPrice': rs.data.oldPrice,
                                    'data-moneyDiscount': rs.data.moneyDiscount,
                                });
                            } else {
                                t.addClass('deactive').attr('data-original-title', msgOutofStock);
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
        var colorAt = $('.attr-color label.active'), sizeAt = $('.attr-size label.active');
        if (colorAt.length && sizeAt.length) {
            attrs[$('.attr-color').attr('data-column')] = colorAt.attr('data-value');
            attrs[$('.attr-size').attr('data-column')] = sizeAt.attr('data-value');
            $.post(
                '/product/child?psId=' + atc.attr('data-psid'),
                {'attrs': attrs},
                function (rs) {
                    if (rs.code == 1 && rs.data.available > 0) {
                        qtt.attr('max', rs.data.available);
                        atc.attr('data-selId', rs.data.id).removeAttr('title').removeAttr('data-original-title').attr('data-ck', 1).removeClass('unsel');
                    } else {
                        sizeAt.addClass('deactive').attr('data-original-title', msgOutofStock);
                        atc.attr('data-original-title', msgOutofStock);
                    }
                },
                'json'
            );
            return false;
        }
        if (colorAt.length && !sizeAt.length) {
            attrs[$('.attr-color').attr('data-column')] = colorAt.attr('data-value');
            $('.attr-size label').each(function () {
                var t = $(this);
                attrs[$('.attr-size').attr('data-column')] = t.attr('data-value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            t.attr({
                                'qtt': rs.data.available,
                                'data-selId': rs.data.id,
                                'data-price': rs.data.price,
                                'data-oldPrice': rs.data.oldPrice,
                                'data-moneyDiscount': rs.data.moneyDiscount,
                            });
                        } else {
                            t.addClass('deactive').attr('data-original-title', msgOutofStock);
                        }
                    },
                    'json'
                );
            });
            return false;
        }
        if (!colorAt.length && sizeAt.length) {
            attrs[$('.attr-size').attr('data-column')] = sizeAt.attr('data-value');
            $('.attr-color label').each(function () {
                var t = $(this);
                attrs[$('.attr-color').attr('data-column')] = t.attr('data-value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            t.attr({
                                'qtt': rs.data.available,
                                'data-selId': rs.data.id,
                                'data-price': rs.data.price,
                                'data-oldPrice': rs.data.oldPrice,
                                'data-moneyDiscount': rs.data.moneyDiscount,
                            });
                        } else {
                            t.addClass('deactive').attr('data-original-title', msgOutofStock);
                        }
                    },
                    'json'
                );
            });
            return false;
        }
    }
}

function renderPrice($price,$priceOld,$discount){
    var $old = 0,
        $spPrice = $('#detail-product .product-price .pro-price'),
        $spOld = $('#detail-product .product-price>del'),
        $spDiscount = $('.details-pro .save-price .product-price-save');

    if($discount > 0){
        $old = parseInt($price) + parseInt($discount);
        $spDiscount.html($.number($discount) + 'đ');
    }
    else if($priceOld > 0){
        $old = $priceOld;
    }


    if ($price > 0){
        $spPrice.html($.number($price) + '₫');
    }else{
        $spPrice.html('Liên hệ');
    }


    if ($spOld.length) {
        if ($old > 0) {
            $spOld.html($.number($old) + '₫').show();
        } else {
            $spOld.html($.number($price) + '₫');
        }
    }
}
