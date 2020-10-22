$(function () {
    /*click*/
    $(document).on("click", ".list-store ul li", function () {
        var mapOptions = {
            zoom: 10, center: new google.maps.LatLng($(this).attr('data-lat'), $(this).attr('data-long'))
        };
        var maps = new google.maps.Map(document.getElementById('map'), mapOptions);
        var latlng = new google.maps.LatLng($(this).attr('data-lat'), $(this).attr('data-long'));
        maps.panTo(latlng);
        $("#map").css("height", 510);
        var marker = new google.maps.Marker({
            position: latlng,
            map: maps,
        });
        var t= $(this);
        var output = '';
        output += '<div class="col-sm-4 mapslist1">';
        output += '<img class="img-responsive" src="'+t.attr('data-img')+'" alt="'+ t.attr('data-name') +'" />';
        output += '</div>';
        output += ' <div class="col-sm-8 mapslist1">';
        output += '<div class="listAgency">';
        output += ' <h2>Thông tin liên hệ</h2>';
        output += '<span><b>Địa chỉ: </b>' + t.attr('data-address') + '</span>';
        output += '<span><b>Điện thoại: </b>' + t.attr('data-phone') + '</span>';
        output += '<span><b>Địa chỉ email: </b>' + t.attr('data-email') + '</span><br/>';
        output += '<h2>Thời gian hoạt động</h2>';
        output += '<p>' + $('.timeWork').val() + '</p> <br/>';
        output += '<p>Tham khảo nếu chưa biết đường đi: </p>';
        output += '</div>';
        output += '</div>';
        output += '<div class="col-lg-12 col-md-10 col-xs-10 col-sm-10" style="margin-top: 20px">';
        if(t.attr('data-content') != null){
            output += '<div class="mapslist1">' + t.attr('data-content')+ '</div>';
        }
        output += '</div>';
        $('.add_js_click').html('');
        $('.add_js_click').append(output);
    });
    // Map
    var latLng = { lat: 21.0168864, lng: 105.7855574 }
    var mapOptions = {
        zoom: 9, center: new google.maps.LatLng(latLng)
    };
    var maps = new google.maps.Map(document.getElementById('map'), mapOptions);
    $('.all-submenu-1 li').each(function () {
        var t =$(this);
        var lat = Number(t.attr('data-lat'));
        var lng = Number(t.attr('data-long'));
        addMarket(maps, {lat: lat, lng: lng})
    });
});
function addMarket(maps,latLng) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: maps,
    });
}

