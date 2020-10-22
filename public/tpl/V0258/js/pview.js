var $storeId = $('#checkStoreId').val();
/*video*/
if ($('.video-trigger').length) {

    var videoId = $('.video-trigger a').attr('data-url');
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '480',
            width: '640',
            videoId: videoId,
            events: {
                //'onReady': onPlayerReady,
                //'onStateChange': onPlayerStateChange
            }
        });
    }
    function onPlayerReady(event) {
        event.target.playVideo();
    }
    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }
}
function roleVideo(t) {
    var vid = $(t).attr('data-url');
    if (vid){
        $('.gallery-item-video').show();
        $('.khung-ha').hide();
        $('.zoomContainer').hide();

    }else{
        $('.gallery-item-video').hide();
        $('.khung-ha').show();
        $('.zoomContainer').show();
    }
}

jQuery(document).ready(function () {
    if ($(window).width() < 992) {
        $('.gallery-icon img,.swatch-element img').click(function () {
            var imgNew = $(this).attr('src');
            $('.khung-ha a').attr('href', imgNew);
        });
        $(".khung-ha a").fancybox();
    }

    jQuery('.tabs .tab-caption-item').click(function () {
        if (!jQuery(this).hasClass('selected')) {
            contentId = jQuery(this).attr('id').replace('cap', 'content');
            jQuery('.tabs .tab-caption-item').removeClass('selected');
            jQuery(this).addClass('selected');
            jQuery('.tabs .tab-content-item').hide();
            jQuery('.tabs #' + contentId).fadeIn();
        }
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
    $("#flip1").on('click',function () {
        var $this = jQuery(this), $description = $('.product-tabs');
        if ($this.hasClass('active')) {
            $description.removeClass('description-fill');
            $(this).removeClass('active');
            $this.html('<span>Xem thêm</span>');
        } else {
            $this.addClass('active');
            $this.html('<span>Thu hẹp</span>');
            $description.addClass('description-fill');
        }
        $description.slideDown();
    });
    
    var nav=false;
    if (in_array($storeId,[47785])){
        nav=true;
    }
    if($('#gallery-2 .gallery-item').length) {
        $('#gallery-2').owlCarousel({
            loop: false,
            margin: 10,
            nav: nav,
            dots:false,
            autoplay: true,
            autoplayTimeout: 5000,
            autoHeight: true,
            responsive: {
                0: {
                    items: 3
                },
                600: {
                    items: 4
                },
                1000: {
                    items: 5
                }
            }
        })
    }
});
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
    jQuery(".ha").elevateZoom({
        gallery: 'gallery-2',
        scrollZoom: true,
        cursor: 'pointer'
    });
    $(".ha").bind("click", function (e) {
        var ez = $('.ha').data('elevateZoom');
        $.fancybox(ez.getGalleryList());
        return false;
    });
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
$(document).ready(function () {

    //tăng giảm số lượng
    checkInv();
    $('#QtyDown').click(function () {
        var qtt = $('#psQtt'), max = parseInt(qtt.attr('max')), v = parseInt(qtt.val());

        if (v > 1) {
            qtt.val(v - 1);
            qtt.attr('val', v - 1);
        } else {
            alert('Bạn phải đặt số lượng tối thiểu là 1 sản phẩm !');
        }

    });
    $('#QtyUp').click(function () {
        var qtt = $('#psQtt'), max = parseInt(qtt.attr('max')), v = parseInt(qtt.val());

        if (v < max) {
            qtt.val(v + 1);
            qtt.attr('val', v + 1);
        } else {
            alert('Bạn không thể đặt quá số lượng còn lại của sản phẩm !');
        }

    });
    $('#psQtt').keyup(function () {
        var t = $(this), max = parseInt(t.attr('max')), v = parseInt(t.val());
        if (v >= max) {
            alert('Bạn không thể đặt quá số lượng còn lại của sản phẩm !');
            t.val(max);
        }
    });
//end
});


/*--- size ---*/
$('.size a').click(function () {
    var t = $(this), size = $('.size a'), qtt = $('#psQtt'), atc = $('button.btnAddToCart'), attrs = {};
    if (!t.hasClass('active')) {
        size.removeClass('active');
        attrs[$('.size').attr('column')] = t.attr('value');
        if ($('.color').length && !$('.color a.active').length) {
            size.attr('data-original-title', msgColor);
        } else {
            if ($('.color').length) {
                if (t.attr('qtt')) {
                    t.addClass('active');
                    if(t.attr('data-price') > 0) {
                        $('.current-price strong').text($.number(t.attr('data-price'))+ ' VNĐ');
                    }
                    qtt.attr('max', t.attr('qtt'));
                    atc.attr('selId', t.attr('selId')).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                } else {
                    t.addClass('deactive').attr('data-original-title', msgOutofStock);
                }
            } else {
                $.post(
                    '/product/child?childId=' + t.attr('selId'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code ==1  && rs.data.available > 0) {
                            t.addClass('active');
                            qtt.attr('max', t.attr('qtt'));
                            atc.attr('selId', t.attr('selId')).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                            if(t.attr('data-price') > 0) {
                                $('.current-price strong').text($.number(t.attr('data-price'))+ ' VNĐ');
                            }
                        } else {
                            t.addClass('deactive').attr('data-original-title', msgOutofStock);
                        }
                    },
                    'json'
                );
            }
        }
    }
});
/*--- color ---*/
$('.color a').click(function () {
    var t = $(this), size = $('.size a'), qtt = $('#psQtt'), atc = $('button.btnAddToCart'), attrs = {};
    if(t.attr('data-src')) {
        $("#theImg").attr('src', t.attr('data-src'));
    }
    $(".zoomWindowContainer div").css("background-image", 'url(' + t.attr('data-src') + ')');
    $(".gallery-item").removeClass('active');
    if (!t.hasClass('active')) {
        $('.color a').removeClass('active');
        if (size.length > 1) {
            size.removeClass('active deactive');
            t.addClass('active');
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
                            t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
                        } else {
                            t.addClass('deactive').attr('data-original-title', msgOutofStock).removeAttr('qtt');
                        }
                    },
                    'json'
                );
            });

        } else {
            (t.attr('qtt'));
            t.addClass('active');
            if(t.attr('data-price') > 0) {
                $('.current-price strong').text($.number(t.attr('data-price'))+ ' VNĐ');
            }
            atc.attr('selId', t.attr('selId')).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
            qtt.attr('max', t.attr('qtt'));

        }
    }
});
$(document).ready(function(){
    $("button.btnAddToCart").on("click", function(){
        if ($(this).attr("ck") == 1) {
            var products = [], ps = {};
            ps['id'] = $(this).attr('selid');
            ps['quantity'] = $("#psQtt").val();
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
                            view: 'topCart',
                            onSuccess: function (rs) {
                                $('.top-cart-content').html(rs);
                            }
                        });
                        if(in_array($storeId,[58473,224])){
                            var mes = $('#dialogMessage');
                            mes.html('<p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 10px 40px 0;"></span>Thêm giỏ hàng thành công</p>');
                            mes.dialog({
                                title: "Thông báo!", modal: true, show: "explode", hide: "explode",
                                buttons: {
                                    Ok: function () {
                                        $(this).dialog("close");
                                    }
                                }
                            });
                        }else {
                            window.location.href = '/cart'
                        }
                    }
                } else {
                    alert(msgSizeColorProduct);
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
function checkInv() {
    var req = $('.req').length, attrs = {}, atc = $('#addToCart'), qtt = $('#psQtt');
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
                            atc.attr('selId', rs.data.id).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                        } else {
                            atc.attr('data-original-title', msgOutofStock);
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
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
                            } else {
                                t.addClass('deactive').attr('data-original-title', msgOutofStock);
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
                            atc.attr('selId', rs.data.id).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                        } else {
                            atc.attr('data-original-title', msgOutofStock);
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
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
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
        var colorAt = $('.color a.active'), sizeAt = $('.size a.active');
        if (colorAt.length && sizeAt.length) {
            attrs[$('.color').attr('column')] = colorAt.attr('value');
            attrs[$('.size').attr('column')] = sizeAt.attr('value');
            $.post(
                '/product/child?psId=' + atc.attr('psid'),
                {'attrs': attrs},
                function (rs) {
                    if (rs.code == 1 && rs.data.available > 0) {
                        $('.size a').attr('data-price', rs.data.price);
                        if($('.size a').attr('data-price') > 0){
                            $('.current-price strong').text($.number($('.size a').attr('data-price')) + ' VNĐ');
                        }
                        qtt.attr('max', rs.data.available);
                        atc.attr('selId', rs.data.id).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                    } else {
                        atc.attr('data-original-title', msgOutofStock);
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
                            t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
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
            attrs[$('.size').attr('column')] = sizeAt.attr('value');
            $('.color a').each(function () {
                var t = $(this);
                attrs[$('.color').attr('column')] = t.attr('value');
                $.post(
                    '/product/child?psId=' + atc.attr('psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
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
