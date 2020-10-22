$(document).ready(function () {
    if ($('.slide_album_a2').length) {
        $('.slide_album_a2').owlCarousel({
            items: 1,
            nav: false,
            dots: false
        });
    }
    if ($('.slide_3a2').length) {
        $('.slide_3a2').owlCarousel({
            items: 3,
            nav: false,
            dots: false,
            margin: 15,
            responsive: {
                0: {
                    items: 1,
                    margin: 0,
                },
                600: {
                    items: 2,
                },
                1024: {
                    items: 3,
                }
            }
        });
    }
    if ($('.slide_thumb_a2').length) {
        $('.slide_thumb_a2').owlCarousel({
            items: 1,
            nav: false,
            dots: true,
            autoPlay: true,
        })
    }
    if ($('.slide_album_rala_a2').length) {
        $('.slide_album_rala_a2').owlCarousel({
            items: 4,
            nav: false,
            dots: false,
            margin: 15,
            responsive: {
                0: {
                    items: 2,
                    margin: 10,
                },
                600: {
                    items: 2,
                },
                1024: {
                    items: 4,
                }
            }
        })
    }


});