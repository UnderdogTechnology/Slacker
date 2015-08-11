system.cmp.checkin = {
    controller: function(args) {},
    view: function(ctrl, args) {
        return m('form.checkin', [
            m('div.form-group', [
                m('label', 'Rating'),
                m('div',[
                    m('i',{class:'glyphicon glyphicon-star'}),
                    m('i',{class:'glyphicon glyphicon-star'}),
                    m('i',{class:'glyphicon glyphicon-star'}),
                    m('i',{class:'glyphicon glyphicon-star'}),
                    m('i',{class:'glyphicon glyphicon-star'})
                ])
            ]),
            m('div.form-group', [
                m('label', 'Photo'),
                m('div.btn-group.photo-btns',{role: 'group'},[
                    m('button.btn.btn-default.glyphicon.glyphicon-camera',{type:'button',onclick:function(){$('#takePic').click()}}),
                    m('button.btn.btn-default.glyphicon.glyphicon-export',{type:'button',onclick:function(){$('#uploadPic').click()}}),
                ]),
                m('input[type="file"].hidden#takePic',{accept: 'image/*',capture:'camera'}),
                m('input[type="file"].hidden#uploadPic',{accept: 'image/*'})
            ]),
            m('div.form-group', [
                m('label', 'Comment'),
                m('textarea.form-control')
            ]),
            m('div.btn-group.action-btns', [
                m('button.btn', 'Cancel'),
                m('button.btn.btn-primary', 'Check-in')
            ])
        ]);
    }
};
