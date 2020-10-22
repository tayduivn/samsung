var storeId = $('#psStoreId').val();
//---- đóng mở box ngôn ngữ ----
$(document).on('click','.language .toggle',function () {
    $(this).siblings('ul').slideToggle('fast');
    $(this).parents('.language').toggleClass('is-active')
});

$(document).ready(function(){

    if(in_array(storeId,[36080,66])){
        var popupBanner = $('#popup-banner'), contactFormSubmit = $("#contact-form-submit"),
            emailPopup = $("#email-popup") ,modalDialog = $('#popup-banner .modal-dialog');
        if(popupBanner.length){
            setTimeout(function () {
                popupBanner.modal('show');
            }, 5000);
        }
        contactFormSubmit.click(function (e) {
            e.preventDefault();
            if(emailPopup.val() != ""){
                $.post("/newsletter/subscribe",{
                    mail: emailPopup.val()
                }, function (rs){
                    if(rs.code == 1){
                        modalDialog.html('<div class="modal-content"\n' +
                            'style="background-image: url(/tpl/T0295/img/popupArtboard-2.png)">\n' +
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                            '     <span aria-hidden="true">&times;</span>\n' +
                            '</button>\n' +
                            '</div>');
                    }else{
                        alert(rs.message);
                    }

                });
            }else{
                alert('Email không đươc để trống!');

            }

            $('.btnSubscribe').click(function (e) {
                e.preventDefault();
                $.post('/newsletter/subscribe', {'mail': $('#inpSubscribe').val(), 'gender': $(this).attr('data-gender')},
                    function (rs) {
                        if (rs.code) {
                            $('#inpSubscribe').val('');
                        }
                        alert(rs.message);
                    }
                );
            });
        });
    }

    $('.btn-filter').click(function () {
        $(".pro-filter").addClass("active");
        $('.btn-filter').addClass("hidden");
        $('.close-filter').removeClass("hidden");
    });
    $('.close-filter').click(function () {
        $(".pro-filter").removeClass("active");
        $('.close-filter').addClass("hidden");
        $('.btn-filter').removeClass("hidden");
    });

    $('.menu-collection .icon-subnav').on('click',function () {
        $(this).next().slideToggle();
        $(this).toggleClass('active_chir_mb');
    });
    /* đổi ảnh */
    $('.swap_color').click(function () {
        var swap_color=$(this).attr('data-psId');
        var img_thumb=$(this).attr('data-src');
        $(this).parents(".product-block").find(".product-img picture img").attr('src',img_thumb,swap_color);
        $(this).parents(".product-block").find(".product-img source").attr('srcset',img_thumb,swap_color);
    });


    if (in_array(storeId,[64529, 24031])){
        window.onload = function() {
            document.addEventListener("contextmenu", function(e) {
                e.preventDefault();
            }, false);
            document.addEventListener("keydown", function(e) {
                //document.onkeydown = function(e) {
                // "I" key
                if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
                    disabledEvent(e);
                }
                // "J" key
                if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
                    disabledEvent(e);
                }
                // "S" key + macOS
                if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                    disabledEvent(e);
                }
                // "U" key
                if (e.ctrlKey && e.keyCode == 85) {
                    disabledEvent(e);
                }
                // "F12" key
                if (event.keyCode == 123) {
                    disabledEvent(e);
                }
            }, false);

            function disabledEvent(e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                } else if (window.event) {
                    window.event.cancelBubble = true;
                }
                e.preventDefault();
                return false;
            }
        };
    }

    //- - - - loadview nội dung 10 đơn hàng gần nhất - - -
    if ($('#load-newest-order').length) {
        setTimeout(function () {
            ajaxLoadView({
                view: 'newestOrder',
                onSuccess: function (rs) {
                    $('#load-newest-order').html(rs)
                }
            });
        }, 200)
    }

    // icon Footer
    $('a.btn-fter').click(function(e){
        if ( $(this).attr('aria-expanded') == 'false' ) {
            e.preventDefault();
            $(this).attr('aria-expanded','true');
            $('.main-footer').addClass('bg-active');
        } else {
            $(this).attr('aria-expanded','false');
            $('.main-footer').removeClass('bg-active');
        }
    });
    // Mainmenu sidebar
    $(document).on("click", "span.icon-subnav", function(){
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
            $(this).siblings('ul').slideUp();
        } else {
            if( $(this).parent().hasClass("level0") || $(this).parent().hasClass("level1")){
                $(this).parent().siblings().find("ul").slideUp();
                $(this).parent().siblings().removeClass("active");
            }
            $(this).parent().addClass('active');
            $(this).siblings('ul').slideDown();
        }
    });
    $(document).on("click", "i.fas.fa-chevron-down", function(){
        if ($(this).parent().parent().hasClass('active')) {
            $(this).parent().parent().removeClass('active');
            $(this).siblings('ul').slideUp();
        } else {
            if( $(this).parent().parent().hasClass("third") || $(this).parent().parent().hasClass("four")){
                $(this).parent().parent().siblings().find("ul").slideUp();
                $(this).parent().parent().siblings().removeClass("active");
            }
            $(this).parent().parent().addClass('active');
            $(this).siblings('ul').slideDown();
        }
    });
    /* đổi ảnh */


    $(window).scroll(function() {
        if ($(window).width() < 768) {
            /* scroll header */
            var scroll = $(window).scrollTop();
            if (scroll < 320) {
                $(".main-header").removeClass("scroll-menu");
            } else {
                $(".main-header").addClass("scroll-menu");
            }
        }
    });
    //Click event to scroll to top
    $(document).on("click", ".back-to-top, .scrollup", function(){
        $(this).removeClass('show');
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });
    $(window).scroll(function() {
        if ( $('.back-to-top').length > 0 && $(window).scrollTop() > 500 ) {
            $('.back-to-top').addClass('show');
        } else {
            $('.back-to-top').removeClass('show');
        }
    });
    $('a[data-spy=scroll]').click(function(){
        event.preventDefault() ;
        $('body').animate({scrollTop: ($($(this).attr('href')).offset().top - 20) + 'px'}, 500);
    });
    // View more description product
    if ($('.description-productdetail').length > 0) {
        if ($('.description-productdetail').height() > 350 ) {
            $('.description-productdetail').css('height','350');
            //	$('.view-more-detail').addClass('close-desc');
        } else {
            $('.view-more-detail').addClass('hidden');
        }
    }
    $(document).on("click", ".view-more-detail", function(){
        if ($(this).hasClass('close-desc')) {
            $('.description-productdetail').css('height','350');
            $('.view-more-detail').removeClass('close-desc');
            $('.view-more-detail a').text('+ Đọc thêm');
        }
        else {
            $('.description-productdetail').removeAttr('style');
            $('.view-more-detail').addClass('close-desc');
            $('.view-more-detail a').text('- Rút gọn')
        }
    });

    $(window).on("scroll", function() {
        /* Process scroll header top  */
        if ($(window).width() >= 768) {
            if( $(window).scrollTop() > 0 ) {
                $('.main-header').addClass('affix-mobile');
                if(in_array(storeId,[10179,34285])){
                    $('.wrap-logo').css('display','block');
                }
            }	else {
                $('.main-header').removeClass('affix-mobile');
                if(in_array(storeId,[10179,34285])) {
                    $('.wrap-logo').css('display', 'none');
                }
            }
        }

        if ($(window).width() >= 768 && $('.ldp-blackfriday .section-group-link').length > 0){
            if(!window.black_neo){
                var positionMenu = $('.ldp-blackfriday .section-group-link').offset().top;
                window.black_neo = positionMenu - 30;
            }
            if( $(window).scrollTop() > window.black_neo ) {
                $('.ldp-blackfriday .section-group-link').addClass('affix-mobile-2');
            }	else {
                $('.ldp-blackfriday .section-group-link').removeClass('affix-mobile-2');
            }
        }
    });
    var ps = [];
    $('.productItems').each(function () {
        ps.push({id:parseInt($(this).attr('data-id')),code:2,storeId: storeId});
    });
    if (ps.length) {
        getallchildimg(ps, function (rs) {
            if (rs.allImages != "") {
                $('.hover').empty();
                $.each(rs.images, function (key, vl) {
                    // $('.productItems .productHover'+key).attr('src',vl);
                    $('.productItems .productHover'+key).append('<source class="imgChilds" media="(max-width: 767px)" srcset="'+vl+'">').append('<source class="imgChilds" media="(max-width: 767px)" srcset="'+vl+'">').append('<img class="img-loop img-hover lazyload" src="/img/lazyLoading.gif" data-src="'+vl+'">');
                });
            }
        });
    }

    $('.quick-view').click(function (e) {
        e.preventDefault();
        quickview($(this).attr('data-id'));
    });
    $(".fancybox-album").fancybox({
        fitToView: false, closeBtn: false, padding: 0
    });
    $('#contactFormSubmit').click(function (e) {
        e.preventDefault();
        $.post('/newsletter/subscribe', {'mail': $('#contactFormEmail').val()},
            function (rs) {
                if (rs.code) {
                    $('#contactFormEmail').val('');
                }
                alert(rs.message);
            }
        );
    });
    if (in_array(storeId,[63704, 11503])){
        $('#contactFormSubmit-popup').click(function (e) {
            e.preventDefault();
            $.post('/newsletter/subscribe', {
                mail: $('#contactFormEmail-popup').val(),
                name:$('#contactFormName-popup').val(),
                mobile:$('#contactFormPhone-popup').val(),
            },
            function (rs) {
                if (rs.code == 1) {
                    $('#contactFormEmail-popup').val('');
                    parent.jQuery.fancybox.close();
                }
                alert(rs.message);
            });
        });
    }


    $('.flytocart').click(function () {
        var t = $(this);
        if (t.attr('data-buy') == 1) {
            var products = [], ps = {id: $(this).attr('data-psId'), quantity: 1};
            products.push(ps);
            addToCart(products, 1, function (rs) {
                if (rs.status == 1) {
                    console.log(rs);
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
            var imgtodrag = $(this).parents(".pro-loop").find(".product-img img");
            var cart = $('#site-cart-handle .cart-menu');
            if (imgtodrag) {
                var imgclone = imgtodrag.clone()
                    .offset({
                        top: imgtodrag.offset().top,
                        left: imgtodrag.offset().left
                    })
                    .css({
                        'position': 'absolute',
                        'height': '150px',
                        'width': '150px',
                        'z-index': '99999'
                    })
                    .appendTo($('body'))
                    .animate({
                        'top': cart.offset().top + 10,
                        'left': cart.offset().left + 30,
                        'width': 75,
                        'height': 75
                    }, 500, 'easeOutSine');
                imgclone.animate({
                    'width': 0,
                    'height': 0
                }, function () {
                    $(this).detach()
                });
            }
        }

    });

    if ($('.auto-paginator').length) {
        var isLoadPage = 1;
        if(in_array(storeId,[9570,21359, 21504])){
            var next = parseInt($('input.data-page-next').val()),
                max = parseInt($('input.data-page-last').val()),
                href = addFilter('page', $('input.data-page-next').val(), 3);
            if(next > 1){
                $('.loadMoreProduct.loading').click(function(){
                    console.log('next ' + next);
                    console.log('max ' + max);
                    console.log('isLoadPage ' + isLoadPage);

                    next = parseInt($('input.data-page-next').val()),
                    href = addFilter('page', $('input.data-page-next').val(), 3);

                    if (next <= max && next > isLoadPage) {
                        isLoadPage = next;
                        $('.loadMoreProduct.loading').hide();
                        $.post(href, { template: 'home/loadview/category', terminal: true, loadview: 'default' },
                            function (rs) {
                                if (rs) {
                                    $('.appendResultProduct').append(rs);
                                    $('.data-page-next').val(1 + next);
                                    if ((1+next) <= max) {
                                        $('.loadMoreProduct.loading').show();
                                    }
                                }
                            }
                        );
                    }
                });
            }else{
                $('.loadMoreProduct.loading').hide();
            }
        }else {$(window).scroll(function () {
            if ($(window).width() <= 991) {
                var toHeight = (($(document).height() - $(window).height())/(1.5));
            } else {
                var toHeight = $(document).height() - $(window).height() - 500;
            }
            if  ($(window).scrollTop() >= toHeight){
                var next = parseInt($('input.data-page-next').val()),
                    max = parseInt($('input.data-page-last').val()),
                    href = addFilter('page', $('input.data-page-next').val(), 3);
                //console.log('next = '+next + ' -- isLoadPage = '+isLoadPage);

                if (next <= max && next > isLoadPage) {
                    isLoadPage = next;
                    $('.loadMoreProduct.loading').show();
                    $.post(href, { template: 'home/loadview/category', terminal: true, loadview: 'default' },
                        function (rs) {
                            if (rs) {
                                $('.appendResultProduct').append(rs);
                                $('.data-page-next').val(1 + next);
                                $('.loadMoreProduct.loading').hide();
                            }
                        }
                    );
                }
            }
        })}

    }
    $(".send_contact").on('click', function() {
        $.post(
            '/contact/contacts',
            {
                'content' : $('.content_register').val(),
                'name' : $('.name_register').val(),
                'email' : $('.email_register').val(),
                'mobile' : $('.mobile_register').val(),
                'address' : $('.address_register').val()
            },
            function(rs){
                if (rs.code == 1) {
                    alert(rs.message);
                    location.reload();
                } else {
                    alert(rs.message);
                }
            }
        );
    });

    $(document).on('click','.tree-menu .tree-menu-lv1',function(){
        $this = $(this).find('.tree-menu-sub');
        $('.tree-menu .has-child .tree-menu-sub').not($this).slideUp('fast');
        $(this).find('.tree-menu-sub').slideToggle('fast');
        $(this).toggleClass('menu-collapsed');
        $(this).toggleClass('menu-uncollapsed');
        var $this1 = $(this);
        $('.tree-menu .has-child').not($this1).removeClass('menu-uncollapsed').addClass('menu-collapsed');
    });

    var ps = [];
    $('.product-ivt').each(function () {
        var t = $(this);
        ps.push({storeId: t.attr('data-storeId'), id: t.attr('data-id')});
    });
    InventoryLoad(ps);

});
function quickview(id) {
    $.post('/product/q' + id,
        function (rs) {
            $.fancybox({
                content: rs, padding: [10, 10, 10, 10], fitToView: false, wrapCSS: 'fancybox-qv',
                helpers: { overlay: { css: { 'background': 'rgba(158, 158, 158, 0.5)' } } },
                afterShow: function () {
                    if($('#p-sliderproduct ul').length){
                        $('#p-sliderproduct ul').owlCarousel({
                            items : 4, //10 items above 1000px browser width
                            loop:false,
                            dots: false,
                            margin: 5,
                            nav: true,
                            autoplay:true,
                            smartSpeed: 1000,
                            autoplayTimeout:5000,
                            autoplayHoverPause:true,
                            responsive:{
                                0:{
                                    items:1,
                                    nav:false
                                },
                                768:{
                                    items:2,
                                    nav:false
                                },
                                1000:{
                                    items:4,
                                    nav:false,
                                }
                            },
                            navText : ["<i class='fal fa-arrow-left'></i>","<i class='fal fa-arrow-right'></i>"]
                        });
                    }
                    $.getScript('/tpl/T0295/js/quickview.js?6');
                },
            });
        }
    );
}

var outStock='HẾT HÀNG';
if(in_array(storeId,[14122,224])){
    outStock='HÀNG ĐANG VỀ';
}
function InventoryLoad(ps) {
    if (ps.length) {
        checkInventory(ps, function (rs) {
            if (rs.inventories != "") {
                $.each(rs.inventories, function (key, vl) {
                    if (vl <= 0) {
                        if(in_array(storeId,[71788,11055])){
                            $('[data-product-id=' + key + ']').parent('.product-resize').find('.icon_res1').addClass('out-of-stock').html('đang restock');
                        }else {
                            $('[data-product-id=' + key + '] a').addClass('out-of-stock').append('<span class="title-cart">' + outStock + '</span>');
                            // $('#' + key).hide()
                        }
                    }
                });
            }
        });
    }

}