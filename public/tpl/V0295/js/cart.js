$(function () {

    $('.removeCart').click(function(){
        var id = $(this).attr('data-id'), mes = $('#dialogMessage');
        mes.html('<p><span class="ui-icon ui-icon-help" style="float: left; margin: 0 10px 40px 0;"></span>' +
            'Qúy khách muốn xóa sản phẩm này?' + '</p>');
        mes.dialog({
            title: "Xóa sản phẩm!", modal: true, show: "explode", hide: "explode",
            buttons: [
                { text: "Ok", click: function () {
                    removeCart(id, true, null);
                } },
                { text: "Cancel", click: function () {
                    $(this).dialog("close");
                } }
            ]
        });
    });

    $('.xi-step-down').click(function () {
        var id = $(this).attr('data-id');
        var qttElement = $('.qty.product_' + id);
        var m = parseInt(qttElement.attr('max'));
        var v = parseInt(qttElement.attr('value'));
        if (m < v) {
            qttElement.attr('val', v-1);
            // $('.qnt').html(v - 1);
        }else{
            if(m > v && v > 1){
                qttElement.attr('value', v-1);
                qttElement.html(v - 1);
            }else if(m > v && v < 1){
                qttElement.html('0');
            }
        }
        var products = [
            {id: id, quantity: v-1}
        ];
        addToCart(products, 2, function (rs) {
            location.reload();
            // console.log(rs);
        });
    });


    $('.xi-step-up').click(function () {
        var id = $(this).attr('data-id');
        var qttElement = $('.qty.product_' + id);
        var m = parseInt(qttElement.attr('max'));
        var v = parseInt(qttElement.attr('value'));
        if (v < m) {
            qttElement.attr('value', v+1);
            qttElement.html(v + 1);
        }
        else{
            qttElement.attr('value', v+1);
            qttElement.html(v + 1);
        }
        var products = [
            {id: id, quantity: v+1}
        ];
        addToCart(products, 2, function (rs) {
            location.reload();
            // console.log(rs);
        });
    });
})