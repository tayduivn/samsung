$(document).ready(function () {
    Address.load('#cityId', '#districtId');

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
    $('.color-swatches .color-item').click(function () {
        $('.color-swatches .color-item.active').removeClass("active");
        $(this).addClass("active");
        $(this).parents('.proIndexItem').find('.proImg .imageChange').attr('src', $(this).attr('data-img'))
    });
    /* - - - -  -- - - - -  owlCarousel js - - -  - - - - - - - - - - */
   /* if($("body .customer .owl-carousel .item").length) {
        $(".customer .owl-carousel").owlCarousel({
            autoplay:false,
            autoplayTimeout:2500,
            autoplayHoverPause:true,
            loop:true,
            addEq: true,
            dots:true,
            items:1,
            singleItem:true,
            responsive:{
                480:{
                    items:2
                },
                1200:{
                    items:5,
                }
            }
        });
    }*/
    if($("body .siderBar2 ul").length) {
        $(".siderBar2 ul.owl-carousel").owlCarousel({
            autoPlay: true,
            items:1,
            loop:true,
            lazyLoad:true,
            dots:true,
        });
    }
    if($("body .brandFooter .item").length) {
        $(".brandFooter").owlCarousel({
            autoplay:true,
            autoplayTimeout:3500,
            autoplayHoverPause:true,
            loop:false,
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
                },
                1366:{
                    items:6,
                }
            }
        });
    }
    if($("body #slideCustomer").length) {
        $("#slideCustomer").owlCarousel({
            autoplay:true,
            autoplayTimeout:3500,
            autoplayHoverPause:true,
            lazyLoad: true,
            loop:false,
            nav:true,
            dots:false,
            items:1,
        });
    }
    /* - - - -  -- - - - - End owlCarousel js - - -  - - - - - - - - - - */

    $('.buyNow').click(function () {
        var t = $(this);
        //alert(t.attr('data-buy'));
        if (t.attr('data-buy') == 1) {
            var products = [], ps = {};
            ps['id'] = parseInt($(this).attr('data-id'));
            ps['quantity'] = 1;
            products.push(ps);
            addToCart(products, 1, function (rs) {
                if (rs.status == 1) {
                    // ajaxLoadView({
                    //     view: 'popupCart',
                    //     onSuccess: function (rs) {
                    //         $('#myModal').html(rs);
                    //     }
                    // });
                    window.location.href = '/cart';
                } else {
                    $('.fade.in').hide();
                    var mes = $('#dMsg');
                    mes.html('<p><span class="ui-icon ui-icon-help" style="float: left; margin: 0 10px 40px 0;"></span>' +
                        'Sản phẩm hết hàng' + '</p>');
                    mes.dialog({
                        title: "Cảnh báo!", modal: true, show: "explode", hide: "explode",
                        buttons: [
                            {
                                text: "Ok", click: function () {
                                location.reload();
                            }
                            },
                            {
                                text: "Cancel", click: function () {
                                $(this).dialog("close");
                            }
                            }
                        ]
                    });
                }
            });
        }
    });
    $('.close_banner_ev').click(function () {
        $('.ban-ev-bot-foot').hide();
    });
    if($(window).width() > 768){
        $('.ban-ev-bot-foot').show();
    }else{
        $('.ban-ev-bot-foot').hide();
    }
    var div = $("#bnFooter");
    $(".leftCbanner").click(function(){
        div.animate({left: '-150px'}, "slow");
        $(this).hide();
        $('.rightCbanner').show();
    });
    $(".rightCbanner").click(function(){
        div.animate({left: '0'}, "slow");
        $(this).hide();
        $('.leftCbanner').show();
    });
    $('.removeAddress').click(function (e) {
        e.preventDefault();
        if (confirm("Qúy khách muốn xóa địa chỉ này?") == true) {
            $.post('/address/removebook', {'id': $(this).attr('href')},
                function (rs) {
                    if (rs.code == 1) {
                        document.location.href = document.URL;
                    }
                }, 'json'
            );
        }
    });
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

    $('.buttonSubs').click(function (e) {
        e.preventDefault();
        $.post('/newsletter/subscribe', {'mail': $('#subsInput').val(), 'gender': 1},
            function (rs) {
                if (rs.code) {
                    $('#subsInput').val('');
                }
                alert(rs.message);
            }
        );
    });
    $('.shop99_deamonLink').click(function (e) {
        e.preventDefault();
        window.location.href = $(this).attr('data-link');
    });
    if ($(window).width() <= 768) {
        $("div#boxMenu").mmenu({
            slidingSubmenus: false
        });
        $('#childCate > h3').click(function () {
            $('#subMenuCate').slideToggle("fast");
        });
        $('#socialBar > h3').click(function () {
            $('#socialBar > ul').slideToggle("fast");
        });
        $('#brandBar > h3').click(function () {
            $('#brandBar > ul').slideToggle("fast");
        });
        $('#proSaleBar > h3').click(function () {
            $('#proSaleBar > ul').slideToggle("fast");
        })
    }

    var ps = [];
    if ($('body .proIndexItem').length) {
        $('.proIndexItem').each(function () {
            var t = $(this);
            ps.push({storeId: t.attr('data-storeId'), id: t.attr('psId')});
        });
        InventoryLoad(ps);
    }

 /*   $(this).bind("contextmenu", function(e) {
        e.preventDefault();
    });*/
});
function InventoryLoad(ps) {
    if (ps.length) {
        checkInventory(ps, function (rs) {
            if (rs.inventories != "") {
                $.each(rs.inventories, function (key, vl) {
                    if (vl <= 0) {
                        $('.proIndexItem[psId="'+key+'"] .inventory').css({
                            display:'block',
                            bottom:'auto',
                            top:'50%',
                        });
                        $('.proIndexItem[psId="'+key+'"] .buyNow').text('Hết hàng').css({
                            background:'#717170',
                            border:'1px solid #717170'
                        });
                    }
                });
            }
        });
    }
}