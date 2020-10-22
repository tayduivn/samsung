$(document).ready(function(){
    Address.load('#customcityId', '#customdistrictId', '#customerWardId');
    /*---- get coupon --------------------------------------------------------------------*/
    CheckCouponCode.load('#customcityId','#customdistrictId', '#coupon','#getCoupon','#txtCode','#shipFee', '#showTotalMoney');
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
        $('.listBank').slideUp();
        $('.listBank>span').removeClass('active');
        parent.find('.listBank').slideDown();
        $('.listBank .bankItem').removeClass('active');
        $(t.attr('data-show')).addClass('active');

        if (t.hasClass('default')) {
            baokimId.val(t.attr('data-baokimPmId'));
        }
    });
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

    $('input[name="address"]').click(function () {
        var t = $(this);
        Address.getCities('#cityId');
        Address.getDistricts(t.attr('c'), '#districtId', t.attr('d'));
        $('input[name="customerName"]').val(t.attr('n'));
        $('input[name="customerMobile"]').val(t.attr('p'));
        $('select[name="customerCityId"]').val(t.attr('c'));
        $('input[name="customerAddress"]').val(t.attr('a'));
    });
    var isSubmited = false;
    $("#formCheckOut").validationEngine({
        scroll: false,
        onValidationComplete: function (form, status) {
            if (status && !isSubmited) {
                isSubmited = true;
//                if (!$('#baokimPmMethodId').val()) {
////                    alert('Quý khách vui lòng chọn hình thức chuyển khoản');
////                    isSubmited = false;
////                    return;
//                }
                $.fancybox.open({
                    content: $("#progressbar"),
                    closeBtn: false,
                    padding: 0,
                    modal: true
                });
                // $('span.btn-content').hide();
                // $('.fa-spinner').show();
                $('.loading-wrapper').show();
                $('#loading').show();
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

    $('.order-summary-toggle').click(function () {
        if ($(this).hasClass('order-summary-toggle-hide') && $('.content .sidebar .order-summary').hasClass('order-summary-is-collapsed') ) {
            $(this).removeClass('order-summary-toggle-hide').addClass('order-summary-toggle-show');
            $('.content .sidebar .order-summary').removeClass('order-summary-is-collapsed').addClass('order-summary-is-expanded');
            $('.content-second .sidebar-second .order-summary').removeClass('order-summary-is-expanded').addClass('order-summary-is-collapsed');
        } else {
            $(this).removeClass('order-summary-toggle-show').addClass('order-summary-toggle-hide');
            $('.content .sidebar .order-summary').removeClass('order-summary-is-expanded').addClass('order-summary-is-collapsed');
            $('.content-second .sidebar-second .order-summary').removeClass('order-summary-is-collapsed').addClass('order-summary-is-expanded');
        }
    })

    $('input[name="discount.code"]').keyup(function () {
        $('#form_discount_add .fieldset .field').addClass('field-show-floating-label');
        $(this).parent().next().removeClass('btn-disabled');
        if (!$(this).val()) {
            $(this).parent().next().addClass('btn-disabled');
            $('#form_discount_add .fieldset .field').removeClass('field-show-floating-label');
        }
    })

    //--------- Tính phí vận chuyển -----------------------------
    CustomerShipFee.load('#customcityId','#customdistrictId','#shipFee', '#showTotalMoney', '.discount-code');
    //--------- End Tính phí vận chuyển -----------------------------
});