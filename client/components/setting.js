system.cmp.setting = {
    controller: function(args) {
        var ctrl = {
            settingList: args.settingList || system.model.setting.find(),
            flip: function(key) {
                ctrl.settingList()[key].selected = !ctrl.settingList()[key].selected;
            }
        };
        return ctrl;
    },
    view: function(ctrl, args) {
        return m('div', [
            ctrl.settingList().map(function(item, index) {
                return m('div.setting',
                    m('span.title', item.label),
                    m('div.tgl', [
                        m('label.tgl-btn', {
                                class: (item.selected ? 'tgl-on' : 'tgl-off')
                            },
                            m('div.tgl-opt', item.optOne),
                            m('div.separator'),
                            m('div.tgl-opt', item.optTwo),
                            m('input[type="checkbox"].tgl-switch', {
                                id: 'setting_'.concat(index),
                                checked: item.selected,
                                onclick: function(evt) {
                                    ctrl.flip(evt.target.id.split('_')[1])
                                }
                            }))
                    ])
                )
            })
        ]);
    }
};
