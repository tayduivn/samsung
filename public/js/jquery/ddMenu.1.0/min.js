/**
 * Drop down Menu v1.0
 * @author Chu Khanh Van (chukhanhvan@gmail.com)
 */
;(function($){
	$.fn.ddMenu = function() {
		// show menu ontop of select box (for IE6)
		//$(this).find('ul').bgiframe();

		// remove the empty sub menu
		$(this).find('ul').each(function(){
			if($(this).children('li').length == 0)
				$(this).remove();
		});
		// hover on top menu items
		$(this).find('ul:first').children('li').each(function(){
			$(this).hover(
				function(){ $(this).addClass('h'); },
				function(){ $(this).removeClass('h'); }
			);
		});
		// hover on sub menu items
		$(this).children('ul').children('li').find('li').hover(
			function(){ $(this).addClass('h').find('a:first').addClass('h'); },
			function(){ $(this).removeClass('h').find('a:first').removeClass('h'); }
		);
		// remove the border of the last links in sub menu
		$(this).children('ul').children('li').find('ul').each(function(){
			$(this).children('li:last').children('a').addClass('last');
		});
		// find all list items which has sub menu
		var liHasSubMenu = $(this).find('ul:not(:first)').parent();
		liHasSubMenu.each(function(){
			// check if is top menu
			this.isTop = $(this).parents('ul').length == 1 ? true : false;
			if(this.isTop){
				// add arrow down for top menu items which have sub menu
				$(this).children('a:first').addClass('hasSub').append("<span class='arrowDown'></span>");
			} else {
				// add arrow right for sub menu items which have sub menu
				$(this).children('a:first').append("<span class='arrowRight'></span>");
			}
			// get the width and height of current menu item
			this.dimensions = {
				// excludes the border and includes the padding
				w: $(this).innerWidth(),
				// includes both the border and the padding
				h: $(this).outerHeight(),
				subULw: $(this).find('ul:first').outerWidth(),
				subULh: $(this).find('ul:first').outerHeight()
			};
			$(this).find('ul:first').css({top: this.isTop ? this.dimensions.h + 'px' : 0});

			// add hover effect for all list items which has sub menu
			$(this).hover(
				function(e) {
					this.offsets = {
						left: $(this).offset().left,
						top: $(this).offset().top
					};
					var leftMenu = this.isTop ? 0 : this.dimensions.w;
					// If sub menu is over the width of window, display the sub menu back to the left side
					if(this.offsets.left + leftMenu + this.dimensions.subULw > $(window).width()){
						leftMenu = this.isTop ? -this.dimensions.subULw + this.dimensions.w + 1 : -this.dimensions.w + 1;
					}
					if ($(this).children('ul:first').queue().length <= 1) {
						if(this.isTop){
							$(this).children('ul:first').css({left: leftMenu + 'px', width:this.dimensions.subULw + 'px'}).slideDown(100);
						} else {
							$(this).children('ul:first').css({left: (leftMenu) + 'px', width:this.dimensions.subULw + 'px'}).show(100);
						}
					}
				},
				function(e) {
					if(this.isTop){
						$(this).children('ul:first').slideUp(200);
					} else {
						$(this).children('ul:first').hide();
					}
				}
			);
		}); // end liHasSubMenu

		// hide all sub menus
		$(this).find('ul:not(:first)').css({display:'none', visibility:'visible'});
	};
})(jQuery);