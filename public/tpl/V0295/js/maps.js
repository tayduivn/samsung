var storeId = $('#checkStoreId').val();
$(function () {
    XGmap_Multi();
    Address.load('#cityId', '#districtId');

    // $('.header-page').append('<h1>Hệ thống '+$('#numberAgency').val()+' cửa hàng </h1>');
    // console.log(numberText);


    $('.change-tinh').change(function () {
        $.post('/agency/agencystore',
            {
                cityId: $(this).val(),
                storeId: $('#storeId').val(),
            },
            function (rs) {
                $("#address-link").empty();
                if(rs.length){
                    var inner="";
                    for(var i = 0; i < rs.length; i++) {
                        var obj = rs[i];
                        var a = obj.content;
                        inner +=
                            "<li class='cn_tenchinhanh'>" +
                                "<a href='javascript:void(0)' data-content='"+a+"' data-lat="+obj.latitude+" data-lng='"+obj.longitude+"' data-email='"+obj.email+"' data-name='"+obj.name+"' data-img='"+obj.image+"' data-address='"+obj.address+"' data-phone='"+obj.phone+"'>" +
                                    "<b style='margin-bottom: 10px;display: inline-block'>"+obj.name+"</b>" +
                                    "<p style='display: block'>"+obj.address+"</p>" +
                                    "<p style='display: block'>"+obj.phone+"</p>" +
                                "</a>";
                        inner +="</li>";
                    }
                    $("#address-link").append(inner);
                    $(".cn_tenchinhanh a").click(function(){
                        var kinhdo = $(this).attr("data-lat");
                        var vido = $(this).attr("data-lng");
                        var mapimg =$(this).data('img');
                        var content =$(this).data('content');
                        var show = '';
                        // console.log('a'+content);
                        $('#attr-address').attr('value',$(this).attr('attr-address'));
                        $('#attr-name').attr('value',$(this).attr('attr-name'));
                        $('#attr-email').attr('value',$(this).attr('attr-email'));
                        $('#attr-phone').attr('value',$(this).attr('attr-phone'));
                        $('#attr-img').attr('value',$(this).attr('attr-img'));
                        if(in_array(storeId,[1642 ,53436])){
                            if(mapimg){
                                show = '<img src="'+mapimg+'" alt="...">';
                                $('#map-store').html(show);
                            }else if(content){
                                show = content;
                                $('#map-store').html(show);
                            }else {
                                $(".cn_tenChiNhanh").html($(this).find(".ten-chi-nhanh").html());
                                $(".cn_diachi_chitiet").html(diachi);
                                $(".cn_hotline").html(hotline);
                                XGmap(kinhdo, vido);
                            }
                        }else {
                            XGmap(kinhdo, vido);
                        }
                    });
                }else{
                    $("#address-link").append('<li class="cn_tenchinhanh"><a href="javascript:void(0)"><span style="display: block;text-align: center; font-weight: normal">Chưa có cửa hàng nào !!!</span></a></li>');
                }
            }
        );
    });
    $(".cn_tenchinhanh a").click(function(){
        var kinhdo = $(this).attr("data-lat");
        var vido = $(this).attr("data-lng");
        var mapimg =$(this).data('img');
        var content =$(this).data('content');
        var show = '';
        var diachi = $('#attr-address').attr('value',$(this).attr('data-address'));
        var ten = $('#attr-name').attr('value',$(this).attr('data-name'));
        var email = $('#attr-email').attr('value',$(this).attr('data-email'));
        var hotline = $('#attr-phone').attr('value',$(this).attr('data-phone'));
        var image = $('#attr-img').attr('value',$(this).attr('data-img'));
        if(in_array(storeId,[1642 ,53436])){
            if(mapimg){
                show = '<img src="'+mapimg+'" alt="...">';
                $('#map-store').html(show);
            }else if(content){
                show = content;
                $('#map-store').html(show);
            }else {
                $(".cn_tenChiNhanh").html($(this).find(".ten-chi-nhanh").html());
                $(".cn_diachi_chitiet").html(diachi);
                $(".cn_hotline").html(hotline);
                XGmap(kinhdo, vido);
            }
        }else{
            $(".cn_tenChiNhanh").html($(this).find(".ten-chi-nhanh").html());
            $(".cn_diachi_chitiet").html(diachi);
            $(".cn_hotline").html(hotline);
            XGmap(kinhdo, vido);
        }
    });
    if (in_array(storeId,[64627, 11503])){
        if ($('#address-link li.cn_tenchinhanh').length){
            $('#address-link li.cn_tenchinhanh').eq(0).find('a').click();
        }
    }
});

//*******************************Khởi Động Bản Đồ*********************************
var map;
var marker;
//Load bản đồ
function xLoadMap() {
    //debugger;
    var kinhdo = "21.027509116803618";
    var vido = "105.85490226745605";
    //if ($('.hdMod').val() == "add") {
    //    kinhdo = $('.ddlQuanHuyen').find("option:selected").attr('kinhdo');
    //    vido = $('.ddlQuanHuyen').find("option:selected").attr('vido');
    //}
    XGmap(kinhdo, vido);
}

//Đánh dấu nhiều địa điểm trên Việt Nam
function XGmap_Multi() {
    var myLatCenter = new google.maps.LatLng("21.0172078", "105.8191101"); //Ở Giữa Việt Nam

    var myOptions = {
        zoom: 12,
        center: myLatCenter,
        scrollwheel: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map_all = new google.maps.Map(document.getElementById("map-store"), myOptions);

    //var marker2; //Tạo biến đánh dấu

    //----Import danh sách chi nhánh vào bản đồ-------
    var strLstKinhDo = $("#lstKinhDo").val();
    var lstKinhDo = strLstKinhDo.split(",");

    var strLstViDo = $("#lstViDo").val();
    var lstViDo = strLstViDo.split(",");


    for (var i = 0; i < (lstKinhDo.length - 1) ; i++) {
        var location = lstKinhDo[i];
        // console.log(location);
        var LatLng = new google.maps.LatLng(lstKinhDo[i], lstViDo[i]);
        var marker2 = new google.maps.Marker({
            position: LatLng,
            animation: google.maps.Animation.DROP, //Hiển thị con trỏ sinh động hơn
            draggable: false, //Cho phép kéo thả con trỏ,
            // icon: '/tpl/T0228/img/map.png', // null = default icon
            icon: null, // null = default icon
            map: map_all
        });
    }
}

function XGmap(kinhdo, vido) {
    //đây là 2 text box lưu giá trị kinh độ và vĩ độ
    control_lat = document.getElementById("lat");
    control_lng = document.getElementById("lng");
    control_address = document.getElementById("attr-address").getAttribute('value');
    control_name = document.getElementById("attr-name").getAttribute('value');
    control_email = document.getElementById("attr-email").getAttribute('value');
    control_phone = document.getElementById("attr-phone").getAttribute('value');
    control_img = document.getElementById("attr-img").getAttribute('value');

    var infor = "<div class='blockContent'>" +
        "<div class='blockDetails'><span class='titleMap'><b>"+control_name+" - "+control_address+"</span></b>" +
        "<span>Điện thoại tư vấn bán hàng: "+control_phone+"</span>" +
        "<span>Điện thoại góp ý - khiếu nại: "+control_phone+"</span>" +
        "<span>Email: "+control_email+"</span></div>" +
        "<div class='blockImage'><img src='"+control_img+"'></div>" +
        "</div>";

    var infowindow = new google.maps.InfoWindow({
        content: infor
    });
    var myLatlng = new google.maps.LatLng(kinhdo, vido);

    var myOptions = {
        zoom: 17,
        center: myLatlng,
        scrollwheel: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map-store"), myOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        center:myLatlng,
        title: control_name
    });
    //Đánh dấu vị trí khi load xong
    placeMarker(myLatlng);

    if ($(window).width()>768) {
        marker.addListener('mouseover', function() {
            infowindow.open(map, marker);
        });
        var markerMap = new google.maps.InfoWindow();
        // assuming you also want to hide the infowindow when user mouses-out
        markerMap.addListener('mouseout', function() {
            infowindow.close();
        });
    }else{
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    }

    //google.maps.event.addListener(marker, 'click', toggleBounce);
    google.maps.event.addListener(marker, 'dragend', function (event) {
        //placeMarker(event.latLng);
        var myLatLng = event.latLng;
        var lat = myLatLng.lat();
        var lng = myLatLng.lng();

        //alert(lat);
        control_lat.value = lat;
        control_lng.value = lng;
    });
}


//Đánh dấu vị trí trên bản đồ
function placeMarker(location) {
    marker = new google.maps.Marker({
        position: location,
        animation: google.maps.Animation.DROP, //Hiển thị con trỏ sinh động hơn
        draggable: false, //Cho phép kéo thả con trỏ
        // icon: '/tpl/T0228/img/map.png', // null = default icon
        icon: null, // null = default icon
        map: map
    });

    map.setCenter(location);

    var lat = map.getCenter().lat();
    var lng = map.getCenter().lng();
    control_lat.value = lat;
    control_lng.value = lng;
}
// $('#address-link li.cn_tenchinhanh').click(function (){
//     alert("aaa");
// })
//***************************************************************************************