$(function(){
    //===remove lable pagination===
    $('.paginator .labelPages').remove();
    $('.paginator .titlePages').remove();
    //===end remove lable pagination===

    //===hover filter===
    $('.nd-hieuung').slideDown();

    $('.menu-filter h3').click(function(event) {
        $(this).next().slideToggle();
        $(this).find('.icon-sidebar-menu').toggleClass('spin-icon');
    });
    //===end hover filter===

    //===show more ===
    $('.show-more-content').showMore({
      minheight: 50
    });

    $('.showmore-button').click(function(event) {
       $('.layer-showmore').toggleClass(CLASS.d_none).toggleClass(CLASS.invisible);
    });
    //===end show more===

    //===converted into scroll===
    $('.btn').each(function () {
        var hClass = $(this).hasClass('count_11');
        if(hClass){
            $('.button-category').addClass('scroll-count');
        }
    });
    //===end converted into scroll===

    //===checked & currentLocation filter===
    $('.nav-menu-sidebar-filter li a').click(function () {
        var attr_href = $(this).attr('data-link');
        var currentLocation = $(location).attr("href");
        window.location.href = attr_href;
        if(attr_href == currentLocation){
            $(attr_href).addClass(CLASS.active);
        }
    });
    //===end checked & currentLocation filter===
    var psImg = [],
        proLoop = $('.product-item');
    if (proLoop.length) {
        proLoop.each(function() {
            psImg.push({ id: $(this).attr('data-id'), code: 2, storeId: $(this).attr('data-storeId') });
        });
    }
    if (psImg.length && window.innerWidth > 1024) {
        getallchildimg(psImg, function(rs) {
            if (rs.allImages != "") {
                $.each(rs.images, function(key, src) {
                    $('.product-item[data-id="' + key + '"]')
                        .find('.img-hover-best-seller a').addClass('added')
                        .append('<img class="img-hover-two" src="' + src + '" alt="' + src + '"/>');
                });
            }
        });
    }
});