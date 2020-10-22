var GenerateFileAuto = {
    redirect : '/website/domain/generatefileauto?updateFile=1&type=sitemap',
    updateFile: function(callback){
        $.post(
            this.redirect,
            {},
            function(rs){
                if (rs.code == 1) {
                    var pt = Math.round((rs.currentMainPage / rs.totalMainPage) * 100);
                    $('.progress-bar').css('width',pt+'%');
                    $('.progress-bar>span').html(pt+'% Complete');
                    GenerateFileAuto.redirect = rs.redirect;
                    if (rs.currentMainPage <= rs.totalMainPage) {
                        GenerateFileAuto.updateFile();
                    }
                } else if (rs.code == 2) {
                    GenerateFileAuto.redirect = rs.redirect;
                    GenerateFileAuto.updateFile();
                } else {
                    $('.progress-bar').css('width','100%');
                    $('.progress-bar>span').html('100% Complete');
                }
            }
        );
    }
}
$(function(){
    GenerateFileAuto.updateFile();
});