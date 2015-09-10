system.cmp.checkin = {
    controller: function(args) {
        return {
            rating: {
                chosen: m.prop(0),
                couldB: m.prop(0)
            }
        };
    },
    view: function(ctrl, args) {
        return m('form.checkin-form.center-form.pure-form.pure-form-aligned', [
            mutil.formGroup([
                m('label', 'Rating'),
                // TODO: should we move rating to own funcion
                m('span.rating', [
                    [1, 2, 3, 4, 5].map(function(i) {
                        return m('span.star', {
                            onclick: function() {
                                ctrl.rating.chosen(i);
                            },
                            onmouseover: function() {
                                ctrl.rating.couldB(i);
                            },
                            onmouseout: function() {
                                ctrl.rating.couldB(ctrl.rating.chosen());
                            }
                        }, [mutil.icon('star fa-2x' + (i <= ctrl.rating.couldB() ? '' : ' o'))])
                    })
                ])
            ]),
            mutil.formGroup([
                m('label', 'Photo'),
                m('button.pure-button.form-control.secondary', {
                    type: 'button',
                    onclick: function() {
                        util.q('#uploadPic').click();
                    }
                }, mutil.icon('camera-retro fa-2x')),
                m('input[type="file"].hidden#uploadPic', {
                    accept: 'image/*'
                })
            ]),
            mutil.formGroup([
                m('label', 'Comment'),
                m('textarea.form-control', {
                    placeholder: 'Comment'
                })
            ]),
            mutil.formControls([
                m('button.pure-button.secondary', 'Cancel'),
                m('button.pure-button.primary', 'Check-in')
            ])
        ]);
    }
};
