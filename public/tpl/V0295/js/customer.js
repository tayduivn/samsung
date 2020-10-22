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
