system.cmp.home = {
    controller: function(args) {
        return {
            location: m.prop(null),
            checkinList: system.model.checkin.find()
        };
    },
    view: function(ctrl, args) {
        return m('div.home', [
            m('div.topBox', [
                m.component(system.cmp.map, {
                    location: ctrl.location
                }),
                m('button.btn.btn-primary', 'Check In')
            ]),
            m.component(system.cmp.checkin, {
                checkinList: ctrl.checkinList,
                location: ctrl.location
            })
        ]);
    }
};
