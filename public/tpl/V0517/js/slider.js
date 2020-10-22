$(document).ready(function() {
    $('.slider').slick({
        autoplay: true,
        speed: 2000,
        lazyLoad: 'progressive',
        arrows: true,
        dots: false,
        prevArrow: '<div class="slick-nav prev-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
        nextArrow: '<div class="slick-nav next-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
    }).slickAnimation();



    $('.slick-nav').on('click touch', function(e) {
        e.preventDefault();
        var arrow = $(this);
        if (!arrow.hasClass('animate')) {
            arrow.addClass('animate');
            setTimeout(() => {
                arrow.removeClass('animate');
            }, 1600);
        }
    });

    $('.slider__staff').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        speed: 300,
        dots: false,
        autoplaySpeed: 2000,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.customer__reviews--slick').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        adaptiveHeight: true,

    });

    $('.slider-news').slick({
        dots: false,
        infinite: false,
        speed: 300,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        arrow: true,
        prevArrow: '<div class="slick-nav prev-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
        nextArrow: '<div class="slick-nav next-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
        responsive: [{
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.carousel-slick').slick({
        infinite: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.carousel-thumb-slick'
    });

    $('.carousel-thumb-slick').slick({
        infinite: true,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.carousel-slick',
        focusOnSelect: true
    });


    $('.slick-slider-product').slick({
        dots: false,
        infinite: true,
        speed: 300,
        autoplay: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        arrow: true,
        prevArrow: '<div class="slick-nav prev-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
        nextArrow: '<div class="slick-nav next-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.slick-slide-bar').slick({
        autoplay: false,
        speed: 2000,
        lazyLoad: 'progressive',
        arrows: true,
        dots: false,
    });
});