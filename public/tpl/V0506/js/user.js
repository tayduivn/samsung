$(function () {
    Address.load('#cityId', '#districtId');
    jQuery('form.profile').validationEngine('hide');
    jQuery('input').attr('data-prompt-position','centerRight');
    jQuery('input').data('promptPosition','centerRight');
    jQuery('textarea').attr('data-prompt-position','centerRight');
    jQuery('textarea').data('promptPosition','centerRight');
    jQuery('select').attr('data-prompt-position','centerRight');
    jQuery('select').data('promptPosition','centerRight');
    $('form.profile').validationEngine();
});