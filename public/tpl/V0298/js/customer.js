var storeId = $('#storeId').val();
$(document).ready(function () {
    $('.customerSearchBtn').click(function(e){
        e.preventDefault();
        var search_input = $('.customerSearch').val();
        if (search_input == '') {
            $.fancybox({
                fitToView: false,
                content: '<div class="empty-message">Vui lòng điền số điện thoại!</div>',
            })
        } else {
            $.post(
                '/product/searchcustomer',
                {
                    customerMobile : search_input
                },
                function(rs){
                    if(rs.code == 1){
                        if (in_array(storeId, [41781])){
                            $('#info-customer').html('<div style="width:768px">'+
                                '<div class="content-summary"><span class="title">Xin chào <span class="font-weight-bold">'+rs.data.customerName+'</span>, số điểm tích lũy của bạn là:</span>' +
                                '<span class="accumulated-points">'+$.number(rs.data.points)+'</span></div>'+
                                '</div>',);
                            $('#info-customer-after').html('<div style="width:768px">' +
                                '<div class="text-center">' +
                                '<a href="/" style="display: inline-block;border: 1px solid #FABFC2;border-radius: 4px;background: #FABFC2;padding: 10px;font-weight: bold;margin-top: 20px;">MUA SẮM NGAY</a>'+
                                '</div>' +
                                '<h1 style="margin-top: 30px;">Thông tin khách hàng</h1>' +
                                '<div class="itemstopUsed left" style="font-weight:bold;font-size:20px;padding:20px">'+
                                '<div style="width:20%">'+
                                '<p>Tên khách hàng</p>'+
                                '</div>'+
                                '<div style="width:20%">'+
                                '<p>Số điện thoại</p>'+
                                '</div>'+
                                '<div style="width:20%">'+
                                '<p>Ngày sinh</p>'+
                                '</div>'+
                                '<div style="width:20%">'+
                                '<p>Tổng tiền tích lũy</p>'+
                                '</div>'+
                                '<div style="width:20%">'+
                                '<p>Tổng điểm tích lũy</p>'+
                                '</div>'+
                                '</div>'+
                                '<div class="itemstopUsed left" style="font-weight:bold;font-size:20px;padding:20px">'+
                                '<div style="width:20%">'+
                                '<p style="text-align: center;">'+rs.data.customerName+'</p>'+
                                '</div>'+
                                '<div style="width:20%">'+
                                '<p style="text-align: center;">'+rs.data.customerMobile+'</p>'+
                                '</div>'+
                                '<div style="width:20%">'+
                                '<p style="text-align: center;">'+(rs.data.customerBirthDay ? rs.data.customerBirthDay : 'Đang cập nhật')+'</p>'+
                                '</div>'+
                                '<div style="width:20%">'+
                                '<p class=" text" style="text-align: center;">'+$.number(rs.data.customerMoney)+' VNĐ</p>'+
                                '</div>'+
                                '<div style="width:20%">'+
                                '<p class=" text" style="text-align: center;">'+$.number(rs.data.points)+'</p>'+
                                '</div>'+
                                '</div></div>'+
                                '</div>');
                        }
                        else {
                            if ($(window).width() >= 992) {
                                $.fancybox({
                                    fitToView: false,
                                    content: '<div style="width:768px">'+'<h1>Thông tin khách hàng</h1>'+
                                        '<div class="itemstopUsed left" style="font-weight:bold;font-size:20px;padding:20px">'+
                                        '<div style="width:25%">'+
                                        '<p>Tên khách hàng</p>'+
                                        '</div>'+
                                        '<div style="width:25%">'+
                                        '<p>Số điện thoại</p>'+
                                        '</div>'+
                                        '<div style="width:25%">'+
                                        '<p>Ngày sinh</p>'+
                                        '</div>'+
                                        '<div style="width:25%">'+
                                        '<p>Tổng tiền tích lũy</p>'+
                                        '</div>'+
                                        '</div>'+

                                        '<div class="itemstopUsed left" style="font-weight:bold;font-size:20px;padding:20px">'+
                                        '<div style="width:25%">'+
                                        '<p>'+rs.data.customerName+'</p>'+
                                        '</div>'+
                                        '<div style="width:25%">'+
                                        '<p>'+rs.data.customerMobile+'</p>'+
                                        '</div>'+
                                        '<div style="width:25%">'+
                                        '<p>'+(rs.data.customerBirthDay ? rs.data.customerBirthDay : 'Đang cập nhật')+'</p>'+
                                        '</div>'+
                                        '<div style="width:25%">'+
                                        '<p class=" text">'+$.number(rs.data.customerMoney)+' VNĐ</p>'+
                                        '</div>'+
                                        '</div></div>',
                                });
                            } else {
                                $.fancybox({
                                    fitToView: true,
                                    content: '<div style="100%;">'+''+
                                        '<div class="itemstopUsed left" style="font-weight:bold;padding:20px;border:0;">'+
                                        '<div style="width:97%">'+
                                        '<p>Tên: '+rs.data.customerName+'</p>'+
                                        '</div>'+
                                        '<div style="width:97%">'+
                                        '<p>Điện thoại: '+rs.data.customerMobile+'</p>'+
                                        '</div>'+
                                        '<div style="width:97%">'+
                                        '<p>Ngày sinh: '+(rs.data.customerBirthDay ? rs.data.customerBirthDay : 'Đang cập nhật')+'</p>'+
                                        '</div>'+
                                        '<div style="width:97%">'+
                                        '<p>Tổng tích lũy: '+$.number(rs.data.customerMoney)+'</p>'+
                                        '</div>'+
                                        '</div>'+
                                        '</div>',
                                });
                            }
                        }
                    }
                    else {
                        $.fancybox({
                            fitToView: false,
                            content: '<div class="empty-message">'+rs.messages+'</div>',
                        })
                    }
                }
            );
        }
    });


    $('.faq_question').click(function () {
        if ($(this).parent().is('.open')) {
            $(this).closest('.faq').find('.faq_answer_container').slideUp();
            $(this).closest('.faq').removeClass('open');
        } else {
            $(this).closest('.faq').find('.faq_answer_container').slideDown();
            $(this).closest('.faq').addClass('open');
        }
    });
});
