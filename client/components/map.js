function initMap(address){
	var map = new google.maps.Map(document.getElementById('map'),{
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 10
	});

	//map.setCenter(getLocation());

	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({
		'address': address
	}, function(results, status){
		if(status == google.maps.GeocoderStatus.OK) {
			new google.maps.Marker({
				position: results[0].geometry.location,
				map: map
			});
			map.setCenter(results[0].geometry.location);
		}
		else {
		}
	});
};

function getLocation(){ 
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			return google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		}, function(){});
	}
}

var mapComp = {
	controller: function(){
	},
	view: function(){
		return [
		m('div#map','map failed to load'),
		m('script','initMap("Gatineau, QC");')
		];
	}
};