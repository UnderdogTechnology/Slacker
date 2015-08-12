system.cmp.checkin = {
    controller: function(args) {},
    view: function(ctrl, args) {
        return m('form.checkin-form.pure-form.pure-form-aligned', [
            mutil.formGroup([
                m('label', 'Rating'), [1, 2, 3, 4, 5].map(function() {
                    return mutil.icon('star fa-3x')
                })
            ]),
            mutil.formGroup([
                m('label', 'Photo'),
                m('button.pure-button', {
                    type: 'button',
                    onclick: function() {
                        util.q('#uploadPic').click()
                    }
                }, mutil.icon('camera-retro fa-3x')),
                m('input[type="file"].hidden#uploadPic', {
                    accept: 'image/*'
                })
            ]),
            mutil.formGroup([
                m('label', 'Comment'),
                m('textarea.form-control', {placeholder: 'Comment'})
            ]),
            mutil.formControls([
                m('button.pure-button', 'Cancel'),
                m('button.pure-button.btn-primary', 'Check-in')
            ])
        ]);
    }
};
