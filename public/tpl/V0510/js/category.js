$( document ).ready(function() {
	$('.paging-next').addClass('fa fa-caret-right');
	$('.paging-last').addClass('fa fa-angle-double-right');
	$('.paging-first').addClass('fa fa-angle-double-left');
	$('.paging-previous').addClass('fa fa-caret-left');
	$(".collection-filter-price  .panel").css('max-height', '0');
	$(".collection-filter-vendor  .panel").css('max-height', '0');

});
$(function () {
	$(".collection-categories .accordion").click(function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(".collection-categories .panel").css('max-height', '0');
		} else {
			$(this).addClass('active');
			$(".collection-categories .panel").css('max-height', '242px');
		}
	});

	$(".collection-filter-price .accordion").click(function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(".collection-filter-price .panel").css('max-height', '0');
		} else {
			$(this).addClass('active');
			$(".collection-filter-price .panel").css('max-height', '344px');
		}
	});

	$(".collection-filter-vendor .accordion").click(function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			// $(".collection-filter-vendor .panel").css('max-height', '0');
			$(this).parent().children('.panel').css('max-height', '0');
		} else {
			$(this).addClass('active');
			$(this).parent().children('.panel').css('max-height', '250px');
			// $(".collection-filter-vendor .panel").css('max-height', '250px');
		}
	});

	$(".collection-filter-type .accordion").click(function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(".collection-filter-type .panel").css('max-height', '0');
		} else {
			$(this).addClass('active');
			$(".collection-filter-type .panel").css('max-height', '108px');
		}
	});

	// $(".collection-filter-material .accordion").click(function () {
	//     if ($(this).hasClass('active')) {
	//         $(this).removeClass('active');
	//         $(".collection-filter-material .panel").css('max-height', '0');
	//     } else {
	//         $(this).addClass('active');
	//         $(".collection-filter-material .panel").css('max-height', '203px');
	//     }
	// });

	// $(".collection-filter-size .accordion").click(function () {
	//     if ($(this).hasClass('active')) {
	//         $(this).removeClass('active');
	//         $(".collection-filter-size .panel").css('max-height', '0');
	//     } else {
	//         $(this).addClass('active');
	//         $(".collection-filter-size .panel").css('max-height', '156px');
	//     }
	// });

	// $(".collection-filter-style .accordion").click(function () {
	//     if ($(this).hasClass('active')) {
	//         $(this).removeClass('active');
	//         $(".collection-filter-style .panel").css('max-height', '0');
	//     } else {
	//         $(this).addClass('active');
	//         $(".collection-filter-style .panel").css('max-height', '109px');
	//     }
	// });

	// $(".collection-filter-color .accordion").click(function () {
	//     if ($(this).hasClass('active')) {
	//         $(this).removeClass('active');
	//         $(".collection-filter-color .panel").css('max-height', '0');
	//     } else {
	//         $(this).addClass('active');
	//         $(".collection-filter-color .panel").css('max-height', '203px');
	//     }
	// });

	$('.filter-vendor > li label input').click(function () {
		var attr = $(this).attr('value');
		window.location.href= attr;
	});

	$('.filter-vendor > li label div').click(function () {
		var attr = $(this).attr('value');
		window.location.href= attr;
	});

	$('.filter-price > li label input').click(function () {
		var attr = $(this).attr('value');
		window.location.href= attr;
	});

	$(window).load(function () {
		$('.collection-categories .panel').css('max-height', '344px');
		$('.collection-categories .panel').css('visibility', 'visible');
		$('.collection-categories .accordion').addClass('active');
		$('input[type=checkbox]').each(function () {
			if ($(this).is(':checked')) {
				$(this).parent().parent().parent().parent().prev().addClass('active');
				$(this).parent().parent().parent().parent().css('overflow', 'auto').css('max-height', '250px')
			}
		});
		$('.filter-vendor > li label div').each(function () {
			if ($(this).hasClass('sd')) {
				$(this).parent().parent().parent().parent().prev().addClass('active');
				$(this).parent().parent().parent().parent().css('overflow', 'auto').css('max-height', '250px')
			}
		})
	});
})
$( document ).ready(function() {
	$('.ul_col .content_ul > li').click(function () {
		$(this).addClass('active');
	});
	$('.ul_col .content_ul > li a').click(function () {
		var attr = $(this).attr('title');
		window.location.href= attr;
	});
	$('.ul_col .content_ul > li').each(function(){
		if($(this).hasClass('active')){
			var title = $(this).children('a').html();
			$(this).parents('li').find('span').html(title);
		}
	});
});
