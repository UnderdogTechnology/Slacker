system.cmp.calculator = {
    controller: function(args) {
        var ctrl = {
            equations: {
                options: ['Tension', 'Sag'],
                selected: 0
            },
            keyClicked: function(e){
                var val = e.target.innerText;
                switch(val){
                    case '=':
                        break;
                    case 'C':
                        break;
                    default:
                        break;
                }
            }
        };
        return ctrl;
    },
    view: function(ctrl, args) {
        return m('form.center-form.pure-form.pure-form-aligned', [
            mutil.formGroup([
                m('label', 'Calculate'),
                mutil.createDropdown(ctrl.equations, ctrl.equations.options, 'selected')
            ]),
            m('table.number-pad',[
                [
                    [1,2,3],
                    [4,5,6],
                    [7,8,9],
                    ['c',0,'=']
                ].map(function(arr){
                    return m('tr',[
                        arr.map(function(i){
                            return m('td.number-pad-key',{
                                class: !Number(i) & i !== 0 ? 'secondary': 'primary',
                                onclick: ctrl.keyClicked
                            }, i);    
                        })
                    ]);
                })
            ])
        ]);
    }
};
