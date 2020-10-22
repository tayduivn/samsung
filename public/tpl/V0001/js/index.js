$(function () {
    /* - - - -  -- - - - -  owlCarousel js - - -  - - - - - - - - - - */
    // if($("body #bannerSlide").length) {
    //     $("#bannerSlide").owlCarousel({
    //         autoPlay : true,
    //         lazyLoad:true,
    //         items :1,
    //         loop: false,
    //         autoplay:true,
    //         smartSpeed: 3000,
    //         autoplayTimeout:5000,
    //         autoplayHoverPause:true,
    //         dots: false,
    //         nav: true,
    //         navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa" aria-hidden="true"></i>'],
    //     });
    // }

    loadNewOwl(true);



    /* - - - -  -- - - - -  End owlCarousel js - - -  - - - - - - - - - - */

    $('.sendSubcrible').click(function (e) {
        e.preventDefault();
        var gender = $('input[name=gender]:checked').val(),
            userName = $('input.userName').val(),
            email = $('#subscribeEmail').val(),
            mobile = $('input.userPhone').val(),
            $warning = $('body #popupHomeBlock .mssp');

        if (!userName){
            $warning.html(mssWarningPopup('Họ và Tên')).fadeIn(100);
            setTimeout(function () {
                $warning.fadeOut(100).empty();
            },5000);
            return false;
        }
        if (!email){
            $warning.html(mssWarningPopup('Email')).fadeIn(100);
            setTimeout(function () {
                $warning.fadeOut(100).empty();
            },5000);
            return false;
        }
        if (!mobile){
            $warning.html(mssWarningPopup('Số điện thoại')).fadeIn(100);
            setTimeout(function () {
                $warning.fadeOut(100).empty();
            },5000);
            return false;
        }

        $('#popupHomeBlock .loading').addClass('is');
        $.post('/newsletter/subscribe', {
                mail: email,
                gender: gender,
                name: userName,
                mobile: mobile,
                titleMail:' Chúc mừng '+ userName +' đã nhận được mã giảm giá 30.000đ'
            },
            function (rs) {
                if (rs.code == 1) {
                    $('#subscribeEmail').val('');
                    $('.user').val('');
                    if (rs.couponCode) {
                        $('#popupHomeBlock .popMess').show();
                        $('#popupHomeBlock .popEnd').hide();
                        $('#popupHomeBlock .popMess .coupoCode').html(rs.couponCode);
                        $('#popupHomeBlock .loading').removeClass('is');
                        setTimeout(function () {
                            parent.jQuery.fancybox.close();
                        },15000)
                    }else{
                        parent.jQuery.fancybox.close();
                    }
                }else{
                    alert(rs.message);
                }
            }
        );
    });
    if($('#popupHomeBlock.cookie').length){
        $.fancybox({
            fitToView: true,
            content: $('#popupHomeBlock'),
            padding: 0
        });
    }
    if($(window).width() > 768){
        $('.catePro > li').hover(function() {
            var altMenu = $(this).find('ul.dropdown-menu');
            if(altMenu.length) {
                $(this).find('a').eq(0).addClass("selected");
                altMenu.stop(true,true).slideToggle("fast");
            }

        }, function() {
            var altMenu = $(this).find('ul.dropdown-menu');
            $(this).find('a').eq(0).removeClass("selected");
            altMenu.stop(true,true).slideUp(0) ;

        });
    }
});

$(window).resize(function () {
    loadNewOwl(false);
});

function loadNewOwl(isLoad) {
    //console.log(window.innerWidth);
    if($("body .productNew .owl-carousel .item").length && window.innerWidth > 1024) {
        var $owl = $(".productNew .owl-carousel");
        if (!isLoad){
            $owl.owlCarousel('destroy');
            $owl.removeClass('owl-hidden');
        }
        $owl.owlCarousel({
            autoplay:false,
            autoplayTimeout:2500,
            autoplayHoverPause:true,
            nav:true,
            dots:false,
            items:1,
            responsive:{
                380:{
                    items:2
                },
                768:{
                    items:3,
                },
                1200:{
                    items:4,
                }
            }
        });

    }
}
function mssWarningPopup($mss) {
    return '<div class="alert alert-warning">Qúy khách vui lòng nhập '+$mss+'  <a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a></div>';
}
