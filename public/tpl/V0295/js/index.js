var $storeId = $('#psStoreId').val();
$(function () {
    $('#home-slider .owl-carousel').on('initialized.owl.carousel', function(event) {
        var cIndex = event.item.index;
        var getHeight = $(".owl-item:eq("+cIndex+")").innerHeight();
        $(this).find(".owl-video-wrapper").height(getHeight);
    });
    $('#home-slider .owl-carousel').owlCarousel({
        items:1,
        nav: true,
        dots: false,
        //video:true,
        lazyLoad:true,
        center:true,
        touchDrag: true,
        autoplay: true,
        autoplayTimeout:8000,
        loop: true,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:1
            },
            1024:{
                items:1
            }
        }
    });

    $('#home-slider .owl-carousel').on('changed.owl.carousel', function(event) {
        var cIndex = event.item.index;
        if($(".owl-item:eq("+cIndex+")").find(".owl-video-wrapper")){
            $(".owl-item:eq("+cIndex+")").find(".owl-video-play-icon").trigger("click");
        }
        else{
            $('#home-slider .owl-carousel').on('stop.owl.video',function(){

            });
        }
    });

    if($(window).width() >= 992){
        $('.home-banner-col-new.col-1, .home-banner-col-new.col-4').addClass('wow fadeInUp').attr('data-wow-offset', '200').attr('data-wow-duration', '0.7s').attr('data-wow-delay', '0.2s');
        $('.home-banner-col-new.col-2, .home-banner-col-new.col-5').addClass('wow fadeInUp').attr('data-wow-offset', '200').attr('data-wow-duration', '0.7s').attr('data-wow-delay', '0.4s');
        $('.home-banner-col-new.col-3, .home-banner-col-new.col-6').addClass('wow fadeInUp').attr('data-wow-offset', '200').attr('data-wow-duration', '0.7s').attr('data-wow-delay', '0.6s');
    }

    setTimeout(function(){
        new WOW().init();
    }, 100);

    setTimeout(function(){
        animation_check();
    }, 100);

    $(window).scroll(function(){
        /*setTimeout(function(){*/
        animation_check();
        /*}, 500);*/
    });
    // $('.pro-loop').hover(
    //     function(){
    //         if($(this).find('.hover').length > 0){
    //             var rangeMax = $(this).find('.hover').attr('max'),
    //                 firstInd = $(this).find('.hover').attr('data-first'),
    //                 currInd = $(this).find('.hover').attr('data-index');
    //             if(currInd < rangeMax){
    //                 currInd++;
    //             }else{
    //                 currInd = firstInd;
    //             }
    //             $(this).find('.hover').attr('data-index',currInd);
    //             var srcImg = $(this).find('.color:eq('+currInd+') input').attr('data-img');
    //             var that = $(this);
    //             setTimeout(function(){
    //                 that.find('.hover source:first-child').attr('srcset',srcImg.replace('large','medium'));
    //                 that.find('.hover source:nth-child(2)').attr('srcset',srcImg);
    //                 that.find('.hover .img-hover').attr('src',srcImg);
    //             },510);
    //         }
    //     }
    // );
    if(in_array($storeId,[63704,11503])) {
        if ($("body #owl-blog-slider .blog-slider-item").length) {
            $("#owl-blog-slider").owlCarousel({
                dots: false,
                nav: true,
                navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
                autoPlay: 8000,
                items: 1,
                transitionStyle: "fade",
                itemsDesktop: [1024, 1],
                itemsDesktopSmall: [967, 1],
                itemsTablet: [600, 1]
            });
        }
    }
    if($('.instagram-list-img .list-img').length){
        $('.instagram-list-img .list-img').owlCarousel({
            items:6,
            nav: false,
            dots: false,
            margin: 10,
            //video:true,
            lazyLoad:true,
            center:true,
            touchDrag: true,
            autoplay: true,
            autoplayTimeout:8000,
            loop: true,
            responsive:{
                0:{
                    items:3,
                    nav:false
                },
                768:{
                    items:3,
                    nav:false
                },
                1024:{
                    items:5,
                    nav: true
                }
            },
            navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
        });
    }
    // if($(window).width() > 768){
    //
    // }else{
        // $('.instagram-list-img .list-img').removeClass('owl-carousel');
    // }



    $('#collection-one-slide, .slide-product').owlCarousel({
        items:4,
        nav:true,
        dots:false,
        margin: 30,
        responsive:{
            0:{
                items:2
            },
            480:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:4
            }
        },
        pagination: false,
        slideSpeed : 800,
        addClassActive: true,
        scrollPerPage: false,
        touchDrag: true,
        autoplay: true,
        loop: false,
    });
    $('#collection-two-slide').owlCarousel({
        items:3,
        nav:true,
        dots:false,
        margin: 15,
        responsive:{
            0:{
                items:2
            },
            480:{
                items:2
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:3
            }
        },
        pagination: false,
        slideSpeed : 800,
        addClassActive: true,
        scrollPerPage: false,
        touchDrag: true,
        autoplay: true,
        loop: false,
    });
    $('#collection-three-slide').owlCarousel({
        items:3,
        nav:true,
        dots:false,
        margin: 15,
        responsive:{
            0:{
                items:2
            },
            480:{
                items:2
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:3
            }
        },
        pagination: false,
        slideSpeed : 800,
        addClassActive: true,
        scrollPerPage: false,
        touchDrag: true,
        autoplay: true,
        loop: false,
    });
    $('#collection-four-slide').owlCarousel({
        items:3,
        nav:true,
        dots:false,
        margin: 15,
        responsive:{
            0:{
                items:2
            },
            480:{
                items:2
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:3
            }
        },
        pagination: false,
        slideSpeed : 800,
        addClassActive: true,
        scrollPerPage: false,
        touchDrag: true,
        autoplay: true,
        loop: false,
    });
    $('#collection-five-slide').owlCarousel({
        items:3,
        nav:true,
        dots:false,
        margin: 15,
        responsive:{
            0:{
                items:2
            },
            480:{
                items:2
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:3
            }
        },
        pagination: false,
        slideSpeed : 800,
        addClassActive: true,
        scrollPerPage: false,
        touchDrag: true,
        autoplay: true,
        loop: false,
    });
    $('#collection-six-slide').owlCarousel({
        items:3,
        nav:true,
        dots:false,
        margin: 15,
        responsive:{
            0:{
                items:2
            },
            480:{
                items:2
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:3
            }
        },
        pagination: false,
        slideSpeed : 800,
        addClassActive: true,
        scrollPerPage: false,
        touchDrag: true,
        autoplay: true,
        loop: false,
    });
    $('#collection-rl-slide').owlCarousel({
        items:4,
        nav:true,
        dots:false,
        margin: 15,
        responsive:{
            0:{
                items:2
            },
            480:{
                items:2
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        },
        pagination: false,
        slideSpeed : 800,
        addClassActive: true,
        scrollPerPage: false,
        touchDrag: true,
        autoplay: true,
        loop: false,
    });
    if(in_array($storeId,[63704,11503])){
        if ($(window).width() <= 768 ){
            if($('#popupHome.cookie').length){
                $.fancybox({
                    maxWidth    : 400,
                    minHeight   : 450,
                    fitToView   : true,
                    autoSize    : true,
                    autoScale   : true,
                    closeClick  : false,
                    openEffect  : 'fade',
                    closeEffect : 'fade',
                    scrolling   : false,
                    padding     : 0,
                    content: $('#popupHome'),
                });
            }
        }else{
            if($('#popupHome.cookie').length){
                $.fancybox({
                    maxWidth    : 1100,
                    minHeight   : 250,
                    fitToView   : false,
                    autoSize    : true,
                    autoScale   : true,
                    closeClick  : false,
                    openEffect  : 'fade',
                    closeEffect : 'fade',
                    scrolling   : false,
                    padding     : 0,
                    content: $('#popupHome'),
                });
            }
        }
    }else{
        if ($(window).width() <= 768 ){
            if($('#popupHome.cookie').length){
                $.fancybox({
                    maxWidth    : 400,
                    fitToView   : true,
                    autoSize    : true,
                    autoScale   : true,
                    closeClick  : true,
                    openEffect  : 'fade',
                    closeEffect : 'fade',
                    scrolling   : false,
                    padding     : 0,
                    content: $('#popupHome'),
                });
            }
        }else{
            if($('#popupHome.cookie').length){
                $.fancybox({
                    maxWidth    : 1100,
                    minHeight   : 250,
                    fitToView   : false,
                    autoSize    : true,
                    autoScale   : true,
                    closeClick  : true,
                    openEffect  : 'fade',
                    closeEffect : 'fade',
                    scrolling   : false,
                    padding     : 0,
                    content: $('#popupHome'),
                });
            }
        }
    }
    if(in_array($storeId,[62435,23832])){
        if ($(window).width() <= 768 ){
            $(".fancybox-album").fancybox({
                fitToView: true, closeBtn: false, padding: 0
            });
            $('#homepage_slider-mobile').on('initialized.owl.carousel', function(event) {
                var cIndex = event.item.index;
                var getHeight = $(".owl-item:eq("+cIndex+")").innerHeight();
                $(this).find(".owl-video-wrapper").height(getHeight);
            });
            $('#homepage_slider-mobile').owlCarousel({
                items:1,
                nav: true,
                dots: false,
                //video:true,
                lazyLoad:true,
                center:true,
                touchDrag: true,
                autoplay: true,
                autoplayTimeout:8000,
                loop: true,
                responsive:{
                    0:{
                        items:1
                    },
                    768:{
                        items:1
                    },
                    1024:{
                        items:1
                    }
                }
            });

            $('#homepage_slider-mobile').on('changed.owl.carousel', function(event) {
                var cIndex = event.item.index;
                if($(".owl-item:eq("+cIndex+")").find(".owl-video-wrapper")){
                    $(".owl-item:eq("+cIndex+")").find(".owl-video-play-icon").trigger("click");
                }
                else{
                    $('#home-slider .owl-carousel').on('stop.owl.video',function(){
                    });
                }
            });
        }else{
            $(".fancybox-album")
                .attr('rel', 'gallery')
                .fancybox({
                    beforeLoad: function() {
                        var el, id = $(this.element).data('title-id');

                        if (id) {
                            el = $('#' + id);

                            if (el.length) {
                                this.title = el.html();
                            }
                        }
                    },
                    maxWidth    : 400,
                    minHeight   : 250,
                    fitToView   : false,
                    autoSize    : true,
                    autoScale   : true,
                    closeClick  : true,
                    openEffect  : 'fade',
                    closeEffect : 'fade',
                    scrolling   : false,
                    padding     : 0,
                });

        }

        $('#product-slide.content-product-list').owlCarousel({
            items:3,
            nav:false,
            dots:false,
            margin: 25,
            responsive:{
                0:{
                    items:2
                },
                480:{
                    items:2
                },
                768:{
                    items:3
                },
                992:{
                    items:3
                },
                1200:{
                    items:3
                }
            },
            pagination: false,
            slideSpeed : 800,
            addClassActive: true,
            scrollPerPage: false,
            touchDrag: true,
            autoplay: true,
            loop: false,
        });
        $('#product-slide-mobile.content-product-list').owlCarousel({
            items:3,
            nav:true,
            dots:false,
            margin: 8,
            responsive:{
                0:{
                    items:3
                },
                480:{
                    items:3
                },
                768:{
                    items:3
                },
                992:{
                    items:3
                },
                1200:{
                    items:3
                }
            },
            pagination: false,
            slideSpeed : 800,
            addClassActive: true,
            scrollPerPage: false,
            touchDrag: true,
            autoplay: false,
            loop: false,
        });
        $('#banner-mid').owlCarousel({
            items:3,
            nav: false,
            dots: false,
            //video:true,
            // lazyLoad:true,
            autoplay: true,
            autoplayTimeout:8000,
            margin:30,
            // loop: true,
            responsive:{
                0:{
                    items:1
                },
                768:{
                    items:1
                },
                1024:{
                    items:3
                }
            }
        });
        $('.tab-caption-item').click(function(){
            if(!$(this).hasClass('selected')){
                contentId = $(this).attr('id').replace('cap','content');
                $('.tab-caption-item').removeClass('selected');
                $(this).addClass('selected');
                $('.wrapper-collection-1').hide();
                $('#'+contentId).fadeIn();
            }
        });
        $('.tabm-caption-item').click(function(){
            if(!$(this).hasClass('selected')){
                contentId = $(this).attr('id').replace('cap','content');
                $('.tabm-caption-item').removeClass('selected');
                $(this).addClass('selected');
                $('.wrapper-collection-featured').hide();
                $('#'+contentId).fadeIn();
            }
        });
        $('#banner-bot').owlCarousel({
            items:1,
            nav: false,
            dots: false,
            //video:true,
            lazyLoad:true,
            center:true,
            touchDrag: true,
            autoplay: true,
            autoplayTimeout:8000,
            loop: true,
            responsive:{
                0:{
                    items:1
                },
                768:{
                    items:1
                },
                1024:{
                    items:1
                }
            }
        });
        $('#feed-back').owlCarousel({
            items:5,
            nav: true,
            dots: false,
            //video:true,
            // lazyLoad:true,
            autoplay: true,
            autoplayTimeout:8000,
            margin:10,
            loop: true,
            responsive:{
                0:{
                    items:3
                },
                768:{
                    items:3
                },
                1024:{
                    items:5
                }
            }
        });

        if ($('#feed-back').find('.gallery-hidden').length) {
            $('#feed-back').find('.gallery-hidden').each(function () {
                $('#instagram-gallery-append').append($(this).html())
            })
        }
    }
});
function animation_check(){
    var scrollTop = $(window).scrollTop() - 300;
    $('.animation-tran').each(function(){
        if($(this).offset().top < scrollTop + $(window).height()){
            $(this).addClass('active');
        }
    })
}