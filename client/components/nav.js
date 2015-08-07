system.cmp.nav = {
    controller: function(args) {
        var menuVisible = false;
        // TODO: consider removing the jQuery dep, only used for animation currently
        var ctrl = {
            showMenu: function() {
                if (menuVisible) return;
                $('.overlay').fadeIn();
                $('.menu').animate({
                    'left': '0'
                });
                menuVisible = true;
            },
            hideMenu: function() {
                if (!menuVisible) return;
                $('.overlay').fadeOut();
                $('.menu').animate({
                    'left': '-300px'
                });
                menuVisible = false;
            },
            toggleMenu: function() {
                if (menuVisible) {
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
                onclick: ctrl.hideMenu
            }),
            m('span.menuButton.glyphicon.glyphicon-menu-hamburger', {
                onclick: ctrl.toggleMenu
            }),
            m('div.menu', [
                m('div.profile', [
                    m('img.profilePic', {
                        src: (ctx.profile.pic ? ctx.profile.pic : './images/ProfilePic.png')
                    }),
                    m('span.profileName', (ctx.profile.actualName ? ctx.profile.actualName : ctx.profile.userName))
                ]),
                m('ul.nav.nav-pills.nav-stacked', [
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
