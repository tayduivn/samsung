var $storeId = document.getElementById('storeId').value;
$(document).ready(function () {
    setTimeout(function () {
        var height = jQuery(".tab-content").outerHeight() / 2;
        $(".product-lists-home").css("min-height", height);
    }, 500);
    $(".tab-pane:not(.active) .product-lists").hide();

    // this.sliderCollection();
    var itemShow = 2, attr_show = $('.slideProductBanner').attr('data-slide-to-show');
    if (attr_show) {
        itemShow = attr_show;
    }
    $('.slideProductBanner').slick({
        centerPadding: '20px',
        slidesToShow: itemShow,
        autoplay: true,
    });

    // this.clickPanel();
    $(document).on("click", ".sectionContentTab a:not(.notClick)", function () {
        var link = $(this).attr("href");
        window.location.href = link;
    });

    // this.removeOptimize();
    if ($(window).width() >= 768) {
        $(".visible-xs").remove();
    } else {
        // this.slideBannerMobile();
        if (!in_array($storeId, [72396, 11503])){
            $('.sliderMobileBannerHome').slick({
                slidesToShow: 1,
                autoplay: true,
                arrows: true,
            });
        }
    }

    if ($('#load-pCategory').length) {
        // load danh mục sản phẩm trang chủ
        var $viewName = '';
        if(in_array($storeId,[41781])) {
            $viewName = 'homeCategory41781';
        }else if(in_array($storeId,[57850])) {
            $viewName = 'homeCategory57850';
        }else if(in_array($storeId, [70105, 11503])) {
            $viewName = 'homeCategory70105';
        }else {
            $viewName = 'homeCategory';
        }
        ajaxLoadView({
            view: $viewName,
            delay: 750,
            onSuccess: function (rs) {
                $('#load-pCategory').html(rs)
            }
        });
    }

    if ($('#load-homeNews').length) {
        ajaxLoadView({
            view: 'homeNews',
            delay: 1700,
            onSuccess: function (rs) {
                $('#load-homeNews').html(rs)
            }
        });
    }

    if ($('#load-homeAlbums').length) {
        ajaxLoadView({
            view: 'homeAlbums',
            delay: 2000,
            onSuccess: function (rs) {
                $('#load-homeAlbums').html(rs)
            }
        });
    }


    var trackingBannerHome1 = $('.trackingBannerHome1');
    if (trackingBannerHome1.length) {
        //nếu nhiều hơn 1 slide thì để loop là True
        var loop = false;
        if ($('.trackingBannerHome1>a').length > 1) {
            loop = true;
        }
        trackingBannerHome1.owlCarousel({
            items: 1,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            lazyLoad: true,
            touchDrag: true,
            loop: loop,
            responsive: {
                0: {
                    items: 1
                },
                767: {
                    items: 1
                },
                1024: {
                    items: 1
                }
            }
        });
    }
    if(in_array($storeId,[41781])){
        $('.product-lists-home').owlCarousel({
            items: 4,
            nav: true,
            navText: ['‹' , '›'],
            // dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            lazyLoad: true,
            touchDrag: true,
            loop: false,
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
        $('.banner-feedback').owlCarousel({
            items: 3,
            margin: 10,
            nav: false,
            navText: ['‹' , '›'],
            // dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            lazyLoad: true,
            touchDrag: true,
            loop: false,
            responsive: {
                0: {
                    items: 1
                },
                767: {
                    items: 1
                },
                1024: {
                    items: 3
                }
            }
        });
    }
});