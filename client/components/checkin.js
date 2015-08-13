system.cmp.checkin = {
    controller: function(args) {
        return {
            rating: m.prop(0)
        };
    },
    view: function(ctrl, args) {
        return m('form.checkin-form.pure-form.pure-form-aligned', [
            mutil.formGroup([
                m('label', 'Rating'),
                m('span.rating', [
                    [1, 2, 3, 4, 5].map(function(i) {
                        return m('span.star', {
                            onclick: function() {
                                ctrl.rating(i)
                            }
                        }, [mutil.icon('star fa-2x' + (!(i <= ctrl.rating()) ? ' o' : ''))])
                    })
                ])
            ]),
            mutil.formGroup([
                m('label', 'Photo'),
                m('button.pure-button', {
                    type: 'button',
                    onclick: function() {
                        util.q('#uploadPic').click()
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
                m('button.pure-button', 'Cancel'),
                m('button.pure-button.btn-primary', 'Check-in')
            ])
        ]);
    }
};
