$(function () {

    $('.slide-slick-total-home').slick({
        prevArrow: $('.prev-slide-home'),
        nextArrow: $('.next-slide-home'),
    });

    $('.hashtag-social2').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: false,
        nextArrow: false,
        dots: true,
        responsive: [{
            breakpoint: 720,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },{
            breakpoint: 992,
            settings: {
                infinite: false,
                dots: false,
                vertical: true,
                slidesToShow: 10,
                slidesToScroll: 10
            }
        }, ]
    });
});