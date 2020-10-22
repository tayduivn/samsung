$(document).ready(function () {
    $("button.btnAddToCart").on("click", function(){
        if ($(this).attr("ck") == 1) {
            var products = [], ps = {};
            ps['id'] = $(this).attr('selid');
            ps['quantity'] = 1;
            var qty = parseInt(ps['quantity']);
            var id = ($(this).attr('id'));
            products.push(ps);
            addToCart(products, 1, function(rs){
                if (rs.status == 1) {
                    if (id == 'buynow'){
                        window.location.href = '/cart/checkout';
                    }else {
                        var totalqtt = parseInt(rs.data.totalQuantities + qty);
                        $('.count-cart span').text(totalqtt);
                        // ajaxLoadView({
                        //     view: 'topCart',
                        //     onSuccess: function (rs) {
                        //         $('.top-cart-content').html(rs);
                        //     }
                        // });
                        window.location.href = '/cart'
                    }
                } else {
                    alert(msgSizeColorProduct);
                }
            });
        }
    });

    $('.nav-mb').click(function () {
        if (!this.classList.contains('active')) {
            this.classList.add('active');
            var x = document.getElementsByClassName('nav-mb');
            for (var i = 0; i < x.length; i++) {
                if (x[i] != this) {
                    x[i].classList.remove('active');
                }
            }
        }
    })

    $('.nav-mb2').click(function () {
        if (!this.classList.contains('active')) {
            this.classList.add('active');
            var x = document.getElementsByClassName('nav-mb2');
            for (var i = 0; i < x.length; i++) {
                if (x[i] != this) {
                    x[i].classList.remove('active');
                }
            }
        }
    })

    $('.nav-link').click(function () {
        if (!this.classList.contains('active')) {
            this.classList.add('active');
            var x = document.getElementsByClassName('nav-link');
            for (var i = 0; i < x.length; i++) {
                if (x[i] != this) {
                    x[i].classList.remove('active');
                }
            }
        }
    })
});

jQuery(document).ready(function () {
    if ($(window).width() < 992) {
        $('.gallery-icon img').click(function () {
            var imgNew = $(this).attr('src');
            $('.khung-ha a').attr('href', imgNew);
        });
        $(".khung-ha a").fancybox();
    }

    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:1,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:5,
                nav:true,
                loop:false
            }
        }
    })
});

document.addEventListener('DOMContentLoaded', function () {

    if ($(".gallery .gallery-item").length < 2) {
        $(".gallery").css("display", "none");
    }

    $(".gallery-item img").click(function () {
        $(".gallery-item").removeClass('active');
        $(this).parents('.gallery-item').addClass('active');
    });
    $(".gallery-item").first().addClass('active');
    jQuery(".ha").elevateZoom({
        gallery: 'gallery-2',
        scrollZoom: true,
        cursor: 'pointer'
    });
    $(".ha").bind("click", function (e) {
        var ez = $('.ha').data('elevateZoom');
        $.fancybox(ez.getGalleryList());
        return false;
    });
});