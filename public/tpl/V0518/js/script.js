jQuery(document).ready(function () {
    if ($(window).width() < 992) {
        $('.gallery-icon img').click(function () {
            var imgNew = $(this).attr('src');
            $('.khung-ha a').attr('href', imgNew);
        });
        $(".khung-ha a").fancybox();
    }
});

document.addEventListener('DOMContentLoaded', function () {

    if ($(".gallery .gallery-item").length < 2) {
        $(".gallery").css("display", "none");
    }

    $(".gallery-item img").click(function () {
        $(".gallery-item").removeClass('active');
        $(this).parents('.gallery-item').addClass('active');
    });
    $(".gallery-item").first().addClass('active');
    jQuery(".ha").elevateZoom({
        gallery: 'gallery-2',
        scrollZoom: true,
        cursor: 'pointer'
    });
    $(".ha").bind("click", function (e) {
        var ez = $('.ha').data('elevateZoom');
        $.fancybox(ez.getGalleryList());
        return false;
    });
});

var isClose = true;

// hover san pham
$('#sp-nav').hover(function(){
        document.getElementById('drp-mn').style.display = "block";
        document.getElementById('drp-mn').style.left = "auto";
        document.getElementById('drp-mn').style.right = "0px";
    }, function(){
        if ($('#drp-mn:hover').length == 0) {
            document.getElementById('drp-mn').style.display = "none";
        }
    }
);
//

// mo bo loc
function openFilter(id) {
    if(isClose) {
        document.getElementById(id).style.display = "block";
    } else {
        document.getElementById(id).style.display = "none";
    }

    isClose = !isClose;
}
//

// active khi chon danh muc header
var url = window.location.href;
$('nav ul li a').each(function() {
    if (this.href === url) {
        $(this).closest('li').addClass('active');
    }
});
//

$('#show-filter > li a').click(function () {
    var attr = $(this).attr('title');
    window.location.href= attr;
});

$('.filter-vendor > li label input').click(function () {
    var attr = $(this).attr('value');
    window.location.href= attr;
});

$('.filter-price > li label input').click(function () {
    var attr = $(this).attr('value');
    window.location.href= attr;
});

$('.filter-type > li label input').click(function () {
    var attr = $(this).attr('value');
    window.location.href = attr;
});