const $ = jQuery;

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
    active_img: 'js-active-img'
};

const APP = {
    init: function() {
        $('.navbar .toggle').on('click', function(evt) {
            evt.preventDefault();
            $('.navbar').toggleClass('navbar-open');
        });
        $('.navbar-overlay').click(function() {
            $('.navbar').removeClass('navbar-open');
        });
        $('.menu .arrow').on('click', function(evt) {
            evt.preventDefault();
            const obj = $(this),
                parent = obj.parent('.menu-item');
            parent.toggleClass(CLASS.is_active);
        });
        $('.marquee').mouseover(function(e) {
            APP.textAnimation();
            $('.marquee').css(
                "animation-play-state", "paused"
            );
        });
        $('.marquee').mouseout(function(e) {
            APP.textAnimation();
            $('.marquee').css(
                "animation-play-state", "running"
            );
        });
        let previousScroll = 0;
        WINDOW.scroll(function() {
            let currentScroll = $(this).scrollTop();
            if (currentScroll > 0) {
                if (currentScroll > previousScroll) {
                    window.setTimeout(APP.showNav(), 300);
                } else {
                    window.setTimeout(APP.hideNav(), 300);
                }
                previousScroll = currentScroll;
            }
        });

        $('.openRightNav').click(function() {
            $('.icon-menu-moblie').toggleClass('open');
            $('.openRightNav').toggleClass('turn');
        });
        $('.title-contact').click(function() {
            $('#js-form-message').toggleClass('form-message__show');
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
        $('#js-hide').click(function() {
            let sidebar_show = $('.sidebar-nav');
            sidebar_show.removeClass(CLASS.show_sidebar);
        });
        $('.radio-sidebar label').click(function() {
            let attr = $(this).attr('title');
            window.location.href = attr;
        });

        $('.sort-active a').click(function() {
            let attr = $(this).attr('title');
            window.location.href = attr;
        });

        /*Click active menu*/
        const currentLocation = location.href;
        const menuItem = $('.menu');
        const menuLength = menuItem.length;
        for (let i = 0; i < menuLength; i++) {
            if (menuItem[i].href === currentLocation) {
                menuItem[i].classList.add("menu-active");
            }
        }
        /*End click active menu*/

        /*Dropdown Menu*/
        $('.dropdown').click(function() {
            $(this).attr('tabindex', 1).focus();
            $(this).toggleClass('active');
            $(this).find('.dropdown-menu').slideToggle(300);
        });
        $('.dropdown').focusout(function() {
            $(this).removeClass('active');
            $(this).find('.dropdown-menu').slideUp(300);
            // $(this).find('.dropdown-menu li').addClass('active');
        });
        $('.dropdown .dropdown-menu li').click(function() {
            $(this).parents('.dropdown').find('span').text($(this).text());
            $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
        });
        $('.dropdown .dropdown-menu li a').each(function() {
            if ($(this).hasClass('active')) {
                $(this).addClass('text-danger');
                let title_filter = $(this).parents('.trademark').find('.dropdown .select span');
                let text = $(this).text();
                title_filter.text(text);
            }
        });
        /*End Dropdown Menu*/

        /*Input mail*/
        $('#buttonSubs').click(function(e) {
            let email_notifications = $('.js-email-notifications');
            e.preventDefault();
            $.post('/newsletter/subscribe', { 'mail': $('#subsInput').val(), 'gender': 1 },
                function(rs) {
                    console.log(rs);
                    if (rs.code) {
                        $('#subsInput').val('');
                    }
                    alert(rs.message);
                }
            );
        });
        /*End input Mail*/

        /* Click get url image index */
        $('.card-button').click(function() {
            $('.card-button').removeClass("js-active");
            $(this).addClass("js-active");
            $(this).parents('.card').find('.card-thumb img').attr('src', $(this).find('span').attr('data-src'));
        });
        /* End click get url image index */

        /*Search moblie */
        $('.icon-search__moblie').click(function() {
            $('.navbar-body').addClass('search-active');
        });
        $('.submit-search').click(function() {
            $('.navbar-body').removeClass('search-active');
        });

        /* Click Scroll Top Button */
        WINDOW.on('scroll', function() {
            if ($(this).scrollTop() > 100) {
                $('.back-top').fadeIn();
            } else {
                $('.back-top').fadeOut();
            }
        });

        $('.back-top').on('click', function(evt) {
            evt.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, '1000');
        });
        /* End Scroll Top Button */

        /* Custom checkbox slidebar product */
        $('.radio-sidebar .square').click(function() {
            let attr_checkbox = $(this).data('href');
            $('.radio-sidebar .square').removeClass('js__square--active');
            $(this).addClass('js__square--active');
            window.location.href = attr_checkbox;

        });
        const currentLocation_checkBox = location.href;
        const checkBox_Item = $('.radio-sidebar');
        const checkBox_length = checkBox_Item.length;
        for (let i = 0; i < checkBox_length; i++) {
            if (checkBox_Item[i].href === currentLocation_checkBox) {
                checkBox_Item[i].classList.add('js__square--active');
            }
        }
        /* End custom checkbox slidebar product */

        $('.dropdown-menu .sort-active a').click(function() {
            let attr = $(this).attr('title');
            window.location.href = attr;
        });

        // hover image 
        var psImg = [],
            proLoop = $('.slick-item');
        if (proLoop.length) {
            proLoop.each(function() {
                psImg.push({ id: $(this).attr('data-id'), code: 2, storeId: $(this).attr('data-storeId') });
            });
        }

        if (psImg.length && window.innerWidth > 1024) {
            getallchildimg(psImg, function(rs) {
                if (rs.allImages != "") {
                    $.each(rs.images, function(key, src) {
                        $('.slick-item[data-id="' + key + '"]')
                            .find('.card-thumb a').addClass('added')
                            .append('<img class="img-hover" src="' + src + '" alt="' + src + '"/>');
                    });
                }
            });
        }

        /* Cookie popup */

        //check to see if the submited cookie is set, if not check if the popup has been closed, if not then display the popup
        if (APP.getCookie('popupCookie') != 'closed') {
            $('.popup-overlay').css("display", "flex").hide().fadeIn();
        }
        $('.btn-closed').click(function() {
            $('.popup-overlay').fadeOut();
            APP.setCookie('popupCookie', 'closed', .00069444444);
        });
        /* End cookie popup */
    },

    getCookie: function(cname) {
        const name = cname + "=";
        const ca = document.cookie.split(';');
        for (let index = 0; index < ca.length; index++) {
            var ck = ca[index];
            while (ck.charAt(0) == ' ') {
                ck = ck.substring(1);
            }
            if (ck.indexOf(name) == 0) {
                return ck.substring(name.length, ck.length);
            }
        }
        return "";
    },

    setCookie: function(cname, cvalue, exdays) {
        const days = new Date();
        days.setTime(days.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires" + days.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },

    textAnimation: function() {
        let marquee = $('.marquee');
        let marqueeLength = marquee.width();
        let marqueeTravelTime = Math.ceil(marqueeLength / 100);
        marquee.css(
            'animation', `scrollLeft ${marqueeTravelTime}s linear infinite`
        );
    },

    showNav: function() {
        let show = $("[data-nav-status='toggle']");
        show.removeClass("is-visible").addClass('is-hidden');
    },
    hideNav: function() {
        let hiden = $("[data-nav-status='toggle']");
        hiden.removeClass("is-hidden").addClass('is-visible');
    },

    goBack: function() {
        window.history.back();
    }
}