$(function () {
    $(window).bind("load", function() {
        $.post('/product/searchcustomer',
            {
                customerMobile : $('.checkPoint').val()
            },
            function(rs){
                if(rs.code == 1){
                    var addText = "<span>Họ và tên: <b>"+rs.data.customerName+"</b></span><span>Số điện thoại: <b>"+rs.data.customerMobile+"</b></span><span>Điểm tích lũy của bạn: <b>"+rs.data.points+" điểm  ( 1 điểm = 1.000đ )</b></span><span>Tình trạng đơn hàng: </span>";
                    $('.customerDetails').html(addText);
                    // console.log(rs);
                }
                else {
                    var addTextFill = "<span>Họ và tên: <b> </b></span><span>Số điện thoại:  </span><span>Điểm tích lũy của bạn: </span><span>Tình trạng đơn hàng: </span>";
                    $('.customerDetails').html(addTextFill);
                    // alert(rs.messages);
                }
            }
        );
    });
});