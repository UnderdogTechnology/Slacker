function initMap(address) {
    var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 10
    });

    getLocation(map.setCenter);

    // var geocoder = new google.maps.Geocoder();

    // geocoder.geocode({
    //     'address': address
    // }, function(results, status) {
    //     if (status == google.maps.GeocoderStatus.OK) {
    //         new google.maps.Marker({
    //             position: results[0].geometry.location,
    //             map: map
    //         });
    //         map.setCenter(results[0].geometry.location);
    //     } else {}
    // });
}

function getLocation(cb) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            cb(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        }, function() {});
    }
}

var mapComp = {
    controller: function() {},
    view: function() {
        return [
            m('div#map', 'map failed to load'),
            m('script', 'initMap("Gatineau, QC");')
        ];
    }
};
