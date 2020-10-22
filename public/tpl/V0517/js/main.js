// import { CLASS } from "/export.js";


// const $ = jQuery;

$(document).ready(function() {
    APP.init();
});

const WINDOW = $(window),
    DOCUMENT = $(document),
    BODY = $(document.body);

let WIN_WIDTH = WINDOW.width(),
    WIN_HEIGHT = WINDOW.height(),
    DOC_WIDTH = DOCUMENT.width(),
    DOC_HEIGHT = DOCUMENT.height();

const CLASS = {
    is_active: 'is-active',
    is_disable: 'is_disable',
    is_show: 'is_show',
    is_hide: 'is_show',
    show_sidebar: 'show-sidebar',
    navbar_open: 'navbar-open',
    overflow_x: 'ov-x',
    js_tab_active: 'js-tab-active'
}

const APP = {
    init: function() {
        let navbar_head = $("[data-nav-status='toggle']");
        $(window).scroll(function() {
            let nar_header = $('#navbar-header').offset().top;
            let scrollPos = $(this).scrollTop();
            if (scrollPos > nar_header) {
                navbar_head.addClass('is-visible');
            } else {
                navbar_head.removeClass('is-visible');
            }
        });

        $('#home-tab-products .tab-item').click(function() {
            var t = $(this);
            ajaxLoadView({
                view: "loadTabView",
                params: "&type=" + t.attr('data-name'),
                onSuccess: function(rs) {
                    $('.tab-body').addClass('spinning');
                    setTimeout(() => {
                        $('.tab-body').removeClass('spinning');
                    }, 1000);
                    $('.tab-prds').html(rs);
                    $(".slick-slider-product").not('.slick-initialized').slick({
                        dots: false,
                        infinite: true,
                        speed: 300,
                        autoplay: false,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        autoplaySpeed: 2000,
                        arrow: true,
                        prevArrow: '<div class="slick-nav prev-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
                        nextArrow: '<div class="slick-nav next-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
                        responsive: [{
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                    infinite: true,
                                    dots: true
                                }
                            },
                            {
                                breakpoint: 600,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }
                        ]
                    });
                }
            });
        });

        $('.navbar .toggle').on('click', function(evt) {
            evt.preventDefault();
            $('.navbar').toggleClass(CLASS.navbar_open);
        });
        $('.navbar-overlay').click(function() {
            $('.navbar').removeClass(CLASS.navbar_open);
        });
        $('#menu-toggle').click(() => {
            $('body').toggleClass(CLASS.overflow_x);
        });
        $('.menu .arrow').on('click', function(evt) {
            evt.preventDefault();
            const obj = $(this),
                parent = obj.parent('.menu-item');
            parent.toggleClass(CLASS.is_active);
        });

        $('.tab .tab-item').on('click', function(evt) {
            evt.preventDefault();
            let tabId = $(this).attr('href');

            $('.tab .tab-item').removeClass(CLASS.js_tab_active);
            $(this).addClass(CLASS.js_tab_active);
            $('.tab-body .tab-content').removeClass(CLASS.js_tab_active);
            $(tabId).addClass(CLASS.js_tab_active);
        });


        $('.openRightNav').click(function() {
            $('.icon-menu-moblie').toggleClass('open');
            $('.openRightNav').toggleClass('turn');
        });

        $('#js-click').click(function(event) {
            let menu_sort = $('.menu-items');
            let arrow = $('.icon-arrow');
            Element.prototype.hasClass = function(className) {
                return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
            }
            if (!menu_sort.hasClass('show')) {
                menu_sort.addClass('show');
                arrow.addClass('open');
                arrow.removeClass('close');
                event.preventDefault();
            } else {
                menu_sort.removeClass('show');
                arrow.removeClass('open');
                arrow.addClass('close');
                event.preventDefault();
            }
        });

        $('.js-show-sidebar').click(function() {
            let sidebar_show = $('.sidebar-nav');
            sidebar_show.toggleClass(CLASS.show_sidebar);
        });

        WINDOW.on('scroll', function() {
            if ($(this).scrollTop() > 100) {
                $('.icon-contact').fadeIn();
            } else {
                $('.icon-contact').fadeOut();
            }
        });

        $('#myBtn').on('click', function(evt) {
            evt.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, '1000');
        });

        // $("#slider-range").slider({
        //     range: true,
        //     min: 0,
        //     max: 5000,
        //     values: [0, 1000],
        //     slide: function(event, ui) {
        //         $("#amount").val(ui.values[0] + "₫ - " + ui.values[1] + "₫");
        //     }
        // });
        // $("#amount").val($("#slider-range").slider("values", 0) + '₫ - ' + $("#slider-range").slider("values", 1) + "₫");


    },
}