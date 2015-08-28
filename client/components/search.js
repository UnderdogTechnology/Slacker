system.cmp.search = {
    controller: function(args) {
        var ctrl = {
            searchBarVisible: m.prop(false),
            searchCriteria: args.searchCriteria || m.prop(''),
            searchValue: m.prop(''),
            showSearch: function() {
                ctrl.searchBarVisible(true);
            },
            hideSearch: function() {
                ctrl.searchValue('');
                ctrl.searchBarVisible(false);
            },
            toggleSearch: function() {
                if (ctrl.searchBarVisible()) {
                    ctrl.hideSearch();
                } else {
                    ctrl.showSearch();
                }
            },
            performSearch: function() {
                ctrl.searchCriteria(ctrl.searchValue());
                ctrl.hideSearch();
            }
        };
        return ctrl;
    },
    view: function(ctrl, args) {
        return m('div.search', {
            hidden: !args.searchVisible()
        }, [
            m('span.search-btn.fa', {
                onclick: function() {
                    if (ctrl.searchBarVisible()) {
                        ctrl.performSearch();
                    } else {
                        ctrl.showSearch();
                    }
                },
                class: ctrl.searchBarVisible() ? 'fa-arrow-right' : 'fa-search fa-flip-horizontal'
            }),
            m('div.search-bar', {
                class: ctrl.searchBarVisible() ? 'search-bar-visible' : ''
            }, [
                m('input[type="search"].search-term', {
                    config: mutil.c.autofocus,
                    hidden: !ctrl.searchBarVisible(),
                    onchange: function(e) {
                        ctrl.searchValue(e.target.value);
                    },
                    placeholder: 'Search',
                    value: ctrl.searchValue()
                })
            ])
        ]);
    }
};
