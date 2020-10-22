$(document).ready(function () {
    var storeId = $('#storeId').val();
    /*cookie*/

    /*var date = new Date();
    var minutes = 1;
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    $.cookie("example", "foo", { expires: date });*/


    if ($('.slider_index').length) {
        $('.slider_index').owlCarousel({
            loop: true,
            items: 1,
            nav: true,
            rewind: true,
            dots: false,
            autoplay: true,
            smartSpeed: 1800,
            margin: 10,
        });
    }
    if ($('.block_slide_products').length) {
        $('.block_slide_products').owlCarousel({
            loop: false,
            items: 5,
            nav: true,
            rewind: true,
            dots: false,
            autoplay: false,
            smartSpeed: 2800,
            autoplayTimeout: 2800,
            autoplaySpeed: 2800,
            margin: 10,
            responsive: {
                0: {
                    items: 2,
                },
                600: {
                    items: 3,
                },
                1024: {
                    items: 4,
                },
                1250: {
                    items: 5,
                }
            }
        });
    }
    if ($('.slide_news_index').length) {
        $('.slide_news_index').owlCarousel({
            loop: false,
            items: 1,
            nav: false,
            rewind: true,
            dots: true,
            autoplay: true,
        });
    }
    $('.btn-newsletter').click(function (e) {
        e.preventDefault();
        if ($('#vehicle1').is(":checked")) {
            $.post('/newsletter/subscribe', {'mail': $('#contactFormEmail').val()},
                function (rs) {
                    if (rs.code) {
                        $('#contactFormEmail').val('');
                    }
                    alert(rs.message);
                }
            );
        } else {
            alert('Vui lòng dồng ý điều khoản !');
        }
    });

    var ps = [];
    if ($('.product_box').length) {
        $('.product_box').each(function () {
            ps.push({id: parseInt($(this).attr('data-id')), code: 2, storeId: storeId});
        });
    }
    if (ps.length > 0) {
        getallchildimg(ps, function (rs) {
            if (rs.allImages != "") {
                $.each(rs.images, function (key, vl) {
                    $('.product_box[data-id="' + key + '"]').find('img').attr('data-hover', vl);
                })
            }
        });
    }
/*hover img*/
    $('.img_thumb_product').hover(function () {
        var t = $(this);
        var data_hover = t.attr('data-hover');
        if (data_hover) {
            $(this)
                .attr('tmp', t.attr('src'))
                .attr('src', t.attr('data-hover'))
                .attr('data-hover', t.attr('tmp'))
                .removeAttr('tmp');
        }
    }).each(function () {
        $('<img />').attr('src', $(this).attr('data-src'));
    });
    /*check hết hàng*/
    if (ps.length) {
        checkInventory(ps, function (rs) {
            if (rs.inventories != "") {
                $.each(rs.inventories, function (key, iv) {
                    if (iv <= 0) {
                        $('.product_box[data-id="' + key + '"]').append('<div class="outstock"><span>' + 'Hết hàng' + '</span></div>');
                    }
                });
            }
        });
    }

    $('.btn_filter').on('click', function () {
        $('.block_back_drop').slideToggle();
    });
    $('.btn_group_by').on('click', function () {
        $('.SortBy').slideToggle();
    });

    $(document).on('click', '.quickView', function () {
        var t = $(this);
        var proId = $(this).parents('.product_box').attr("data-id");
        t.parents('.product_box').addClass('load_quick');
            $.ajax({
                url: '/product/q' + proId,
                type: 'GET',
                dataType: 'text',
                success: function (data) {
                    $("#quickview_desktop").html(data);
                    $('#quickview_products').modal('show');
                    t.parents('.product_box').removeClass('load_quick');
                }
            });
    });
    /*th: không lọc = ajax*/
    if($('.js_Ajax').length){
        var price_max = $('#price_to');
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: price_max.attr('data-max'),
            values: [parseInt($('#price_form').attr('data-size')), parseInt($('#price_to').attr('data-size'))],
            slide : function (event, ui) {
                $('#price_form').text($.number(ui.values[0]) + 'đ').attr('data-size', ui.values[0]);
                $('#price_to').text($.number(ui.values[1]) + 'đ').attr('data-size', ui.values[1]);
            },
            stop : function (event, ui) {
                window.location.href = addFilter('price', ui.values[0] + ':'+ui.values[1], 3);
            }
        });
        $('.border_sort li').on('click',function () {
            let dataFilter= $(this).attr('value');
            window.location.href= dataFilter;
        });
    }
    if ($(window).width() > 1024) {
        $(window).scroll(function (event) {
            var pos_body = $('html,body').scrollTop();
            if (pos_body > 50) {
                $('.box_flex_header').addClass('fixed_desktop');
            } else {
                $('.box_flex_header').removeClass('fixed_desktop');
            }

        });
    }
    else{
        $("#boxMenu").mmenu();
    }
    if($('#popupHome.cookie').length){
        $('#popupHome.cookie').modal('show');
    }
    $('#contactFormSubmit-popup').click(function (e) {
        e.preventDefault();
        $.post('/newsletter/subscribe', {
                mail: $('#contactFormEmail-popup').val(),
                name: $('#contactFormName-popup').val(),
                mobile: $('#contactFormPhone-popup').val(),
            },
            function (rs) {
                if (rs.code == 1) {
                    $('#contactFormEmail-popup').val('');
                    $('#popupHome.cookie').modal('hide');
                }
                alert(rs.message);
            });
    });
});
var inputQuantity = $('#quantity');
function plusQuantity() {
    var max = parseInt(inputQuantity.attr('max')),
        qty = parseInt(inputQuantity.val());
    qty++;
    if (qty <= max) {
        inputQuantity.val(qty);
    } else {
        alert('Bạn không thể đặt quá số lượng còn lại của sản phẩm !');
    }
}
function minusQuantity() {
    var min = 1, qty = parseInt(inputQuantity.val());
    if (qty > min) {
        qty--;
        inputQuantity.val(qty);
    } else {
        alert('Bạn phải đặt số lượng tối thiểu là 1 sản phẩm !');
    }
}

