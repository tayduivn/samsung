$(document).ready(function ($) {
    awe_owl();
    awe_owl_loop();
    awe_backtotop();
    $("body").on("click","[data-toggle]",function(){
        var n=$(this);
        n.toggleClass("toggled");
        $(n.attr("data-toggle")).toggleClass(n.attr("data-toggle-class"))
    })
});
function awe_owl() {
    if ($('.owl-carousel:not(.not)').length) {
        $('.owl-carousel:not(.not)').each(function () {
            var xs_item = $(this).attr('data-xs-items');
            var md_item = $(this).attr('data-md-items');
            var lg_item = $(this).attr('data-lg-items');
            var sm_item = $(this).attr('data-sm-items');
            var margin = $(this).attr('data-margin');
            var dot = $(this).attr('data-dot');
            var nav = $(this).attr('data-nav');
            var height = $(this).attr('data-height');
            var play = $(this).attr('data-play');
            var loop = $(this).attr('data-loop');
            if (typeof margin !== typeof undefined && margin !== false) {
            } else {
                margin = 30;
            }
            if (typeof xs_item !== typeof undefined && xs_item !== false) {
            } else {
                xs_item = 1;
            }
            if (typeof sm_item !== typeof undefined && sm_item !== false) {

            } else {
                sm_item = 3;
            }
            if (typeof md_item !== typeof undefined && md_item !== false) {
            } else {
                md_item = 3;
            }
            if (typeof lg_item !== typeof undefined && lg_item !== false) {
            } else {
                lg_item = 3;
            }
            if (typeof dot !== typeof undefined && dot !== true) {
                dot = true;
            } else {
                dot = false;
            }
            $(this).owlCarousel({
                loop: false,
                margin: Number(margin),
                responsiveClass: true,
                dots: dot,
                nav: nav,
                autoplay: play,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                autoHeight: false,
                responsive: {
                    0: {
                        items: Number(xs_item)
                    },
                    600: {
                        items: Number(sm_item)
                    },
                    1000: {
                        items: Number(md_item)
                    },
                    1200: {
                        items: Number(lg_item)
                    }
                }
            })
        })
    }
}
function awe_owl_loop() {
    if ($('.owl-carousel-loop').length){
        $('.owl-carousel-loop').each( function(){
            var xs_item = $(this).attr('data-xs-items');
            var md_item = $(this).attr('data-md-items');
            var lg_item = $(this).attr('data-lg-items');
            var sm_item = $(this).attr('data-sm-items');
            var margin=$(this).attr('data-margin');
            var dot=$(this).attr('data-dot');
            var nav=$(this).attr('data-nav');
            var height=$(this).attr('data-height');
            var play=$(this).attr('data-play');
            var loop=$(this).attr('data-loop');
            if (typeof margin !== typeof undefined && margin !== false) {
            } else{
                margin = 30;
            }
            if (typeof xs_item !== typeof undefined && xs_item !== false) {
            } else{
                xs_item = 1;
            }
            if (typeof sm_item !== typeof undefined && sm_item !== false) {

            } else{
                sm_item = 3;
            }
            if (typeof md_item !== typeof undefined && md_item !== false) {
            } else{
                md_item = 3;
            }
            if (typeof lg_item !== typeof undefined && lg_item !== false) {
            } else{
                lg_item = 3;
            }
            if (typeof dot !== typeof undefined && dot !== true) {
                dot= true;
            } else{
                dot = false;
            }
            $(this).owlCarousel({
                loop:true,
                margin:Number(margin),
                responsiveClass:true,
                dots:dot,
                nav:nav,
                autoplay:false,
                autoplayTimeout:5000,
                autoplayHoverPause:true,
                autoHeight:false,
                responsive:{
                    0:{
                        items:Number(xs_item)
                    },
                    600:{
                        items:Number(sm_item)
                    },
                    1000:{
                        items:Number(md_item)
                    },
                    1200:{
                        items:Number(lg_item)
                    }
                }
            })
        })
    }
}
function awe_backtotop() {
    /* Back to top */
    if ($('#back-to-top').length) {
        var scrollTrigger = 200,
            fixednav = 80,
            fixednavmenu = 200;// px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };

        Fixnav = function () {
            var scrollTops = $(window).scrollTop();
            if (scrollTops > fixednav) {
                $('.header_fixnav_mobile').addClass('fixednav');
                $('.menu_mobile').addClass('mr_top_menumobile');
            } else {
                $('.header_fixnav_mobile').removeClass('fixednav');
                $('.menu_mobile').removeClass('mr_top_menumobile');
            }
        };
        Fixednavmenu = function(){
            var scrollTops = $(window).scrollTop();
            if (scrollTops > fixednavmenu) {
                $('.nav_to_fixed').addClass('fixed_navmenu');
            } else {
                $('.nav_to_fixed').removeClass('fixed_navmenu');
            }
        };
        Fixnav();
        Fixednavmenu();
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
            Fixnav();
            Fixednavmenu();
        });
        $('#back-to-top').on('click', function (e) {
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
}
$( document ).ready(function awe_menumobile(){
    $('.menu-bar-h').click(function(e){
        e.stopPropagation();
        $('.menu_mobile').toggleClass('open_sidebar_menu');
        $('.menu_cate_main').removeClass('open_cate_main');
        $('.opacity_menu').toggleClass('open_opacity');

    });
    $('.opacity_menu').click(function(e){
        $('.menu_mobile').removeClass('open_sidebar_menu');
        $('.opacity_menu').removeClass('open_opacity');
    });

    $('.danhmucsp').click(function(e){
        e.stopPropagation();
        $('.menu_cate_main').toggleClass('open_cate_main');
    });
    $('.backmenu').click(function(e){
        e.stopPropagation();
        $('.menu_cate_main').removeClass('open_cate_main');
        $('.menu_mobile').addClass('open_sidebar_menu');
        $('.opacity_menu').addClass('open_opacity');

    });
    $('.menu_cate_main .item_bar .nav-item').click(function(){
        activeTab(this);
        return false;
    });
    $("[data-items]").click(function(){
        activeStory(this);
        return false;
    });
    $('.ulrightnav li > .fa').click(function(){
        $(this).parent().toggleClass('current');
        $(this).toggleClass('fa-angle-down fa-angle-up');
        $(this).next('ul').slideToggle("fast");
    });

    $('.ul_collections li > .fa').click(function(){
        $(this).parent().toggleClass('current');
        $(this).toggleClass('fa-angle-down fa-angle-up');
        $(this).next('ul').slideToggle("fast");
        $(this).next('div').slideToggle("fast");
    });
});
function activeTab(obj){
    $('.menu_cate_main .item_bar .nav-item').removeClass('active');
    $(obj).addClass('active');
    var id = $(obj).attr('data-item');
    $('.listright .item_listlink').removeClass('active');
    $(id).addClass('active');
}

$( document ).ready(function() {
    if (window.matchMedia("(min-width: 991px)").matches) {
        $("h4.h2_footer+ul").show();
    } else{
        $("h4.h2_footer+ul").hide();
        $("h4.h2_footer").on("click", function () {
            $(this).toggleClass('open');
            $(this).next("ul").toggle();
        });
    };

});

function activeStory(obj){
    var idstory = $(obj).attr('data-items');
    $(idstory).show();
    var i = 0;
    if (i == 0) {
        i = 1;
        var elem = $(idstory).find(".myBar");
        console.log(elem);
        var width = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
                $(idstory).fadeOut();
            } else {
                width++;
                var newWidth = width + "%"
                elem.width(newWidth);
            }
        }
    }
};

function closeNav() {
    $("ul.items").hide();
}
$( window ).resize(function() {
    if (window.matchMedia("(min-width: 991px)").matches) {
        $("h4.h2_footer+ul").show();
    } else{
        $("h4.h2_footer+ul").hide();
        $("h4.h2_footer").on("click", function () {
            $(this).toggleClass('open');
            $(this).next("ul").toggle();
        });
    };
});

$( document ).ready(function() {
    $("h4.h2_footer+ul").hide();
    if (window.matchMedia("(min-width: 991px)").matches) {
        $("h4.h2_footer+ul").show();
    }
    $("h4.h2_footer").on("click", function () {
        $(this).toggleClass('open');
        $(this).find("ul").toggle();
    });
});

$( document ).ready(function() {
    $('.open-filters').click(function (e) {
        e.stopPropagation();
        $(this).toggleClass('openf');
        $('.dqdt-sidebar').toggleClass('openf');
    });
    $('.ul_col').click(function(){
        $('.content_ul').toggleClass("visible");
    });
});



