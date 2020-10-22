var storeId = document.getElementById('storeId').value;

$(document).ready(function() {
    if ($('#load-purchase-product').length) {
        // load sản phẩm fake
        ajaxLoadView({
            view: 'purchaseProduct',
            delay: 1000,
            onSuccess: function (rs) {
                $('#load-purchase-product').html(rs)
            }
        });
    }
    if ($('#phistory-bar').length) {
        ajaxLoadView({
            view: 'productHistory',
            delay: 1000,
            onSuccess: function (rs) {
                $("#phistory-bar").html(rs);
            }
        });
    }


    //load nội dung giỏ hàng
    if ($(window).width() >= 768) {
        ajaxLoadView({
            view: 'cartSidebar',
            delay: 500,
            onSuccess: function (rs) {
                $("#site-cart>.site-nav-container-last").html(rs);
            }
        });


    }

    /*-------------subscribe---------*/
    $('.btn-newsletter').click(function () {
        var newsletter_input = $('.newsletter-input');
        if (newsletter_input.val() == '') {
            alert('Vui lòng điền đầy đủ thông tin');
        } else {
            $.post('/newsletter/subscribe', {mail: newsletter_input.val()},
                function (rs) {
                    if (rs.code) {
                        newsletter_input.val('');
                    }
                    alert(rs.message)
                }
            );
        }
    });

    $(".send_contact").on('click', function() {
        $.post(
            '/contact/contacts',
            {
                'content' : $('.content_register').val(),
                'name' : $('.name_register').val(),
                'email' : $('.email_register').val(),
                'mobile' : $('.mobile_register').val(),
                'address' : $('.address_register').val()
            },
            function(rs){
                if (rs.code == 1) {
                    alert(rs.message);
                    location.reload();
                } else {
                    alert(rs.message);
                }
            }
        );
    });

    setTimeout(function () {
        animation_check();
    }, 100);

    function animation_check() {
        var scrollTop = $(window).scrollTop() - 300;
        $('.animation-tran').each(function () {
            if ($(this).offset().top < scrollTop + $(window).height()) {
                $(this).addClass('active');
            }
        })
    }

    $(window).scroll(function () {
        animation_check();
    });

    //-------------- getChildimg ----------------
    var psImg = [], proLoop = $('.pro-loop');
    if (proLoop.length) {
        proLoop.each(function () {
            psImg.push({id: $(this).attr('data-id'), code: 2, storeId: storeId});
        });
    }
    if (psImg.length && window.innerWidth > 1024) {
        getallchildimg(psImg, function (rs) {
            if (rs.allImages != "") {
                $.each(rs.images, function (key, src) {
                    $('.pro-loop[data-id="'+ key +'"]')
                        .find('.p-img-box').addClass('added')
                        .append('<picture><img class="img-loop img-hover" src="'+ src +'" alt="'+src+'"/></picture>');
                });
            }
        });
    }


    /*****************************************************
     * Product Whishlist Cookie
     * ****************************************************/
    $('a.wishlistItems').click(function () {
        var t = $(this);
        if(t.hasClass('active')){
            window.location.href = '/wishlist'
        } else {
            $.post(
                '/product/wishlistcookie', {
                    'productId': t.attr('data-id'),
                    'type': 5
                },
                function (rs) {
                    var mes = $('#dialogMessage');
                    if (rs.code == 1) {
                        t.addClass('active');
                    } else {
                        mes.html('<p><span class="ui-icon ui-icon-notice" style="float: left; margin: 0 10px 40px 0;"></span>' +
                            rs.messages + '</p>');
                    }
                },
                'json'
            );
            setTimeout(function () {
                $('.tooltip.left').hide();
            },2000);
        }
    });
});