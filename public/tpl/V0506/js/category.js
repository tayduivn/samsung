var $pathchange = $('#pathchange');
var $sortBy = $('#SortBy');
var $string_p="0";
$(function () {
    var price_max = $('#price_to');
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: price_max.attr('data-max'),
        values: [parseInt($('#price_form').attr('data-size')), parseInt($('#price_to').attr('data-size'))],
        slide : function (event, ui) {
            $('#price_form').text($.number(ui.values[0]) + 'đ').attr('data-size', ui.values[0]);
            $('#price_to').text($.number(ui.values[1]) + 'đ').attr('data-size', ui.values[1]);
        },
        stop : function (event, ui) {
            var page = 1;
            $string_p= ui.values[0]+":"+ui.values[1];
            var sort_b = $sortBy.attr('data-value');
            getFilterAjax(page, sort_b,$string_p,true);
            $('.block_back_drop').slideUp();
        }
    });
    // Call change sort filter
    $('.SortBy li').on('click',function () {
        var t=$(this);
        var value = t.attr('value');
        var price;
        $sortBy.attr('data-value',value);
        if($string_p!=="0"){
            price = $string_p;
        }
        getFilterAjax(1, value,price,false);
        $('.SortBy').slideUp();
        $('.block_back_drop').slideUp();
    });
    // Call Pagination
    $('#resultAjax').on('click', '.pagination li:not(.active)', function () {
        $pathchange.attr('page', $(this).attr('pr'));
        var sort_b = $sortBy.attr('data-value');
        var price;
        if($string_p!=="0"){
            price = $string_p;
        }
        getFilterAjax($(this).attr('pr'), sort_b,price,true);
        return false;
    });
    // click filter
    $('.filter_attr  a').on('click', function (e) {
        e.preventDefault();
        var t = $(this);
        if (t.hasClass('checked')) {
            t.removeClass('checked');
            t.find('.box_check_filter').html('');
        } else {
            t.find('.box_check_filter').append('<i class="fa fa-check" aria-hidden="true"></i>');
            t.addClass('checked');
        }
        var page = 1;
        var sort_b = $sortBy.attr('data-value');
        var price;
        if($string_p!=="0"){
            price = $string_p;
        }
        getFilterAjax(page, sort_b,price,true);
        $(".open_filter").removeClass('active');
        $(".backdrop_body").removeClass('active');
        $('.block_back_drop').slideUp();
    });
});

function getFilterAjax($page,$sort,$price, $animate) {
    var urlSate = '', $url = $pathchange.attr('url'), catId = $pathchange.attr('cId'),
        path = $pathchange.attr('path'), showPath = '',
        $q = $('#queryparam').val();
    var obj = {
        'icpp': $pathchange.attr('icpp'),
        'termi': true,
        "format": 'json'
    };
    if (catId) {
        obj['id'] = catId;
    }
    if ($page > 1) {
        obj['page'] = $page;
    }
    if ($sort){
        obj['show'] = $sort;
        showPath = '?show='+$sort;
    }
    if($price) {
        obj['price'] = $price;
    }
    $('.collection_filter').each(function () {
        var t = $(this), colum = t.attr('data-column'), param = '';
        t.attr('check_column',0);
        t.find('li a.checked').each(function ($k) {
            t.attr('check_column',1);
            if ($k === 0) {
                param = $(this).attr('value');
            } else {
                param += ',' + $(this).attr('value');
            }
        });
        if(t.attr('check_column')>0){
            obj[''+colum+''] = param;
        }
        if (param && urlSate) {
            urlSate += '&' + colum + '=' + param;
        } else if (param && urlSate === '') {
            urlSate += colum + '=' + param;
        }
    });
    if (urlSate === '' && showPath !== '') {
        history.pushState(null, null, showPath);
    } else {
        history.pushState(null, null, (urlSate == '' ? path : '?' + urlSate + ($q ? '&q=' + $q : '') +($sort ? '&show=' + $sort : '') + ($page > 1 ? '&page=' + $page : '')));
    }
    $.ajax({
        type: "GET", data: obj, url: '/' + $url,
        beforeSend: function () {
            loadings(true);
        },
        success: function (rs) {
            loadings(false);
            $('#resultAjax').html(rs);
        }
    });
    if ($animate) {
        $('html, body').animate({scrollTop: 150}, '2000');
    }
    return false;
}
function loadings(is) {
    if (is) {
        $('.loadingModal').addClass('is');
    } else {
        $('.loadingModal').removeClass('is');
    }
}