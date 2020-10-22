$(function () {
    /*** paymentMethod options ***/
    $('input[name="paymentMethod"]').change(function () {
        var parent = $(this).parents('div.b');
        if (parent.find('.listBank').length) {
            $('#baokimPmMethodId').removeAttr('value');
        } else {
            $('#baokimPmMethodId').val('Baokim');
        }
        if(parent.find('#baokimAcc').length){
            $('#baokimPmMethodId').val('Baokim');
        }

        $('.listBank').slideUp();
        $('.listBank>span').removeClass('active');
        parent.find('.listBank').slideDown();
    });

    $('.listBank>span').click(function () {
        $('#baokimPmMethodId').val($(this).attr('data-baokimpmid'));
        $('.listBank>span').removeClass('active');
        $(this).addClass('active');
    });

    var city = $('select#cityId'), district = $('select#districtId');
    if (city.val() > 0 && district.val() > 0) {
        getShipFee({});
    }
    district.change(function () {
        getShipFee({});
    });

    $('#getCoupon').click(function () {
        $.post(
            '/promotion/checkcoupon?type=base', {couponCode: $('input[name="couponCode"]').val()},
            function (rs) {
                if (rs.code) {
                    getShipFee({
                        coupon: rs.value
                    })
                } else {
                    $(this).val('');
                    alert('Mã giảm giá không chính xác');
                }
            },
            'json'
        );
    });

    var isSubmited = false;
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

    function getShipFee(options) {
        var totalCartMoney = parseInt($('#totalCartMoney').val());
        $('.showShipFee').html('0 đ');
        $('.showCoupon').html('0 đ');
        $('.showTotalMoney').html($.number(totalCartMoney) + ' đ');
        if (!options.coupon) {
            options.coupon = 0;
        }

                calculateShipFee({
                    toCity: city.val(),
                    toDistrict: district.val(),
                    onSuccess: function (rs) {
                        $('.showShipFee').html($.number(rs.shipFee + rs.codFee) + ' đ');
                        $('.showCoupon').html('-' + $.number(rs.value) + ' đ</b>');
                        $('.showTotalMoney').html($.number(totalCartMoney + rs.shipFee + rs.codFee - options.coupon) + ' đ');
                    }
                });
    }
});