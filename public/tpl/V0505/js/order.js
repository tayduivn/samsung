$(document).ready(function(){
    // if(window.location.pathname == '/cart/checkout'){
    //     var $sidebar   = $(".main-checkout-wrapper>div"),
    //         $window    = $(window),
    //         $footer    = $(".footer-top"), // use your footer ID here
    //         offset     = $sidebar.offset(),
    //         foffset    = $footer.offset(),
    //         threshold  = foffset.top - $sidebar.height() - offset.top, // may need to tweak
    //         topPadding = 15;
    //     if($window.width() > 992){
    //         $window.scroll(function() {
    //             if ($window.scrollTop() > threshold) {
    //                 $sidebar.stop().animate({
    //                     marginTop: threshold - 100
    //                 });
    //             } else if ($window.scrollTop() > offset.top) {
    //                 $sidebar.stop().animate({
    //                     marginTop: $window.scrollTop() - offset.top + topPadding
    //                 });
    //             } else {
    //                 $sidebar.stop().animate({
    //                     marginTop: 0
    //                 });
    //             }
    //         });
    //     }
    // }

    $('.removeCartItem').click(function () {
        var id = $(this).attr('rel');
        if (confirm("Bạn có muốn xóa sản phẩm này?") == true) {
            removeCart(id, true, null);
        }
    });


    Address.load('#customcityId', '#customdistrictId','#customWardId');
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
        Address.getDistricts(t.attr('c'), '#districtId', t.attr('d'));
        $('input[name="customerName"]').val(t.attr('n'));
        $('input[name="customerMobile"]').val(t.attr('p'));
        $('input[name="customerEmail"]').val(t.attr('e'));
        $('select[name="customerCityId"]').val(t.attr('c'));
        $('input[name="customerAddress"]').val(t.attr('a'));
    });
    var isSubmited = false;
    $("#formCheckOut").validationEngine({
        scroll: false,
        onValidationComplete: function (form, status) {
            if (status && !isSubmited) {
                $.fancybox.open({
                    content: $("#progressbar"),
                    closeBtn: false,
                    padding: 0,
                    modal: true
                });
                $.post(
                    '/order/save?format=json', $('#formCheckOut').serialize(),
                    function (rs) {
                        // console.log($('#formCheckOut').serialize());
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

    $('input[name="discount.code"]').keyup(function () {
        $('#form_discount_add .fieldset .field').addClass('field-show-floating-label');
        $(this).parent().next().removeClass('btn-disabled');
        if (!$(this).val()) {
            $(this).parent().next().addClass('btn-disabled');
            $('#form_discount_add .fieldset .field').removeClass('field-show-floating-label');
        }
    })


    //--------- Tính phí vận chuyển -----------------------------
    CustomerShipFee.load('#customcityId','#customdistrictId','#shipFee', '#showTotalMoney', '#coupon');
    //--------- End Tính phí vận chuyển -----------------------------
});