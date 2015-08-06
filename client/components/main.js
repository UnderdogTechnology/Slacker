var template = {};

ctx.activeComp = homeComp;

$('title').text('SlackR | ' + ctx.activePage);

var menuItems = [{
    name: 'Home',
    icon: 'glyphicon glyphicon-home',
    component: homeComp
}, {
    name: 'Check-ins',
    icon: 'glyphicon glyphicon-ok',
    component: checkinComp
}, {
    name: 'Meetups',
    icon: 'glyphicon glyphicon-road',
    component: meetupComp
}, {
    name: 'Calculator',
    icon: 'glyphicon glyphicon-th',
    component: calcComp
}, {
    name: 'Inbox',
    icon: 'glyphicon glyphicon-envelope',
    component: inboxComp
}, {
    name: 'Profile',
    icon: 'glyphicon glyphicon-user',
    component: profileComp
}, {
    name: 'Settings',
    icon: 'glyphicon glyphicon-cog',
    component: settingComp
}, {
    name: 'Donate',
    icon: 'glyphicon glyphicon-gift',
    component: donateComp
}];

template.controller = function() {
    ctx.activeComp.controller();
};

template.view = function() {
    if (ctx.profile) {
        return [
            m('h1.header', {
                onclick: util.hideMenu
            }, ctx.activePage),
            m('span.menuButton', {
                class: 'glyphicon glyphicon-menu-hamburger',
                onclick: util.toggleMenu
            }),
            m('div.overlay', {
                onclick: util.hideMenu
            }),
            m('div.content', [
                ctx.activeComp.view()
            ]),
            m('div.menu', [
                m('div.profile', [
                    m('img.profilePic', {
                        src: (ctx.profile.pic ? ctx.profile.pic : './images/ProfilePic.png')
                    }),
                    m('span.profileName', (ctx.profile.actualName ? ctx.profile.actualName : ctx.profile.userName))
                ]),
                m('ul', {
                    class: 'nav nav-pills nav-stacked'
                }, [
                    menuItems.map(function(item, index) {
                        return m('li', {
                                onclick: util.dispatcher,
                                role: 'presentation',
                                class: (item.name == ctx.activePage ? 'active' : '')
                            },
                            m('a', [
                                m('span.itemName', {
                                    class: item.icon
                                }, item.name), (ctx.profile.notifications && ctx.profile.notifications[item.name] ? m('span.badge', ctx.profile.notifications[item.name]) : null)
                            ])
                        );
                    }),
                    m('img.logo', {
                        src: './images/logo.png'
                    })
                ])
            ])
        ];
    } else {
        return [
            m('h1.header', {
                onclick: util.hideMenu
            }, 'Login'),
            m('div.content',
                loginComp.view
            )
        ];
    }
};

m.mount(document.body, template);
