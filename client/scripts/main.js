var system = window.system = window.system || {};

var util = {
    checkin: function() {

    },
    formatter: function(string, arr) {
        $.each(arr, function(index, value) {
            while (string.match('\{' + index + '\}')) {
                string = string.replace('{' + index + '}', value);
            }
        });
        return string;
    },
    convertRating: function(rating) {
        var i = 0,
            arr = [];

        while (i < 5) {
            arr[arr.length] = m('i', {
                class: (i < rating ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty')
            });
            i++;
        }
        return arr;
    },
    findModel: function(list, id) {
        if (id) {
            id = id.toString();
            var found = -1;
            list.some(function(item, index) {
                if (item.id === id) {
                    found = index;
                    return true;
                }
            });
            return list[index];
        } else {
            return list;
        }
    },
    extend: function(obj, newProps) {
        for (var prop in newProps) {
            if (newProps.hasOwnProperty(prop)) {
                obj[prop] = newProps[prop];
            }
        }
        return obj;
    }
};
(function() {

    var cmp = system.cmp = {};
    var model = system.model = {};

    // the components and models that will be loaded (individual js files)
    var components = ['nav', 'calculator', 'checkin', 'donate', 'home', 'inbox', 'login', 'map', 'meetup', 'profile', 'setting'];
    var models = ['checkin'];

    var ctx = system.ctx = {
        profile: {
            location: null,
            actualName: 'David Magee',
            userName: 'divide100',
            pic: './images/ProfilePic.png',
            email: 'magee.david1994@gmail.com',
            bio: 'I like turtles',
            notifications: {
                Inbox: 10
            }
        }
    };

    var layout = function(title, nav, content) {
        return m('div.slacker', [
            m('h1.header', title),
            m.component(cmp.nav, {
                active: title,
                items: nav
            }),
            m('div.content', content)
        ]);
    };

    var applyLayout = function(title, nav, page) {
        return {
            controller: function() {
                document.title = 'SlackR | ' + title;
            },
            view: function() {
                // TODO: should we pass an empty obj here as the args, or leave as undefined
                return layout(title, nav, m.component(page, {}));
            }
        };
    };

    var loadNavItems = function() {
        return [{
            name: 'Home',
            url: '/',
            icon: 'glyphicon glyphicon-home',
            component: cmp.home
        }, {
            name: 'Check-ins',
            url: '/checkins',
            icon: 'glyphicon glyphicon-ok',
            component: cmp.checkin
        }, {
            name: 'Meetups',
            url: '/meetups',
            icon: 'glyphicon glyphicon-road',
            component: cmp.meetup
        }, {
            name: 'Calculator',
            url: '/calculator',
            icon: 'glyphicon glyphicon-th',
            component: cmp.calculator
        }, {
            name: 'Inbox',
            url: '/inbox',
            icon: 'glyphicon glyphicon-envelope',
            component: cmp.inbox
        }, {
            name: 'Profile',
            url: '/profile',
            icon: 'glyphicon glyphicon-user',
            component: cmp.profile
        }, {
            name: 'Settings',
            url: '/settings',
            icon: 'glyphicon glyphicon-cog',
            component: cmp.setting
        }, {
            name: 'Donate',
            url: '/donate',
            icon: 'glyphicon glyphicon-gift',
            component: cmp.donate
        }];
    };

    var loadRoutes = function() {
        // fetch the nav items
        var navItems = loadNavItems();
        // apply the layout to each component in the nav and create the core route object
        var routes = {};
        navItems.forEach(function(item) {
            item.component = applyLayout(item.name, navItems, item.component);
            routes[item.url] = item.component;
        });
        // use hash for routing, NOTE: we'll probably change this to slash later once it's hosted
        m.route.mode = 'hash';
        // add any extra non-core routes
        util.extend(routes, {
            '/profile/:name': applyLayout('Profile', cmp.profile)
        });
        m.route(document.body, '/', routes);
    };

    // load models, then components
    system.loadModules('models/', models, function() {
        system.loadModules('components/', components, function() {
            ctx.activeCmp = cmp.home;
            loadRoutes();
        });
    });

}());
