system.cmp.nav = {
    controller: function(args) {
        var menuVisible = m.prop(false);
        var ctrl = {
            menuVisible: menuVisible,
            showMenu: function() {
                menuVisible(true);
            },
            hideMenu: function() {
                menuVisible(false);
            },
            toggleMenu: function() {
                if (menuVisible()) {
                    ctrl.hideMenu();
                } else {
                    ctrl.showMenu();
                }
            },
            changeRoute: function(elem, isInit, ctx) {
                if (!isInit) {
                    elem.onclick = function(evt) {
                        // TODO: not the cleanest solution, look into using css transitionend event
                        evt.preventDefault();
                        util.q('.menu').classList.remove('menu-visible');
                        setTimeout(function() {
                            m.route(elem.getAttribute('href'));
                        }, 300);
                    };
                }
            }
        };
        return ctrl;
    },
    view: function(ctrl, args) {
        var ctx = system.ctx;
        var items = args.items();
        return m('div.slack-nav', [
            m('div.overlay', {
                onclick: ctrl.hideMenu,
                hidden: !ctrl.menuVisible()
            }),
            m('span.menu-btn.fa.fa-bars', {
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
                    items.map(function(item, index) {
                        return m('li', {
                                role: 'presentation',
                                class: (item.name == args.active ? 'active' : '')
                            },
                            m('a', {
                                href: item.url,
                                config: ctrl.changeRoute
                            }, [
                                m('i.nav-icon', {class: item.icon}),
                                m('span.itemName', item.name), 
                                ctx.profile.notifications && ctx.profile.notifications[item.name] ? m('span.badge', ctx.profile.notifications[item.name]) : ''
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
