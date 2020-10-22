$(function () {
    $('#ProductPhoto').owlCarousel({
        autoplay:false,
        loop: false,
        nav:false,
        navSpeed:1000,
        dots:false,
        items:1,
        rewind:true,
    });

    $('#owl-spdx').owlCarousel({
        loop: false,
        nav:true,
        dots:false,
        rewind:true,
        navSpeed:1000,
        responsive:{
            0:{
                items:2
            },
            480:{
                items:2
            },
            768:{
                items:3
            },
            769:{
                items:4
            }
        }
    });

    $('#owl-feature-product-slider').owlCarousel({
        loop: false,
        nav:true,
        dots:false,
        rewind:true,
        responsive:{
            0:{
                items:2
            },
            480:{
                items:2
            },
            768:{
                items:3
            },
            769:{
                items:4
            }
        }
    });

    $('.product-single__thumbnail').click(function () {
        $('.thumbnail-item').removeClass('thumbnail-border');
        $(this).parent().addClass('thumbnail-border');
        var attr = $(this).children().attr('src');
        $('#ProductPhoto .lazyloaded').attr('src', attr);
        if ($('#ProductPhoto .owl-item').hasClass('active')) {
            $('#ProductPhoto .zoom').removeClass('zoom');
            $('.zoomWindow').css('background-image', 'url(' + attr + ')');
        }
    });

    $('.color.req .select-swap .swatch-element').click(function () {
        $('.thumbnail-item').removeClass('thumbnail-border');
        var attr = $(this).children('input').attr('data-img-src');
        var t = $(this).children('.input-product').attr('data-img-src');
        $('#ProductPhoto .lazyloaded').attr('src', attr);
        $('.zoomWindow').css('background-image', 'url(' + attr + ')');
    })

    $(window).load(function () {
        var productThumb = $('#ProductThumbs');
        var productThumbInner = $('#ProductThumbs .inner');
        var productFeatureImage = $('#ProductPhoto');
        var thumbControlUp = $('.product-thumb-control .up');
        var thumbControlDown = $('.product-thumb-control .down');
        var productFeatureImage = $('.product-single__photos');
        if ($(window).width() <= 480) {
            $('.product-single__thumbnails .inner').addClass('owl-carousel owl-theme');
            $('.product-single__thumbnails .inner li').wrap('<div class="item"></div>');
            $('#ProductThumbs .inner').owlCarousel({
                autoplay:false,
                loop: false,
                nav:true,
                dots:false,
                navSpeed:1000,
                items:3,
            });
        } else {
            $('.product-single__thumbnails .inner li').unwrap();
            $('.product-single__thumbnails li').wrapAll('<div class="inner"></div>');
            var productThumbInner = $('#ProductThumbs .inner');
            if (parseInt($('.product-single__thumbnails .inner').css('height')) > parseInt($('.product-single__thumbnails').css('max-height'))) {
                $('.product-thumb-control').show();
                var _temp = 0;
                var _mt = parseInt(productThumbInner.css("margin-top"));
                productThumb.css('max-height', 470);
                var _maxScroll = productThumb.height() - productThumbInner.height();
                if(_maxScroll === 0 ){
                    $('.product-thumb-control').remove();
                }
                thumbControlUp.click(function(){
                    _temp = _mt + 110;
                    if(_temp > 0){
                        _mt = 0;
                        productThumbInner.css("margin-top", _mt)
                    }else{
                        _mt = _temp;
                        productThumbInner.css("margin-top", _mt)
                    }
                });
                thumbControlDown.click(function(){
                    _temp = _mt - 110;
                    if(_temp < _maxScroll){
                        _mt = _maxScroll;
                        productThumbInner.css("margin-top", _mt)
                    }else{
                        _mt = _temp;
                        productThumbInner.css("margin-top", _mt)
                    }
                });
            } else {
                $('.product-thumb-control').hide();
            }
        }
    })

    if ($('#ProductPhoto .owl-item').hasClass('active')) {
        $('#ProductPhoto .active').children().children().children().addClass('zoom');
    }

    $('.zoom').elevateZoom({
        scrollZoom: true
    });

    if ($('#ProductPhoto .active .item a img').attr('src') != $('#ProductPhoto .active .item a img').attr('data-src')) {
        $(this).removeClass('zoom');
    }
});

function openTab(event, tabName) {
    $('.pro-tablinks').removeClass('active');
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("pro-tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("pro-tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}





