var $storeId = $('#storeId').val();
$(document).ready(function(e){
    Address.load('#cityId', '#districtId');
    $(".validate").validationEngine();
    var pathname = window.location.pathname;
    if(pathname == '/user/signin'){
        $('#username, #password').on('keypress',function(even){
            if(even.keyCode == 13){
                signin();
            }
        });
    }
    $('#btnsignin').on('click',function () {
        signin();
    });
    $('#btnsingup').on('click',function () {
        signup();
    });

    if($(".datepicker").length){
        $(".datepicker").datepicker({ dateFormat: 'yy-mm-dd' });
    }

    // Yêu cầu lấy lại mật khẩu
    if(pathname == '/user/getpassword'){
        $('#btnSubmit').on('click',function () {
            getPassWord();
            return false;
        });
    }

});

function signin() {
    if($("#formAcount").validationEngine('validate')){
        $('body .loadings').addClass('is');
        $.ajax({
            type: "POST",
            data: $("#formAcount").serialize(),
            cache: false,
            dataType: 'json',
            url: "/user/ajaxsignin",
            success: function(rs) {
                $('body .loadings').removeClass('is');
                if(rs.code){
                    if($.urlParam('redirectUri')) {
                        var uri = base64_decode(decodeURIComponent($.urlParam('redirectUri')));
                        window.location.href = uri;
                        return;
                    }
                    if (in_array($storeId, [72396, 29770])) {
                        window.location.href = '/ban-buon-pc415141.html';
                    }else {
                        window.location.href = '/';
                    }
                }
                else if(rs.message['username'] != undefined){
                    alert(rs.message['username']);
                }
                else if(rs.message['email'] != undefined){
                    alert(rs.message['email']);
                } else {
                    alert(rs.message);
                }
            }
        });
    }
}

function signup(){
    if($("#formAcount").validationEngine('validate')){
        $.ajax({
            type: "POST",
            data: $("#formAcount").serialize(),
            cache: false,
            dataType: 'json',
            url: "/user/ajaxsignup",
            success: function(rs){
                var $email = $('#email').val();
                if(rs.code || validateEmail($email)){
                    $("#formAcount input[type='text'], #formAcount input[type='password']").val('');
                    alert('Bạn đã đăng ký thành công');
                    window.location.href = '/user/login';
                }else{
                    alert('mật khẩu không đúng định dạng hoặc email đã tồn tại. Vui lòng kiểm tra lại!');
                }
            }
        });
    }
}

function getPassWord() {
    if($("form.f").validationEngine('validate')){
        $.ajax({
            type: "POST",
            data: {
                username:$('#newpassword').val()
            },
            cache: false,
            dataType: 'json',
            url: "/user/ajaxgetpassword",
            beforeSend:function () {
                $('body .loadings').addClass('is');
            },
            success: function(rs) {
                $('body .loadings').removeClass('is');
                if(rs.code){
                    $("form.f #username").val('');
                    var mess = '<div class="modal-body text-center">\
                        <div class="desc-modal alert alert-success">Vui lòng kiểm tra email và ấn vào đường dẫn tạo mật khẩu mới!</div>\
                            <div class="form-group clearfix text-center"><button type="button" class="close btn close-singup w100 btn-primary" data-dismiss="modal">\n' +
                        '<a class="btn close-singup w100 btn-primary">OK</a>\n' +
                        '</button></div>' +
                        '</div>';
                    $('#modalShow .modal-content').html(mess);
                    $('#modalShow').modal('show');
                }
                else if(!rs.code){
                    var mess = '<div class="modal-body text-center"><div class="desc-modal alert alert-danger"> '+rs.message+'</div></div>';
                    $('#modalShow .modal-content').html(mess);
                    $('#modalShow').modal('show');
                }
            }
        });
    }
}


/**
 * Get a param from URL
 */
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return results[1] || 0;
    }
};