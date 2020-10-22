$(function () {

    // Retrieve
    //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
    // console.log(localStorage.getItem("lastname"));

    if($('input[name="paymentMethod"]:checked')){
        $('#baokimPmMethodId').val('Baokim');
    }
    $('input[name="paymentMethod"]').change(function () {
        var t = $(this);
        if ($(t.attr('data-show')).length) {
            $('#baokimPmMethodId').removeAttr('value');
        } else {
            $('#baokimPmMethodId').val('Baokim');
        }
        if (t.hasClass('baokim')) {
            $('#baokimPmMethodId').val('Baokim');
        }
        $('.listBank').slideUp();
        $('.listBank>span').removeClass('active');
        $(t.attr('data-show')).slideDown();
        //loadCalculateShipFee();
    });
    $('.listBank>span').click(function () {
        $('#baokimPmMethodId').val($(this).attr('data-baokimPmId'));
        $('.listBank>span').removeClass('active');
        $(this).addClass('active');
    });
    $('.removeCart').click(function () {
        var id = $(this).attr('rel'), mes = $('#dMsg');
        var check = confirm('Bạn có muốn xóa sản phẩm?');
        if(check) {
            $.post(
                '/cart/remove',
                {
                    'psId' : id,
                },
                function(rp){
                    document.location.href= '/cart'
                }
            );
        }
    });
    // suggest customer
    $('#codeCus').change(function(){
            $.post('/store/suggestcustomer',
        		{code : $('#codeCus').val()},
                function (rs) {
                	if (rs.customerStore) {
                		$('input[name="customerName"]').val(rs.customerStore.name);
                		$('input[name="customerMobile"]').val(rs.customerStore.mobile);
                		$('input[name="customerEmail"]').val(rs.customerStore.email);
                		$('input[name="customerAddress"]').val(rs.customerStore.address);
                		$.each($('#cityId option'),function(){
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
    $('.itemCus').click(function(){

    });
    $('.updateCart').change(function () {
        var products = [{
            'id': $(this).attr('data-psId'),
            'quantity': $(this).val()
        }];
        addToCart(products, 2, function (rs) {
            window.location.href = '/cart'
        });
    });
    $('.product-quatity span').on('click',function () {
        var item = $(this).siblings('.updateCart'), $qty = item.val();
        var isValid = true;

        if ($(this).hasClass('minus')){
            if ($qty > 1){
                $qty--;
            }else{
                isValid = false;
                alert('Số lượng tối thiểu phải là 1');
            }
        }
        else if ($(this).hasClass('plus')){
            if ($qty < parseInt(item.attr('max'))){
                $qty++;
            }else{
                isValid = false;
                alert('Số lượng đặt mua vượt quá số lượng cho phép');
            }
        }
        if (isValid) {
            var products = [{
                'id': item.attr('data-psId'),
                'quantity': $qty
            }];
            addToCart(products, 2, function (rs) {
                window.location.href = '/cart'
            });
        }
    });

    /*------------------------------------------------------------------------get coupon*/
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

    var isSubmited = false;
    $("#formCheckOut").validationEngine({
        scroll: false, binded: false, showOneMessage: true,
        onValidationComplete: function (form, status) {
            if (status && !isSubmited) {
                isSubmited = true;
                if (!$('#baokimPmMethodId').val()) {
                    alert(msgTransfers);
                    isSubmited = false;
                    return;
                }
                $.fancybox({content: $(".loading"), closeBtn: false, padding: 0, modal: true});
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
    CheckCouponCode.load('#cityId','#districtId', '#coupon','#getCoupon', '', '#shipFee', '#showTotalMoney');
    CustomerShipFee.load('#cityId','#districtId','#shipFee', '#showTotalMoney', '#coupon');

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