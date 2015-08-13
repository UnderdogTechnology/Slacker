system.cmp.home = {
    controller: function(args) {
        return {
            location: m.prop(null),
            checkinList: system.model.checkinList.find()
        };
    },
    view: function(ctrl, args) {
        return m('div.home', [
            m('div.topBox.mapBox', [
                m.component(system.cmp.map, {
                    location: ctrl.location
                }),
                m('a.pure-button.btn-primary', {
                    href: '/checkin',
                    config: m.route
                }, 'Check In')
            ]),
            m.component(system.cmp.checkinList, {
                checkinList: ctrl.checkinList,
                location: ctrl.location
            })
        ]);
    }
};
