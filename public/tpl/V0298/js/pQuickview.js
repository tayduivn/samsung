$(document).ready(function () {
    var owl, soption = {
        items: 1,
        nav: true,
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

    setTimeout(function () {
        switchSlide()
    }, 300);

    function switchSlide(opt) {
        // var imagelast = '';
        if ($("#slide-image").data('owlCarousel')) {
            owl.data('owlCarousel').destroy();
        }
        $("#slide-image").html('');
        $('#slide-image .item').remove();
        $('.images .item').clone().appendTo('#slide-image');

        // $('.thumbnails .row .thumbnail').remove();
        // $('.thumbnails .row').html('');
        // $('.thumbnails-hidden .thumbnail[data-option=' + opt + ']').clone().appendTo('.thumbnails .row');

        owl = $("#slide-image").owlCarousel(soption);
        $("a[rel^='lightbox']").picbox({}, null, function (el) {
            return (this == el) || ((this.rel.length > 8) && (this.rel == el.rel));
        });
    }

    $(document).on('click', '.thumbnails .thumbnail.clickItem', function () {
        owl.trigger("to.owl.carousel", [$(this).index(), 500, true]);
        $("#slide-image").show();
        $(".hinh360").hide();
        $(".videoProduct").hide();
    });

    $(document).on('click', '.thumbnails .thumbnail', function () {
        $('.thumbnails .thumbnail').removeClass('active');
        $(this).addClass('active');
    });

    $(document).on("click", ".videoThumb", function () {
        var link = $(this).attr("data-video");
        $(".videoProduct iframe").attr("src", link + "?autoplay=1&loop=1&autopause=0");
        $(".hinh360").hide();
        $("#slide-image").hide();
        $(".videoProduct").show();
    });

    if ($('.owlRelate1 .owl-carousel').length) {
        $('.owlRelate1 .owl-carousel').owlCarousel({
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
    }


    $(".product-description .title-bl").click(function () {
        $(this).find(".icon-open").toggleClass("active");
        $(this).next().slideToggle();
    });

    $('#add-to-cart').click(function (e) {
        if ($(this).attr("data-ck") == 1) {
            var products = [], ps = {};
            ps['id'] = $(this).attr('data-selId');
            ps['quantity'] = 1;
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
        } else {
            swal({
                type: 'error',
                text: 'Vui lòng chọn size hoặc màu mà bạn thích. Xin cảm ơn. '
            });
        }
    });

    $('#quan-input').keyup(function () {
        $('[name="quantity"]').val($(this).val());
    });
    $('[name="quantity"]').on('keyup change', function () {
        $('#quan-input').val($(this).val());
    });


    //=========
    $("#add-item-form .select-swap .color").hover(function () {
        var value = $(this).data("value");
        $(this).parents(".swatch").find(".header span").html(value);
    }, function () {
        var value = $("#add-item-form .select-swap .color label.sd span").html();
        $(this).parents(".swatch").find(".header span").html(value);
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

    /*--- size ---*/
    $('.attr-size label').click(function () {
        var t = $(this), size = $('.attr-size label'), qtt = $('#quantity'), atc = $('.btnAddToCart');
        if (!t.hasClass('active')) {
            size.removeClass('active');
            if ($('.attr-color').length && !$('.attr-color label.active').length) {
                size.attr('title', msgColor);
            } else {
                if (t.attr('qtt')) {
                    t.addClass('active');
                    qtt.attr('max', t.attr('qtt'));
                    atc.attr('data-selId', t.attr('data-selId')).removeAttr('title').removeAttr('data-original-title').attr('data-ck', 1).removeClass('unsel');
                    //gắn giá
                    renderPrice(t.attr('price'));
                }
            }
        }
    });

    /*--- color ---*/
    $('.attr-color label').click(function () {
        var t = $(this), size = $('.attr-size label'), src = $(this).attr('data-src'), qtt = $('#quantity'), atc = $('.btnAddToCart'), attrs = {};
        if (!t.hasClass('active')) {
            $('.thumbnail[data-zoom="' + src + '"]').click();
            $('.attr-color label').removeClass('active');
            if (size.length > 1) {
                size.removeClass('active deactive').removeAttr('title');
                t.addClass('active');
                atc.addClass("unsel").attr("data-ck", 0);
                attrs[$('.attr-color').attr('data-column')] = t.attr('data-value');
                size.each(function () {
                    var t = $(this);
                    attrs[$('.attr-size').attr('data-column')] = t.attr('data-value');
                    $.post(
                        '/product/child?psId=' + atc.attr('data-psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('data-selId', rs.data.id);
                                t.attr('price', rs.data.price);
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
                    //gắn giá
                    renderPrice(t.attr('price'));
                }
            }
        }
    });
});


function checkInv() {
    var req = $('.req').length, attrs = {}, atc = $('.btnAddToCart'), qtt = $('#quantity');
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
                            atc.attr('data-selId', rs.data.id).removeAttr('title').attr('data-ck', 1).removeClass('unsel');
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
                                t.attr('qtt', rs.data.available).attr('data-selId', rs.data.id);
                                t.attr('price', rs.data.price);
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
                            atc.attr('data-selId', rs.data.id).removeAttr('title').attr('data-ck', 1).removeClass('unsel');
                        } else {
                            atc.attr('title', msgOutofStock);
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
                                t.attr('qtt', rs.data.available).attr('data-selId', rs.data.id);
                                t.attr('price', rs.data.price);
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
        var colorAt = $('.attr-color label.active'), sizeAt = $('.attr-size label.active');
        if (colorAt.length && sizeAt.length) {
            attrs[$('.attr-color').attr('data-column')] = colorAt.attr('data-value');
            attrs[$('.attr-size').attr('data-column')] = sizeAt.attr('data-value');
            $.post(
                '/product/child?psId=' + atc.attr('data-psid'),
                {'attrs': attrs},
                function (rs) {
                    if (rs.code == 1) {
                        if (rs.data.available < 0) {
                            sizeAt.addClass('deactive').attr('title', msgOutofStock);
                        } else {
                            qtt.attr('max', rs.data.available);
                            atc.attr('data-selId', rs.data.id).removeAttr('title').removeAttr('data-original-title').attr('data-ck', 1).removeClass('unsel');
                        }
                    } else {
                        atc.attr('title', msgOutofStock);
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
                            t.attr('qtt', rs.data.available).attr('data-selId', rs.data.id);
                            t.attr('price', rs.data.price);
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
            attrs[$('.attr-size').attr('data-column')] = sizeAt.attr('data-value');
            $('.attr-color label').each(function () {
                var t = $(this);
                attrs[$('.attr-color').attr('data-column')] = t.attr('data-value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            t.attr('qtt', rs.data.available).attr('data-selId', rs.data.id);
                            t.attr('price', rs.data.price);
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

function renderPrice($price, $priceOld, $discount) {
    var $old = 0,
        $spPrice = $('#detail-product .product-price .pro-price'),
        $spOld = $('.details-pro .old-price .product-price-old');
    $spDiscount = $('.details-pro .save-price .product-price-save');

    if ($discount > 0) {
        $old = parseInt($price) + parseInt($discount);
        $spDiscount.html($.number($discount) + 'đ');
    } else if ($priceOld > 0) {
        $old = $priceOld;
    }


    if ($price > 0) {
        $spPrice.html($.number($price) + '₫');
    } else {
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
