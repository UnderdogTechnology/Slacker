system.model.checkin = {
    find: function(id) {
        var list = [{
            id: '1',
            location: new google.maps.LatLng(45.4417885, -75.78539030000002),
            username: 'divide100',
            date: '14/06/2015',
            distance: 5,
            rating: 4
        }, {
            id: '2',
            location: new google.maps.LatLng(44.4417885, -71.78539030000002),
            username: 'fuzetsu490',
            date: '14/06/2015',
            distance: 10,
            rating: 3
        }];
        return util.findModel(list, id);
    }
};
