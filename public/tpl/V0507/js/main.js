$(document).ready(function() {

    // menu mobile
    $('.header__menu--list .icon__menu').on('click', function (evt) {
        evt.preventDefault();
        $('.header__menu--list').toggleClass('navbar-open');
    });
    
    $('.menu__main .arrow').on('click', function (evt) {
        evt.preventDefault();
        const obj = $(this),
            parent = obj.parents('.menu-item');

            parent.toggleClass('is-active');
    });
    
    $('.header__menu--list-overlay').on('click', function (evt) {
        $('.header__menu--list').removeClass('navbar-open');
    });
    // End

    /*Click active menu*/
    const currentLocation = location.href;
    const menuItem = $('.menu-link');
    const menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem[i].classList.add("link_active");
        }
    }
    /*End click active menu*/


    // show table price
    $('#showCarrier').click(function (){
        $('#tableShipFee ').css('display' , 'block');
    });
    // end

    // banner popup
    if (getCookie('popupCookie') != 'closed') {
        $('.content__banner--popup').css("display", "flex").hide().fadeIn();
    }
    $('.btn-closed').click(function() {
        $('.content__banner--popup').fadeOut();
        setCookie('popupCookie', 'closed', .00069444444);
    });
    // end

    if($(window).width() <= 1024 ) {
        $('.sub__menu--new').addClass('sub__menu');
        $('.sub__menu--new').removeClass('sub__menu--new');
        $('.header__menu--list--sup').removeClass('header__menu--list--sup');
    }

    // selection image
    $('.pattern img').click(function(){
        var attr = $(this).attr('src');
        $('.zoomWindow').css('background-image', 'url(' + attr + ')');
        $('.imgBox:first-child img').attr('src',$(this).attr('src'));
        $('.pattern-img img').addClass('intro');
        $(this).removeClass('intro');
    });
    
    $('.choose > img').on('click', function () {
        var attr = $(this).attr('src');
        $('.zoomWindow').css('background-image', 'url(' + attr + ')');
        $('.imgBox:first-child img').attr('src',$(this).attr('src'));
        $('.choose img').removeClass('choose-img');
        $(this).addClass('choose-img');
        return false;
    });
    // end
        
    $('.icon__mobile-search > i').on ('click', function () {
        $('.search__mobile').addClass('show-search');
        $('.over-search').css('display','block');
    });

    $('.but-close').on('click', function () {
        $('.search__mobile').removeClass('show-search');
        $('.over-search').css('display','none');
    });
    
    $('.over-search').on('click', function () {
        $('.search__mobile').removeClass('show-search');
        $('.over-search').css('display','none');
    });

    $('.inLogin').click(function () {
        $('.text-email').toggleClass('pos_login');
    });
    
    $(window).scroll(function() {
        var menuTop = $('html, body').scrollTop();
        if ( menuTop > 20 ) {
            $('.header__menu').addClass('menuFix');
        } else {
            $('.header__menu').removeClass('menuFix');
        }
    });

    // login mail
    $('#button_submit').click(function(e) {
        // let email_notifications = $('.js-email-notifications');
        e.preventDefault();
        $.post('/newsletter/subscribe', { 'mail': $('#input_email').val(), 'gender': 1 },
            function(rs) {
                if (rs.code) {
                    $('#input_email').val('');
                }
                alert(rs.message);
            }
        );
    });
    // Endl

    // show menu footer
    if($(window).width() <= 736 ) {
        $('.list__footer--item').addClass('hide__list-footer');
    }
    $.fn.extend({
        setMenu:function () {
            return this.each(function() {
                var containermenu = $(this);
    
                var itemmenu = containermenu.find('.show-all');
                itemmenu.click(function () {
                    var submenuitem = containermenu.find('.hide__list-footer');
                    submenuitem.slideToggle(1);
                });
    
                $(document).click(function (e) {
                    if (!containermenu.is(e.target) &&
                        containermenu.has(e.target).length === 0) {
                        var isopened =
                            containermenu.find('.hide__list-footer').css("display");
    
                        if (isopened == 'block') {
                            containermenu.find('.hide__list-footer').slideToggle(1);
                        }
                    }
                });
            });
        },
    
    });
    $('.content__footer--item').setMenu();
    // end

    var ps = [];
    var storeId = $('#storeId').val();
    if ($('.product_box').length) {
        $('.product_box').each(function () {
            ps.push({id: parseInt($(this).attr('data-id')), code: 2, storeId: storeId});
        });
    }
    if (ps.length > 0) {
        getallchildimg(ps, function (rs) {
            if (rs.allImages != "") {
                $.each(rs.images, function (key, img) {
                    $('.product_box[data-id="' + key + '"]').find('img').attr('data-hover', img);
                })
            }
        });
    }

    $('.img_thumb_product').hover(function () {
        var t = $(this);
        var data_hover = t.attr('data-hover');
        if(data_hover) {
            $(this)
                .attr('tmp', t.attr('src'))
                .attr('src', t.attr('data-hover'))
                .attr('data-hover', t.attr('tmp'))
                .removeAttr('tmp');
        }
    }).each(function () {
        $('<img />').attr('src', $(this).attr('data-src'));
    });
});

function setCookie  (cname, cvalue, exdays) {
    const days = new Date();
    days.setTime(days.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires" + days.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
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
}
