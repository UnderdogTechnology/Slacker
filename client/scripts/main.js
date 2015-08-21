(function() {

    var system = window.system = window.system || {};

    var cmp = system.cmp = {};
    var model = system.model = {};

    var deps = {
        // EXTRA
        'scripts/': ['util'],
        // MODELS
        'models/': ['checkinList', 'profile', 'setting'],
        // COMPONENTS
        'components/': [
            'nav', 'notification', 'calculator', 'checkinList', 'checkin', 'donate',
            'home', 'inbox', 'login', 'map', 'meetup', 'profile', 'setting', 'search'
        ]
    };

    var ctx = system.ctx = {};

    var layout = function(title, nav, content, needsSearch) {
        return {
            controller: function(args) {
                document.title = 'SlackR | ' + title;
                return {
                    menuVisible: m.prop(false),
                    searchCriteria: m.prop(''),
                    searchVisible: m.prop(needsSearch || false)
                };
            },
            view: function(ctrl, args) {
                return m('div.slacker', [
                    m('h1.header', title),
                    m.component(cmp.search, {
                        searchCriteria: ctrl.searchCriteria,
                        searchVisible: ctrl.searchVisible
                    }),
                    m.component(cmp.nav, {
                        active: title,
                        items: nav,
                        menuVisible: ctrl.menuVisible
                    }),
                    m('div.content', {
                        overflow: (ctrl.menuVisible() ? 'none' : 'scroll')
                    }, m.component(content, {
                        searchCriteria: ctrl.searchCriteria
                    })),
                ]);
            }
        };
    };

    var loadNavItems = function() {
        return m.prop([{
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
            component: cmp.meetup,
            needsSearch: true
        }, {
            name: 'Calculator',
            url: '/calculator',
            icon: 'fa fa-calculator fa-lg',
            component: cmp.calculator
        }, {
            name: 'Inbox',
            url: '/inbox',
            icon: 'fa fa-envelope fa-lg',
            component: cmp.inbox,
            needsSearch: true
        }, {
            name: 'Profile',
            url: '/profile',
            icon: 'fa fa-user fa-lg',
            component: cmp.profile
        }, {
            name: 'Settings',
            url: '/settings',
            icon: 'fa fa-cogs fa-lg',
            component: cmp.setting,
            needsSearch: true
        }, {
            name: 'Donate',
            url: '/donate',
            icon: 'fa fa-gift fa-lg',
            component: cmp.donate
        }]);
    };

    var loadRoutes = function() {
        // fetch the nav items
        var navItems = loadNavItems();
        // apply the layout to each component in the nav and create the core route object
        var routes = {};
        navItems().forEach(function(item) {
            item.component = layout(item.name, navItems, item.component, item.needsSearch);
            routes[item.url] = item.component;
        });
        // add any extra non-core routes
        // util.extend(routes, {
        //     '/profile/:name': layout('Profile', navItems, cmp.profile, false)
        // });
        // use hash for routing, NOTE: we'll probably change this to slash later once it's hosted
        m.route.mode = 'hash';

        m.route(document.body, '/', routes);
    };

    // load models, then components
    system.loadModules(deps, loadRoutes);

}());
