system.cmp.notification = {
    controller: function(args) {
        return{
            showNotification: function(){},
            hideNotification: function(){}
        };
    },
    view: function(ctrl, args) {
        return m('div.notification', {class: args.type}, [
            m('span.message', args.message),
            m('a.dismiss', {onclick: ctrl.hideNotification}, 'dismiss')]);
    }
};