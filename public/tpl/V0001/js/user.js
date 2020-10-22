$(function(){
	$('#changepassword').click(function(){
		if($(this).is(':checked')) {
			$('.hidden-pwd').show();
			$('input[type="password"]').addClass('validate[required],minSize[6]');
			$('#repassword').removeClass('validate[required],minSize[6]').addClass('validate[required,equals[newpassword],minSize[6]]');
		} else {
			$('.hidden-pwd').hide();
			$('input[type="password"]').removeClass('validate[required],minSize[6]').removeClass('validate[required,equals[newpassword],minSize[6]]');
		}
	});
	jQuery('form.profile').validationEngine('hide');
	jQuery('input').attr('data-prompt-position','centerRight');
	jQuery('input').data('promptPosition','centerRight');
	jQuery('textarea').attr('data-prompt-position','centerRight');
	jQuery('textarea').data('promptPosition','centerRight');
	jQuery('select').attr('data-prompt-position','centerRight');
	jQuery('select').data('promptPosition','centerRight');
	$('form.profile').validationEngine();
});