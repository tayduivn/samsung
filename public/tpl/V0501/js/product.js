
$(function () {

    //<-menu->
    $('.search_header .header_categories h3').click(function() {
        $(this).next().slideToggle();
        $('.overlay-menu').addClass('active');
    });

    $('.overlay-menu').click(function(){
        $('.categories_head').slideUp();
        $(this).removeClass('active');
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 40 ){
            $('.wrap_header_top').addClass("sticky");
        }
        else{
            $('.wrap_header_top').removeClass("sticky");
        }
    });

    $('.owl_product_ ').owlCarousel({
        autoplay:true,
        autoplaySpeed: 1000,
        autoplayTimeout: 1000,
        autoplayHoverPause:true,
        loop: true,
        nav:false,
        dots:false,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:4
            },
            1000:{
                items:6
            }
        }
    });
    $('.owl_product_view ').owlCarousel({
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        loop: true,
        nav: false,
        dots: false,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:3
            },
            1000:{
                items:4
            }
        }
    });
    $('.owl_col_details ').owlCarousel({
        autoplay:false,
        autoplaySpeed: 1000,
        autoplayTimeout: 2000,
        autoplayHoverPause:true,
        loop: true,
        nav:false,
        dots:false,
        items:1
    });

    $('.hasclick').click(function () {
        if ($(this).hasClass('open_')){
            $(this).parent().children('.toggle-mn').hide();
            $(this).removeClass('open_');
        } else {
            $(this).addClass('open_');
            $(this).parent().children('.toggle-mn').show();
        }
    })
    //<<--zoomimg-->>
    $('.product-photo-thumbs .item ').click(function () {

        var attr = $(this).children().attr('data-zoom-image');
        $('.img-responsive').attr('src', attr)
    });
    $('.owl_width .item').click(function () {

        var attr = $(this).children().attr('data-image');
        $('.img-responsive').attr('src', attr)
    });
    $('.color .swatch-element').click(function () {

        var Attr = $(this).children('a').attr('data-src');
        $('.img-responsive').attr('src', Attr)
    })
    $('.owl_width .item').click(function () {
        var t = $(this).children();
        $(".zoomWindowContainer div").css("background-image", 'url(' + t.attr('data-image') + ')');
    });
    $('.color .swatch-element').click(function () {
        var t = $(this).children('a');
        $(".zoomWindowContainer div").css("background-image", 'url(' + t.attr('data-src') + ')');
    })
})




