/*---- load ADDRESS - Checkout page ----*/
$(function () {

    Address.load('#cityId', '#districtId');

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
});
