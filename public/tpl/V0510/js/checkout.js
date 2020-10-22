$("body").on("click","[data-toggle]",function(){
    var n=$(this);
    n.toggleClass("toggled");
    $(n.attr("data-toggle")).toggleClass(n.attr("data-toggle-class"))
})
$(document).ready(function() {
    Address.load('#customcityId', '#customdistrictId');

    /*---- get coupon --------------------------------------------------------------------*/
    $('#getCoupon').click(function () {
        var ttmoney = parseInt($('#showTotalMoney').attr('value')),
            $discount = parseInt($('#txtCode').attr('value')),
            $discounStart = parseInt($('#txtCode').attr('value-start')),
            $shipFee = parseInt($('#shipFee').attr('value'));

        $.post('/promotion/checkcoupon', {couponCode: $('#coupon').val()},
            function (rs) {
                if (rs.code == 1) {
                    $('#txtCode').html(' - ' + $.number(parseInt(rs.value) + $discounStart) + ' đ').attr('value',rs.value);
                } else {
                    $('#txtCode').html(' - ' + $.number(parseInt($discounStart)) + ' đ').attr('value',0);
                }
            },
            'json'
        );
    });
    $(function() {
        var $radios = $('input[name="paymentMethod"]');
        if ($radios.is(':checked') === false) {
            $radios.closest('div').parent().next('.content-box__row__desc').hide();
            $radios.filter('[id=rdPaymentMethodCod]').closest('div').parent().next('.content-box__row__desc').show();
            $('.listBank').hide();
            $radios.filter('[id=rdPaymentMethodCod]').prop('checked', true);
        }
        ;
    });
    $('input[name="paymentMethod"]').change(function () {
        var t = $(this);
        $('input[name="paymentMethod"]').closest('div').parent().next('.content-box__row__desc').hide();
        t.closest('div').parent().next('.content-box__row__desc').show();
        $('.listBank').hide();
        $('.listBank>span').removeClass('active');
        $(t.attr('data-show')).show();
    })
   /* $(function() {
        var $radios =$('input[name="paymentMethod"]');
        if($radios.is(':checked') === false) {
            $radios.filter('[id=rdPaymentMethodCod]').prop('checked', true);
        };
        if($radios.filter('[id=rdPaymentMethodCod]').is(':checked') === true) {
            $(this).closest('div').parent().next('.content-box__row__desc').show();
            $radios.filter('[id=BankTransfer]').closest('div').parent().next('.content-box__row__desc').hide();
        };
        $radios.filter('[id=BankTransfer]').on('click', function(){
            $(this).prop('checked', true);
            $(this).closest('div').parent().next('.content-box__row__desc').show();
            $radios.filter('[id=rdPaymentMethodCod]').prop('checked', false);
            $radios.filter('[id=rdPaymentMethodCod]').closest('div').parent().next('.content-box__row__desc').hide();
        });
        $radios.filter('[id=rdPaymentMethodCod]').on('click', function(){
            $radios.filter('[id=BankTransfer]').prop('checked', false);
            $radios.filter('[id=BankTransfer]').closest('div').parent().next('.content-box__row__desc').hide();
            $(this).prop('checked', true);
            $(this).closest('div').parent().next('.content-box__row__desc').show();
        });
    });*/

    /*$('input[name="paymentMethod"]').on( "click", function() {
            $(this).closest('div').parent().next('.content-box__row__desc').show();
    }); */
    /*------------------------------------------------------------------------chosse payment menthod*/
    $(function () {
        if ($('#rdPaymentMethodCod[name="paymentMethod"]:checked')) {
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
            /*
            $('.transfer-infor').slideUp();
            $('.listBank').slideUp();
            $('.listBank>span').removeClass('active');
            $(t.attr('data-show')).slideDown(); */
        });
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
 });

    $('#codeCus').change(function(){
        $.post('/store/suggestcustomer',
            {code : $('#codeCus').val()},
            function (rs) {
                if (rs.customerStore) {
                    $('input[name="customerName"]').val(rs.customerStore.name);
                    $('input[name="customerMobile"]').val(rs.customerStore.mobile);
                    $('input[name="customerEmail"]').val(rs.customerStore.email);
                    $('input[name="customerAddress"]').val(rs.customerStore.address);
                    $.each($('#customerCityId option'),function(){
                        if (parseInt($(this).val()) == parseInt(rs.customerStore.cityId)) {
                            $(this).attr('selected',1);
                        }
                    });
                    $('#districtId').append('<option value="'+rs.customerStore.districtId+'" selected="selected">'+rs.customerStore.districtName+'</option>')
                }
                else {
                    alert('Mã thẻ khách hàng không chính xác !')
                }
            }
        );
    });
    var isSubmited = false;
    $("#formCheckOut").validationEngine({
        scroll: false, binded: false, showOneMessage: true,
        onValidationComplete: function (form, status) {
            if (status && !isSubmited) {
                isSubmited = true;
                if ($('#baokimPmMethodId').val() === null) {
                    alert('bạn chưa chọn phương thức thanh toán');
                    isSubmited = false;
                    return;
                }
                $.fancybox.open({
                    content: $("#progressbar"),
                    closeBtn: false,
                    padding: 0,
                    modal: true,
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

 //--------- Tính phí vận chuyển -----------------------------
    CheckCouponCode.load('#cityId','#districtId', '#coupon','#getCoupon', '', '#shipFee', '#showTotalMoney');
    $("#wardId").on("change", function () {
        CustomerShipFee.load('#customcityId','#customdistrictId','#shipFee', '#showTotalMoney', '#coupon');
        $('.alert--info').hide();
    });

 //--------- End Tính phí vận chuyển -----------------------------
});
function makeAliasFor(name,$id) {
    var str = $(name).val();
    // chuyển chuỗi sang chữ thường để xử lý
    str= str.toLowerCase();
    /* tìm kiếm và thay thế tất cả các nguyên âm có dấu sang không dấu*/
    str= str.replace(/a|à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"");

    str= str.replace(/e|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"");

    str= str.replace(/i|ì|í|ị|ỉ|ĩ/g,"");

    str= str.replace(/o|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"");

    str= str.replace(/u|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"");

    str= str.replace(/y|ỳ|ý|ỵ|ỷ|ỹ/g,"");

    str= str.replace(/d|đ/g,"");
    str= str.replace(/q|w|r|t|y|p|s|f|g|h|j|k|l|m|n|b|v|c|x|z/g,"");

    str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"");

    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */

    str= str.replace(/-+-/g,""); //thay thế 2- thành 1-

    str= str.replace(/^\-+|\-+$/g,"");//cắt bỏ ký tự - ở đầu và cuối chuỗi

    document.getElementById($id).value = str;// xuất kết quả xữ lý ra keyword
}