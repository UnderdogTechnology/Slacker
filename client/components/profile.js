system.cmp.profile = {
    controller: function(args) {},
    view: function(ctrl, args) {
        args.me = args.me || system.model.profile.me;
        return m('div.profile', [
            m('div.topBox', [
                m('img', {
                    src: args.me.pic()
                }),
                m('a.btn-primary.pure-button', 'Change')
            ]),
            m('form.profile-form.pure-form.pure-form-aligned', [
                mutil.formGroup([
                    m('label', 'Username'),
                    m('input[type="text"].form-control', {
                        placeholder: 'Username',
                        value: args.me.userName()
                    })
                ]),
                mutil.formGroup([
                    m('label', 'Actual Name'),
                    m('input[type="text"].form-control', {
                        placeholder: 'Actual Name',
                        value: args.me.actualName()
                    })
                ]),
                mutil.formGroup([
                    m('label', 'Email Address'),
                    m('input[type="email"].form-control', {
                        placeholder: 'Email Address',
                        value: args.me.email()
                    })
                ]),
                mutil.formGroup([
                    m('label', 'Bio'),
                    m('textarea.form-control', {
                        placeholder: 'Bio'
                    }, args.me.bio())
                ]),
                mutil.formControls([
                    m('button.pure-button', 'Cancel'),
                    m('button.pure-button.btn-primary', 'Update')
                ])
            ])
        ]);
    }
};
