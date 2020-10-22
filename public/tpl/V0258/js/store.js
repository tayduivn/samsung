$(function () {
    XGmap_Multi();
    $('.storeSelect').change(function () {
        $.post('/agency/agencystore',
            {
                cityId: $(this).val(),
                storeId: $('#storeId').val(),
            },
            function (rs) {
                $(".list-store .all-submenu-1").empty();
                if(rs.length){
                    var inner="";
                    for(var i = 0; i < rs.length; i++) {
                        var obj = rs[i];
                        inner +=
                            "<li class='sub-item1' data-name='"+obj.name+"' rel='"+i+"' data-address='"+obj.address+"' data-lat='"+obj.latitude+"' data-long='"+obj.longitude+"'>" +
                            "<a href='javascript:void(0)' class='btn'><b>"+obj.name+": </b>"+obj.address+"</a>";
                        inner +="</li>";
                    }
                    $(".list-store .all-submenu-1").append(inner);
                }else{
                    $(".list-store .all-submenu-1").append('<li style="background: none"><a class="btn"><span style="display: block;text-align: center; font-weight: normal">Chưa có cửa hàng nào !!!</span></a></li>');
                }
            }
        );
        $(document).on('click', '.all-submenu-1 li', function(){
            $(".all-submenu-1 li a").removeClass('active');
            var kinhdo = $(this).attr("data-lat");
            var vido = $(this).attr("data-long");
            XGmap(kinhdo, vido);
        });
        $("#map").css("height", 510);
    });
    $(".all-submenu-1 li a").click(function(){
        $(".all-submenu-1 li a").removeClass('active');
        $(this).addClass('active');
        var kinhdo = $(this).attr("lat");
        var vido = $(this).attr("lng");
        $('#attr-address').attr('value',$(this).attr('attr-address'));
        $('#attr-name').attr('value',$(this).attr('attr-name'));
        $('#attr-email').attr('value',$(this).attr('attr-email'));
        $('#attr-phone').attr('value',$(this).attr('attr-phone'));
        $('#attr-img').attr('value',$(this).attr('attr-img'));

        XGmap(kinhdo, vido);
    });
});
var map, marker;
//Đánh dấu nhiều địa điểm trên Việt Nam
function XGmap_Multi() {
    var myLatCenter = new google.maps.LatLng("21.0172078", "105.8191101"); //Ở Giữa Việt Nam

    var myOptions = {
        zoom: 12,
        center: myLatCenter,
        scrollwheel: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map_all = new google.maps.Map(document.getElementById("map"), myOptions);

    //var marker2; //Tạo biến đánh dấu

    //----Import danh sách chi nhánh vào bản đồ-------
    var strLstKinhDo = $("#lstKinhDo").val();
    var lstKinhDo = strLstKinhDo.split(",");
    var strLstViDo = $("#lstViDo").val();
    var lstViDo = strLstViDo.split(",");


    for (var i = 0; i < (lstKinhDo.length - 1) ; i++) {
        var LatLng = new google.maps.LatLng(lstKinhDo[i], lstViDo[i]);
        var marker2 = new google.maps.Marker({
            position: LatLng,
            animation: google.maps.Animation.DROP, //Hiển thị con trỏ sinh động hơn
            draggable: false, //Cho phép kéo thả con trỏ,
            map: map_all,
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
        zoom: 15,
        center: myLatlng,
        scrollwheel: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), myOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        center: myLatlng,
        title: control_name,
    });
    //Đánh dấu vị trí khi load xong
    // placeMarker(myLatlng);

    if ($(window).width()>768) {
        marker.addListener('mouseover', function() {
            infowindow.open(map, marker);
        });
        // assuming you also want to hide the infowindow when user mouses-out
        marker.addListener('mouseout', function() {
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
//
// function setMarkers(map, locations) {
//
//     for (var i = 0; i < locations.length; i++) {
//         var location = locations[i];
//         var latlng = new google.maps.LatLng(location.lat, location.lng);
//         var marker = new google.maps.Marker({
//             id: i + 1,
//             position: latlng,
//             map: map,
//             icon: getIcon(i + 1),
//             title: location.name,
//             content: '<h3>' + location.name + '</h3><p>' + location.address + '</p>'
//         });
//         // variable[i] = marker;
//         google.maps.event.addListener(marker, 'mouseover', function () {
//             setInfoWindow(this);
//         });
//     }
// }
function setInfoWindow(marker) {
    infowindow.close();
    infowindow.setContent(marker.content);
    infowindow.setOptions({pixelOffset: new google.maps.Size(0, 0)});
    infowindow.open(marker.map, marker);
}
function getIcon(number) {
    return {
        url: '/img/maps/iconMarker' + number + '.png',
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(29, 42),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(14, 42)
    };
}