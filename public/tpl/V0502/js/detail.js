$(document).ready(function () {
    $("#gallery_02").owlCarousel({
        navigation : true,
        nav: true,
        navigationPage: false,
        navigationText : false,
        slideSpeed : 1000,
        pagination : true,
        dots: false,
        margin: 5,
        autoHeight:true,
        autoplay:false,
        autoplayTimeout:false,
        autoplayHoverPause:true,
        loop: false,
        responsive: {
            0: {
                items: 3
            },
            543: {
                items: 4
            },
            768: {
                items: 4
            },
            991: {
                items: 4
            },
            992: {
                items: 4
            },
            1200: {
                items: 4
            },
            1500: {
                items: 4
            }
        }
    });



});

var $storeId = $('#storeId').val();







function increase(){
    document.getElementById('qtym').stepUp();
}

function decrease(){
    document.getElementById('qtym').stepDown();
}

function TdqCounters(){
    window.setInterval(function(){
        var counterNumber = $('.product-single__visitor-number'),
            min = counterNumber.data('min'),
            max = 58,
            randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        counterNumber.text(randomNumber);

        var user = ['A.Hoàng', 'Chị Tâm', 'A.Tuấn', 'Chị Hoài', 'A.Bình', 'A.Hiếu', 'Chị Vân', 'Chị Hoa', 'A.Trường', 'A.Đức', 'Chị Duyên', 'A.Huy', 'Chị Hương', 'A.Toàn', 'Chị Giang',
                'Chị Hằng', 'A.Minh', 'Chị Thu', 'A.Quang', 'Chú Long', 'Cô Lan', 'Chị Yến', 'Chú Quân', 'Chú Đức', 'Cô Hải', 'Chị Mai', 'Chú Lâm', 'Chị Na', 'Chị Hiền', 'A.Tiến', 'Chị Quỳnh',
                'A.Chiến', 'Chú Bảo', 'Chú Hải', 'A.Tâm', 'Chị Trâm', 'Chú Hoàng', 'Chị Dương', 'Chị Lan Anh', 'A.Hoài Nam', 'A. Hồ Phong', 'A. Đức Bình', 'Chị Bảo An', 'Chị Thu Trang'],
            userRandom = user[Math.floor(Math.random()*user.length)];
        $('.titleuser').text(userRandom);



    }, 15000);
}
$(window).load(function(){
    var user = ['A.Hoàng', 'Chị Tâm', 'A.Tuấn', 'Chị Hoài', 'A.Bình', 'A.Hiếu', 'Chị Vân', 'Chị Hoa', 'A.Trường', 'A.Đức', 'Chị Duyên', 'A.Huy', 'Chị Hương', 'A.Toàn', 'Chị Giang',
            'Chị Hằng', 'A.Minh', 'Chị Thu', 'A.Quang', 'Chú Long', 'Cô Lan', 'Chị Yến', 'Chú Quân', 'Chú Đức', 'Cô Hải', 'Chị Mai', 'Chú Lâm', 'Chị Na', 'Chị Hiền', 'A.Tiến', 'Chị Quỳnh',
            'A.Chiến', 'Chú Bảo', 'Chú Hải', 'A.Tâm', 'Chị Trâm', 'Chú Hoàng', 'Chị Dương', 'Chị Lan Anh', 'A.Hoài Nam', 'A. Hồ Phong', 'A. Đức Bình', 'Chị Bảo An', 'Chị Thu Trang'],
        userRandom = user[Math.floor(Math.random()*user.length)];

    var starter = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58',],
        starterCounter = Math.floor(Math.random() * starter.length);
    $('.product-single__visitor-number').text(starterCounter);
    $('.nameuser').text(userRandom);
    $('.product-single__visitor').removeClass('hidden');
});
$(document).ready(function(){
    TdqCounters();
});

var ww = $(window).width();

var selectCallback = function(variant, selector) {
    $('.iwishAddWrapper').attr('data-variant',variant.id);
    if (variant) {

        var form = jQuery('#' + selector.domIdPrefix).closest('form');

        for (var i=0,length=variant.options.length; i<length; i++) {

            var radioButton = form.find('.swatch[data-option-index="' + i + '"] :radio[value="' + variant.options[i] +'"]');
            if (radioButton.size()) {
                radioButton.get(0).checked = true;
            }
            jQuery('.swatch[data-option-index="' + i + '"] :radio[value="' + variant.options[i] +'"]').removeClass('soldout').addClass('available').find(':radio').removeAttr('disabled');

        }
    }
    var addToCart = jQuery('.form-product .btn-cart'),
        addToCartType2 = jQuery('.form-product .btn-cart2'),
        form = jQuery('.form-product .form_button_details'),
        productPrice = jQuery('.details-pro .special-price .product-price'),
        qty = jQuery('.availabel'),
        sale = jQuery('.details-pro .old-price .product-price-old'),
        comparePrice = jQuery('.details-pro .old-price .product-price-old'),
        priceTopbar  = jQuery('.product_info_price_value-final'),
        title = jQuery('.product_info_price_title'),
        button = jQuery('.btn_buyNow');

    /*** VAT ***/
    if (variant){
        if (variant.taxable){
            $('.taxable').removeClass('hidden').find('.vat').text('ÄĂ£ bao gá»“m VAT');
        } else {
            $('.taxable').removeClass('hidden').find('.vat').text('ChÆ°a bao gá»“m VAT');
        }
    }


    if (variant && variant.available) {

        if(variant.inventory_management == "bizweb"){
            if (variant.inventory_quantity != 0) {
                qty.html('CĂ²n hĂ ng');
            } else if (variant.inventory_quantity == ''){
                qty.html('Ngá»«ng bĂ¡n');
            }
        } else {
            qty.html('CĂ²n hĂ ng');
        }
        button.addClass('add_to_cart').removeAttr('disabled').text('Äáº·t mua ngay');
        addToCart.removeAttr('disabled').find('span').text('Äáº·t mua ngay');
        addToCart.removeClass('hidden');
        addToCartType2.addClass('hidden');
        addToCartType2.removeClass('hidden');
        button.removeClass('hidden');
        if(variant.price == 0){
            title.html('');
            button.addClass('hidden');
            priceTopbar.html('LiĂªn há»‡');
            productPrice.html('LiĂªn há»‡');
            comparePrice.hide();
            form.addClass('hidden');
            sale.removeClass('sale');
            $('.taxable').addClass('hidden')
            if(variant.inventory_management == "bizweb"){
                if (variant.inventory_quantity != 0) {
                    qty.html('CĂ²n hĂ ng');
                } else if (variant.inventory_quantity == ''){
                    qty.html('Ngá»«ng bĂ¡n');
                    addToCartType2.attr('disabled', 'disabled').find('span').text('Ngá»«ng bĂ¡n');
                }
            } else {
                qty.html('CĂ²n hĂ ng');
            }
        }else{
            title.html('GiĂ¡ bĂ¡n:');
            priceTopbar.html(Haravan.formatMoney(variant.price, "{{amount_no_decimals_with_comma_separator}}â‚«"));
            form.removeClass('hidden');
            productPrice.html(Haravan.formatMoney(variant.price, "{{amount_no_decimals_with_comma_separator}}â‚«"));
            // Also update and show the product's compare price if necessary
            if ( variant.compare_at_price > variant.price ) {
                comparePrice.html(Haravan.formatMoney(variant.compare_at_price, "{{amount_no_decimals_with_comma_separator}}â‚«")).show();
                sale.addClass('sale');
                if(variant.inventory_management == "bizweb"){
                    if (variant.inventory_quantity != 0) {
                        qty.html('CĂ²n hĂ ng');
                    } else if (variant.inventory_quantity == ''){
                        qty.html('CĂ²n hĂ ng');
                    }
                } else {
                    qty.html('CĂ²n hĂ ng');
                }
            } else {
                comparePrice.hide();
                sale.removeClass('sale');
                if(variant.inventory_management == "bizweb"){
                    if (variant.inventory_quantity != 0) {
                        qty.html('CĂ²n hĂ ng');
                    } else if (variant.inventory_quantity == ''){
                        qty.html('Ngá»«ng bĂ¡n');
                        addToCartType2.attr('disabled', 'disabled').find('span').text('Ngá»«ng bĂ¡n');
                    }
                } else {
                    qty.html('CĂ²n hĂ ng');
                }
            }
        }

    } else {
        button.removeClass('add_to_cart').text('Ngá»«ng bĂ¡n').attr('disabled', 'disabled');
        qty.html('Ngá»«ng bĂ¡n');
        addToCart.attr('disabled', 'disabled').find('span').text('Ngá»«ng bĂ¡n');
        addToCartType2.attr('disabled', 'disabled').find('span').text('Ngá»«ng bĂ¡n');
        form.removeClass('hidden');
        if(variant){
            if(variant.price != 0){
                title.html('GiĂ¡ bĂ¡n:');
                priceTopbar.html(Haravan.formatMoney(variant.price, "{{amount_no_decimals_with_comma_separator}}â‚«"));
                form.removeClass('hidden');
                addToCart.addClass('hidden');
                addToCartType2.addClass('hidden');
                productPrice.html(Haravan.formatMoney(variant.price, "{{amount_no_decimals_with_comma_separator}}â‚«"));
                // Also update and show the product's compare price if necessary
                if ( variant.compare_at_price > variant.price ) {
                    form.addClass('hidden');
                    comparePrice.html(Haravan.formatMoney(variant.compare_at_price, "{{amount_no_decimals_with_comma_separator}}â‚«")).show();
                    sale.addClass('sale');
                    if(variant.inventory_management == "bizweb"){
                        if (variant.inventory_quantity != 0) {
                            qty.html('CĂ²n hĂ ng');
                        } else if (variant.inventory_quantity == ''){
                            qty.html('Ngá»«ng bĂ¡n');
                            form.addClass('hidden');
                            addToCart.removeClass('hidden');
                            addToCartType2.removeClass('hidden');
                            button.removeClass('hidden');
                        }
                    } else {
                        qty.html('CĂ²n hĂ ng');
                    }
                } else {
                    comparePrice.hide();
                    sale.removeClass('sale');
                    if(variant.inventory_management == "bizweb"){
                        if (variant.inventory_quantity != 0) {
                            qty.html('CĂ²n hĂ ng');
                        } else if (variant.inventory_quantity == ''){
                            qty.html('Ngá»«ng bĂ¡n');
                            form.removeClass('hidden');
                            addToCart.removeClass('hidden');
                            addToCartType2.removeClass('hidden');
                            button.removeClass('hidden');
                            priceTopbar.html(Haravan.formatMoney(variant.price, "{{amount_no_decimals_with_comma_separator}}â‚«")).show();
                        }
                    } else {
                        qty.html('CĂ²n hĂ ng');
                    }
                }
            }else{
                title.html('LiĂªn há»‡');
                priceTopbar.hide();
                productPrice.html('LiĂªn há»‡');
                comparePrice.hide();
                form.addClass('hidden');
                sale.removeClass('sale');
                addToCart.addClass('hidden');
                addToCartType2.addClass('hidden');
                button.addClass('hidden');
                $('.taxable').addClass('hidden')
            }
        }else{
            title.html('LiĂªn há»‡');
            priceTopbar.hide();
            button.addClass('hidden');
            productPrice.html('LiĂªn há»‡');
            comparePrice.hide();
            form.addClass('hidden');
            sale.removeClass('sale');
            addToCartType2.addClass('hidden');
            addToCart.addClass('hidden');
            $('.taxable').addClass('hidden')
        }

    }



};
jQuery(function($) {
    if(variantsize == true ){

        new Haravan.OptionSelectors('product-selectors', {
            product: productJson,
            onVariantSelected: selectCallback,
            enableHistoryState: true
        });
    }

    // Add label if only one product option and it isn't 'Title'. Could be 'Size'.
    if(productOptionsSize == 1){
        $('.selector-wrapper:eq(0)').prepend('<label>'+ optionsFirst +'</label>');
    }

    // Hide selectors if we only have 1 variant and its title contains 'Default'.
    if(cdefault == 1){
        $('.selector-wrapper').hide();
    }
    $('.selector-wrapper').css({
        'text-align':'left',
        'margin-bottom':'15px'
    });
});

jQuery('.swatch :radio').change(function() {
    var optionIndex = jQuery(this).closest('.swatch').attr('data-option-index');
    var optionValue = jQuery(this).val();
    jQuery(this)
        .closest('form')
        .find('.single-option-selector')
        .eq(optionIndex)
        .val(optionValue)
        .trigger('change');
});
if (ww >= 1200){
    $(document).ready(function() {
        if($(window).width()>1200){
            $('#img_01').elevateZoom({
                gallery:'gallery_02',
                zoomWindowWidth:420,
                zoomWindowHeight:500,
                zoomWindowOffetx: 10,
                easing : true,
                scrollZoom : false,
                cursor: 'pointer',
                galleryActiveClass: 'active',
                imageCrossfade: true
            });
        }
    });
}
$(".dp-flex img").click(function(e){
    e.preventDefault();
    var hr = $(this).attr('data-src');
    $('#img_01').attr('src',hr);
    $('.pict').attr('src',hr);
    $('.large_image_url').attr('href',hr);
    $('#img_01').attr('data-zoom-image',hr);
});





$(".not-dqtab").each( function(e){
    $(this).find('.tabs-title li:first-child').addClass('current');
    $(this).find('.tab-content').first().addClass('current');

    $(this).find('.tabs-title li').click(function(){
        if($(window).width()>315){
            if($(this).hasClass('current')){
                $(this).removeClass('current');
            }else{
                var tab_id = $(this).attr('data-tab');
                var url = $(this).attr('data-url');
                $(this).closest('.e-tabs').find('.tab-viewall').attr('href',url);

                $(this).closest('.e-tabs').find('.tabs-title li').removeClass('current');
                $(this).closest('.e-tabs').find('.tab-content').removeClass('current');

                $(this).addClass('current');
                $(this).closest('.e-tabs').find("#"+tab_id).addClass('current');
            }
        }else{
            var tab_id = $(this).attr('data-tab');
            var url = $(this).attr('data-url');
            $(this).closest('.e-tabs').find('.tab-viewall').attr('href',url);

            $(this).closest('.e-tabs').find('.tabs-title li').removeClass('current');
            $(this).closest('.e-tabs').find('.tab-content').removeClass('current');

            $(this).addClass('current');
            $(this).closest('.e-tabs').find("#"+tab_id).addClass('current');

        }

    });
});
function scrollToxx() {
    $('html, body').animate({ scrollTop: $('.product-tab.e-tabs').offset().top }, 'slow');
    return false;
}

if (ww >= 1200){
    $(document).ready(function() {
        $('#img_01').elevateZoom({
            gallery:'gallery_02',
            zoomWindowWidth:420,
            zoomWindowHeight:500,
            zoomWindowOffetx: 10,
            easing : true,
            scrollZoom : false,
            cursor: 'pointer',
            galleryActiveClass: 'active',
            imageCrossfade: true

        });
    });
}
$('#gallery_00 img, .swatch-element label').click(function(e){

    $('.checkurl').attr('href',$(this).attr('src'));
    if (ww >= 1200){
        setTimeout(function(){
            $('.zoomContainer').remove();
            $('#zoom_01').elevateZoom({
                gallery:'gallery_02',
                zoomWindowWidth:420,
                zoomWindowHeight:500,
                zoomWindowOffetx: 10,
                easing : true,
                scrollZoom : false,
                cursor: 'pointer',
                galleryActiveClass: 'active',
                imageCrossfade: true
            });
        },300);
    }
});

$("#img_01").elevateZoom({
    gallery:'gal1',
    cursor: 'pointer',
    galleryActiveClass: 'active',
    imageCrossfade: true,
    loadingIcon: 'http://www.elevateweb.co.uk/spinner.gif'
});



