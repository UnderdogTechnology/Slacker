var homeComp = {
    controller: function() {},
    view: function() {
        return [
            m('div.topBox', [
                mapComp.view(),
                m('button.btn', {
                    class: 'btn-primary'
                }, 'Check In')
            ]),
            m('table.table',
                m('tbody',
                    checkinComp.controller().checkinList.map(function(item, index) {
                        return m('tr', {
                            onclick: (function() {
                                mapComp.controller().setFocus(checkinComp.controller().getCheckinById(item.id).location);
                            })
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
            )
        ];
    }
};
