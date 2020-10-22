$(document).on('click', '.quick-view', function(e) {
	if($(window).width() > 1025){
		e.preventDefault();
		var productHandle = $(this).data("handle"),
				quickView= $("#quickview"),
				thumbList = quickView.find(".thumblist");
		//Get content
		quickViewGetContent(productHandle);
		//Show
		thumbList.parent().removeClass('op1');
		quickView.modal();
		setTimeout(function(){ thumbList.parent().addClass('op1'); }, 700);
	}
});


//Load content quickview
function quickViewGetContent(productHandle){
	Haravan.getProduct(productHandle,function(product) {


		var quickView= $("#quickview");
		//Reset
		quickView.find('.selector-wrapper').remove();
		quickView.find('.swatch').remove();
		quickView.find('form > input').remove();
		//ID
		quickView.find(".variants > select").attr("id", "product-select-" + product.id);
		//Image
		var featuredImage = product.featured_image;
		if(featuredImage == null){
			featuredImage = 'https://hstatic.net/0/0/global/noDefaultImage6_large.gif';
		}
		//Other info

		var $info = $('.info-other');
		$info.html("");
		$info.hide();
		if(product.vendor){
			$info.show();
			$info.append('<p><label class="inline-block">Hãng sản xuất</label>: '+ product.vendor +'</p>')
		}
		if(product.product_type){
			$info.show();
			$info.append('<p><label class="inline-block">Loại sản phẩm</label>: '+ product.product_type +'</p>')
		}

		quickView.find(".product-featured-image-quickview").attr("src",featuredImage);
		var thumbList = quickView.find(".thumblist");
		thumbList.html('<div class="thumblist_carousel owl-carousel"></div>');
		if (product.images.length > 1) {
			for (i in product.images) {
				var imageBig = Haravan.resizeImage(product.images[i], "grande"),
						imageSmall = Haravan.resizeImage(product.images[i], "compact"),
						imageItem = '<div class="item"><img data-image="'+ imageBig +'" src="' + imageSmall + '" alt="Proimage" /></div>';
				thumbList.find('.thumblist_carousel').append(imageItem);
			}
		}
		//Create slider thumb(Ở đấy thêm carousel thì như này, còn nếu swipper thì thêm các class của swipper và gọi swipper nhé)
		thumbList.find('.thumblist_carousel').removeClass('owl-loaded owl-drag');
		thumbList.parent().removeClass('item');

		setTimeout(function(){
			thumbList.find('.thumblist_carousel').owlCarousel({
				loop:false,
				margin:15,
				responsiveClass:true,
				dots:false,
				nav:true,
				responsive:{
					0:{
						items:3
					},
					543:{
						items:3
					},
					768:{
						items:4
					},
					992:{
						items:4
					},
					1200:{
						items:4
					}
				}
			});
		}, 700);



		//Change image thumb click
		thumbList.find('img').click(function(e){
			quickView.find(".product-featured-image-quickview").attr("src",$(this).attr('data-image'));
		});
		//Description

		if(product.summary != null && product.summary !=""){
			var productDes = product.summary;
		}else{
			if(product.description != null){
				var productDes = product.description.replace(/(<([^>]+)>)/ig,"");
				productDes = productDes.slice(0,300);
			}else{
				var productDes = "";
			}
		}
		//Other info (Nếu cần thêm các trường thông tin khác như Hãng, Loại, Tình trạng thì thêm dưới chỗ này luôn nhé)
		quickView.find(".product-name a").text(product.title);
		if (productDes == ""){
			quickView.find(".product-description").hide();
		}else{
			quickView.find(".product-description").show();
			quickView.find(".product-description").html(productDes);
		}
		quickView.find(".view-more").attr('href',product.url);
		quickView.find(".product-name a").attr('href',product.url);

		//Price
		quickViewPrice(quickView, product.price,product.compare_at_price_max);

		//Action
		quickViewAction(quickView,product);

		//Variant
		quickViewVariantsSwatch(product, quickView);
	});
}
//Create variant function
function quickViewVariantsSwatch(t, quickView) {


	if (t.variants.length > 1) {
		quickView.find('.selector-wrapper').remove();
		for (var r = 0; r < t.variants.length; r++) {
			var i = t.variants[r];
			var s = '<option value="' + i.id + '">' + i.title + "</option>";
			quickView.find("form.variants > select").append(s)
		}

		//selectCallbackquickView
		var ps = "product-select-" + t.id;
		new Haravan.OptionSelectors( ps, {
			product: t,
			onVariantSelected: selectCallbackquickView
		});

		//Fix 1 variant
		if (t.options.length == 1) {
			quickView.find(".selector-wrapper:eq(0)").prepend("<label>" + t.options[0].name + "</label>")
		}

		var options="";
		quickView.find('.swatch').remove();
		for (var i = 0; i < t.options.length; i++) {
			options += '<div class="swatch clearfix" data-option-index="' + i + '">';
			options += '<div class="header">' + t.options[i].name + ': </div>';
			//Check Variant Color
			var is_color = false;
			if (/Color|Colour|Màu/i.test(t.options[i].name)) {
				is_color = true;
			}
			//Fill Options
			var optionValues = new Array();
			for (var j = 0; j < t.variants.length; j++) {
				var variant = t.variants[j];
				var value = variant.options[i];
				var valueHandle = dl_convertVietnamese(value);
				var forText = 'swatch-' + i + '-' + valueHandle;
				if (optionValues.indexOf(value) < 0) {
					//
					if(variant.featured_image != null){
						options += '<div data-image="'+variant.featured_image.src+'" data-value="' + value + '" class="swatch-element ' + (is_color ? "color " : " ") + valueHandle + (variant.available ? ' available ' : ' soldout ') + '">';
					}else{
						options += '<div  data-value="' + value + '" class="swatch-element ' + (is_color ? "color " : " ") + valueHandle + (variant.available ? ' available ' : ' soldout ') + '">';
					}
					if (is_color) {
						options += '<div class="tooltip">' + value + '</div>';
					}
					options += '<input id="' + forText + '" type="radio" name="option-' + i + '" value="' + value + '" ' + (j == 0 ? ' checked ' : '') + (variant.available ? '' : '') + ' />';

					if (is_color) {
						if(variant.featured_image){
							options += '<label for="' + forText + '" class="'+valueHandle+'" style="background-repeat: no-repeat; background-position: center;background-color: ' + valueHandle + ';background-image:url('+variant.featured_image.src+');background-size: 26px 26px;"></label>';
						}else{
							options += '<label for="' + forText + '" class="'+valueHandle+'" style="background-repeat: no-repeat; background-position: center;background-color: ' + valueHandle + ';background-size: 26px 26px;"></label>';
						}
					} else {
						options += '<label for="' + forText + '">' + value + '</label>';
					}
					options += '</div>';
					optionValues.push(value);
				}
			}
			options += '</div>';
		}

		quickView.find('form.variants > select').after(options);

		//Change Swatch	variant
		quickView.find('.swatch :radio').change(function() {
			var optionIndex = $(this).closest('.swatch').attr('data-option-index');
			var optionValue = $(this).val();
			$(this)
			.closest('form')
			.find('.single-option-selector')
			.eq(optionIndex)
			.val(optionValue)
			.trigger('change');
		});
		//Add label
		quickView.find("form.variants .selector-wrapper label").each(function(n, r) {
			$(this).html(t.options[n].name)
		})
	}
	else {

		quickView.find('form.variants > select').html('<select name="Id" class="hidden" style="display:none"></select>');
		var q = '<input type="hidden" name="Id" value="' + t.variants[0].id + '">';
		console.log(q);
		quickView.find("form.variants").append(q);
	}
}

//Callback
function selectCallbackquickView(variant, selector) {
	var quickView= $("#quickview");
	var price = quickView.find(".product-price"),
			comparePrice = quickView.find(".product-price-old"),
			form = quickView.find(".variants"),
			action = quickView.find(".quantity_wanted_p"),
			btn = form.find('button');

	if (variant) {
		/*Change variant image*/
		if (variant && variant.featured_image) {
			quickView.find(".product-featured-image-quickview").attr("src",variant.featured_image.src);
		}


		quickViewAction(quickView,variant);
		quickViewPrice(quickView,variant.price,variant.compare_at_price);
		if (variant.available) {
			var form = jQuery('#' + selector.domIdPrefix).closest('form');
			for (var i=0,length=variant.options.length; i<length; i++) {
				var radioButton = form.find('.swatch[data-option-index="' + i + '"] :radio[value="' + variant.options[i] +'"]');
				if (radioButton.size()) {
					radioButton.get(0).checked = true;
				}
			}
		}

	} else {
		quickViewPrice(quickView,0,0);
	}
};

//Function update action
function quickViewAction(quickView,obj){
	var btn = quickView.find('form button');
	if (!obj.available) {
		btn.text("Hết hàng").addClass("disabled").attr("disabled", "disabled");
		$('#quickview .inventory').html('<i class="fa fa-check"></i> Hết hàng');
	}else{
		btn.text("Thêm vào giỏ hàng").removeClass("disabled").removeAttr('disabled');
		$('#quickview .inventory').html('<i class="fa fa-check"></i> Còn hàng');
	}
}
//Function Check Price
function quickViewPrice(quickView,productPrice, productCompare_price){

	var price = quickView.find(".product-price"),
			comparePrice = quickView.find(".product-price-old"),
			form = quickView.find(".variants"),
			action = quickView.find(".quantity_wanted_p"),
			btn = form.find('button');
	//Check contact
	if(productPrice == 0 ){
		price.text('Liên hệ');
		comparePrice.hide();
		action.hide();
		$('#quickview .inventory').html('<i class="fa fa-check"></i> Liên hệ');
	}else{
		//If price # 0 show form action.
		action.show();
		//Get price

		price.text(Haravan.formatMoney(productPrice, "{{amount_no_decimals_with_comma_separator}}₫" ));
		if(productCompare_price > productPrice){

			var pt = ((productCompare_price - productPrice))/productCompare_price * 100;
			comparePrice.html('Giá gốc: <del class="price product-price-old" >' + Haravan.formatMoney(productCompare_price, "{{amount_no_decimals_with_comma_separator}}₫") + '</del> <span class="discount">(-'+ Math.ceil(pt) +'%)</span>').show();
		}else{
			comparePrice.hide();
		}

	}
}

$(document).on('click','.quick-view',function () {
	var t = $(this);
	$.post('/product/q' + t.attr('data-psId'),
		function (rs) {
			$('.modal .modal-dialog .modal-content .modal-body').html(rs);
			$('.modal .modal-dialog .modal-content .modal-body ').show();

		}
	);
	return false;
});



/* Show Quick Cart  */
$(document).ready(function (){
    $(".btnAddToCart").on("click", function(e){
        e.preventDefault();
        if ($(this).attr('id') != 'AddToCart' && $(this).attr('id') != 'buy-now') {
            if ($(this).attr("ck") == 1) {
                var products = [], ps = {};
                var id = ($(this).attr('id'));
                ps['id'] = $(this).attr('selid');
                if (id == 'btnQuickCart' || id == 'buyNow') {
                    ps['quantity'] = 1;
                } else {
                    ps['quantity'] = $("#Quantity").val();
                }
                var qty = parseInt(ps['quantity']);
                products.push(ps);

                addToCart(products, 1, function(rs){

                    if (rs.status == 1) {

                        if (id == 'buy-now' || id == 'buyNow'){
                            window.location.href = '/cart/checkout?emptylayout=true';
                        } else if (id == 'btnQuickCart') {
                            // alert('Sản phảm của bạn đã được thêm vào giỏ hàng');
                            $('.count-cart span').text(parseInt(rs.data.totalQuantities + ps['quantity']));
                            var totalqtt = parseInt(rs.data.totalQuantities + ps['quantity'])

                            ajaxLoadView({
                                view: 'topCart',
                                onSuccess: function (rs) {


                                    $('#myModal #popup-cart-desktop').html(rs);
                                    $('#myModal').fadeIn();

                                }
                            });
                        }

                    } else {
                        alert(msgSizeandColor);
                        // alert(msgSizeColorProduct);
                    }
                });
            } else {
                // alert(msgOutofStock);
                alert(msgSizeColorProduct);
                return false;
            }
        }
    });

    $('.childProducts').change(function () {
        var val = $(this).val(), data = val.split(","), $psId = data[0], $price_op = data[1];
        if ($psId != 1) {
            $('#addToCart').attr('ck', 1).attr('selId', $psId).removeClass('unsel').removeAttr('title').removeAttr('data-original-title');
        } else {
            $('#addToCart').attr('title', 'Vui lòng chọn sản phẩm!').attr('data-original-title', 'Vui lòng chọn sản phẩm!').attr('ck', 0);
        }
        $('.current-price strong').html($.number($price_op)+ '<span class="vnd"> VNĐ</span>');
    });
});
/* End Quick Cart  */

// filter brand
$('.filter-group > ul li label input').click(function(){

	let attr = $(this).attr('value');
	window.location.href = attr;
});

$('.sort-by label select option').click(function(){

	let attr = $(this).attr('value');
	window.location.href = attr;
});


$(document).on('click','.quick-view',function () {
	var t = $(this);
	$.post('/product/q' + t.attr('data-psId'),
		function (rs) {
			$('.modal .modal-dialog .modal-content .modal-body').html(rs);
			$('.modal .modal-dialog .modal-content .modal-body ').show();

		}
	);
	return false;
});

