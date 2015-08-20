system.model.setting = {
    find: function(expr, sel) {
        var list = [{
            label: 'settingOne',
            optOne: 'ON',
            optTwo: 'OFF',
            selected: false
        }, {
            label: 'settingTwo',
            optOne: 'ON',
            optTwo: 'OFF',
            selected: true
        }];
        return util.findModel(list, expr, sel);
    }
};
