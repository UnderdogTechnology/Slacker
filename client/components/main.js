var template = {};

ctx.activeView = homeComp.view;

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
    return {
        showMenu: function() {
            $('.overlay').fadeIn();
            $('.menu').animate({
                'left': '0'
            });
            ctx.menuVisible = !ctx.menuVisible;
        },
        hideMenu: function() {
            $('.overlay').fadeOut();
            $('.menu').animate({
                'left': '-300px'
            });
            ctx.menuVisible = !ctx.menuVisible;
        },
        toggleMenu: function() {
            if (ctx.menuVisible) {
                template.controller().hideMenu();
            } else {
                template.controller().showMenu();
            }
        },
        dispatcher: function(pageName) {
            ctx.activePage = pageName;
            $('title').text('SlackR | ' + ctx.activePage);

            ctx.activeView = $.grep(menuItems, function(item) {
                return item.name == ctx.activePage;
            })[0].component.view;

            if (ctx.menuVisible) {
                template.controller().hideMenu();
            }
        }
    };
}

template.view = function() {
    if (ctx.profile) {
        return [
            m('h1.header', {
                onclick: template.controller().hideMenu
            }, ctx.activePage),
            m('span.menuButton', {
                class: 'glyphicon glyphicon-menu-hamburger',
                onclick: template.controller().toggleMenu
            }),
            m('div.overlay', {
                onclick: template.controller().hideMenu
            }),
            m('div.content', [
                ctx.activeView()
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
                                onclick: function() {
                                    template.controller().dispatcher(item.name);
                                },
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
}

m.mount(document.body, template);
