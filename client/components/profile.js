system.cmp.profile = {
    controller: function(args) {
        var model = system.model.profile;
        return {
            model: model,
            me: args.me || model.me(),
        };
    },
    view: function(ctrl, args) {
        var me = ctrl.me;
        return m('div.profile', [
            m('div.top-box', [
                m('img', {
                    src: me.pic()
                }),
                m('a.btn-primary.pure-button', {
                    onclick: function() {
                        util.q('#uploadPic').click();
                    }
                }, 'Change'),
                m('input[type="file"].hidden#uploadPic', {
                    accept: 'image/*'
                })
            ]),
            m('form.profile-form.center-form.pure-form.pure-form-aligned', [
                mutil.formGroup([
                    m('label', 'Username'),
                    m('input[type="text"].form-control', {
                        placeholder: 'Username',
                        value: me.userName(),
                        onchange: m.withAttr('value', me.userName)
                    })
                ]),
                mutil.formGroup([
                    m('label', 'Actual Name'),
                    m('input[type="text"].form-control', {
                        placeholder: 'Actual Name',
                        value: me.actualName(),
                        onchange: m.withAttr('value', me.actualName)
                    })
                ]),
                mutil.formGroup([
                    m('label', 'Email Address'),
                    m('input[type="email"].form-control', {
                        placeholder: 'Email Address',
                        value: me.email(),
                        onchange: m.withAttr('value', me.email)
                    })
                ]),
                mutil.formGroup([
                    m('label', 'Bio'),
                    m('textarea.form-control', {
                        placeholder: 'Bio',
                        value: me.bio()
                    }, me.bio())
                ]),
                mutil.formControls([
                    m('button.pure-button', 'Cancel'),
                    m('button.pure-button.btn-primary', {
                        onclick: function(e) {
                            ctrl.model.me(me);
                            e.preventDefault();
                        }
                    }, 'Update')
                ])
            ])
        ]);
    }
};
