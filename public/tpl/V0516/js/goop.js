$(document).ready(function () {
    $('.item-1').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            }
        },
    });
    $('.item-4-2').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 3
            },
            1200: {
                items: 4
            }
        },
    });
    $('.item-5').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 4
            },
            1200: {
                items: 5
            }
        },
    });
    $(window).scroll(function () {
        var height = $(window).scrollTop();
        var addToCartHeight=document.getElementById('addToCart').offsetTop;
        var clientHeight = document.getElementById('myproduct').clientHeight;
        if(height > 90 && height <=clientHeight-450 && $(window).width() >= 1200){
            $('.product-image').css('top',height-90);
        }
        if(height > addToCartHeight+300){
            $('.addToCart-hiden').addClass('active');
        }
        else {
            $('.addToCart-hiden').removeClass('active');
        }
    })
    
    $('.title-content').click(function () {
        if($(this).find('i').hasClass('fa-caret-down')){
            $(this).find('i').removeClass('fa-caret-down').addClass('fa-caret-up');
        }
        else {
            $(this).find('i').removeClass('fa-caret-up').addClass('fa-caret-down');
        }
        $(this).parent().find('.mota').slideToggle();
    })
    
    $('.more-product li').click(function () {
        $('.more-product .active').removeClass('active');
        $(this).find('span').addClass('active');
        $('.more-product-owl').css('display','none');
        $(this).find('.more-product-owl').css('display','block');

    })
    var a=[] ;
    $('.product-owl .owl-item img').each(function () {
        var t = $(this).attr('src');
       a.push(t);
    })
    var t=0;
    $(' .product-owl .owl-carousel button.owl-dot').each(function () {
        var url =a[t];
        $(this).append('<img class="img-fluid">');
        $(this).find('img').attr('src',url);
        t++;
    })
});