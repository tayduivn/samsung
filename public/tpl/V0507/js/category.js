$(document).ready(function () {
    if($(window).width() < 992 ) {
        $('.product_box').addClass('col-md-3 col-6 mb-5')
        $('.product_box').removeClass('product_box')
        $('.contentPorduct').addClass('row');
        $('.contentPorduct').removeClass('contentPorduct');
    }
});