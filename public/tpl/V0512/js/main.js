$(document).ready(function () {

    $('.open-Menu').click(function () {
        if(!$('header').hasClass('header-openMenu')) {
            $('header').addClass('header-openMenu');
            $('.main-navigation').slideDown();
        }else{
            $('.main-navigation').css('display','none');
            $('header').removeClass('header-openMenu');
        }

    });

    $('.open-child').click(function () {
        if ($(this).hasClass('active')) {
            $(this).next().slideUp();
            $(this).removeClass('active');
        } else {
            $('.main-navigation__list .lv_1>ul').slideUp();
            $('.open-child').removeClass('active');
            $(this).addClass('active');
            $(this).next().slideToggle();
        }
    });

    var position = 0;
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if(!$('header').hasClass('header-openMenu')) {
            if (scroll > position) {
                $('header').removeClass('headerScroll-Up');
                $('header').addClass('headerScroll-Down');

            } else {
                $('header').removeClass('headerScroll-Down');
                $('header').addClass('headerScroll-Up');
            }

        }
        if(scroll == 0){
            $('header').removeClass('headerScroll-Up');
        }
        position = scroll;
    });

    $('.search-form form>label').click(function () {
        $(this).parents('.search-form').addClass('search-form__open');
    });

    $("body").click(function (e) {
        // Đối tượng container
        var container = $("header .search-form");
        // Nếu click bên ngoài đối tượng container thì ẩn nó đi
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            container.removeClass('search-form__open');
        }
    });

    $('.search-form form button').click(function () {
        if ($('#main_search').val() == '') {
            $(this).parents('.search-form').removeClass('search-form__open');
        }
    });

    if($('.slide-news').length){
        $('.slide-news.owl-carousel').owlCarousel({
            items: 4,
            rewind: true,
            responsive:{
                0:{
                    items:1
                },
                480:{
                    items:2,
                    slideBy: 2,
                },
                992:{
                    items:3,
                    slideBy: 3,
                    // nav: true
                },
                1280:{
                    items:4,
                    slideBy: 4,
                    // nav: true
                }
            }
        });
    }

    if($('.banner-product').length) {
        $('.banner-product .owl-carousel').owlCarousel({
            items: 1,
            loop: true,
            autoplay: true
        });
    }

    if($('.list-cate').length) {
        $('.list-cate .owl-carousel').owlCarousel({
            dots: true,
            loop: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2,
                    slideBy: 2
                },
                992: {
                    items: 3,
                },
                1280: {
                    items: 4,
                    mouseDrag: false,
                    loop: false,
                    dots: false
                }
            }
        });
    }

    if($('.product-cateChild ').length) {
        $('.product-cateChild .owl-carousel').owlCarousel({
            items: 2,
            dots: true,
            loop: true
        });
    }

    $('.style-mobileFilter .filter-header a').on('click', function (e) {
        e.preventDefault();
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).parents('.style-mobileFilter').find('.tab-pane.active').removeClass('active');
        }else{
            $('.style-mobileFilter .filter-header a').removeClass('active');
            $('.style-mobileFilter .tab-content>div').removeClass('active');
            $(this).addClass('active');
            $(this).parents('.style-mobileFilter').find($(this).attr('href')).addClass('active');
        }
    });


    $('.style-mobileFilter .tab-content>a').click(function () {
        if($(this).next().hasClass('active')){
            $(this).removeClass('active');
            $(this).next().removeClass('active');
        }else{
            $('.style-mobileFilter .tab-content>a').removeClass('active');
            $('.style-mobileFilter .tab-content>div').removeClass('active');
            $(this).addClass('active');
            $(this).next().addClass('active');
        }
    });

    $('.Filter-headerMobile').click(function () {
        $('.style-mobileFilter').toggleClass('open-mobileFilter');
    });

    $(".form-newsLetter input").keyup(function (e) {
        if ($(this).val() !== '') {
            if (!$(this).hasClass('complete')) {
                $(this).addClass('complete');
            }
        } else {
            $(this).removeClass('complete');
        }
    });

    if($(window).width() < 992) {
        $('.footer-item>h4').click(function () {
            if ($(this).hasClass('active')) {
                $(this).next().slideUp();
                $(this).removeClass('active');
            } else {
                $('.footer-item>h4').next().slideUp();
                $('.footer-item>h4').removeClass('active');
                $(this).addClass('active');
                $(this).next().slideToggle();
            }
        });
    }

    if($('.thumb-product').length){
        $('.thumb-product').slick({
            // dots: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            vertical: true,
            verticalSwiping: true,
            asNavFor: '.product-image__list',
            centerMode: true,
            focusOnSelect: true,
            centerPadding: '0px',
            prevArrow: '<button type="button" class="slick-prev d-block"><i class="fas fa-chevron-up"></i></button>',
            nextArrow: '<button type="button" class="slick-next d-block"><i class="fas fa-chevron-down"></i></i></button>'
        });
    }
    if($('.product-image .product-image__list').length){
        $('.product-image .product-image__list').slick({
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.thumb-product',
            adaptiveHeight: true,
            draggable: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        draggable:true,
                        dots: true,
                        dotsClass: 'mb-0 p-0 slick-dots'
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }

    if($(window).width()< 768){
        $('.productDetail__tabs-description .tab-pane').removeClass('active');
    }

    $('.back-top').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600); //Animation giúp hoạt ảnh scroll ngược lên đầu trang sẽ mượt hơn
        return false;
    });

    $('.btn_dk').click(function (e) {
        e.preventDefault();
        $.post('/newsletter/subscribe', {'mail': $('#contactFormEmail').val()},
            function (rs) {
                if (rs.code) {
                    $('#contactFormEmail').val('');
                    alert(rs.message);
                }else{
                    alert(rs.message);
                }

            }
        );
    });

});
