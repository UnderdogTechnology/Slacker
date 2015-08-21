system.model.setting = {
    find: function(expr, sel) {
        var list = [{
            label: 'switchOff',
            type: 'switch',
            options: ['ON', 'OFF'],
            selected: false
        }, {
            label: 'switchOn',
            type: 'switch',
            options: ['ON', 'OFF'],
            selected: true
        }, {
            label: 'ddlOne',
            type: 'dropdown',
            options: ['One', 'Two', 'Three'],
            selected: 2
        }];
        return util.findModel(list, expr, sel);
    }
};
