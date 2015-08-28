system.cmp.checkinList = {
    controller: function(args) {
        return {
            checkinList: args.checkinList || system.model.checkinList.find()
        };
    },
    view: function(ctrl, args) {
        var checkinList = ctrl.checkinList();
        return m('div.checkin-list',
            checkinList.map(function(item, index) {
                return m('div.checkin-item', {
                    onclick: function() {
                        args.location(item.location);
                    }
                }, [
                    m('div.checkin-location', item.location),
                    m('div.checkin-details', [
                        m.component(system.cmp.control, {items: m.prop([
                            {
                                name: 'Share',
                                url: '#',
                                icon: 'fa fa-share-alt'
                            }
                        ])}),
                        m('div', util.formatter('Checked in by {username} on {date}', item)),
                        m('div', [
                            m('span.pull-left', util.formatter('{distance}km away', item)),
                            m('span.pull-right', mutil.convertRating(item.rating))
                        ])
                    ])
                ]);
            })
        );
    }
};
