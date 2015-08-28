system.cmp.nav = {
    controller: function(args) {
        var ctrl = {
            profileCtrlVisible: args.profileCtrlVisible || m.prop(false),
            menuVisible: args.menuVisible || m.prop(false),
            showMenu: function() {
                ctrl.menuVisible(true);
            },
            hideMenu: function() {
                ctrl.hideProfileCtrl();
                ctrl.menuVisible(false);
            },
            toggleMenu: function() {
                if (ctrl.menuVisible()) {
                    ctrl.hideMenu();
                } else {
                    ctrl.showMenu();
                }
            },
            showProfileCtrl: function() {
                ctrl.profileCtrlVisible(true);
            },
            hideProfileCtrl: function() {
                ctrl.profileCtrlVisible(false);
            },
            toggleProfileCtrl: function() {
                if (ctrl.profileCtrlVisible()) {
                    ctrl.hideProfileCtrl();
                } else {
                    ctrl.showProfileCtrl();
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
        var me = system.model.profile.me();
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
                m('div.profile', {
                    onclick: ctrl.toggleProfileCtrl
                }, [
                    m('img.profile-pic', {
                        src: me.pic()
                    }),
                    m('div.profile-name', [
                        m('span', me.actualName() ? me.actualName() : me.userName()),
                        m('i.fa.fa-caret-'.concat(ctrl.profileCtrlVisible() ? 'up' : 'down')),
                        m('ul.pure-menu-list.profile-control', {
                            hidden: !ctrl.profileCtrlVisible()
                        }, [
                            m('li.pure-menu-item', [
                                m('a.pure-menu-link', {
                                    href: '/profile',
                                    config: m.route
                                }, 'Edit')
                            ]),
                            m('li.pure-menu-item', [
                                m('a.pure-menu-link', 'Logout')
                            ])
                        ])
                    ])
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
                                m('i.nav-icon', {
                                    class: item.icon
                                }),
                                m('span.itemName', item.name),
                                me.notifications && me.notifications[item.name] ? m('span.badge', me.notifications[item.name]) : ''
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
