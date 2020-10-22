$(function() {
    Address.load('#cityId', '#districtId', '#wardId');
    $(".proflie-controler a").each(function() {
        if (this.href == window.location.href) {
            $(this).addClass("active-sidebar-link");
        }
    });

});