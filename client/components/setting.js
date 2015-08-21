system.cmp.setting = {
    controller: function(args) {
        var ctrl = {
            settingList: args.settingList || system.model.setting.find(),
            flipSwitch: function(key) {
                ctrl.settingList()[key].selected = !ctrl.settingList()[key].selected;
            },
            createSwitch: function(setting, index) {
                return m('div.setting',
                    m('span.title', setting.label),m('div.tgl', [
                        m('label.tgl-btn', {
                                class: (setting.selected ? 'tgl-on' : 'tgl-off')
                            },
                            m('div.tgl-opt', setting.options[0]),
                            m('div.separator'),
                            m('div.tgl-opt', setting.options[0]),
                            m('input[type="checkbox"].tgl-switch', {
                                id: 'setting_'.concat(index),
                                checked: setting.selected,
                                onclick: function(evt) {
                                    ctrl.flipSwitch(evt.target.id.split('_')[1])
                                }
                            }))
                    ])
                    );
            }
        };
        return ctrl;
    },
    view: function(ctrl, args) {
        return m('div', [
            ctrl.settingList().map(function(setting, index) {
                    switch(setting.type){
                        case 'switch':
                             return ctrl.createSwitch(setting, index);
                        break;
                    }
            })
        ]);
    }
};
