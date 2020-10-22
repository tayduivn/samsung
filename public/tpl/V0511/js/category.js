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