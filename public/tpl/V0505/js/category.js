$(function(){
	$('#menuCate>ul>li').each(function () {
        if ($(this).attr('data-rel') == $('.clearfix.menuActive').attr('data-rel')) {
            $(this).addClass('active');       
        }
    });
	$('#menuCate>ul>li:first-child').addClass('active');
	$('.active > ul').css('display', 'block');
	$('#menuCate li.has-sub>.toggle').on('click', function(){	
		var element = $(this).parent('li');
		if (element.hasClass('active')) {
			element.removeClass('active');
			element.find('li').removeClass('active');
			element.find('ul').slideUp();
			$('.action').children('ul').css('display','block');
		}
		else {
			element.addClass('active');
			element.children('ul').slideDown();
			element.siblings('li').children('ul').slideUp();
			$('.action').children('ul').css('display','block');
			element.siblings('li').removeClass('active');
			element.siblings('li').find('li').removeClass('active');
			element.siblings('li').find('ul').slideUp();
			
		}
	});

	$('.wrpOption .dropdown-menu > li a').click(function () {
		var attr = $(this).attr('title');
		window.location.href= attr;
	});
	$('.wrpOption .dropdown-menu > li').each(function(){
		if($(this).hasClass('active')){
			var title = $(this).children('a').html();
			$(this).parents('.wrpOption').find('.selectBtn').html(title).append('<i class="fa fa-angle-down" aria-hidden="true"></i>');
		}
	});

	var getWidthContent = $('.content').width();
	if(getWidthContent < 145){
		$('.btn-view-more').hide()
	}

	$('.btn-view-more').click(function(){
		$('.content').css('max-height', 'unset');
		$('.btn-view-more').hide();
	});
});

function openNav1() {
	document.getElementById("fillter-mobile-box").style.width = "340px";
}

function closeNav1() {
	document.getElementById("fillter-mobile-box").style.width = "0";
}

$('.filter-vendor > li label input').click(function () {
	var attr = $(this).attr('value');
	window.location.href= attr;
});

$('.filter-price > li label input').click(function () {
	var attr = $(this).attr('value');
	window.location.href= attr;
});

var even3 = true;

function showFilter(id) {
	// console.log("ping");
	if (even3) {
		openMenuCate(id)
	} else {
		closeMenuCate(id)
	}

	even3 = !even3;
}

$(document).ready(function () {
	var ps = [];
	$('.product-box').each(function () {
		var t = $(this);
		ps.push({storeId: t.attr('data-storeId'), id: t.attr('data-id')});
	});
	InventoryLoad(ps);
});

function InventoryLoad(ps) {
	if (ps.length) {
		checkInventory(ps, function (rs) {
			if (rs.inventories != "") {
				$.each(rs.inventories, function (key, vl) {
					if (vl <= 0) {
						$('.product-box[data-id="' + key + '"] .prd-stock .cl-left').append('<span class="product-stock text-red"><i class="fas fa-times"></i>' + 'Hết hàng' + '</span>');
					} else {
						$('.product-box[data-id="' + key + '"] .prd-stock .cl-left').append('<span class="product-stock text-green"><i class="fas fa-check"></i>' + 'Còn hàng' + '</span>');
					}
				});
			}
		});
	}
}