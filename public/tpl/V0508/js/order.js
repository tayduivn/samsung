const CLASSORDER = {
    show:'show',
    hidden:'hidden',
    active:'active',
}
/*---- load ADDRESS - Checkout page ----*/
$(function () {
    $('.order-sumary-total-toggle-show').click(function () {

        $(this).toggleClass(CLASSORDER.hidden);

        $(this).toggleClass(CLASSORDER.show);

        if($('.order-sumary-total-toggle-show').hasClass(CLASSORDER.show)){
            $('.order-title-name-hidden').addClass(CLASSORDER.hidden).removeClass(CLASSORDER.show);
            $('.order-title-name-show').addClass(CLASSORDER.show).removeClass(CLASSORDER.hidden);
            $('.block-customer-vip').addClass(CLASSORDER.show).removeClass(CLASSORDER.hidden);
            $('.order-summary-section-product-list').addClass(CLASSORDER.show).removeClass(CLASSORDER.hidden);
            $('.total-line-table').addClass(CLASSORDER.show).removeClass(CLASSORDER.hidden);
        }else{

            $('.order-title-name-hidden').addClass(CLASSORDER.show).removeClass(CLASSORDER.hidden);
            $('.order-title-name-show').addClass(CLASSORDER.hidden).removeClass(CLASSORDER.show);
            $('.block-customer-vip').addClass(CLASSORDER.hidden).removeClass(CLASSORDER.show);
            $('.order-summary-section-product-list').addClass(CLASSORDER.hidden).removeClass(CLASSORDER.show);
            $('.total-line-table').addClass(CLASSORDER.hidden).removeClass(CLASSORDER.show);
        }
    });

    $('.button-left-content-checkout .right-button .next, .block-pay-beadscrum').click(function () {
        $('.block-infor-ship').removeClass(CLASSORDER.show);
        $('.block-pay').addClass(CLASSORDER.show);
        $('.block-infor-ship-beadscrum').removeClass(CLASSORDER.active);
        $('.block-pay-beadscrum').addClass(CLASSORDER.active);
    });
    $('.button-left-content-checkout .left-button .prev, .block-infor-ship-beadscrum').click(function () {
        $('.block-infor-ship').addClass(CLASSORDER.show);
        $('.block-pay').removeClass(CLASSORDER.show);
        $('.block-infor-ship-beadscrum').addClass(CLASSORDER.active);
        $('.block-pay-beadscrum').removeClass(CLASSORDER.active);
    });
    Address.load('#cityId', '#districtId','#wardID');

    /*------------------------------------------------------------------------get coupon*/
    CheckCouponCode.load('#cityId','#districtId', '#coupon','#getCoupon','#txtCode','#shipFee', '#showTotalMoney');
    CustomerShipFee.load('#cityId','#districtId','#shipFee', '#showTotalMoney', '#coupon');


    /*-----------chosse payment menthod ----------*/
    if ($('.cod[name="paymentMethod"]:checked')) {
        $('#baokimPmMethodId').val('cod');
    }
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
        $('.listBank>span').removeClass(CLASSORDER.active);
        $(t.attr('data-show')).slideDown();
    });

    $('.transfer-infor').slideUp();
    $('.transfer').change(function () {
        $('.transfer-infor').slideDown();
        $('.listBank').slideUp();
    });

    $('.listBank>span').click(function () {
        $('#baokimPmMethodId').val($(this).attr('data-baokimPmId'));
        $('.listBank>span').removeClass(CLASSORDER.active);
        $(this).addClass(CLASSORDER.active);
    });

    $('input[name="address"]').click(function () {
        var t = $(this);
        Address.getDistricts(t.attr('c'), '#districtId', t.attr('d'));
        $('input[name="customerName"]').val(t.attr('n'));
        $('input[name="customerMobile"]').val(t.attr('p'));
        $('input[name="customerEmail"]').val(t.attr('e'));
        $('select[name="customerCityId"]').val(t.attr('c'));
        $('input[name="customerAddress"]').val(t.attr('a'));
    });

});

/*----- Accept & Order ----*/
$(function () {
    var isSubmited = false;
    $("#formCheckOut").validationEngine({
        scroll: false,
        onValidationComplete: function (form, status) {
            if (status && !isSubmited) {
                isSubmited = true;
                if (!$('#baokimPmMethodId').val()) {
                    alert('bạn chưa chọn phương thức thanh toán');
                    isSubmited = false;
                    return;
                }
                $.fancybox({
                    content: $("#progressbar"),
                    closeBtn: false,
                    padding: 0,
                    modal: true,
                    afterShow: function () {
                        $("#progressbar").progressbar({
                            value: false
                        });
                    }
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
    $('#showCarrier').click(function() {
        $('#tableShipFee').css('display','block');
    });
    // $('#tableShipFee').each(function () {
    //     $(this).addClass('table-responsive');
    // });
});


