system.cmp.setting = {
    controller: function(args) {
        var ctrl = {
            settingList: m.prop({
                testFalse: m.prop(false),
                testTrue: m.prop(true)
            }),
            flip: function(key){
                var setting = ctrl.settingList()[key];
                setting(!setting())
            },
            init: function(){
                var arr = [];
                for(var setting in ctrl.settingList())
                {
                    arr.push(m('div.setting', 
                        m('span.title',setting),
                        m('div.tgl',[
                            m('label.tgl-btn', {
                                class: (ctrl.settingList()[setting]() ? 'tgl-on' : 'tgl-off')
                            },
                            m('div.on', 'ON'),
                            m('div.center'),
                            m('div.off', 'OFF'),
                            m('input[type="checkbox"].tgl-switch', {
                                id: 'setting_'.concat(setting),
                                checked: ctrl.settingList()[setting](),
                                onclick: function(evt){ctrl.flip(evt.target.id.split('_')[1])}
                            }))
                        ])
                    ));
                }
                return arr;
            }
        };
        return ctrl;
    },
    view: function(ctrl, args) {
        return m('div', ctrl.init());
    }
};
