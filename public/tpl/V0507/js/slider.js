$(document).ready(function() {
    
    $('.carousel-bannerHome').slick({
        dots: false,
        autoplaySpeed: 3000,
        autoplay: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        arrows: false
        });

    $('.carousel-bot').slick({
        dots: true,
        infinite: true,
        speed: 600,
        fade: true,
        cssEase: 'linear'
    });
    
    $('.slider_mobile').slick({
        dots: false,
        vertical: true,
        slidesToShow: 4,
        slidesToScroll: 10,
        verticalSwiping: true,
        arrows: true,
        swipeToSlide: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    vertical: false,
                    dots: true,
                    verticalSwiping: false,
                    swipeToSlide: true,
                    focusOnSelect: true,
                }
            },
            ]
    });
    
    $('.product__center-item').slick({
        dots: false,
        infinite: true,
        arrows: true,
        speed: 1100,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplaySpeed: 3000,
        autoplay: true,
        responsive: [
            {
            breakpoint: 992,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3
            }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    });     
});
