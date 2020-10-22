var GenerateFeed = {
		createdFeed: function(callback){
			$.post(
				this.redirect,
				{},
				function(rs){
					if (rs.code == 1) {
						var pt = Math.round((rs.currentPage / rs.totalPage) * 100);
						$('.progress-bar').css('width',pt+'%');
						$('.progress-bar>span').html(pt+'% Complete');
						GenerateFeed.redirect = rs.redirect;
						if (rs.currentPage <= rs.totalPage) {
							GenerateFeed.createdFeed();
						}
					}
					if(rs.code == 2) {
						$('.progress-bar').css('width','100%');
						$('.progress-bar>span').html('100% Complete');
						if (rs.link) {
							$.each(rs.link,function (key, value) {
                                $('#linksFeed').append('<p><h4>'+key+': </h4><a target="_blank" href="'+value+'">'+value+'</a></p>');
                            });
						}

					}
				}
			);
		}
	}
$(function(){
	$('.bnGenerateFeed').click(function(event){
		$('.progress-bar').css('width','0%');
		$('.progress-bar>span').html('0% Complete');
		GenerateFeed.redirect = $(this).attr('linkfeed') + '&productFeed='+$('#product_feed').val();
		GenerateFeed.createdFeed();
	});

});