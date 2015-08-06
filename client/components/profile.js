var profileComp = {
	controller: function(){
	},
	view: function(){
		return [
		m('div.topBox', [
			m('img',{src:ctx.profile.pic}),
			m('button.btn',{class:'btn-primary'},'Change')
			]),
		m('form',[
			m('div.form-group',[
				m('label', 'Username'),
				m('input[type="text"].form-control',{placeholder:'Username', value:ctx.profile.userName})
				]),
			m('div.form-group',[
				m('label', 'Actual Name'),
				m('input[type="text"].form-control',{placeholder:'Actual Name', value:ctx.profile.actualName})
				]),
			m('div.form-group',[
				m('label', 'Email Address'),
				m('input[type="email"].form-control',{placeholder:'Email Address', value:ctx.profile.email})
				]),
			m('div.form-group',[
				m('label', 'Bio'),
				m('textarea.form-control',{placeholder:'Bio'},ctx.profile.bio)
				]),
			m('div.btn-group',[
				m('button.btn', 'Cancel'),
				m('button.btn', {class:'btn-primary'}, 'Update')
				])
			])
		];
	}
};