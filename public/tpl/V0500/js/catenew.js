$(function () {
    $('.owl-new').owlCarousel({
        loop: true,
        nav:true,
        dots:false,
        rewind:true,
        navSpeed:1000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:2
            }
        }
    });
})