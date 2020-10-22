var storeId = $('#psStoreId').val();
$(function () {
    checkInv();
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
    }else{
        $('.slide_product').addClass('owl-carousel');
        $('.slide_product').owlCarousel({
            items:1,
            nav: true,
            dots: false,
            //video:true,
            lazyLoad:true,
            center:true,
            touchDrag: true,
            autoplay: true,
            autoplayTimeout:8000,
            loop: true,
            navText : ["<i class='fal fa-angle-left'></i>","<i class='fal fa-angle-right'></i>"]
        });
    }

    $('.list-productRelated .content-product-list').owlCarousel({
        items:3,
        nav:true,
        dots:false,
        margin: 25,
        responsive:{
            0:{
                items:2
            },
            480:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:4
            }
        },
        pagination: false,
        slideSpeed : 800,
        addClassActive: true,
        scrollPerPage: false,
        touchDrag: true,
        autoplay: true,
        loop: false,
    });

    $('#addToCart, #addCart_bottom').click(function () {
        var t = $(this);
        if (t.attr('data-ck') == 1) {
            var products = [], ps = {};
            ps['id'] = t.attr('data-selId');
            ps['quantity'] = $('#quantity').val();
            products.push(ps);
            addToCart(products, 1, function(rs){
                if (rs.status == 1) {
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

                    $('#site-nav--mobile').addClass('active');
                    $('#site-overlay').addClass('active');
                } else {
                    alert(rs.messages);
                }
            });
        }else{
            var msgSize = $('#msgSizeColor');
            msgSize.html('<div class="alert alert-warning fade in alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>Vui lòng chọn Màu và Size để mua hàng</div>');
            $('html, body').animate({scrollTop:parseInt(msgSize.offset().top)-50}, 'slow');
            setTimeout(function () {
                msgSize.find('.alert').fadeOut(100).remove();
            },10000);
            return false;
        }
    });

    $('#buyNow, #buyNow_bottom').click(function () {
        var t = $(this);
        if (t.attr('data-ck') == 1) {
            var products = [], ps = {};
            ps['id'] = t.attr('data-selId');
            ps['quantity'] = $('#quantity').val();
            products.push(ps);
            addToCart(products, 1, function(rs){
                if (rs.status == 1) {
                    location.href = '/cart';
                } else {
                    alert(rs.messages);
                }
            });
        }
    });

    $('body').on('click','.size a',function(){
        var t = $(this), size = $('.size a'), qtt = $('#psQtt'), atc = $('#addToCart, .add-to-cartProduct,#buyNow'),attrs = {};
        if (!t.hasClass('active')) {
            $('.tp_product_detail_price').html($.number(t.attr('data-price')) + 'đ');
            size.removeClass('active');
            atc.attr('title', 'Vui lòng chọn màu sắc hoặc kích cỡ!').attr('data-ck', 0).addClass('unsel');
            if ($('.color').length && !$('.color a.active').length) {
                size.attr('title', 'Vui lòng chọn màu trước!');
            } else {
                if (t.attr('data-qtt')) {
                    $('.tp_product_detail_price').html($.number(t.attr('data-price')) + 'đ');
                    t.addClass('active');
                    qtt.attr('data-max',t.attr('data-qtt'));
                    atc.attr('data-selId', t.attr('data-selId')).removeAttr('title').attr('data-ck', 1).removeClass('unsel');
                    getIvtDepots(attrs,t);
                }
            }
        }
    });

    $('.color a').on( 'click', function(){
        var t = $(this), size = $('.size a'), qtt = $('#quantity'), atc = $('#addToCart, .add-to-cartProduct,#buyNow'), attrs = {};
        if (!t.hasClass('active')) {
            $('.color a').removeClass('active');
            $('.nameColor').html(' - ('+ t.attr('data-name') + ')');
            atc.attr('title', 'Vui lòng chọn màu sắc hoặc kích cỡ!').attr('data-ck', 0).addClass('unsel');
            if (size.length > 1) {
                size.removeClass('active deactive');
                t.addClass('active');
                size.removeAttr('title');
                attrs[$(this).parent('.color').attr('data-column')] = t.attr('value');
                size.each(function () {
                    var t = $(this);
                    attrs[$('.size').attr('data-column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + $('#addToCart').attr('data-psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1) {
                                if(rs.data.available > 0){
                                    t.attr('data-qtt', rs.data.available).attr('data-selId', rs.data.id).attr('data-price', rs.data.price);
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
                    $('.tp_product_detail_price').html($.number(t.attr('data-price')) + 'đ');
                    t.addClass('active');
                    atc.attr('data-selId', t.attr('data-selId')).removeAttr('title').attr('data-ck', 1).removeClass('unsel');
                    qtt.attr('data-max', t.attr('data-qtt'));
                    getIvtDepots(attrs,t);
                }
            }

                var src = $(this).attr('data-src');
                var ids = t.attr('data-pids').split(',');
                var ps = [];
                var storeId = $('#psStoreId').val();
                getChildProductImages(ids,src);
                var listImg1 =  $('#sliderproduct');
                var listImg2 =  $('.product-gallery__thumbs');
                ps.push({id: ids, getSrcUri: true, code: 1, storeId: storeId});
                if (ps.length) {
                    getallchildimg(ps, function (rs) {
                        if($(window).width() > 768){
                            listImg1.empty();
                            listImg2.empty();
                            if (rs.images != "") {
                                $.each(rs.images, function (vl) {
                                    listImg1.append(
                                        '<li class="product-gallery-item gallery-item"><img data-sizes="auto" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" class="lazyload product-image-feature" data-src="'+rs.images[vl]+'"/></li>'
                                    );
                                    listImg2.append(
                                        '<div class="product-gallery__thumb test active"><a href="javascript:void(0);" data-image="'+rs.images[vl]+'" data-zoom-image="'+rs.images[vl]+'" class="product-gallery__thumb-placeholder"><img data-sizes="auto" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" class="lazyload" data-src="'+rs.images[vl]+'" data-image="'+rs.images[vl]+'"/></a></div>'
                                    );
                                });
                            }else{
                                listImg1.append(
                                    '<li class="product-gallery-item gallery-item"><img src="'+src+'"/></li>'
                                );
                                listImg2.append(
                                    '<div class="product-gallery__thumb test active"><a href="javascript:void(0);" data-image="'+src+'" data-zoom-image="'+src+'" class="product-gallery__thumb-placeholder"><img src="'+src+'" data-image="'+src+'"/></a></div>'
                                );
                            }
                        }else{
                            $('.slide_product').owlCarousel('destroy');
                            $('.slide_product').trigger('destroy.owl.carousel');
                            $('.slide_product').empty();
                            if (rs.images != "") {
                                $.each(rs.images, function (vl) {
                                    listImg1.append(
                                        '<li class="product-gallery-item gallery-item"><img data-sizes="auto" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" class="lazyload product-image-feature" data-src="'+rs.images[vl]+'"/></li>'
                                    );
                                });
                            }else{
                                $('.slide_product').append(
                                    '<li class="product-gallery-item gallery-item"><img data-sizes="auto" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" class="lazyload product-image-feature" data-src="'+src+'"/></li>'
                                );
                            }
                            $('.slide_product').trigger('refresh.owl.carousel');
                            $('.slide_product').owlCarousel({
                                items:1,
                                nav: true,
                                dots: false,
                                //video:true,
                                lazyLoad:true,
                                center:true,
                                touchDrag: true,
                                autoplay: true,
                                autoplayTimeout:8000,
                                loop: true,
                                navText : ["<i class='fal fa-angle-left'></i>","<i class='fal fa-angle-right'></i>"]
                            });
                        }
                    });
                }
                $('html, body').animate({
                    scrollTop: 0
                }, 800);

        }
    });

    $('.childProducts').change(function () {
        var src = $('option:selected', this).attr('href');
        var val = $(this).val(), data = val.split(","), $psId = data[0];

        if ($psId){
            $('.add-to-cartProduct').removeAttr('title').attr('data-ck', 1).attr('data-selId', $psId);
        }

        if (src.length) {
            $('div#zoomer img').attr('style', 'opacity:0.8');
            setTimeout(function () {
                $('div#zoomer img').attr('src', src).attr('style', 'opacity:1');
            }, 150);
        }
        $('div#zoomer img').attr('data-cloudzoom', "useZoom:'.cloudzoom', image:'" + src + "',zoomImage:'" + src + "'");
        $('.cloudzoom').CloudZoom({zoomPosition:'inside', zoomOffsetX:0});
        if ($('ul#listImgZoom li').hasClass('active')) {
            $('#listImgZoom').trigger('slideTo', '[class$="active"]');
        }
        getChildProductImages(val,src);
    });

    if($(window).width() > 1023){
        $(document).on('click','.product-gallery__thumb img',function(){
            $(".product-gallery__thumb").removeClass('active');
            $(this).parents('.product-gallery__thumb').addClass('active');
            var img_thumb = $(this).data('image');
            $('html, body').animate({
                scrollTop: $("#sliderproduct img[src='"+img_thumb+"']").offset().top
            }, 1000);
        });
        $(document).on('click','.product-gallery__video img',function(){
            $(".product-gallery__thumb").removeClass('active');
            $(this).parents('.product-gallery__video').addClass('active');
            $('html, body').animate({
                scrollTop: $("#sliderproduct iframe").offset().top
            }, 1000);
        });
        $(document).keydown(function(e){
            if (e.keyCode == 37) {
                if (($(".product-gallery__thumb.active").length) && ($(".product-gallery__thumb.active").prev().length > 0) ){
                    var $newActive = $(".product-gallery__thumb.active").prev().attr("data-hash");
                    $(".product-gallery__thumb.active").removeClass("active");
                    $(".product-gallery__thumb[data-hash='"+ $newActive +"']").addClass("active");
                    var img_thumb = $(".product-gallery__thumb[data-hash='"+ $newActive +"'] > a").attr('data-image');
                    $('html, body').animate({
                        scrollTop: $("#sliderproduct img[src='"+img_thumb+"']").offset().top
                    }, 1000);
                }
            }else  if (e.keyCode == 39) {
                if (($(".product-gallery__thumb.active").length) && ($(".product-gallery__thumb.active").next().length > 0) ){
                    var $newActive = $(".product-gallery__thumb.active").next().attr("data-hash");
                    $(".product-gallery__thumb.active").removeClass("active");
                    $(".product-gallery__thumb[data-hash='"+ $newActive +"']").addClass("active");
                    var img_thumb = $(".product-gallery__thumb[data-hash='"+ $newActive +"'] > a").attr('data-image');
                    $('html, body').animate({
                        scrollTop: $("#sliderproduct img[src='"+img_thumb+"']").offset().top
                    }, 1000);
                }
            }
        });
    }
    $(".product-gallery__thumb").first().addClass('active');
//Detail Product
    $(document).on('click','#add-item-form .detail-step-down',function(){
        var cQty = parseInt($(this).siblings('input').val());
        var nQty = ((cQty - 1) == 0)?1:((cQty - 1));
        $(this).siblings('input').val(nQty);
    });

    $(document).on('click','#add-item-form .detail-step-up',function(){
        var cQty = parseInt($(this).siblings('input').val());
        var nQty = cQty + 1;
        $(this).siblings('input').val(nQty);
    });

    //rating
    var vote = $('p.vote span');
    vote.hover(function () {
        $(this).addClass('voteHover');
        $("p.vote span:lt(" + $(this).index() + ")").addClass('voteHover');
        $("p.vote span:gt(" + $(this).index() + ")").removeClass('voteHover');
    }, function () {
        $(this).removeClass('voteHover');
        $("p.vote span:lt(" + $(this).index() + ")").removeClass('voteHover');
        $("p.vote span:gt(" + $(this).index() + ")").removeClass('voteHover');
    });
    vote.click(function(){
        vote.removeClass('active voted');
        $(this).addClass('active voted');
        $("p.vote span:lt(" + $(this).index() + ")").addClass('active');
    });
    $('#comment').keyup(function(){
        $('#digitComment').html($('#comment').val().length + txtDigitComment);
    });
    $('#btnRate button.btnRed').click(function(e){
        e.preventDefault();
        var t = $(this);
        var comment = $('#comment'), submit = true;
        console.log(vote.hasClass('voted'));
        if(!vote.hasClass('voted')){
            submit = false;
            alert(msgStarRate);
            return;
        }else if(!comment.val()){
            submit = false;
            alert('Quý khách vui lòng bình luận cho sản phẩm (Tối thiểu 30 ký tự)');
            return;
        }else{
            if (submit) {
                submit= false;
                $.post(
                    '/rating/add?type=1',
                    {
                        itemId: t.attr('data-pid'),
                        point: $('.vote .voted').attr('data-rate'),
                        storeId: t.attr('data-storeId'),
                        title: msgRateProduct,
                        comment: $('#comment').val()
                    },
                    function (rs) {
                        if (rs.code == 1) {
                            submit = true;
                            alert(msgStarRate);
                            location.reload();

                        } else {
                            alert(rs.msg);
                        }
                    },
                    'json'
                );
            }
        }

    });


});
function checkInv() {
    var req = $('.req').length, attrs = {}, atc = $('#addToCart, .add-to-cartProduct,#buyNow'), qtt = $('#psQtt');
    if (req == 1) {
        if ($('.select-swap .color').length) {
            if ($('.select-swap .color a.active').length) {
                attrs[$('.color').attr('data-column')] = $('.select-swap .color a.active').attr('data-value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psId'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            $('.select-swap .color a.active').attr('data-price', rs.data.price);
                            qtt.attr('data-max', rs.data.available);
                            atc.attr('data-selId', rs.data.id).removeAttr('title').attr('data-ck', 1).removeClass('unsel');
                        } else {
                            atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
                        }
                    },
                    'json'
                );

            } else {
                $('.select-swap .color a').each(function () {
                    var t = $(this);
                    attrs[$('.select-swap .color').attr('data-column')] = t.attr('value');
                    $.post(
                        '/product/child?psId=' + atc.attr('data-psId'),
                        {'attrs': attrs},
                        function (rs) {
                            t.attr('data-selId', rs.data.id).attr('data-price', rs.data.price);
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
                                $('.size a.active').attr('data-price', rs.data.price);
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
                                    t.attr('data-qtt', rs.data.available).attr('data-selId', rs.data.id).attr('data-price', rs.data.price);
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
        var colorAt = $('.select-swap .color a.active'), sizeAt = $('.size a.active');
        if (colorAt.length && sizeAt.length) {
            attrs[$('.select-swap .color').attr('data-column')] = colorAt.attr('data-value');
            attrs[$('.size').attr('data-column')] = sizeAt.attr('data-value');
            $.post(
                '/product/child?psId=' + atc.attr('data-psid'),
                {'attrs': attrs},
                function (rs) {
                    if (rs.code == 1) {
                        if( rs.data.available > 0){
                            sizeAt.attr('data-price', rs.data.price);
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
            attrs[$('.select-swap .color').attr('data-column')] = colorAt.attr('value');
            $('.size a').each(function () {
                var t = $(this);
                attrs[$('.size').attr('data-column')] = t.attr('value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1) {
                            if( rs.data.available > 0){
                                t.attr('data-qtt', rs.data.available).attr('data-selId', rs.data.id).attr('data-price', rs.data.price);
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
            $('.select-swap .color a').each(function () {
                var t = $(this);
                attrs[$('.select-swap .color').attr('data-column')] = t.attr('value');
                $.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1) {
                            if( rs.data.available > 0){
                                t.attr('data-qtt', rs.data.available).attr('data-selId', rs.data.id).attr('data-price', rs.data.price);
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
/*ton kho theo attr*/
function getIvtDepots(attrs,t) {
    $.post(
        '/product/child?childId=' + t.attr('data-selId'),
        {'attrs': attrs},
        function (rs) {
            if (rs.code == 1 && rs.data.available > 0) {
                ajaxLoadView({
                    view: 'loadInventory&psId='+rs.data.id,
                    onSuccess: function (rs) {
                        $('.btn-showroom ul').html(rs);
                    }
                });
            }else {
                t.addClass('deactive').attr('title', msgOutofStock);
                $('.btn-showroom ul').html('<div class="alert alert-warning">Sản phẩm đã tạm hết hàng!</div>');
            }
        },
        'json'
    );
}
function getChildProductImages(id,src){
    /*---------------------------------------------------------------------Get All Img---*/
    /**
     * code: 1-get all; 2-get one
     * @type {Array}
     */
    var storeId = $('#psStoreId').val(),ps = [];
    ps.push({id: id, getSrcUri: true, code: 1, storeId: storeId});
    var listImg1 =  $('#sliderproduct');
    var listImg2 =  $('.product-gallery__thumbs');
    if (ps.length) {
        getallchildimg(ps, function (rs) {
            listImg1.empty();
            listImg2.empty();
            if (rs.images != "") {
                $.each(rs.images, function (vl) {
                    listImg1.append(
                        '<li class="product-gallery-item gallery-item"><img data-sizes="auto" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" class="lazyload product-image-feature" data-src="'+rs.images[vl]+'"/></li>'
                    );
                    listImg2.append(
                        '<div class="product-gallery__thumb test active"><a href="javascript:void(0);" data-image="'+rs.images[vl]+'" data-zoom-image="'+rs.images[vl]+'" class="product-gallery__thumb-placeholder"><img data-sizes="auto" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" class="lazyload" data-src="'+rs.images[vl]+'" data-image="'+rs.images[vl]+'"/></a></div>'
                    );
                });
            }else{
                listImg1.append(
                    '<li class="product-gallery-item gallery-item"><img data-sizes="auto" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" class="lazyload product-image-feature" data-src="'+src+'"/></li>'
                );
                listImg2.append(
                    '<div class="product-gallery__thumb test active"><a href="javascript:void(0);" data-image="'+src+'" data-zoom-image="'+src+'" class="product-gallery__thumb-placeholder"><img data-sizes="auto" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" class="lazyload" data-src="'+src+'" data-image="'+src+'"/></a></div>'
                );
            }
        });
    }
}