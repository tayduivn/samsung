var storeId = $('.checkStoreId').val();
$(function () {
    $('.removeCartItem').click(function () {
        var id = $(this).attr('rel');
        if (confirm("Bạn có muốn xóa sản phẩm này?") == true) {
            removeCart(id, true, null);
        }
    });



	Address.load('#customcityId', '#customdistrictId');
    //
    // $('#chooseAbook').change(function () {
    //     if ($(this).is(':checked')) {
    //         $('#addressBook').slideDown();
    //     } else {
    //         $('#addressBook').slideUp();
    //     }
    // });

    $('input[name="checkBoxGift"]').change(function () {
        window.location.href = $(this).val();
    });

    /*------------------------------------------------------------------------get coupon*/
    CheckCouponCode.load('#customcityId','#customdistrictId', '#discount_code','#getCoupon', '#txtCode', '#ship_fee','#showTotalMoney');
    CustomerShipFee.load('#customcityId','#customdistrictId','#ship_fee', '#showTotalMoney', '#coupon');

    $('input[name="bkVpoint"]').keyup(function () {
        var t = $(this), num_only = /^\d+$/,
            max = parseInt(t.attr('data-max'));
        if (!t.val().match(num_only)) {
            t.val(0);
        }
        if (t.val() > max) {
            t.val(max);
        }
    });

    /*------------------------------------------------------------------------chosse payment menthod*/
    $('input[name="paymentMethod"]').change(function () {
        var t = $(this), baokimId = $('input[name="baokimBankPaymentMethodId"]');
        var parent = $(this).parents('div.b');
        $('input[name="paymentMethodName"]').val(t.attr('title'));
        $('.listBank.active .notice').html(msgSelectBank);
        baokimId.removeAttr('value');
        $('input[name="bankName"]').removeAttr('value');
        if (t.hasClass('baokim')) {
            baokimId.val('Baokim');
        }
        if (t.hasClass('cod')) {
            baokimId.val('cod');
        }
        if (t.hasClass('online')) {
            baokimId.val(t.val());
        }
        $('.listBank').slideUp();
        $('.listBank>span').removeClass('active');
        parent.find('.listBank').slideDown();
        $('.listBank .bankItem').removeClass('active');
        $(t.attr('data-show')).addClass('active');

        if (t.hasClass('default')) {
            baokimId.val(t.attr('data-baokimPmId'));
        }
        if (in_array(storeId,[64529, 24031])) {
            $('.showtext').slideUp('medium');
            $(this).parent().siblings('.showtext').slideDown('medium');
        }

        if(t.hasClass('payment_qr')){
            $('.descriptionCustomer textarea').val('Thanh toán quét mã qr');
            baokimId.val('payment_qr');
        }else if(t.hasClass('payment_online')) {
            $('.descriptionCustomer textarea').val('Thanh toán chuyển khoản');
            baokimId.val('payment_online');
        }else{
            $('.descriptionCustomer textarea').val('');
        }
    });

    if($('input[name="checkBoxGiftInfor"]').length){
        $('input[name="checkBoxGiftInfor"]').change(function () {
            if($(this). prop("checked") == true){
                $('.blockTo').slideDown();
            }else{
                $('.blockTo').slideUp();
            }
        });
    }

    $('.listBank>span').click(function () {
        $('#baokimPmMethodId').val($(this).attr('baokimPmId'));
        $('.listBank>span').removeClass('active');
        $(this).addClass('active');
    });

    $('.listBank .bankItem').click(function () {
        $('input[name="baokimBankPaymentMethodId"]').val($(this).attr('data-baokimPmId'));
        $('input[name="bankName"]').val($(this).attr('title'));
        $('.listBank .bankItem').removeClass('active');
        $(this).addClass('active');
        $(this).parent('.listBank').find('.notice').html( msgSelected + ': <b>' + $(this).attr('title') + '</b>');
    });


    var isSubmited = false;
    $("#formCheckOut").validationEngine({
        scroll: false,
        onValidationComplete: function (form, status) {
            if (status && !isSubmited) {
                isSubmited = true;
               if (!$('#baokimPmMethodId').val()) {
                   alert('Quý khách vui lòng chọn hình thức chuyển khoản');
                   isSubmited = false;
                   return;
               }
                $.fancybox.open({
                    content: $("#progressbar"),
                    closeBtn: false,
                    padding: 0,
                    modal: true
                });
                $.post(
                    '/order/save?format=json', $('#formCheckOut').serialize(),
                    function (rs) {
                        if (rs.code) {
                            if (rs.redirect) {
                                window.location.href = rs.redirect;
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
});
