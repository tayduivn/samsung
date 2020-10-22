$(document).ready(function(){
    AppView.init();
    AppView.zoom();
    AppView.owl();
    AppView.media();
    AppView.inventory();
    AppView.eventCart();
});

var storeId = $('#storeId').val(),
    btnCart = $('#addCart'),
    btnBuyCart = $('.buyCart, .pdp-mod-sbutton'),
    $colorReq = $('.block-shipfee .color.req'),
    $colorA = $('.block-shipfee .color.req a'),
    $colorAt = $('.block-shipfee .color.req a.active'),
    $sizeReq = $('body .size.req'),
    $sizeA = $('body .size.req a'),
    $sizeAt = $('body .size.req a.active'),
    $imgScroll = $('.attrImages.owl-carousel'),
    $imgA = $('.attrImages a'),
    owlPicture = $('#attrCarousel');

var AppView = {
    init:function () {
        $("a[rel=fyb_group]").fancybox({
            'transitionIn'		: 'none',
            'transitionOut'		: 'none',
            'titlePosition' 	: 'over',
            'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
                return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
            }
        });
        $(".product-quatity aside .minus").on('click',function(){
            var $quatity = $('#quatity'), min = parseInt($quatity.attr('min')), val = parseInt($quatity.val());
            if (val > min) {
                $quatity.val(val-1);
            }
        });
        $(".product-quatity aside .plus").on('click',function(){
            var $quatity = $('#quatity'), max = parseInt($quatity.attr('max')), val = parseInt($quatity.val());
            if (val < max) {
                $quatity.val(val+1);
            }else{
                alert('Bạn chỉ có thể đặt tối đa '+max+' sản phẩm');
            }
        });

        // $('#districtId').change(function () {
        //     var pview_shipfee = $('#pview-shipFee');
        //     calculateShipFee({
        //         toCity: $('#cityId').val(),
        //         toDistrict: $(this).val(),
        //         totalMoney : $('#totalMoney').val(),
        //         products : $('#products').val(),
        //         onSuccess: function (rs) {
        //             if(rs.hasSupport){
        //                 pview_shipfee.html(rs.hasSupport);
        //                 return;
        //             }
        //             pview_shipfee.html($.number(rs.customerShipFee) + ' đ');
        //         }
        //     });
        // });
    },
    zoom:function () {
        $('#listImgZoom li.imageList').click(function () {
            $('.imgSlide').show();
            $('.videoHome').hide();
            AppView.pauseVideoYotube();
            $('#single_image').attr('href',$(this).attr('data-src'));
        });
        $('body #listImgZoom li.imageList img').on('click',function(){
            $('#single_image').attr('href',$(this).parents('.imageList').attr('data-src'));
        });
        $('.videoWrp li.video').click(function(){
            $('.imgSlide').hide();
            $('.videoHome').show();
        });
    },
    owl:function () {
        if ($("body #proSaleBar").length) {
            $("#proSaleBar").owlCarousel({
                autoPlay: true,
                autoplayTimeout: 2500,
                autoplayHoverPause: true,
                items:1,
                loop:true,
                lazyLoad:true,
                smartSpeed: 500,
                dotsSpeed: 500,
                dots:true,
                nav: false,
            });
        }
        if ($imgA.length) {
            owlPicture.owlCarousel({
                nav:false,
                dots:false,
                items:1,
                responsive:{
                    0:{
                        items:4
                    },
                    580:{
                        items:5,
                    },
                    768:{
                        items:6,
                    },
                    1200:{
                        items:6,
                    },
                    1366:{
                        items:6,
                    }
                }
            });
        }
        if($("body .relatedPrd ul.relatedWrp").length) {
            var owl2 = $(".relatedPrd ul.relatedWrp").owlCarousel({
                autoplay:false,
                autoplayTimeout:2500,
                autoplayHoverPause:true,
                loop:false,
                items:1,
                lazyLoad: true,
                responsive:{
                    479:{
                        items:2
                    },
                    768:{
                        items:3
                    },
                    960:{
                        items:4
                    },
                    1200:{
                        items:4,
                    }
                },
            });
        }
        $(".relatedPrd #next-hist").click(function(){
            owl2.trigger('owl.next');
        });
        $(".relatedPrd #prev-hist").click(function(){
            owl2.trigger('owl.prev');
        });
    },
    media:function () {
        if($(window).width() > 767){
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
            $('#listImgZoom').carouFredSel({
                width: '100%',
                items: 5,
                direction: "up",
                scroll: {
                    items: 1,
                    duration: 500,
                    onAfter: function (data) {
                        data.items.visible.first().find('img').addClass('cloudzoom-gallery-active');
                    }
                },
                auto: false,
                prev : {
                    button : "#prevSlideZ",
                    key : "left"
                },
                next : {
                    button : "#nextSlideZ",
                    key : "right"
                }
            });
            $('#listImgZoom li img').click(function(){
                var t = $(this),
                    src = $(this).attr('src');
                if (!t.hasClass('active')) {
                    $('#listImgZoom li img').removeClass('active');
                    if (t.parent('li').attr('data-src').length) {
                        $('div#zoomer img').attr('style', 'opacity:0.8');
                        setTimeout(function () {
                            $('div#zoomer img').attr('src', t.parent('li').attr('data-src')).attr('style', 'opacity:1');
                        }, 150);
                    }
                    t.addClass('active');
                }
            });
        }else{
            var $photo = $("body #mobileZoom");
            $photo.owlCarousel({
                autoPlay: true,
                autoplayTimeout: 2500,
                autoplayHoverPause: true,
                items:1,
                loop:false,
                lazyLoad:true,
                smartSpeed: 500,
                dotsSpeed: 500,
                dots:false,
                nav: true,
                navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            });
        }
    },
    eventCart:function () {
        $sizeA.on('click',function(){
            var t = $(this), qtt = $('#psQtt');
            if (!t.hasClass('active')) {
                $sizeA.removeClass('active');
                btnBuyCart.attr('title', 'Vui lòng chọn màu sắc, kích cỡ hoặc hình ảnh!').attr('ck', 0).addClass('unsel');
                if ($colorReq.length && !$colorAt.length) {
                    $sizeA.attr('title', 'Vui lòng chọn màu trước!');
                } else {
                    $('#single_image').attr('href',t.attr('data-src'));
                    if (t.attr('qtt')) {
                        btnBuyCart.removeClass('disable');
                        t.addClass('active');
                        qtt.attr('max',t.attr('qtt'));
                        btnBuyCart.attr('selId', t.attr('selId')).removeAttr('title data-original-title').attr('ck', 1).removeClass('unsel');
                    }else {
                        btnBuyCart.addClass('disable');
                    }
                    // reload price product
                    onLoadPrice(t.attr('data-name'),t.attr('data-code'),t.attr('data-price'),t.attr('data-priceOld'));
                    AppView.loadDepots(t.attr('qtt'),t.attr('selId'));
                }
            }
        });
        $colorA.click(function () {
            var t = $(this),  qtt = $('#psQtt'), attrs = {};
            if (!t.hasClass('active')) {
                $colorA.removeClass('active');
                btnBuyCart.attr('title', 'Vui lòng chọn màu sắc, kích cỡ hoặc hình ảnh!').attr('ck', 0).addClass('unsel').attr('data-original-title', 'Vui lòng chọn màu sắc, kích cỡ hoặc hình ảnh!');
                $('#quatity').val(1);
                if ($sizeA.length > 1) {
                    $sizeA.removeClass('active deactive').removeAttr('title');
                    t.addClass('active');
                    attrs[$colorReq.attr('column')] = t.attr('value');
                    $sizeA.each(function () {
                        var t = $(this);
                        attrs[$sizeReq.attr('column')] = t.attr('value');
                        $.post(
                            '/product/child?psId=' + $('#addToCart').attr('psid'),
                            {'attrs': attrs},
                            function (rs) {
                                if (rs.code == 1) {
                                    t.attr('qtt', rs.data.available).attr('selId', rs.data.id);
                                } else {
                                    t.addClass('deactive').attr('title',msgOutofStock).attr('data-original-title',msgOutofStock).removeAttr('qtt');
                                }
                            },
                            'json'
                        );
                    });
                } else {
                    $('#single_image').attr('href',t.attr('data-src'));

                    // item attribute image
                    var itemOwl = $('.attrImages a[data-code="'+t.attr('data-code')+'"]');
                    $imgA.removeClass('active selected');
                    itemOwl.addClass('selected');

                    if (t.attr('qtt')) {
                        btnBuyCart.removeClass('disable');
                        t.addClass('active');
                        btnBuyCart.attr('selId', t.attr('selId')).removeAttr('title data-original-title').attr('ck', 1).removeClass('unsel');
                        qtt.attr('max', t.attr('qtt'));

                        // Active thuộc tính hình ảnh tương ứng khi chọn màu
                        $imgA.removeClass('active');
                        itemOwl.addClass('active');
                        owlPicture.trigger('to.owl.carousel', itemOwl.attr('data-pos'));
                    }else{
                        btnBuyCart.addClass('disable');
                    }
                    // reload price product
                    onLoadPrice(t.attr('data-name'),t.attr('data-code'),t.attr('data-price'),t.attr('data-priceOld'));
                    AppView.loadDepots(t.attr('qtt'),t.attr('selId'));
                }
                $('.block-shipfee .dropdown .dropdown-toggle').html(t.html() + '<span class="caret"></span>');
                $('.block-shipfee .dropdown').removeClass('open');
            }

            // get list image child
            AppView.splitChildimg(t.attr('data-pids').split(','));
        });
        $imgA.click(function () {
            var $this = $(this), qtt = $('#psQtt'),  attrs = {};
            if (!$this.hasClass('active')) {
                $imgA.removeClass('active selected');
                $this.addClass('selected');
                btnBuyCart.attr('title', 'Vui lòng chọn màu sắc, kích cỡ hoặc hình ảnh!').attr('ck', 0).addClass('unsel');
                $('#single_image').attr('href',$this.attr('data-src'));

                if ($this.attr('qtt')) {
                    btnBuyCart.removeClass('disable');
                    $this.addClass('active');
                    qtt.attr('max',$this.attr('qtt'));
                    btnBuyCart.attr('selId', $this.attr('selId')).removeAttr('title data-original-title').attr('ck', 1).removeClass('unsel');
                }else{
                    btnBuyCart.addClass('disable');
                }
                // reload price product
                onLoadPrice($this.attr('data-name'),$this.attr('data-code'),$this.attr('data-price'),$this.attr('data-priceOld'));
                AppView.loadDepots($this.attr('qtt'),$this.attr('selId'));

                // Active màu tương ứng khi chọn thuộc tính hình ảnh
                $colorA.removeClass('active');
                var inItem = $('.color.req a[data-code="'+$this.attr('data-code')+'"]');
                inItem.addClass('active');
                $('.block-shipfee .dropdown .dropdown-toggle').html(inItem.html() + '<span class="caret"></span>');
                $('.block-shipfee .dropdown').removeClass('open');
            }

            // get list image child
            AppView.splitChildimg($(this).attr('data-pids').split(','));
        });

        btnBuyCart.click(function () {
            var $this = $(this), $qty = parseInt($('#quatity').val());
            if ($this.attr('ck') == 1) {
                var products = [], ps = {};
                ps['id'] = $this.attr('selId');
                ps['quantity'] = $qty;
                products.push(ps);
                addToCart(products, 1, function(rs){
                    if (rs.status == 1) {
                        $('.countcart').text('('+parseInt(rs.data.totalQuantities + $qty)+')');
                        if ($this.attr('id') == 'addCart' || $this.attr('id') == 'pdp-cart'){
                            var $item = $('#psId_'+$this.attr('selId'));
                            $('#alertFixed').html('<div class="alert alert-success fade in alert-dismissible clearfix" style="margin-top:18px;">\
                                        <a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>\
                                        <div class="alertFx"><div class="pull-left"><img src="'+$item.val()+'" alt="Images"></div>\
                                        <div class="pull-left"><div class="green">Đã thêm vào giỏ hàng thành công</div><strong>'+$item.attr('data-name')+'</strong><div><a href="/cart">Xem giỏ hàng <i class="fa fa-angle-double-right"></i></a></div></div>\
                                        <div class="pull-left"><i class="fa fa-check"></i></div></div></div>').fadeIn(100);
                            setTimeout(function () {
                                $('#alertFixed').fadeOut(300).empty();
                            },5000);
                        }else{
                            window.location.href = '/cart';
                        }
                    } else {
                        alert(rs.messages);
                    }
                });
            }else{
                var mss_alret = $('#mss_alret');
                mss_alret.html('Quý Khách vui lòng chọn màu sắc, kích thước sản phẩm để tiến hành đặt hàng!').show();

                var position = mss_alret.offset().top;
                if (window.innerWidth > 1200) {
                    jQuery('html, body').animate({scrollTop: parseInt(position) - 130}, 'slow');
                } else {
                    jQuery('html, body').animate({scrollTop: parseInt(position) - 180}, 'slow');
                }
                setTimeout(function () {
                    mss_alret.fadeOut(100).empty();
                }, 10000);
                return false;
            }
        });
    },
    inventory:function () {
        checkInv();

        /**
         * Tình huống sử dụng: khi dùng kiểu click vào màu[sản phẩm con] đi kèm sản phẩm ở
         * list sản phẩm => mà chuyển hướng tới CTSP có post kèm param column thì active attribute tương ứng
         * @param i6: Attribute Color
         * @param i2: Attribute Image
         * */
        var i6 = getUrlParameter($colorReq.attr('column')); // Active thuộc tính màu
        var i2 = getUrlParameter($imgScroll.attr('column')); // Active thuộc tính hình ảnh
        if (i6 || i2){
            $('.qvColorFilter').css({'pointer-events':'none', opacity:'.5'});
            setTimeout(function () {
                $('.qvColorFilter').removeAttr('style');
                var qtt = $('#psQtt'),  attrs = {};
                if (i6){
                    var t = $colorReq.find('a[value="'+i6+'"]');
                    if (!t.hasClass('active')) {
                        $colorA.removeClass('active');
                        btnBuyCart.attr('title', 'Vui lòng chọn màu sắc, kích cỡ hoặc hình ảnh!').attr('ck', 0).addClass('unsel').attr('data-original-title', 'Vui lòng chọn màu sắc, kích cỡ hoặc hình ảnh!');
                        if ($sizeA.length > 1) {
                            $sizeA.removeClass('active deactive');
                            t.addClass('active');
                            $sizeA.removeAttr('title');
                            attrs[$colorReq.attr('column')] = t.attr('value');
                            $sizeA.each(function () {
                                var t = $(this);
                                attrs[$sizeReq.attr('column')] = t.attr('value');
                                $.post(
                                    '/product/child?psId=' + $('#addToCart').attr('psid'),
                                    {'attrs': attrs},
                                    function (rs) {
                                        if (rs.code == 1) {
                                            t.attr('qtt', rs.data.available).attr('selId', rs.data.id);
                                        } else {
                                            t.addClass('deactive').attr('title',msgOutofStock).attr('data-original-title',msgOutofStock).removeAttr('qtt');
                                        }
                                    },
                                    'json'
                                );
                            });
                        }
                        else {
                            $('#z.cloudzoom').attr('src',t.attr('data-src'));
                            $('#single_image').attr('href',t.attr('data-src'));

                            if (t.attr('qtt')) {
                                t.addClass('active');

                                $('.block-shipfee .dropdown .dropdown-toggle').html(t.html() + '<span class="caret"></span>');
                                $('.block-shipfee .dropdown').removeClass('open');

                                btnBuyCart.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel').removeAttr('data-original-title');
                                qtt.attr('max', t.attr('qtt'));

                                // Active thuộc tính hình ảnh tương ứng khi chọn màu
                                $imgA.removeClass('active');
                                var itemOwl = $('.attrImages a[data-code="'+t.attr('data-code')+'"]');
                                itemOwl.addClass('active');
                                owlPicture.trigger('to.owl.carousel', itemOwl.attr('data-pos'));
                            }
                            AppView.loadDepots(t.attr('qtt'),t.attr('selId'));
                        }
                    }

                    // get list image child
                    AppView.splitChildimg(t.attr('data-pids').split(','));
                } else if(i2){
                    var t = $imgScroll.find('a[value="'+i2+'"]');
                    if (!t.hasClass('active')) {
                        $imgA.removeClass('active');
                        btnBuyCart.attr('title', 'Vui lòng chọn màu sắc, kích cỡ hoặc hình ảnh!').attr('ck', 0).addClass('unsel');
                        btnBuyCart.attr('data-original-title', 'Vui lòng chọn màu sắc, kích cỡ hoặc hình ảnh!');
                        $('#z.cloudzoom').attr('src',t.attr('data-src'));
                        $('#single_image').attr('href',t.attr('data-src'));
                        if (t.attr('qtt')) {
                            t.addClass('active');
                            btnBuyCart.attr('selId', t.attr('selId')).removeAttr('title').attr('ck', 1).removeClass('unsel');
                            btnBuyCart.removeAttr('data-original-title');
                            qtt.attr('max', t.attr('qtt'));

                            // Active màu tương ứng khi chọn thuộc tính hình ảnh
                            $colorA.removeClass('active');
                            var inItem = $('.color.req a[data-code="'+t.attr('data-code')+'"]');
                            inItem.addClass('active');
                            $('.block-shipfee .dropdown .dropdown-toggle').html(inItem.html() + '<span class="caret"></span>');
                            $('.block-shipfee .dropdown').removeClass('open');
                        }
                    }
                    AppView.loadDepots(t.attr('qtt'),t.attr('selId'));

                    // get list image child
                    AppView.splitChildimg(t.attr('data-pids').split(','));
                }
            },600);
        }
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
    splitChildimg:function (pIdsAttr) {
        var ps = [{id: pIdsAttr, code: 1, bothImageSrc:true, storeId: storeId}];
        if (ps.length) {
            getallchildimg(ps, function (rs) {
                if (rs.images) {
                    $('#fancyboximage').empty();
                    if($(window).width() > 767) {
                        var listZoom = $('body #listImgZoom'); listZoom.empty();
                        $.each(rs.images, function (vl) {
                            var $item = rs.images[vl];
                            listZoom.append('<li class="imageList" data-src="' + $item.srcUri + '"><img class="cloudzoom-gallery" src="'+ $item.thumbnailUri +'"></li>');
                            $('#fancyboximage').append('<a href="'+$item.srcUri+'" rel="fyb_group" class="hide"></a>');
                        });

                        listZoom.carouFredSel({
                            width: '100%',
                            items: 5,
                            direction: "up",
                            scroll: {
                                items: 1,
                                duration: 500,
                                onAfter: function (data) {
                                    data.items.visible.first().find('img').addClass('cloudzoom-gallery-active');
                                }
                            },
                            auto: false,
                            prev : {
                                button : "#prevSlideZ",
                                key : "left"
                            },
                            next : {
                                button : "#nextSlideZ",
                                key : "right"
                            }
                        });
                        listZoom.on('click','li img',function(){
                            var t = $(this), src = $(this).attr('src');
                            if (!t.hasClass('active')) {
                                $('#listImgZoom li img').removeClass('active');
                                if (t.parent('li').attr('data-src').length) {
                                    $('div#zoomer img').attr('style', 'opacity:0.8');
                                    setTimeout(function () {
                                        $('div#zoomer img').attr('src', t.parent('li').attr('data-src')).attr('style', 'opacity:1');
                                    }, 150);
                                }
                                t.addClass('active');
                            }
                        });
                    }
                    else {
                        var $photo = $("body #mobileZoom");
                        $photo.empty();
                        $.each(rs.images, function (vl) {
                            var $item = rs.images[vl];
                            $photo.append('<li data-src="' + $item.srcUri + '"><img class="cloudzoom-gallery" src="'+ $item.srcUri +'"  alt="alt"></li>');
                            $('#fancyboximage').append('<a href="'+$item.srcUri+'" rel="fyb_group" class="hide"></a>');
                        });
                        $photo.owlCarousel('destroy');
                        $photo.owlCarousel({
                            autoPlay: true,
                            autoplayTimeout: 2500,
                            autoplayHoverPause: true,
                            items:1,
                            loop:false,
                            lazyLoad:true,
                            smartSpeed: 500,
                            dotsSpeed: 500,
                            dots:false,
                            nav: true,
                            navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                        });
                    }
                    $('body .caroufredsel_wrapper').on('click','#listImgZoom li.imageList',function(){
                        $('.imgSlide').show();
                        $('.videoHome').hide();
                        AppView.pauseVideoYotube();
                        $('#single_image').attr('href',$(this).attr('data-src'));
                    });
                    if (rs.images.length) {
                        $('.imageWrapper>a>img#z').attr('src',rs.images[0].srcUri)
                    }

                }
            });

        }
    },
    pauseVideoYotube:function () {
        if ($('#popup-youtube-player').length) {
            $('#popup-youtube-player')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        }
    },
};

function checkInv() {
    // TH SP có thuộc tính là hình ảnh
    var req = $('.req').length, qtt = $('#psQtt'), imgsAct = $('.attrImages a.active'),
        attrs = {};
    /*  if ($imgScroll.length) {
          var attrs = {};
          if (imgsAct.length) {
              attrs[$imgScroll.attr('column')] = imgsAct.attr('value');
              $.post('/product/child?psId=' + btnCart.attr('psid'),
                  {'attrs': attrs},
                  function (rs) {
                      if (rs.code == 1 && rs.data.available > 0) {
                          imgsAct.attr('qtt', rs.data.available).attr('selId', rs.data.id);
                          imgsAct.attr('data-price', rs.data.price).attr('data-priceOld', rs.data.oldPrice).attr('data-code', rs.data.code).attr('data-name', rs.data.name);
                          qtt.attr('max', rs.data.available);
                          btnBuyCart.attr('selId', rs.data.id).removeAttr('title data-original-title').attr('ck', 1).removeClass('unsel');
                      } else {
                          btnBuyCart.attr('title',msgOutofStock).attr('data-original-title',msgOutofStock);
                      }
                  },
                  'json'
              );
          }
          else {
              $('.attrImages a.i2').each(function () {
                  var t = $(this);
                  attrs[$imgScroll.attr('column')] = t.attr('value');
                  $.post('/product/child?psId=' + btnCart.attr('psid'),
                      {'attrs': attrs},
                      function (rs) {
                          if (rs.code == 1 && rs.data.available > 0) {
                              t.attr('qtt', rs.data.available).attr('selId', rs.data.id);
                              t.attr('data-price', rs.data.price).attr('data-priceOld', rs.data.oldPrice).attr('data-code', rs.data.code).attr('data-name', rs.data.name);
                          } else {
                              t.addClass('deactive').attr('title',msgOutofStock).attr('data-original-title',msgOutofStock);
                          }
                      },
                      'json'
                  );
              });
          }
      }*/
    if (req == 1) {
        if ($colorReq.length) {
            if ($colorAt.length) {
                attrs[$colorReq.attr('column')] = $colorAt.attr('value');
                $.post('/product/child?psId=' + btnCart.attr('psid'), {'attrs': attrs},
                    function (rs) {
                        var  letImg =  $('.attrImages a.i2[value="'+$colorAt.attr('value')+'"]');

                        if (rs.code == 1 && rs.data.available > 0) {
                            // check tồn thuộc tính hình ảnh
                            letImg.attr('qtt', rs.data.available).attr('selId', rs.data.id);
                            letImg.attr('data-price', rs.data.price).attr('data-priceOld', rs.data.oldPrice).attr('data-code', rs.data.code).attr('data-name', rs.data.name);

                            qtt.attr('max', rs.data.available);
                            btnBuyCart.attr('selId', rs.data.id).removeAttr('title data-original-title').attr('ck', 1).removeClass('unsel');

                            $colorAt.attr('qtt', rs.data.available).attr('selId', rs.data.id);
                            $colorAt.attr('data-price', rs.data.price).attr('data-priceOld', rs.data.oldPrice).attr('data-code', rs.data.code).attr('data-name', rs.data.name);
                            $colorAt.parent().addClass('hasQtt');

                            /*=================== Active Hình ảnh theo màu & load ảnh zoom thumb =========================*/
                            var itemfrs = $('.dropdown-menu.color li:first-child a');
                            itemfrs.addClass('active');
                            $('.btnDropdown').empty().append(itemfrs.html());
                            btnBuyCart.attr('selId', itemfrs.attr('selId')).removeAttr('title data-original-title').attr('ck', 1).removeClass('unsel');
                            $('#psQtt').attr('max', itemfrs.attr('qtt'));
                            $('#single_image').attr('href', itemfrs.attr('data-src'));

                            // reload price product
                            onLoadPrice(itemfrs.attr('data-name'),itemfrs.attr('data-code'),itemfrs.attr('data-price'),itemfrs.attr('data-oldPrice'));

                            // Active thuộc tính hình ảnh tương ứng khi chọn màu
                            $imgA.removeClass('active');
                            var itemOwl = $('.attrImages a[data-code="' + itemfrs.attr('data-code') + '"]');
                            itemOwl.addClass('active');
                            owlPicture.trigger('to.owl.carousel', itemOwl.attr('data-pos'));

                            // Get the element with id="defaultOpen" and click on it
                            document.getElementById(itemfrs.attr('id')).click();

                            AppView.splitChildimg(itemfrs.attr('data-pids').split(','));
                            /*=================== End Active Hình ảnh theo màu & load ảnh zoom thumb =========================*/
                        } else {
                            // check tồn thuộc tính hình ảnh
                            letImg.addClass('deactive').attr('title',msgOutofStock).attr('data-original-title',msgOutofStock);
                            btnBuyCart.attr('title',msgOutofStock).attr('data-original-title',msgOutofStock);
                        }
                    },
                    'json'
                );
            } else {
                var rt = 0, stopFist = false;
                $colorA.each(function () {
                    rt ++;
                    var t = $(this);
                    attrs[$colorReq.attr('column')] = t.attr('value');
                    $.ajax({
                        url: '/product/child?psId=' + btnCart.attr('psid'),
                        async: false,
                        type: 'POST',
                        dataType: 'json',
                        data: {'attrs': attrs},
                        success: function (rs) {
                            var  letImg =  $('.attrImages a.i2[value="'+t.attr('value')+'"]');
                            if (rs.code == 1){
                                letImg.attr('data-code', rs.data.code);
                                letImg.attr('data-price', rs.data.price).attr('data-priceOld', rs.data.oldPrice).attr('data-name', rs.data.name);
                                t.attr('data-code', rs.data.code);
                                t.attr('data-price', rs.data.price).attr('data-priceOld', rs.data.oldPrice).attr('data-name', rs.data.name);
                            }
                            if (rs.code == 1 && rs.data.available > 0) {
                                // check tồn thuộc tính hình ảnh
                                letImg.attr('qtt', rs.data.available).attr('selId', rs.data.id);
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id);
                                t.parent().addClass('hasQtt');

                                if (stopFist == false) {
                                    /*=================== Active Hình ảnh theo màu & load ảnh zoom thumb =========================*/
                                    stopFist = true;
                                    //var itemfrs = $('.dropdown-menu.color li:first-child a');
                                    var itemfrs = t;
                                    itemfrs.addClass('active');
                                    $('.btnDropdown').empty().append(itemfrs.html());
                                    btnBuyCart.attr('selId', itemfrs.attr('selId')).removeAttr('title data-original-title').attr('ck', 1).removeClass('unsel');
                                    $('#psQtt').attr('max', itemfrs.attr('qtt'));
                                    $('#single_image').attr('href', itemfrs.attr('data-src'));

                                    // reload price product
                                    onLoadPrice(itemfrs.attr('data-name'),itemfrs.attr('data-code'),itemfrs.attr('data-price'),itemfrs.attr('data-oldPrice'));

                                    // Active thuộc tính hình ảnh tương ứng khi chọn màu
                                    $imgA.removeClass('active');
                                    var itemOwl = $('.attrImages a[data-code="' + itemfrs.attr('data-code') + '"]');
                                    itemOwl.addClass('active');

                                    owlPicture.trigger('to.owl.carousel', itemOwl.attr('data-pos'));
                                    document.getElementById(itemfrs.attr('id')).click();
                                    AppView.splitChildimg(itemfrs.attr('data-pids').split(','));
                                    /*=================== End Active Hình ảnh theo màu & load ảnh zoom thumb =========================*/
                                }
                            } else {
                                // check tồn thuộc tính hình ảnh
                                letImg.addClass('deactive').attr('title',msgOutofStock).attr('data-original-title',msgOutofStock);
                                //t.parent().remove();
                                t.addClass('deactive').attr('title',msgOutofStock).attr('data-original-title',msgOutofStock);
                            }
                        }
                    });
                });
            }
        } else if ($sizeReq.length) {
            if ($sizeAt.length) {
                attrs[$sizeReq.attr('column')] = $sizeAt.attr('value');
                $.post('/product/child?psId=' + btnCart.attr('psid'), {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            qtt.attr('max', rs.data.available);
                            btnBuyCart.attr('selId', rs.data.id).removeAttr('title data-original-title').attr('ck', 1).removeClass('unsel');
                        } else {
                            btnBuyCart.attr('title',msgOutofStock).attr('data-original-title',msgOutofStock);
                        }
                        // reload price product
                        onLoadPrice(rs.data.name, rs.data.code,rs.data.price, rs.data.oldPrice);
                    },
                    'json'
                );
            } else {
                $sizeA.each(function () {
                    var t = $(this);
                    attrs[$sizeReq.attr('column')] = t.attr('value');
                    $.post('/product/child?psId=' + btnCart.attr('psid'), {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1) {
                                t.attr('data-price', rs.data.price).attr('data-priceOld', rs.data.oldPrice).attr('data-code', rs.data.code).attr('data-name', rs.data.name);
                            }
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id);
                            } else {
                                t.addClass('deactive').attr('title',msgOutofStock).attr('data-original-title',msgOutofStock);
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
        if ($colorAt.length && $sizeAt.length) {
            attrs[$colorReq.attr('column')] = $colorAt.attr('value');
            attrs[$sizeReq.attr('column')] = $sizeAt.attr('value');
            $.post('/product/child?psId=' + btnCart.attr('psid'), {'attrs': attrs},
                function (rs) {
                    if (rs.code == 1 && rs.data.available > 0) {
                        qtt.attr('max', rs.data.available);
                        btnBuyCart.attr('selId', rs.data.id).removeAttr('title data-original-title').attr('ck', 1).removeClass('unsel');
                    } else {
                        btnBuyCart.attr('title',msgOutofStock).attr('data-original-title',msgOutofStock);
                    }
                    // reload price product
                    onLoadPrice(rs.data.name, rs.data.code,rs.data.price, rs.data.oldPrice);
                },
                'json'
            );
            return false;
        }
        if ($colorAt.length && !$sizeAt.length) {
            attrs[$colorReq.attr('column')] = $colorAt.attr('value');
            $('.size a').each(function () {
                var t = $(this);
                attrs[$sizeReq.attr('column')] = t.attr('value');
                $.post('/product/child?psId=' + btnCart.attr('psid'), {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1) {
                            t.attr('data-price', rs.data.price).attr('data-priceOld', rs.data.oldPrice).attr('data-code', rs.data.code).attr('data-name', rs.data.name);
                        }
                        if (rs.code == 1 && rs.data.available > 0) {
                            t.attr('qtt', rs.data.available).attr('selId', rs.data.id);
                        } else {
                            t.parent().addClass('deactive');
                            t.addClass('deactive').attr('title',msgOutofStock).attr('data-original-title',msgOutofStock);
                        }
                    },
                    'json'
                );
            });
            return false;
        }
        if (!$colorAt.length && $sizeAt.length) {
            attrs[$sizeReq.attr('column')] = $sizeAt.attr('value');
            $colorA.each(function () {
                var t = $(this);
                attrs[$colorReq.attr('column')] = t.attr('value');
                $.post('/product/child?psId=' + btnCart.attr('psid'), {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1) {
                            t.attr('data-price', rs.data.price).attr('data-priceOld', rs.data.oldPrice).attr('data-code', rs.data.code).attr('data-name', rs.data.name);
                        }
                        if (rs.code == 1 && rs.data.available > 0) {
                            t.attr('qtt', rs.data.available).attr('selId', rs.data.id);
                        } else {
                            t.addClass('deactive').attr('title',msgOutofStock).attr('data-original-title',msgOutofStock);
                        }
                    },
                    'json'
                );
            });
            return false;
        }
    }
}
function onLoadPrice(name,code,price,old) {
    var n = $('#proViewInfo .viewH1'),
        c = $('.breadcrumView .msp span[itemprop="name"]'),
        p = $('#proViewInfo .detailsLeft .specialPrice'),
        o = $('#proViewInfo .detailsLeft .salePrice');

    //$('#proViewInfo .detailsLeft .saveMoney').hide();
    if (name){
        //n.html(name);
    }else{
        //  n.html('');
    }

    if (code){
        c.html('MSP: '+code);
    }else{
        c.html('');
    }

    if (old > 0){
        if (!o.length){
            //  $('.detailsLeft .price').append('<span class="salePrice">'+$.number(old)+'đ</span>');
        }else{
            // o.html($.number(old)+'đ');
        }
    }else{
        //  o.html('');
    }

    if (price > 0){
        // p.html($.number(price)+'đ');
    }else{
        //  p.html('Liên hệ');
    }
}
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};