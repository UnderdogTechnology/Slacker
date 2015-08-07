system.cmp.checkin = {
    controller: function(args) {},
    view: function(ctrl, args) {
        // TODO: what's the distinction between checkin and the checkinlist component on the home page, we probably need to create a separate one
        args.checkinList = args.checkinList || system.model.checkin.find();
        return m('table.table',
            m('tbody',
                args.checkinList.map(function(item, index) {
                    return m('tr', {
                        onclick: function() {
                            args.location(item.location);
                        }
                    }, [
                        m('td.listBox', item.location),
                        m('td.details', [
                            m('div', util.formatter('Checked in by {username} on {date}', item)),
                            m('div', [
                                m('span.pull-left', util.formatter('{distance}km away', item)),
                                m('span.pull-right', util.convertRating(item.rating))
                            ])
                        ])
                    ]);
                })
            )
        );
    }
};
