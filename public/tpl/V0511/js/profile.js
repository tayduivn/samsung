$(document).ready(function () {
    $('.dropdown').click(function () {
        var i=$(this).find('i');
        if(i.hasClass('fa-angle-down')){
            $('.menu').css('height','120px')
            i.removeClass('fa-angle-down').addClass('fa-angle-up')
        }
        else{
            $('.menu').css('height','0px')
            i.removeClass('fa-angle-up').addClass('fa-angle-down')
        }
    });
    Address.load('#cityId', '#districtId');

})