system.cmp.checkinList = {
    controller: function(args) {},
    view: function(ctrl, args) {
        args.checkinList = args.checkinList || system.model.checkinList.find();
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
                                m('span.pull-right', mutil.convertRating(item.rating))
                            ])
                        ])
                    ]);
                })
            )
        );
    }
};
