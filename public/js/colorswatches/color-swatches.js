jQuery(function () {
    var bSwat = jQuery('body .color-swatches'), eventClick = 'true', eventHover = 'false';

    if (bSwat.length){
        bSwat.not('.calc').each(function () {
            var childs = $(this).find('.color-item').length;
            if (childs>4){
                $(this).find('.color-item').css({width:'calc(100% / '+childs+')'});
            }

            // Active màu đầu tiên
            if ($(this).find('.color-item').length) {
                $(this).find('.color-item').each(function () {
                    var t = jQuery(this), psId = t.parents('.color-swatches').attr('psId'), i = t.parents().find('.swatches-' + psId);

                    i.attr('data-old', i.attr('src')).attr('src', t.attr('data-img')).attr('data-original', t.attr('data-img'));
                    t.siblings('li').removeClass('active');
                    t.addClass('active');
                     return false;
                });
            }
        });
    }

    if (bSwat.attr('data-hover')){
        eventHover = bSwat.attr('data-hover');
    }
    if (bSwat.attr('data-click')){
        eventClick = bSwat.attr('data-click');
    }

    if (eventClick == 'true') {
        jQuery('body').on('click', '.color-swatches li', function () {
            var t = jQuery(this), psId = t.parents('.color-swatches').attr('psId'),
                i = t.parents().find('.swatches-' + psId),
                href = t.parents('.color-swatches').attr('data-handle'),
                column = t.parents('.color-swatches').attr('column');

                if (href &&  column){
                    // Nếu có link thì redirect vào CTSP
                    window.location.href = href+'?'+ column +'='+ t.attr('value');
                    return false;
                }else{
                    i.attr('data-old', i.attr('src')).attr('src', t.attr('data-img'));
                    if (t.parents('.owl-item').length){
                        t.parents('.owl-item').find('li').removeClass('active');
                        t.parents('.owl-item').siblings('.owl-item').find('li').removeClass('active');
                    } else{
                        t.siblings('li').removeClass('active');
                    }
                    t.addClass('active');
                }
        });
    }


    if (eventHover == 'true') {
        jQuery("body .color-swatches li").hover(
            function () {
                var t = jQuery(this), psId = t.parents('.color-swatches').attr('psId'),
                    i = t.parents().find('.swatches-' + psId);

                    i.attr('data-old', i.attr('src')).attr('src', t.attr('data-img'));
            },
            function () {
                var t = jQuery(this), psId = t.parents('.color-swatches').attr('psId'),
                    i = t.parents().find('.swatches-' + psId);

                    i.attr('src', i.attr('data-old'));
            }
        );
    }


});