system.cmp.profile = {
    controller: function() {},
    view: function() {
        var ctx = system.ctx;
        return m('div.profile', [
            m('div.topBox', [
                m('img', {
                    src: ctx.profile.pic
                }),
                m('button.btn-primary.pure-button', 'Change')
            ]),
            m('form.profile-form.pure-form.pure-form-aligned', [
                mutil.formGroup([
                    m('label', 'Username'),
                    m('input[type="text"].form-control', {
                        placeholder: 'Username',
                        value: ctx.profile.userName
                    })
                ]),
                mutil.formGroup([
                    m('label', 'Actual Name'),
                    m('input[type="text"].form-control', {
                        placeholder: 'Actual Name',
                        value: ctx.profile.actualName
                    })
                ]),
                mutil.formGroup([
                    m('label', 'Email Address'),
                    m('input[type="email"].form-control', {
                        placeholder: 'Email Address',
                        value: ctx.profile.email
                    })
                ]),
                mutil.formGroup([
                    m('label', 'Bio'),
                    m('textarea.form-control', {
                        placeholder: 'Bio'
                    }, ctx.profile.bio)
                ]),
                mutil.formControls([
                    m('button.pure-button', 'Cancel'),
                    m('button.pure-button.btn-primary', 'Update')
                ])
            ])
        ]);
    }
};
