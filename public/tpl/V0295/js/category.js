var storeId = $('#psStoreId').val();
$(document).ready(function(){
    if($('.filter-here').height() >= 4845){
        fixsidebar();
    }
    $('.title_block').click(function(){
        $(this).next().slideToggle(200);
    });
    $('.filter-vendor__item').click(function () {
        location.href = $(this).attr('data-link')
        // appendSearch()
    })

    $(document).on("click",".dropdown-filter", function(){
        if ( $(this).parent().attr('aria-expanded') == 'false' ) {
            $(this).parent().attr('aria-expanded','true');
        } else {
            $(this).parent().attr('aria-expanded','false');
        }
    });
    // $('#resultAjax').on('click','.bl-filter [type=checkbox]:not(:checked)+label', function() {
    //     var page = $(this).parents('li').attr('pr'), sort = '';
    //     $('#PageContainer').attr('data-page',page);
    //
    //     // if ($('.collection-sorting-wrapper select[name="SortBy"]').val()){
    //     //     sort = jQuery('.collection-sorting-wrapper select[name="SortBy"]').val();
    //     // }
    //
    //     loadParam(page,false,sort);
    //     return false;
    // });
    $('.filterPrice ul li').click(function(e){
        e.preventDefault();
        window.location.href = $(this).find('input').attr('data-val');
    });
    // $('.sidebar-sort li label input').on('click', function() {
    //
    //     var animate = false, sort = '';
    //     if($(this).parents('.sidebar-sort').attr('colum') == 'i4'){
    //         animate = true;
    //     }if($(this).parents('.sidebar-sort').attr('colum') == 'i5'){
    //         animate = true;
    //     }if($(this).parents('.sidebar-sort').attr('colum') == 'i3'){
    //         animate = true;
    //     }
    //     if ($('.collection-sorting-wrapper select[name="SortBy"]').val()){
    //         sort = jQuery('.collection-sorting-wrapper select[name="SortBy"]').val();
    //     }
    //     loadParam(1,animate,sort);
    //     if($('.filter-here').height() >= 4845){
    //         fixsidebar();
    //     }
    // });
    $('.custom-dropdown--grey select[name="SortBy"]').on('change', function() {
        loadParam(1,false,jQuery(this).val());
        if($('.filter-here').height() >= 4845){
            fixsidebar();
        }
    });
    var price_max = $('#price_to');
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: price_max.attr('data-max'),
        values: [parseInt($('#price_form').attr('data-size')),parseInt($('#price_to').attr('data-size'))],
        slide: function( event, ui ) {
            $('#price_form').text(numberFomart(ui.values[0]) + 'đ').attr('data-size',ui.values[0]);
            $('#price_to').text(numberFomart(ui.values[1]) + 'đ').attr('data-size',ui.values[1]);
            // var sort = addFilter('price', ui.values[0] + ':'+ui.values[1], 3);
            var $price = ui.values[0] + ':'+ui.values[1];
            loadParam(1,false,'',$price);
        }
    });
    $( "#slider-range-sm" ).slider({
        range: true,
        min: 0,
        max: price_max.attr('data-max'),
        values: [parseInt($('#price_form').attr('data-size')),parseInt($('#price_to').attr('data-size'))],
        slide: function( event, ui ) {
            $('#price_form').text(numberFomart(ui.values[0]) + 'đ').attr('data-size',ui.values[0]);
            $('#price_to').text(numberFomart(ui.values[1]) + 'đ').attr('data-size',ui.values[1]);
            // var sort = addFilter('price', ui.values[0] + ':'+ui.values[1], 3);
            var $price = ui.values[0] + ':'+ui.values[1];
            loadParam(1,false,'',$price);
        }
    });
});

function fixsidebar() {
    if (screen.width > 1024) {
        if (!!$('.sidebar-fix').length) { // make sure ".sticky" element exists
            var el = $('.sidebar-fix');
            var stickyTop = (el.offset().top) + 100; // returns number
            var stickleft = (el.offset().left) + 0;
            var stickwidth = (el.width()) + 0;
            $(window).scroll(function () {
                if(in_array(storeId, [35989, 3138])){ }else {

                    // scroll event
                    var footerTop = ($('.wrapper-home-service').offset().top) - 30; // returns number
                    var stickyHeight = el.height();
                    var limit = footerTop - stickyHeight - 30;
                    var windowTop = $(window).scrollTop(); // returns
                    if (stickyTop < windowTop) {
                        el.css({
                            'position': 'fixed',
                            'top': 90,
                            'width': stickwidth,
                            'left': stickleft,
                            height: window.innerHeight + 'px'
                        });
                    } else {
                        el.css({
                            'position': 'static',
                            'top': '0',
                            'width': stickwidth,
                            'left': stickleft,
                            height: 'auto'
                        });
                    }
                    if (limit < windowTop) {
                        var diff = limit - windowTop;
                        el.css({top: diff});
                    }
                }
            });
        }
    }
}
function loadParam($page,$animate,$sort, $price) {
    var urlSate = '', cner = jQuery('#PageContainer'), $url = cner.attr('url'),
        cId = cner.attr('cId'), paramQ = cner.attr('paramQ'), path = cner.attr('path'), price = '', brand = '', i4 = '',i5 = '',i3= '', showPath = '';

    var obj = {
        'icpp' : cner.attr('icpp'),
        'termi' : true,
        "format":'json'
    };
    if (paramQ){
        obj['q'] = paramQ;
    }
    if (cId){
        obj['id'] = cId;
    }
    if ($page>1){
        obj['page'] = $page;
    }
    if ($sort){
        obj['show'] = $sort;
        showPath = '?show='+$sort;
    }
    if ($price){
        obj['price'] = $price;
        showPath = '?price='+$price;
    }
    jQuery('.sidebar-sort').each(function() {
        var t = jQuery(this), colum = t.attr('colum'), param = '';
        t.find('li input:checked').each(function ($k) {
            if ($k==0){
                param = jQuery(this).attr('val');
            }else{
                param += ','+jQuery(this).attr('val');
            }
        });

        if (colum == 'price' && param){
            obj['price'] = param;
        }
        else if (param){
            obj[colum] = param;
        }

        if(param && urlSate){
            urlSate += '&'+colum+'='+param;
        }else if(param && urlSate == ''){
            urlSate += colum+'='+param;
        }
    });

    if (urlSate == '' && showPath != ''){
        history.pushState(null, null,showPath);
    }else {
        history.pushState(null, null, (urlSate == '' ? path : '?' +  urlSate + ($sort ? '&show=' + $sort : '') + ($page > 1 ? '&page=' + $page : '')));
    }

    $.ajax({type: "GET", data: obj, url: '/'+$url,
        beforeSend:function () {
            loadings(true);
        },
        success: function(rs) {
            loadings(false);
            location.reload();
            jQuery('#resultAjax').html(rs);
        }
    });

    if ($animate && jQuery(window).width() < 1024){
        jQuery('html, body').animate({scrollTop:parseInt(jQuery('#resultAjax').offset().top)-70}, 'slow');
    }
    return false;
}

function loadings(is) {
    if(is){
        jQuery('.loadingModal').addClass('is');
    }else{
        jQuery('.loadingModal').removeClass('is');
    }
}
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
