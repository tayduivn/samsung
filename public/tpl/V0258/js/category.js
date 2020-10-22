$(document).ready(function(e){
    var price_max = $('#price_to');
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: price_max.attr('data-max'),
        values: [parseInt($('#price_form').attr('data-size')),parseInt($('#price_to').attr('data-size'))],
        slide: function( event, ui ) {
            $('#price_form').text(numberFomart(ui.values[0]) + 'đ').attr('data-size',ui.values[0]);
            $('#price_to').text(numberFomart(ui.values[1]) + 'đ').attr('data-size',ui.values[1]);
            window.location.href = addFilter('price', ui.values[0] + ':'+ui.values[1], 3);
        }
    });
});
function numberFomart(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}