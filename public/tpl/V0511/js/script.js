$(document).ready(function() {
    $('.paging-previous').addClass("fa fa-caret-left");
    $('.paging-first').addClass("fa fa-angle-double-left");
    $('.paging-next').addClass("fa fa-caret-right");
    $('.paging-last').addClass("fa fa-angle-double-right");
    /*==click button to open menu==*/
    $(".button").click(function () {
        if(( $(this).parent()).find("ul.menu").hasClass("hiden")) {
            ( $(this).parent()).find("ul.menu").removeClass("hiden");
            $(this).removeClass("fa-plus-square");
            $(this).addClass("fa-minus-square");
        }
        else{
            ( $(this).parent()).find("ul.menu").addClass("hiden");
            $(this).addClass("fa-plus-square");
            $(this).removeClass("fa-minus-square");
        }
    });
    $(".button-2").click(function () {
        if(( $(this).parent()).find("ul.menu-2").hasClass("hiden")) {
            ( $(this).parent()).find("ul.menu-2").removeClass("hiden");
            $(this).removeClass("fa-plus-square");
            $(this).addClass("fa-minus-square");
        }
        else{
            ( $(this).parent()).find("ul.menu-2").addClass("hiden");
            $(this).addClass("fa-plus-square");
            $(this).removeClass("fa-minus-square");
        }
    });
    $(".button-3").click(function () {
        if( $(this).hasClass("fa-navicon")) {
            ( $(this).parent()).find(".menu-3").css('height','auto');
            $(this).removeClass("fa-navicon");
            $(this).addClass("fa-close");
        }
        else{
            ( $(this).parent()).find("div.menu-3").css('height','0px');
            $(this).addClass("fa-navicon");
            $(this).removeClass("fa-close");
        }
    });
    $(".button-4").click(function () {
        if(( $(this).parent()).find(".menu-4").hasClass("hiden-1")) {
            ( $(this).parent()).find(".menu-4").removeClass("hiden-1");
            ( $(this).parent()).find(".menu-4").css('height','250px');
        }
        else{
            ( $(this).parent()).find(".menu-4").addClass("hiden-1");
            ( $(this).parent()).find(".menu-4").css('height','0');

        }
    });

    /*==slide==*/
    $('.item-4').owlCarousel({
        loop:false,
        margin:10,
        nav:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            800:{
                items:3
            },
            1000:{
                items:4
            }
        },
    });
    $('.item-2').owlCarousel({
        loop:false,
        margin:10,
        nav:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            }
        },
    });
    $('.item-1').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        responsive:{
            0:{
                items:1
            },
        },
    });
    /*button-translate */
    $('.img-product,.button-translate').mouseenter(function () {
        ( $(this).parent()).find('.button-heart').css('left','10px');
        ( $(this).parent()).find('.button-link').css('left','10px');
    });
    $('.img-product,.button-translate').mouseleave(function () {
        ( $(this).parent()).find('.button-heart').css('left','-80px');
        ( $(this).parent()).find('.button-link').css('left','-80px');
    });

    /*==back to top==*/
    $('.uesr-menu i,.uesr-menu i span').mouseenter(function() {
        $(this).find("span").css('display','block');
    });
    $('.uesr-menu i,.uesr-menu i span').mouseleave(function() {
        $(this).find("span").css('display','none');
    });

    $(window).scroll(function() {
        var height = $(window).scrollTop();
        if (height > 200) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });
    $(document).ready(function() {
        $(".back-to-top").click(function(event) {
            event.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });

    });
    
    /*search*/
    $('#btnsearch').click(function () {
        window.location.href=$('#txtSearch').val();
    })


    /*quick view*/
    // $(document).on('click','.quick-view',function () {
    //     var t = $(this);
    //     $.post('/product/q' + t.attr('data-psId'),
    //         function (rs) {
    //             $('#modalShow  .modal-content').html(rs);
    //             $('#modalShow').addClass('modal-quick').modal('show');
    //
    //         }
    //     );
    //     return false;
    // });
});
$(document).ready(function () {
    var elem = document.getElementById("myAnimation");
    var elem1 = document.getElementById("myAnimation1");
    var elem2 = document.getElementById("myAnimation2");
    var elem3 = document.getElementById("myAnimation3");
    var pos = 50;
    var top = -6;
    var pos1 = 60;
    var top1 = -11;
    setInterval(function () {
        frame()
    }, 60);
    setInterval(function () {
        frame1()
    }, 150);

    function frame() {
        pos = pos + 1;
        top = top - 0.5;
        if (pos >= 60) {
            pos = 50;
            top = -6;
        } else {
            elem1.style.height = pos - 10 + 'px';
            elem1.style.width = pos - 10 + 'px';
            elem1.style.top = top + 5 + 'px';
            elem1.style.right = top + 5 + 'px';

            elem3.style.height = pos - 10 + 'px';
            elem3.style.width = pos - 10 + 'px';
            elem3.style.top = top + 6 + 'px';
            elem3.style.left = top + 6 + 'px';
        }
    }

    function frame1() {
        pos1 = pos1 + 1;
        top1 = top1 - 0.5;
        if (pos1 >= 65) {
            pos1 = 60;
            top1 = -11;
        } else {
            elem.style.height = pos1 + 'px';
            elem.style.width = pos1 + 'px';
            elem.style.top = top1 + 'px';
            elem.style.right = top1 + 'px';

            elem2.style.height = pos1 + 'px';
            elem2.style.width = pos1 + 'px';
            elem2.style.top = top1 + 1 + 'px';
            elem2.style.left = top1 + 1 + 'px';
        }

    }


});
function openNav() {
    document.getElementById("mySidenav").style.display = "block";
}

function closeNav() {
    document.getElementById("mySidenav").style.display = "none";
}
