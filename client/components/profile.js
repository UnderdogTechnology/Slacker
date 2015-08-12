system.cmp.profile = {
    controller: function(args) {
        return {
            me: args.me || system.model.profile.me(),
        };
    },
    view: function(ctrl, args) {
        var me = ctrl.me();
        return m('div.profile', [
            m('div.topBox', [
                m('img', {
                    src: me.pic()
                }),
                m('a.btn-primary.pure-button', 'Change')
            ]),
            m('form.profile-form.pure-form.pure-form-aligned', [
                mutil.formGroup([
                    m('label', 'Username'),
                    m('input[type="text"].form-control', {
                        placeholder: 'Username',
                        value: me.userName()
                    })
                ]),
                mutil.formGroup([
                    m('label', 'Actual Name'),
                    m('input[type="text"].form-control', {
                        placeholder: 'Actual Name',
                        value: me.actualName()
                    })
                ]),
                mutil.formGroup([
                    m('label', 'Email Address'),
                    m('input[type="email"].form-control', {
                        placeholder: 'Email Address',
                        value: me.email()
                    })
                ]),
                mutil.formGroup([
                    m('label', 'Bio'),
                    m('textarea.form-control', {
                        placeholder: 'Bio'
                    }, me.bio())
                ]),
                mutil.formControls([
                    m('button.pure-button', 'Cancel'),
                    m('button.pure-button.btn-primary', 'Update')
                ])
            ])
        ]);
    }
};
