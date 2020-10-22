$(document).ready(function () {
    $('.back-cart').mouseenter(function () {
        $(this).find('span').css('left', '-3px');
    });
    $('.back-cart').mouseleave(function () {
        $(this).find('span').css('left', '0px');
    });

    if($('.nhap').val().length){
        $('.nhap').parent().find('.placeholder').css('font-size', '13px');
    }
    else {
        $('.nhap').parent().find('.placeholder').css('font-size', '16px');
    }
    $('.nhap').change(function () {
        if($(this).val().length){
            $(this).parent().find('.placeholder').css('font-size', '13px');
        }
        else {
            $(this).parent().find('.placeholder').css('font-size', '16px');
        }
    })
    $('.nhap').click(function () {
        $(this).parent().find('.placeholder').css('font-size', '13px');
    })

    Address.load('#cityId', '#districtId');
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
    CustomerShipFee.load('#cityId', '#districtId' ,'#shipFee', '#showTotalMoney', '#coupon');
    $('.list-reponsive').click(function () {
        var t = $(this).find('i')
        if (t.hasClass('fa-angle-down')) {
            t.removeClass('fa-angle-down').addClass('fa-angle-up');
            $('.sanpham').css('display', 'block');
        }
        else {
            t.removeClass('fa-angle-up').addClass('fa-angle-down');
            $('.sanpham').css('display', 'none');
        }
    });

});
