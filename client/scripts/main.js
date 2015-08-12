var system = window.system = window.system || {};
var util = {
    q: function(q, c) {
        return (c || document).querySelector(q);
    },
    qq: function(q, c) {
        return [].slice.call((c || document).querySelectorAll(q));
    },
    checkin: function() {

    },
    formatter: function(string, obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                string = string.replace('{' + key + '}', obj[key], 'g');
            }
        }
        return string;
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
var mutil = {
    convertRating: function(rating) {
        var i = 0,
            arr = [];

        while (i < 5) {
            arr[arr.length] = m('i', {
                class: (i < rating ? 'fa fa-star' : 'fa fa-star-o')
            });
            i++;
        }
        return arr;
    },
    formGroup: function(children) {
        return m('div.pure-control-group', children);
    },
    formControls: function(children) {
        return m('div.pure-controls', children);
    },
    icon: function(name, children) {
        return m('i.fa.fa-' + name, children);
    }
};
(function() {

    var cmp = system.cmp = {};
    var model = system.model = {};

    // the components and models that will be loaded (individual js files)
    var components = ['nav', 'notification', 'calculator', 'checkinList', 'checkin', 'donate', 'home', 'inbox', 'login', 'map', 'meetup', 'profile', 'setting'];
    var models = ['checkinList', 'profile'];

    var ctx = system.ctx = {
        profile: {
            location: null,
            actualName: 'David Magee',
            userName: 'divide100',
            pic: './images/male.png',
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
            m('div.content', {
                overflow: (m.component(cmp.nav).controller().menuVisible() ? 'none' : 'scroll')
            }, content)
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
            icon: 'fa fa-home fa-lg',
            component: cmp.home
        }, {
            name: 'Check-in',
            url: '/checkin',
            icon: 'fa fa-check fa-lg',
            component: cmp.checkin
        }, {
            name: 'Meetups',
            url: '/meetups',
            icon: 'fa fa-road fa-lg',
            component: cmp.meetup
        }, {
            name: 'Calculator',
            url: '/calculator',
            icon: 'fa fa-calculator fa-lg',
            component: cmp.calculator
        }, {
            name: 'Inbox',
            url: '/inbox',
            icon: 'fa fa-envelope fa-lg',
            component: cmp.inbox
        }, {
            name: 'Profile',
            url: '/profile',
            icon: 'fa fa-user fa-lg',
            component: cmp.profile
        }, {
            name: 'Settings',
            url: '/settings',
            icon: 'fa fa-cogs fa-lg',
            component: cmp.setting
        }, {
            name: 'Donate',
            url: '/donate',
            icon: 'fa fa-gift fa-lg',
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
            '/profile/:name': applyLayout('Profile', cmp.profile),
            '/checkinList': applyLayout('Check-ins', cmp.checkisList)
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
