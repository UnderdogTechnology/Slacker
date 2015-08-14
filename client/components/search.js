system.cmp.search = {
    controller: function(args) {
        var searchVisible = m.prop(false);
        var ctrl = {
            searchVisible: searchVisible,
            showSearch: function() {
                searchVisible(true);
            },
            hideSearch: function() {
                searchVisible(false);
            },
            toggleSearch: function() {
                if (searchVisible()) {
                    ctrl.hideSearch();
                } else {
                    ctrl.showSearch();
                }
            }
            //search: args.find()
        };
        return ctrl;
    },
    view: function(ctrl, args) {
        return m('div.search', [
            m('span.search-btn.fa.fa-search.fa-flip-horizontal', {
                onclick: ctrl.toggleSearch
            }),
            m('div.search-bar', {
                    class: ctrl.searchVisible() ? 'search-visible' : ''},
            [
                m('input[type="text"].search-term', {
                    onchange: function(e){
                        console.log(e.target.value);
                    },
                    hidden: !ctrl.searchVisible(),
                    autofocus: ctrl.searchVisible(),
                    placeholder: 'Search',
                })
            ])
        ]);
    }
};
