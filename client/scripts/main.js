var template = {};

var ctx = {
	menuVisible: false,
	activePage: 'Home',
	activeComp: homeComp,
	profile: {
		actualName: 'David Magee',
		userName: 'divide100',
		pic: './images/ProfilePic.png',
		notifications: {
			Inbox: 10
		}
	}
};

$('title').text('SlackR | ' + ctx.activePage);

var menuItems = [
{
	name: 'Home',
	icon: 'glyphicon glyphicon-home',
	component: homeComp
},
{
	name: 'Check-ins',
	icon: 'glyphicon glyphicon-ok',
	component: checkinComp
},
{
	name: 'Meetups',
	icon: 'glyphicon glyphicon-road',
	component: meetupComp
},
{
	name: 'Calculator',
	icon: 'glyphicon glyphicon-th',
	component: calcComp
},
{
	name: 'Inbox',
	icon: 'glyphicon glyphicon-envelope',
	component: inboxComp
},
{
	name: 'Profile',
	icon: 'glyphicon glyphicon-user',
	component: profileComp
},
{
	name: 'Settings',
	icon: 'glyphicon glyphicon-cog',
	component: settingComp
},
{
	name: 'Donate',
	icon: 'glyphicon glyphicon-gift',
	component: donateComp
}
];

var util = {
	showMenu: function(){
		$('.overlay').fadeIn();
		$('.menu').animate({'left': '0'});
		ctx.menuVisible = !ctx.menuVisible;
	},
	hideMenu: function(){
		$('.overlay').fadeOut();
		$('.menu').animate({'left': '-300px'});
		ctx.menuVisible = !ctx.menuVisible;
	},
	toggleMenu: function(){
		if(ctx.menuVisible)
		{
			util.hideMenu();
		}
		else
		{
			util.showMenu();
		}
	},
	dispatcher: function(e){
		ctx.activePage = ($(e.target).hasClass('itemName') ? e.target.innerText : ($(e.target).hasClass('badge') ? $(e.target).parent().find('.itemName')[0].innerText : $(e.target).find('.itemName')[0].innerText));
		$('title').text('SlackR | ' + ctx.activePage);

		ctx.activeComp = $.grep(menuItems, function(item){
			return item.name == ctx.activePage;
		})[0].component;

		if(ctx.menuVisible){
			util.hideMenu();
		}
	}
};

template.controller = function(){

};

template.view = function(){
	if(ctx.profile){
		return [
		m('h1.header',{onclick: util.hideMenu}, ctx.activePage),
		m('span.menuButton',{class:'glyphicon glyphicon-menu-hamburger', onclick: util.toggleMenu}),
		m('div.overlay', {onclick: util.hideMenu}),
		m('div.content',[
			ctx.activeComp.view
			]),
		m('div.menu',[
			m('div.profile',[
				m('img.profilePic',{src:(ctx.profile.pic ? ctx.profile.pic : './images/ProfilePic.png')}),
				m('span.profileName', (ctx.profile.actualName ? ctx.profile.actualName : ctx.profile.userName))
				]),
			m('ul', {class:'nav nav-pills nav-stacked'},[
				menuItems.map(function(item, index){
					return m('li', {onclick: util.dispatcher, role: 'presentation', class: (item.name == ctx.activePage ? 'active' : '')},[
						m('a', [
							m('span.itemName',{class:item.icon},item.name),
							(ctx.profile.notifications && ctx.profile.notifications[item.name] ? m('span.badge',ctx.profile.notifications[item.name]) : null)
							])
						]);
				}),
				m('img.logo',{src:'./images/logo.png'})
				])
			])
		];
	}
	else
	{
		return [
		m('h1.header',{onclick: util.hideMenu}, 'Login'),
		m('div.content',[
			loginComp.view
			])
		];
	}
};

m.mount(document.body, template);