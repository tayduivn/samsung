$(function(){
    if ($('body .datepicker').length){
		$('.datepicker').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true
		});
    }

	// Tạo mã giới thiệu
    $('#getAffiliate').click(function () {
        var affiliateCode = $('#affiliateCode').val();
        $.post(
    		'/affiliate/add',
    		{
				'affiliateCode' : affiliateCode
			},
    		function(rs){
    			if (rs.code == 1) {
    				window.location.reload();
				}
    			else {
    				if (!$('.errHasIdentity').length) {
    					$('.errors').html('<i class="fa fa-warning"></i> ' + rs.messages);
					}
    			}
    		}
        );
    });
    $('#affCusCode ul li').click(function(){
    	$('#affCusCode ul li').removeClass('active');
    	$('#affCusCode ul li').addClass('borderNone');
    	$(this).addClass('active');

    	var code = '?affcode='+$(this).text();
    	var linkHome = $('#linkHomeCopy'), linkShipping = $('#linkShippingCopy'), linkAdmin = $('#linkAdminCopy');
    	var linkWebsite = $('#linkWebsiteCopy'), linkCrm = $('#linkCrmCopy'), linkUseTrial = $('#linkUseTrialCopy');
    	linkHome.attr('href',linkHome.attr('data-link') + code).text(linkHome.attr('data-link') + code);
    });
//    $('.fbshareHome').click(function(){
//    	window.open("https://www.facebook.com/sharer/sharer.php?u="+$('#linkHomeCopy').attr('href'), '',
//        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600,left=400');
//        return false;
//    });
//    $('.ggshareHome').click(function(){
//    	window.open("https://plus.google.com/share?url="+$('#linkHomeCopy').attr('href'), '',
//        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=400,left=500');
//        return false;
//    });
//    $('.twshareHome').click(function(){
//    	window.open("https://twitter.com/home?status="+$('#linkHomeCopy').attr('href'), '',
//        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600,left=400');
//        return false;
//    });
});