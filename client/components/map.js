system.cmp.map = {
    controller: function() {
        var lastLoc = null;
        var ctrl = {
            map: m.prop(null),
            markerDetailList: [{
                position: new google.maps.LatLng(45.4417885, -75.78539030000002),
                icon: './images/marker.png'
            }, {
                position: new google.maps.LatLng(44.4417885, -71.78539030000002),
                icon: './images/marker.png'
            }, {
                position: new google.maps.LatLng(48.4417885, -73.78539030000002)
            }, {
                position: new google.maps.LatLng(41.4417885, -81.78539030000002)
            }],
            initMap: function(elem, isInit) {
                if (isInit) return;
                ctrl.map(new google.maps.Map(elem, {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    center: new google.maps.LatLng(45.4214, -75.6919),
                    zoom: 10
                }));
                ctrl.getCurLocation(function(pos) {
                    ctrl.setFocus(pos);
                });
                ctrl.setMarker(ctrl.markerDetailList);
            },
            setFocus: function(latLng) {
                ctrl.map().setCenter(latLng);
            },
            getCurLocation: function(cb) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        system.model.profile.me().location(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                        cb(system.model.profile.me().location());
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
                        map: ctrl.map(),
                        icon: detail.icon ? {
                            url: detail.icon,
                            scaledSize: new google.maps.Size(30, 30),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(0, 30)
                        } : null,
                        title: detail.title
                    });
                });
            },
            updateLocation: function(loc) {
                if (loc === lastLoc) return;
                ctrl.setFocus(loc);
                lastLoc = loc;
            }
        };
        return ctrl;
    },
    view: function(ctrl, args) {
        ctrl.updateLocation(args.location());
        return m('div.map', {
            config: ctrl.initMap
        });
    }
};
