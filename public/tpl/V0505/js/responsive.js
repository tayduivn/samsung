"use strict";

(function ($) {
    //Header trôi theo cuộn
    var wrapper = $("#headerPage");
    $(window).scroll(function () {
        if ($(window).scrollTop() > 160) {
            wrapper.addClass("fix-header");
            $("#fix-tabheader").addClass("fix-tabheader");
            $("#fillter-box .card-default").addClass("fixed");
        } else {
            wrapper.removeClass("fix-header");
            $("#fix-tabheader").removeClass("fix-tabheader");
            $("#fillter-box .card-default").removeClass("fixed");

        }
    });

    //Một số chuyển đổi cho Responsive
    var isPcMode = $(window).width() >= 1200;
    if (isPcMode) {
        $("#fillter-box").append($("#fillterWindow"));
        //Detail page:
        //$("#forDetails").append($("#tab-details").addClass("col-8"));
        //$("#forDetails").append($("#tab-ThuocTinh").addClass(" col-4 border-left"));

        //$("#forRating").append($("#tabRating").removeClass("tab-pane"));
        //$("#forQandAns").append($("#tabQandAns").removeClass("tab-pane"));
    } else {
        $("#fillter-mobile-box").append($("#fillterWindow"));
        //Home
        $(".scroll-mobile-container").each(function() { $(this).css("width", `calc(40vw * ${$(this).data("items")} + 1px)`); });
        $(".slide-mobile .row .col-ben-2").remove();

        //Detail
        $("#tabTongQuan").prepend($("#detailTongQuan"));
        $("#subtabChiTiet").append($("#detailChiTiet"));
        $("#subtabThongSo").append($("#detailThongSo"));
        $("#tabDanhGia").append($("#detailRating"));
        //Shopconfirm:
        $("#shopConfirmContainer").append($("#shopCart"));
        $("#shopConfirmContainer").append($("#shopPayMethod"));

        //footer:
        $("footer ul").addClass("collapse");
        $("footer h5").addClass("collapsed");
    }
    $(window).resize(function () {
        var width = $(window).outerWidth();
        //console.log(width, $(window).outerWidth());
        if (width < 1200) {
            if (isPcMode) { //nhẩy mobile mode:
                $("#fillter-mobile-box").append($("#fillterWindow"));
                isPcMode = false;
                $("#tabTongQuan").prepend($("#detailTongQuan"));
                $("#subtabChiTiet").append($("#detailChiTiet"));
                $("#subtabThongSo").append($("#detailThongSo"));
                $("#tabDanhGia").append($("#detailRating"));
                //Shopconfirm:
                $("#shopConfirmContainer").append($("#shopCart"));
                $("#shopConfirmContainer").append($("#shopPayMethod"));
                $("footer ul").addClass("collapse");
            }
        } else {
            if (!isPcMode) {
                $("#fillter-box").append($("#fillterWindow"));
                isPcMode = true;
                $("#detailBlocks").append($("#detailTongQuan"));
                $("#detailBlocks").append($("#sliderSPTuongTu"));
                $("#tabDetails .col-8").append($("#detailChiTiet"));
                $("#tabDetails .col-4").append($("#detailThongSo"));
                $("#detailBlocks").append($("#tabDetails"));
                $("#detailBlocks").append($("#detailRating"));
                $("#detailBlocks").append($("#detailQandAns"));
                //Shopconfirm:
                $("#shopConfirmContainer").append($("#shopPayMethod"));
                $("#shopConfirmContainer").append($("#shopCart"));
                $("footer ul").attr("class", "");
            }
        }
    });
    window.dispatchEvent(new Event('resize'));

    $(".main-menu").on("beforeshow.smapi", function(e, item) {
        const pop = $(item);
        if (pop.parent("li").hasClass("block-title")) {
            return false;
        }
        return true;
    });
    $(".main-menu").on("beforehide.smapi", function(e, item) {
        const pop = $(item);
        if (pop.parent("li").hasClass("block-title")) {
            return false;
        }
        return true;
    });
    var laspopup = null;

    function timkiem(s) {
        var url = $("#btnTimKiem").data("url");
        var seo = $("#btnTimKiem").data("cat");
        if (seo == '') {

        }
    }
    $("#btnTimKiem").click(function (e) {
        const cat = $("#btnDanhmuc").data("cat");
        var href = $(this).data("url") + "?search=" + $("#search-sanpham-pc").val().toLowerCase();
        console.log(href);
        location.href = href;
        //location.href = $(this).data("url") + (cat.length === 0 ? "" : `/${cat}`) + "?search=" + $("#search-sanpham-pc").val().toLowerCase();
    });
    $("#btnTimKiemMobile").click(function (e) {
        const cat = $("#btnDanhmuc").data("cat");
        var href = $("#btnTimKiem").data("url") + "?search=" + $("#search-sanpham-mobile").val().toLowerCase();
        console.log(href);
        location.href = href;
        //location.href = $("#btnTimKiem").data("url") + (cat.length === 0 ? "" : `/${cat}`) +  "?search=" + $("#search-sanpham-mobile").val().toLowerCase();
    });
    $("#search-sanpham-pc").keypress(function (event) {
        if (event.keyCode === 13) {
            $("#btnTimKiem").click();
        }
    });
    $("#search-sanpham-mobile").on("onsearch", function (event) {
        $("#btnTimKiem").click();
    });
    //Close popup menu
    $("body").click(function (e) {
        //if (e.target.id === "btnDanhmuc" || e.target.id === "popupMainMenu") return;
        if (e.target.id !== "popupMainMenu" && $("#popup-nav").hasClass("show")) {
            $("#popup-nav").removeClass("show");
            $("#popupMainMenu").addClass("collapsed");
        }

        if (e.target.id !== "btnDanhmuc" && $("#popup-nav-search").hasClass("show")) {
            $("#popup-nav-search").removeClass("show");
            $("#btnDanhmuc").addClass("collapsed");
        }
    });

    function delay(callback, ms) {
        var timer = 0;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                callback.apply(context, args);
            }, ms || 0);
        };
    };


})(jQuery);