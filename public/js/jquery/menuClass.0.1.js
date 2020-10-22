(function(){
	$.fn.menuClass = function(){
		$(this).addClass('lv1');
		$(this).children('li').addClass('lv1');
		$(this).children('li').children('a').addClass('lv1');
		$(this).children('li').children('ul').addClass('lv2');
		$(this).children('li').children('ul').children('li').addClass('lv2');
		$(this).children('li').children('ul').children('li').children('a').addClass('lv2');
		$(this).children('li').children('ul').children('li').children('ul').addClass('lv3');
		$(this).children('li').children('ul').children('li').children('ul').children('li').addClass('lv3');
		$(this).children('li').children('ul').children('li').children('ul').children('li').children('a').addClass('lv3');
	}
}(jQuery));