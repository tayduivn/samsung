$(function () {
    $('.disButton>a').click(function (e) {
        e.preventDefault();
        var t = $(this);
        if(!t.hasClass('active')){
            $('.disButton').removeClass('active');
            t.parent('.disButton').addClass('active');
        }
        var latlng = new google.maps.LatLng(t.attr('data-lat'), t.attr('data-lng'));

        map.panTo(latlng);
        var contentString = '<h3>' + t.attr('data-name') + '</h3><p>' + t.attr('data-address') + '</p>';

        infowindow.close();
        infowindow.setContent(contentString);
        infowindow.setPosition(latlng);
        infowindow.setOptions({pixelOffset: new google.maps.Size(0, -40)});

        infowindow.open(map);

        if(makerOld){
            makerOld.setIcon(getIcon(makerOld.id));
        }
        var key = parseInt(t.attr('data-id')) - 1, marker = variable[key];
        marker.setIcon(getIconHover(marker.id));
        makerOld = marker;
    });

    $('#router').click(function(){
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        var latlng = new google.maps.LatLng(21.039486,105.779787);

        var start = document.getElementById('start').value;

        var request = {
            origin:start,
            destination:latlng,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

    });

});

var variable = [];
var infowindow = new google.maps.InfoWindow();
var locations = $.parseJSON($('#locations').val());

var mapOptions = {
    zoom: 11, center: new google.maps.LatLng(21.033333, 105.849998)
};
var map = new google.maps.Map(document.getElementById('map'), mapOptions);
var makerOld;
setMarkers(map, locations);

function setMarkers(map, locations) {

    for (var i = 0; i < locations.length; i++) {
        var location = locations[i];
        var latlng = new google.maps.LatLng(location.lat, location.lng);
        var marker = new google.maps.Marker({
            id: i + 1,
            position: latlng,
            map: map,
            icon: getIcon(i + 1),
            title: location.name,
            content: '<h3>' + location.name + '</h3><p>' + location.address + '</p>'
        });
        variable[i] = marker;
        google.maps.event.addListener(marker, 'mouseover', function () {
            setInfoWindow(this);
        });
    }
}

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

function getIconHover(number) {
    return {
        url: '/img/maps/iconMarkerHover' + number + '.png',
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(29, 42),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(14, 42)
    };
}
