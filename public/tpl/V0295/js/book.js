$(function () {
    $('.hiddenBookHome').click(function () {
        $('.bookHome').hide();
        $('.bookAdd').show();
    });
    $('.removeAddress').click(function (e) {
        e.preventDefault();
        var mes = $('#dialogMessage'), t = $(this);
        mes.html('<p><span class="ui-icon ui-icon-help" style="float: left; margin: 0 10px 40px 0;"></span>' +
            'Qúy khách muốn xóa địa chỉ này?' + '</p>');
        mes.dialog({
            title: "Cảnh báo!", modal: true, show: "explode", hide: "explode",
            buttons: [
                { text: "Ok", click: function () {
                    $.post('/address/removebook', { 'id': t.attr('data-id') },
                        function (rs) {
                            if (rs.code == 1) {
                                document.location.href = document.URL;
                            }
                        }, 'json'
                    );
                } },
                { text: "Cancel", click: function () {
                    $(this).dialog("close");
                } }
            ]
        });
    });
})