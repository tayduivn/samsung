const CLASS = {
    visible: 'visible',
    fixed_top: 'fixed-top',
    d_none: 'd-none',
    invisible: 'invisible',
    show: 'show',
    ovl_hidden: 'ovl-hidden',
    fixed: 'fixed',
    active: 'active',
}
const CLASSHEADER = {
    visible : 'visible',
    fixed_top: 'fixed-top',
    d_none:'d-none',
    invisible: 'invisible',

}
const CLASSMAIN = {
    _mobile: 'is-mobile',
    _tablet: 'is-tablet',
    _desktop: 'is-desktop',
    _portrait: 'is-portrait',
    _landscape: 'is-landscape',

    _active: 'is-active',
    _disable: 'is-disable',
}
$(function() {
    // banner popup
    if (getCookie('popupCookie') != 'closed') {
        $('.content__banner--popup').css("display", "flex").hide().fadeIn();
    }
    $('.btn-closed').click(function() {
        $('.content__banner--popup').fadeOut();
        setCookie('popupCookie', 'closed', .00069444444);
    });
    // end
    //====close shopping-cart-ajax====
    $('.close-shopping-cart-ajax,.layer-shopping-cart-live').click(function () {
        $('.shopping-cart-ajax').removeClass(CLASS.show);
        $('.layer-shopping-cart-live').removeClass(CLASS.show);
        $('main, header, footer').removeClass('push-shopping-cart');
        $('body').removeClass(CLASS.ovl_hidden);
        $('html').removeClass(CLASS.ovl_hidden);
    });
    //====end close shopping-cart-ajax====

    // ====toggle class for feild search====
    $('.show-input-search').click(function() {
        /* Act on the event */
        $('.main-menu').toggleClass(CLASSHEADER.d_none);
        $('.img-logo-main').toggleClass(CLASSHEADER.d_none);
        $('.acount').toggleClass(CLASSHEADER.d_none);
        $('.block-search-scroll-menu').toggleClass('opacity-off');
    });

    //====button menu mobile====
    $('.button-menu-mobile').click(function () {
        $('.menuleft-mobile').toggleClass(CLASS.show);
        $('.block-menu-left').toggleClass(CLASS.show);
        $('.block-menu-right').toggleClass(CLASS.show);
        $('main, header, footer').toggleClass('push-shopping-cart');
    });
    $('.block-menu-right').click(function () {
        $('.menuleft-mobile').toggleClass(CLASS.show);
        $('.block-menu-left').toggleClass(CLASS.show);
        $('.block-menu-right').toggleClass(CLASS.show);
        $('main, header, footer').toggleClass('push-shopping-cart');
        $('.block-container-scroll').addClass('fixed-top');
    });

    $('.navbar .toggle').on('click', function (evt) {
        evt.preventDefault();
        $('.navbar').toggleClass('navbar-open');
    });

    $('.menu .arrow').on('click', function (evt) {
        evt.preventDefault();
        const obj = $(this),
            parent = obj.parents('.menu-item');

        parent.toggleClass(CLASSMAIN._active);
    });

    $('.navbar-overlay').on('click', function (evt) {
        $('.navbar').removeClass('navbar-open');
    });

    //====Scroll-menu-fixed====
    $(window).scroll(function() {
        var location_fixed = $('html, body').scrollTop();
        if(location_fixed >= 1){
            $('.navbar').addClass(CLASS.fixed);
        }else{
            $('.navbar').removeClass(CLASS.fixed);
        }
    });

    //====button hover for shopping cart====
        $('.total-button-shopping-cart-ajax').hover(function () {
            $(this).addClass('push').removeClass('pull');

        },function () {
            $(this).addClass('pull').removeClass('push');
        });

    //====button hover for shopping cart====

    $('.button-live-cart').on('click',function () {
        ajaxLoadView({
            view: 'viewCart',
            onSuccess: function (rs) {
                $('.shopping-cart-ajax-content').html(rs);
                $('.shopping-cart-ajax').addClass(CLASS.show);
                $('.layer-shopping-cart-live').addClass(CLASS.show);
                $('main, header, footer').addClass('push-shopping-cart');
                $('body').addClass(CLASS.ovl_hidden);
                $('html').addClass(CLASS.ovl_hidden);
                ajaxLoadView({
                    view: 'countcart',
                    onSuccess: function (rs) {
                        $(".count_cart").html(rs);
                    }
                }, 10);
            }
        });
    });
    //====end view Cart live====

    $('.button-heart-fixed').click(function () {
    $('.popup-button-heart-fixed').toggleClass(CLASS.d_none);
    })
    $('.popup-button-heart-header').click(function () {
        $('.popup-button-heart-fixed').addClass(CLASS.d_none);
    })

    var psImg = [],
        proLoop = $('.product-item');
    if (proLoop.length) {
        proLoop.each(function() {
            psImg.push({ id: $(this).attr('data-id'), code: 2, storeId: $(this).attr('data-storeId') });
        });
    }
    if (psImg.length && window.innerWidth > 1024) {
        getallchildimg(psImg, function(rs) {
            if (rs.allImages != "") {
                $.each(rs.images, function(key, src) {
                    $('.product-item[data-id="' + key + '"]')
                        .find('.img-hover-best-seller a').addClass('added')
                        .append('<img class="img-hover-two" src="' + src + '" alt="' + src + '"/>');
                });
            }
        });
    }
    //====end hover img-hoverr two====

    // pagination
    $('a.paging-previous.ico').append('<i class="fa fa-angle-left"></i>')
    $('a.paging-next.ico').append('<i class="fa fa-angle-right"></i>')
    $('.paging-first').append('<i class="fa fa-angle-double-left"></i>');
    $('.paging-last').append('<i class="fa fa-angle-double-right"></i>');
    // end pagination

    $('.search-button').click(function(event) {
        /* Act on the event */
        $('.menu-desktop').addClass(CLASS.d_none).addClass(CLASS.invisible);
        $('.form-search').addClass(CLASS.visible).removeClass(CLASS.invisible).removeClass(CLASS.d_none);
        $('.menu-main-fixed').addClass(CLASS.d_none).addClass(CLASS.invisible);
        $('.form-search-fixed').addClass(CLASS.visible).removeClass(CLASS.invisible).removeClass(CLASS.d_none);
    });
    $('.close-form').click(function(event) {
        /* Act on the event */
        $('.menu-desktop').removeClass(CLASS.d_none).removeClass(CLASS.invisible);
        $('.form-search').removeClass(CLASS.visible).addClass(CLASS.invisible).addClass(CLASS.d_none);
        $('.form-search-fixed').removeClass(CLASS.visible).addClass(CLASS.invisible).addClass(CLASS.d_none);
        $('.menu-main-fixed').removeClass(CLASS.d_none).removeClass(CLASS.invisible);
    });


    $('.nd-hieuung ul.nav-menu-sidebar-filter li a').click(function(event) {
        /* Act on the event */
        let classdata = $(this).data('class');
        $('.product-items-all .product-item').each(function() {
            if ($(this).hasClass(classdata)) {
                $(this).show(300);

            } else {
                $(this).hide(300);
            }

        });
    }); //nd-hieuung
});
