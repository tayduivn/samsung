$(document).ready(function () {
    Address.load('#customcityId', '#customdistrictId','customWardId');

    /* - - - -  -- - - - - Scroll Nav Menu - - -  - - - - - - - - - - */
    var menuScroll = $('#menuScrollWrp');
    if(menuScroll.length && $(window).width() > 768){
        /* Scroll Nav Menu */
        var start = $(menuScroll).offset().top;
        $.event.add(window, "scroll", function() {
            var p = $(window).scrollTop();
            $(menuScroll).css('position', ((p) > start) ? 'fixed' : 'relative');
            $(menuScroll).css('top', ((p) > start) ? '0px' : '');
            $(menuScroll).css('width', ((p) > start) ? '980px' : '');
            if(p<=200){
                $('#menuNav').removeClass('scrollHeader');
                // $(menuScroll).removeClass('scrollHeader');
            }else{
                $('#menuNav').addClass('scrollHeader');
                // $(menuScroll).addClass('scrollHeader');
            }
        });
    }
    /* - - - -  -- - - - - End Scroll Nav Menu - - -  - - - - - - - - - - */

    if (window.innerWidth < 768) {
        $(window).scroll(function () {
            if ($(window).scrollTop() >= 250) {
                $('#headerCt').addClass("fixed");
            } else {
                $('#headerCt').removeClass("fixed");
            }
        });
    }

    /* - - - -  -- - - - - End owlCarousel js - - -  - - - - - - - - - - */

    $('#menuMain > ul > li.ctMenuMain').hover(function () {
        var altMenu = $(this).find('.blockChilds');
        if (altMenu.length) {
            $(this).find('a').eq(0).addClass("selected");
            altMenu.stop(true, true).show();
        }

    }, function () {
        var altMenu = $(this).find('.blockChilds');
        $(this).find('a').eq(0).removeClass("selected");
        altMenu.stop(true, true).hide();
    });

    //paginator
    $(".pagination .links").find(".paging-next").addClass('fa fa-caret-right');
    $(".pagination .links").find(".paging-last").addClass('fa fa-angle-double-right');
    $(".pagination .links").find(".paging-first").addClass('fa fa-angle-double-left');
    $(".pagination .links").find(".paging-previous").addClass('fa fa-caret-left');

    var ps = [];
    $('.product-box').each(function () {
        var t = $(this);
        ps.push({storeId: t.attr('data-storeId'), id: t.attr('data-id')});
    });
    InventoryLoad(ps);

    // index
    var idx_width = $(window).width();

    $('.list-products').owlCarousel({
        loop: true,
        margin: 1,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            100: {
                items: 2,
                nav: false
            },
            1000: {
                items: 5,
                nav: false
            }
        }
    })

    //banner index
    var _show = 1;
    var w = $('#slider1').width() / _show;
    var l = $('.slide1').length;

    $('.slide1').width(w);
    $('#slide-container1').width(w * l)

    function slider() {
        $('.slide1:first-child').animate({
            marginLeft: -w
        }, 'slow', function () {
            $(this).appendTo($(this).parent()).css({marginLeft: 0});
        });
    }

    var timer = setInterval(slider, 2000);

    $('#slider1').hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(slider, 2000);
    });

    $('#home-tab-products li a').click(function () {
        var t = $(this);
        ajaxLoadView({
            view: "loadTabView",
            params: "&type=" + t.attr('data-name'),
            onSuccess: function (rs) {
                $('.tab-prds').html(rs);
            }
        });
    });

    //loadview index
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
    });
});

function InventoryLoad(ps) {
    if (ps.length) {
        checkInventory(ps, function (rs) {
            if (rs.inventories != "") {
                $.each(rs.inventories, function (key, vl) {
                    if (vl <= 0) {
                        $('.product-box[data-id="' + key + '"] .prd-stock .cl-left .het-hang').css('display', 'block');
                    } else {
                        $('.product-box[data-id="' + key + '"] .prd-stock .cl-left .con-hang').css('display', 'block');
                        // console.log(rs.inventories);
                    }
                });
            }
        });
    }
}