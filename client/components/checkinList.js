system.cmp.checkinList = {
    controller: function(args) {
        return {
            checkinList: args.checkinList || system.model.checkinList.find()
        };
    },
    view: function(ctrl, args) {
        var checkinList = ctrl.checkinList();
        return m('table.pure-table.pure-table-bordered',
            m('tbody',
                checkinList.map(function(item, index) {
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
