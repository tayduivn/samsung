$(document).ready(function() {
    $('.banner-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
    $('.top-favorite-slick').slick({
        infinite: true,
        dots: false,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.favorite-backpack-slick').slick({
        infinite: true,
        dots: false,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.favorite-bag-slick').slick({
        infinite: true,
        dots: false,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.exclusive-distribution-slick').slick({
        infinite: true,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.slider-hasgtag-slick').slick({
        infinite: true,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 10,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    });
    $('.you-will-like-slick').slick({
        infinite: true,
        dots: false,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
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

    $('.slider-commitment-slick').slick({
        infinite: true,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.lider-bundled-slick').slick({
        infinite: true,
        dots: false,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.slider-home--news').slick({
        infinite: true,
        dots: false,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});