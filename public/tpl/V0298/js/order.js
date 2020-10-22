$(function () {
    if($(".datepicker").length){
        $( ".datepicker" ).datepicker({ dateFormat: 'dd/mm/yy' });
    }
    // $('.section-customer-information .section-content-text').hide();
    // if ( window.location.href.includes('checkout') ) {
    //     $('#form_update_location').parent().append('<h3 class="notice" style="color:#f77705;font-style:italic;margin: 1.5em auto 0.3em 5px;">Vui lòng nhập đầy đủ thông tin địa chỉ để nhận hàng nhanh hơn!</h3>');
    //     $('.order-summary.order-summary-is-collapsed').find('h3').remove();
    //     $('.order-summary.order-summary-is-collapsed').append('<h3 class="notice-checkout" style="font-weight: 400; padding: 10px; border: 1px solid #f77705; line-height: 18px; margin: 0;">Juno sẽ XÁC NHẬN đơn hàng bằng TIN NHẮN SMS hoặc GỌI ĐIỆN. Bạn vui lòng kiểm tra TIN NHẮN hoặc NGHE MÁY ngay khi đặt hàng thành công và CHỜ NHẬN HÀNG</h3>');
    // }
    // $('input[data-discount-field="true"]').closest('.fieldset').prepend('<div style="color:#f77705;margin-left:9px;font-weight:bold;display:none;">Nhập mã giảm giá tại đây (nếu có)</div>')

    Address.load('#cityId', '#districtId');
    $('input[name="paymentMethod"]').change(function () {
        var t = $(this), baokimId = $('#baokimPmMethodId');
        if ($(t.attr('data-show')).length) {
            baokimId.removeAttr('value');
        } else {
            baokimId.val('Baokim');
        }
        if (t.hasClass('baokim')) {
            baokimId.val('Baokim');
        }
        if (t.hasClass('cod')) {
            baokimId.val('cod');
        }
        $('.transfer-infor').slideUp();
        $('.listBank').slideUp();
        $('.listBank>span').removeClass('active');
        $(t.attr('data-show')).slideDown();
    });
    $('.transfer-infor').slideUp();
    $('.transfer').change(function () {
        $('.transfer-infor').slideDown();
        $('.listBank').slideUp();
    });

    $('.listBank>span').click(function () {
        $('#baokimPmMethodId').val($(this).attr('data-baokimPmId'));
        $('.listBank>span').removeClass('active');
        $(this).addClass('active');
    });

    if ($('.cod[name="paymentMethod"]:checked')) {
        $('#baokimPmMethodId').val('Baokim');
    }
    $('input[name="checkBoxGift"]').change(function () {
        window.location.href = $(this).val();
    });

    CheckCouponCode.load('#cityId', '#districtId', '#coupon', '#getCoupon', '', '#shipFee', '#showTotalMoney');
    CustomerShipFee.load('#cityId', '#districtId', '#shipFee', '#showTotalMoney', '#coupon');

    var isSubmited = false, viewSuccess = $('#viewSuccess').val();
    $("#formCheckOut").validationEngine({
        scroll: false, binded: false, showOneMessage: true,
        onValidationComplete: function (form, status) {
            if (status && !isSubmited) {
                isSubmited = true;
                if (!$('#baokimPmMethodId').val()) {
                    alert('Quý khách vui lòng chọn hình thức chuyển khoản');
                    isSubmited = false;
                    return;
                }
                $.fancybox({content: $("#progressbar"), closeBtn: false, padding: 0, modal: true});
                $.post(
                    '/order/save?format=json', $('#formCheckOut').serialize(),
                    function (rs) {
                        if (rs.code) {
                            if (rs.redirect) {
                                if (viewSuccess == 'popup') {
                                    window.location.href = rs.redirect + '?view=popup';
                                } else {
                                    window.location.href = rs.redirect;
                                }
                            }
                        } else {
                            $.fancybox.close();
                            isSubmited = false;
                            alert(rs.messages.join('\n'));
                        }
                    },
                    'json'
                );
            }
        }
    });
    // check mã giảm giá
    $('#getCoupon').click(function () {
        var ttmoney = $('#getMn').val(), date = new Date() /*s = $('#getShipFee').val()*/;
        var ship = ($('#shipFee').text().replace(/\D/g, ''));
        ttmoney = parseInt(ttmoney) + parseInt(ship);
        $.post(
            '/promotion/checkcoupon', {couponCode: $('#coupon').val()},
            function (rs) {
                if (rs.code) {
                    $('#showTotalMoney').html($.number(ttmoney - rs.value) + ' đ');
                    $('#txtCode').html(txtCoupon+': <strong>-'+$.number(rs.value)+'đ</strong>');
                    $('#txtCode').css('display', 'block');
                } else {
                    alert('Bạn chưa nhập mã giảm giá hoặc mã giảm giá đã hết hạn!');
                }
            },
            'json'
        );
    });
    $('.cart_remove').on('click', function () {
        var psId = $(this).attr('data-id');
        var check = confirm('Bạn muốn xóa sản phẩm này ?');
        if (check) {
            $.post(
                '/cart/remove',
                {'psId': psId},
                function () {
                    window.location.reload();
                }
            );
        }
    });
    $('.quantity-partent .add-action').on('click', function () {
        var qta = $(this).parent().find('.item-quantity');
        var products = [], ps = {};
        if ($(this).hasClass('add-up')) {
            if (parseInt(qta.val()) < parseInt(qta.attr('max'))) {
                ps['id'] = qta.attr('data-id');
                ps['quantity'] = (parseInt(qta.val()) + 1);
                products.push(ps);
                addToCart(products, 2, function (rs) {
                    location.reload();
                });
            }else{
                alert('không thể đặt vượt quá số lượng cho phép !!');
            }
        } else {
            if (parseInt(qta.val()) > 1) {
                ps['id'] = qta.attr('data-id');
                ps['quantity'] = (parseInt(qta.val()) - 1);
                products.push(ps);
                addToCart(products, 2, function (rs) {
                    location.reload();
                });
            }else{
                alert('không thể đặt số lượng nhỏ hơn 1 !!')
            }
        }
    });
});
