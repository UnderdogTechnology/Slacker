system.cmp.nav = {
    controller: function(args) {
        var menuVisible = m.prop(false);
        var ctrl = {
            menuVisible: menuVisible,
            showMenu: function() {
                if (menuVisible()) return;
                menuVisible(true);
            },
            hideMenu: function() {
                if (!menuVisible()) return;
                menuVisible(false);
            },
            toggleMenu: function() {
                if (menuVisible()) {
                    ctrl.hideMenu();
                } else {
                    ctrl.showMenu();
                }
            },
        };
        return ctrl;
    },
    view: function(ctrl, args) {
        var ctx = system.ctx;
        return m('div.slack-nav', [
            m('div.overlay', {
                onclick: ctrl.hideMenu,
                hidden: !ctrl.menuVisible()
            }),
            m('span.menuButton.fa.fa-bars', {
                onclick: ctrl.toggleMenu
            }),
            m('div.menu', {
                class: ctrl.menuVisible() ? 'menu-visible' : ''
            }, [
                m('div.profile', [
                    m('img.profilePic', {
                        src: (ctx.profile.pic ? ctx.profile.pic : './images/ProfilePic.png')
                    }),
                    m('span.profileName', (ctx.profile.actualName ? ctx.profile.actualName : ctx.profile.userName))
                ]),
                m('ul', [
                    args.items.map(function(item, index) {
                        return m('li', {
                                role: 'presentation',
                                class: (item.name == args.active ? 'active' : '')
                            },
                            m('a', {
                                href: item.url,
                                config: m.route
                            }, [
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
        ]);
    }
};
