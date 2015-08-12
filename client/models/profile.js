system.model.profile = {
    me: {
        id: '1',
        location: m.prop(null),
        actualName: m.prop('David Magee'),
        userName: m.prop('divide100'),
        pic: m.prop('./images/male.png'),
        email: m.prop('magee.david1994@gmail.com'),
        bio: m.prop('I like turtles'),
        notifications: {
            Inbox: 10
        }
    },
    find: function(id) {
        var list = [];
        return util.findModel(list, id);
    }
};
