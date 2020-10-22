const CLASSUSER = {
    d_none: 'd-none',
    active: 'active',
    border: 'border',
    pull: 'pull',
    push: 'push',
}

$(function () {
    $('form.f .tb').each(function () {
        $(this).addClass('form-input');
    });
    $('form.f').each(function () {
       $(this).addClass('form-signin-form-left');
       $('.btns').addClass('form-button-signin pull');
       $('.btns input').addClass('button-signin-form');
    });
    //===show/hiden forgot-password===
    $('a.forgot-password').click(function () {
        $('form.form-signin-form-left').addClass(CLASSUSER.d_none);
        $('.req-password.btn-show').addClass(CLASSUSER.d_none);
        $('.for-forgot-password').removeClass(CLASSUSER.d_none)
    });

    $('.close-form').click(function () {
        $('form.for-forgot-password').addClass(CLASSUSER.d_none);
        $('.req-password.btn-show').removeClass(CLASSUSER.d_none);
        $('form.form-signin-form-left').removeClass(CLASSUSER.d_none);
    })
    //===end show/hiden forgot-password===

    //===color switch for form-signin-form-left===
    $('.form-signin-form-left input').click(function () {
        $(this).addClass(CLASSUSER.active);
        $(this).addClass(CLASSUSER.border);
        $('.layer-form').addClass(CLASSUSER.active);
    });

    $('.layer-form').click(function () {
        $('.layer-form').removeClass(CLASSUSER.active);
        $('.form-signin-form-left input.active').removeClass(CLASSUSER.active);
        $('.for-forgot-password input.active').removeClass(CLASSUSER.active);
        $(this).removeClass(CLASSUSER.border);
    });
    //===end color switch for form-signin-form-left===

    //===color switch for forgot-password===
    $('.for-forgot-password input').click(function () {
        $(this).addClass(CLASSUSER.active);
        $(this).addClass(CLASSUSER.border);
        $('.layer-form').addClass(CLASSUSER.active);
    });
    //===end color switch for forgot-password===
    //====button hover====
    $('.form-button-signin').hover(function () {
        $(this).addClass(CLASSUSER.push).removeClass(CLASSUSER.pull);
    },function () {
        $(this).addClass(CLASSUSER.pull).removeClass(CLASSUSER.push);
    });
    //====end button hover====

});