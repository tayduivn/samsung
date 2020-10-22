$(function () {

    let text = $('.show-left span'); 
    $('.show-cart').click(function () {
        $('.oder-checkout, .content-money, .pay-checkout , .ar-confirm').toggleClass('show-tog');

        if ($('.oder-checkout, .content-money, .pay-checkout , .ar-confirm').hasClass('show-tog')) {
            text.text("Ẩn thông tin đơn hàng");
            return false
        }
        return  text.text("Hiển thị thông tin đơn hàng");
    });

    $(function() {
        if ($('.cod[name="paymentMethod"]:checked')) {
            $('#baokimPmMethodId').val('cod');
        }
    
        $('input[name="paymentMethod"]').change(function() {
            var t = $(this),
                baokimId = $('#baokimPmMethodId');
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
        $('.listBank>span').click(function() {
            $('#baokimPmMethodId').val($(this).attr('data-baokimPmId'));
            $('.listBank>span').removeClass('active');
            $(this).addClass('active');
        });
    
        var isSubmited = false;
        $("#formCheckOut").validationEngine({
            scroll: false,
            onValidationComplete: function(form, status) {
                if (status && !isSubmited) {
                    isSubmited = true;
                    $.fancybox.open({
                        content: $("#progressbar"),
                        closeBtn: false,
                        padding: 0,
                        modal: true,
                        // afterShow: function() {
                        //     $("#progressbar").progressbar({
                        //         value: false
                        //     });
                        // }
                    });
                    $.post(
                        '/order/save?format=json', $('#formCheckOut').serialize(),
                        function(rs) {
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
    
        Address.load('#customcityId', '#customdistrictId', '#wardId');
        CheckCouponCode.load(
            '#customcityId',
            '#customdistrictId',
            '#coupon',
            '#getCoupon',
            '#txtCode',
            '#shipFee',
            '#showTotalMoney'
        );
        CustomerShipFee.load(
            '#customcityId',
            '#customdistrictId',
            '#shipFee',
            '#showTotalMoney',
            '#coupon',
        );
    })
})
