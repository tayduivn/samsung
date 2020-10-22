$(function () {
    if($('.filter-here').height() >= 4845){
        fixsidebar();
    }
})
// Fixsidebarleft
function fixsidebar() {
    if (screen.width > 1024) {
        if (!!$('.sidebar-fix').length) { // make sure ".sticky" element exists
            var el = $('.sidebar-fix');
            var stickyTop = (el.offset().top) + 100; // returns number
            var stickleft = (el.offset().left) + 0;
            var stickwidth = (el.width()) + 0;
            $(window).scroll(function () { // scroll event
                var footerTop = ($('.wrapper-home-service').offset().top) - 30; // returns number
                var stickyHeight = el.height();
                var limit = footerTop - stickyHeight - 30;
                var windowTop = $(window).scrollTop(); // returns number
                if (stickyTop < windowTop) {
                    el.css({ 'position': 'fixed', 'top': 90,'width': stickwidth,'left': stickleft });
                }
                else {
                    el.css({'position':'static','top':'0','width': stickwidth, 'left': stickleft});
                }
                if (limit < windowTop) {
                    var diff = limit - windowTop;
                    el.css({ top: diff });
                }
            });
        }
    }
}