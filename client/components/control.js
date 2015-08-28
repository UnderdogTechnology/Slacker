system.cmp.control = {
    controller: function(args) {
        var ctrl = {
            ctrlVisible: m.prop(false),
            showCtrl: function() {
                ctrl.ctrlVisible(true);
            },
            hideCtrl: function() {
                ctrl.ctrlVisible(false);
            },
            toggleCtrl: function() {
                if (ctrl.ctrlVisible()) {
                    ctrl.hideCtrl();
                } else {
                    ctrl.showCtrl();
                }
            }
        };
        return ctrl;
    },
    view: function(ctrl, args) {
        var items = args.items();
        return m('span.control', [
            m('i.fa.fa-ellipsis-v',{
                onclick: ctrl.toggleCtrl
            }),
            m('ul.pure-menu-list.control-list', {
                class: ctrl.ctrlVisible() ? 'control-list-visible': ''
            }, [
                items.map(function(item, index) {
                    return m('li.pure-menu-item', [
                        m('a.pure-menu-link', {
                            href: item.url,
                            config: m.route
                        }, [
                            m('i.control-icon', {
                                class: item.icon
                            }),
                            m('span', item.name)
                        ])
                    ]);
                })
            ])
        ])
    }
};
