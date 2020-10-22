var storeId = document.getElementById('storeId').value;

var inputQuantity = jQuery('input[name="quantity"]');
var plusQuantity = function () {
    if (inputQuantity.val() != undefined) {
        var currentVal = parseInt(inputQuantity.val());
        if (!isNaN(currentVal)) {
            inputQuantity.val(currentVal + 1);
        } else {
            inputQuantity.val(1);
        }
    } else {
        console.log('error: Not see elemnt ' + inputQuantity.val());
    }
};
var minusQuantity = function () {
    if (inputQuantity.val() != undefined) {
        var currentVal = parseInt(inputQuantity.val());
        if (!isNaN(currentVal) && currentVal > 1) {
            inputQuantity.val(currentVal - 1);
        }
    } else {
        console.log('error: Not see elemnt ' + inputQuantity.val());
    }
};

function getCartModal() {
    var cart = null, siteNavMobile = $('#site-nav--mobile');
    jQuery('#cartform').hide();
    $('#site-overlay').addClass("active");
    $('.main-body').addClass("sidebar-move");
    siteNavMobile.addClass("active");
    siteNavMobile.removeClass("show-filters").removeClass("show-search").addClass("show-cart");
}


jQuery(document).ready(function () {
    if ($(".fancybox-album").length) {
        $(".fancybox-album").fancybox({
            fitToView: true,
            closeBtn: true,
            padding: 0
        });
    }

    $('.cancelOrder').click(function (e) {
        e.preventDefault();
        var msg = $('#dMsg');
        msg.html('<p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>');
        msg.dialog({
            title: "Thông báo", modal: true, show: 'scale',
            buttons: [
                {
                    text: "OK", click: function () {
                        $.post(
                            '/order/cancel', {id: $('.cancelOrder').attr('data-id')},
                            function (rs) {
                                window.location.reload();
                            },
                            'json'
                        );
                    }
                },
                {
                    text: "Cancel", click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });
    });



    if ($(window).width() < 768) {
        $('.footer-title').on('click', function () {
            $(this).toggleClass('active').parent().find('.footer-content').stop().slideToggle('medium');
        });
    } else {
        $('.footer-title').on('click', function () {
            $('.footer-content').stop().slideToggle('fast');
        });
    }

    var popupHomeCookie = $('#popupHome.cookie');
    if(popupHomeCookie.length){
        popupHomeCookie.modal('show');
    }

    $('body').on('click', '.cart_remove', function(){
        if((confirm(msgRemoveCartItem + ' ?') == true)){
            $.post(
                '/cart/remove',
                {'psId': $(this).attr('data-id')},
                function(){
                    ajaxLoadView({
                        view: 'cartSidebar',
                        onSuccess: function (rs) {
                            $("#site-cart>.site-nav-container-last").empty();
                            $("#site-cart>.site-nav-container-last").html(rs);
                            $('#myCart').modal('show');
                            $('.modal-backdrop').css({'height': jQuery(document).height(), 'z-index': '99'});
                            getCartModal()
                        }
                    });
                }
            );
        }
    });
});

// Mainmenu sidebar
$(document).on("click", "span.icon-subnav", function () {
    if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active');
        $(this).siblings('ul').slideUp();
    } else {
        if ($(this).parent().hasClass("level0") || $(this).parent().hasClass("level1")) {
            $(this).parent().siblings().find("ul").slideUp();
            $(this).parent().siblings().removeClass("active");
        }
        $(this).parent().addClass('active');
        $(this).siblings('ul').slideDown();
    }
});

//Click event to scroll to top
jQuery(document).on("click", ".back-to-top", function () {
    jQuery(this).removeClass('show');
    jQuery('html, body').animate({
        scrollTop: 0
    }, 800);
});

/* scroll */
jQuery(window).scroll(function () {
    /* scroll top */
    var backToTopBtn = jQuery('.back-to-top');
    if (backToTopBtn.length > 0 && jQuery(window).scrollTop() > 500) {
        backToTopBtn.addClass('show');
    } else {
        backToTopBtn.removeClass('show');
    }
    /* scroll header */
    if (jQuery(window).width() < 768) {
        var scroll = $(window).scrollTop();
        if (scroll < 320) {
            $(".main-header").removeClass("scroll-menu");
        } else {
            $(".main-header").addClass("scroll-menu");
        }
    } else {
        if (in_array(storeId, [70105, 11503])){
            var height_header = $('.fixed_scroll').height();
            if (jQuery(window).scrollTop() >= height_header) {
                jQuery('.fixed_scroll').addClass('affix-mobile');
            } else {
                jQuery('.fixed_scroll').removeClass('affix-mobile');
            }
        }
        else {
            var height_header = $('.main-header').height();
            if (jQuery(window).scrollTop() >= height_header) {
                jQuery('.main-header').addClass('affix-mobile');
            } else {
                jQuery('.main-header').removeClass('affix-mobile');
            }
        }
    }
});


// Menu sidebar
$(document).on('click', '.tree-menu .tree-menu-lv1', function () {
    $this = $(this).find('.tree-menu-sub');
    $('.tree-menu .has-child .tree-menu-sub').not($this).slideUp('fast');
    $(this).find('.tree-menu-sub').slideToggle('fast');
    $(this).toggleClass('menu-collapsed');
    $(this).toggleClass('menu-uncollapsed');
    var $this1 = $(this);
    $('.tree-menu .has-child').not($this1).removeClass('menu-uncollapsed');
});

// Dropdown Title
jQuery('.title_block').click(function () {
    $(this).next().slideToggle('medium');
});

$(document).on("click", ".dropdown-filter", function () {
    if ($(this).parent().attr('aria-expanded') == 'false') {
        $(this).parent().attr('aria-expanded', 'true');
    } else {
        $(this).parent().attr('aria-expanded', 'false');
    }
});

$(document).ready(function () {
    // nhanh.init();

    colorVariant();

    // this.quickview();
    $(document).on('click', '.quickView', function () {
        var proId = $(this).attr("data-id");
        $.ajax({
            url: 'product/q' + proId,
            type: 'GET',
            dataType: 'text',
            success: function (data) {
                $("#quickview-cart-desktop").html(data);
                $('#quickview-cart').modal('show');
            }
        });
    });

    $(document).on('click', '.close-quick-view', function () {
        $('#quickview-cart').modal('hide');
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('#bttop').fadeIn();
        } else {
            $('#bttop').fadeOut();
        }
    });

    $('#bttop').click(function () {
        $('body,html').animate(
            {scrollTop: 0}, 800);
    });

    // this.mmMenu();

        if ($(window).width() < 1200) {
            if (!in_array(storeId, [63398, 15113])) {
                $('#menu-mobile').mmenu();
            }
            flagg = true;
            if (flagg) {
                $('.hamburger-menu').click(function () {
                    $('#menu-mobile').removeClass('hidden');
                    flagg = false;
                })
            }
        } else {
            $("#menu-mobile").remove();
        }


    $(".filterSmallScreen").click(function () {
        $("body").addClass("openFilter");
    });
    $(".btn_filter_cancel, .innerSidebarFilter .filterTitle .fa").click(function () {
        $("body").removeClass("openFilter");
    });

    // this.removeDiv();
    if ($(window).width() < 992) {
        $(".removeMobile").remove();
    } else {
        $(".removeDesktop").remove();
    }

    setTimeout(function () {
        var height = $("#site-header").outerHeight();
        $(".outerHeightHeader").css("min-height", height);
    }, 100);

    // Check Out Of Stock Script
    if($('body .pro-loop').length){
        var ps = [];
        $('.pro-loop').each(function(){
            ps.push({
                storeId: storeId,
                id: $(this).attr('data-Id')
            });
        });

        if(ps.length){
            checkInventory(ps, function(rs){
                if(rs.inventories != ""){
                    $.each(rs.inventories, function(Id, ivt){
                        if(ivt <= 0){
                            $('.pro-loop[data-Id="'+ Id +'"]').find('.product-img.image-resize').append('<div class="out-of-stock">Hết hàng</div>');
                        }
                    });
                }
            });
        }
    }
    // *****-----
});

// this.colorVariant()
function colorVariant () {
    $(".variantColor li").hover(function (e) {
        e.preventDefault();
        $(this).parents(".variantColor").find("li").removeClass("active");
        $(this).addClass("active");
        var imgVariant1 = $(this).find("a").attr("data-img");
        var imgVariant2 = $(this).find("a").attr("data-img-hover");
        $(this).parents(".product-block").find(".product-img picture:nth-child(1) img").attr("src", imgVariant1);
        $(this).parents(".product-block").find(".product-img picture:nth-child(2) img").attr("src", imgVariant2);
    });
}
