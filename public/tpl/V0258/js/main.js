$(document).ready(function(){
    /*--- mv*/
    $(window).scroll(function() {
        if ($(window).width() < 769){
            var scrollTop = $(window).scrollTop();
            if (scrollTop > 120) {
                $('section.head').addClass('fixed-mb');
            } else {
                $('section.head').removeClass('fixed-mb');
            }
        }
    })
    $(".sub-menu li i").click(function () {
        $(this).parent().find(".LITTLE").slideToggle();
    })
    $("#menu-menu > li > i").click(function () {
        $(this).parent().find(".slimScrollDiv .sub-menu").slideToggle();
    })
    $('.header_nav').click(function () {
        $('.show_nav').slideToggle();
    });
    $('.plain').click(function () {
        $(this).next().slideToggle();
    });
    /*--- mv*/
    if ($('.home-slider').length) {
        $('.home-slider').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoHeight: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        })
    }
    if ($('.carousel').length) {
        $('.carousel').owlCarousel({
            loop: false,
            margin: 10,
            nav: true,
            autoplay: true,
            autoplayTimeout: 3000,
            autoHeight: true,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 4
                }
            }
        })
    }

    var owlbn = $("#banner-promo");
    var is_check = false;
    if($("#banner-promo .promo-item").length > 1){
        is_check = true;
    }
    owlbn.owlCarousel({
        loop: is_check,
        nav: true,
        items: 1,
        autoplay:true,
        smartSpeed: 3000,
        autoplayTimeout:7000,
        autoplayHoverPause:true,
        dots: false
    });

    if($('.sub-menu').length) {
        $('.sub-menu').slimScroll({
            position: 'right',
            height: '327',
            allowPageScroll: true
        });
    }
    $('.tabs .tab-caption-item').click(function(){
        if(!$(this).hasClass('selected')){
            contentId = $(this).attr('id').replace('cap','content');
            $('.tabs .tab-caption-item').removeClass('selected');
            $(this).addClass('selected');
            $('.tabs .tab-content-item').hide();
            $('.tabs #'+contentId).fadeIn();
        }
    });
    $('.subBtnScribe').click(function () {
        var Email = $(this).attr('field');
        if (Email.val()){
            $.post('/newsletter/subscribe', {'mail':Email.val()},
                function (rs) {
                    if (rs.code) {
                        Email.val('');
                        alert('thành công');
                    }else{
                        alert(rs.message);
                    }
                }
            );
        }else{
            alert('thất bại');
        }
    });
    $('.mobile-menu h4 a').click(function() {
        $('.head-menu .menu').toggleClass('menu-active');
        $('.site-overlay').addClass('active');
        return false;
    });
    $('.site-overlay').click(function () {
        $(this).removeClass('active');
        $('.head-menu .menu').removeClass('menu-active');
    })
    window.onscroll = changePos;
    $('.modal-backdrop').click(function () {
        $('#modalShow').modal('hide');
    })

    $('.filter>div>i.fa').click(function () {
        $(this).toggleClass('fa-chevron-down').parent('div').toggleClass('full');
    });
    $('.shop99_deamonLink').click(function(e){
        e.preventDefault();
        window.location.href = $(this).attr('data-link');
    });
    var ps = [];
    $('.box-product').each(function () {
        var t = $(this);
        ps.push({storeId: t.attr('data-storeId'), id: t.attr('data-pid')});
    });
    InventoryLoad(ps);
});
function InventoryLoad(ps) {
    if (ps.length) {
        checkInventory(ps, function (rs) {
            if (rs.inventories != "") {
                var outOfStock = 'Hết hàng';
                $.each(rs.inventories, function (key, vl) {
                    if (vl <= 0) {
                        $('.prdWrapper[data-pid = "' + key + '"] .sold-out').html(outOfStock);
                        $('.prdWrapper[data-pid = "' + key + '"] .sold-out').css('display', 'block');
                        $('.prdWrapper[data-pid = "' + key + '"] .sold-out').attr("id","out-stock");
                    }
                });
            }
        });
    }
}

function changePos() {
    var header = $(".head-menu");
    var headerheight = $(".head-menu").height();
    if($(window).width() > 1023) {
        if (window.pageYOffset > headerheight) {
            header.addClass('scrolldown');
        } else {
            header.removeClass('scrolldown');
        }
    }
}

function numberFomart(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
$(document).on('click','.btn-quickview',function () {
    var t = $(this);
    $.post('/product/q' + t.attr('data-psId'),
        function (rs) {
            $('#modalShow .modal-content').html(rs);
            $('#modalShow').addClass('modal-quick').modal('show');

        }
    );
    return false;
});