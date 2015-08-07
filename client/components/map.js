var map,
    mapComp = {
        controller: function() {
            return {
                markerDetailList: [{
                    position: new google.maps.LatLng(45.4417885, -75.78539030000002)
                }, {
                    position: new google.maps.LatLng(44.4417885, -71.78539030000002)
                }, {
                    position: new google.maps.LatLng(48.4417885, -73.78539030000002)
                }, {
                    position: new google.maps.LatLng(41.4417885, -81.78539030000002)
                }],
                initMap: function() {
                    map = new google.maps.Map(document.getElementById('map'), {
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        center: mapComp.controller().getCurLocation(function(pos) {
                            mapComp.controller().setFocus(pos);
                        }),
                        zoom: 10
                    });;

                    mapComp.controller().setMarker(mapComp.controller().markerDetailList);
                },
                setFocus: function(latLng) {
                    map.setCenter(latLng);
                },
                getCurLocation: function(cb) {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            ctx.profile.location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                            cb(ctx.profile.location);
                        }, function() {});
                    }
                },
                getDistance: function(latLngA, latLngB) {
                    return (google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000).toFixed(2);
                },
                setMarker: function(markerDetails) {
                    markerDetails.map(function(detail, index) {
                        var marker = new google.maps.Marker({
                            position: detail.position,
                            map: map,
                            icon: detail.icon,
                            title: detail.title
                        });
                    });
                }

            };
        },
        view: function() {
            return [
                m('div#map', 'map failed to load'),
                m('script', 'mapComp.controller().initMap();')
            ];
        }
    }
