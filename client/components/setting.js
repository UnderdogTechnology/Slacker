system.cmp.setting = {
    controller: function(args) {
        var model = system.model.setting;
        var ctrl = {
            model: model,
            settingList: args.settingList || model.find(),
        };
        return ctrl;
    },
    view: function(ctrl, args) {
        return m('form.center-form.pure-form.pure-form-aligned', [
            ctrl.settingList().map(function(setting, index) {
                console.log(setting);
                var control;
                switch (setting.type) {
                    case 'switch':
                        control = mutil.createSwitch(setting, 'selected');
                        break;
                    case 'dropdown':
                        control = mutil.createDropdown(setting, setting.options, 'selected');
                        break;
                }
                return mutil.formGroup([
                    m('label', setting.label),
                    control
                ], {
                    class: 'setting'
                });
            })
        ]);
    }
};
