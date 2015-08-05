var template = {};

var curComp = {
	view: (function(){
		return [
		m('p', 'This is a paragraph')
		];
	})()
};

var ctx = {
	menuVisible: false,
	activePage: 'Home',
	activeComp: curComp
};

var menuItems = [
{
	name: 'Home',
	icon: 'glyphicon glyphicon-home',
	script: 'home.js'
},
{
	name: 'Check-ins',
	icon: 'glyphicon glyphicon-ok',
	script: 'checkin.js'
},
{
	name: 'Meetups',
	icon: 'glyphicon glyphicon-road',
	script: 'meetup.js'
},
{
	name: 'Profile',
	icon: 'glyphicon glyphicon-user',
	script: 'profile.js'
},
{
	name: 'Calculator',
	icon: 'glyphicon glyphicon-th',
	script: 'calculator.js'
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
	dispatch: function(e){
		ctx.activePage = e.target.text;
	}
};

template.controller = function(){

};

template.view = function(){
	return [
	m('h1.header',{onclick: util.hideMenu},[
		m('span','Slack\'R')
		]),
	m('span.menuButton',{class:'glyphicon glyphicon-menu-hamburger', onclick: util.toggleMenu}),
	m('div.overlay', {onclick: util.hideMenu}),
	m('div.content', [
		ctx.activeComp.view
		]),
	m('div.menu', [
		m('ul', {class:'nav nav-pills nav-stacked'},[
			menuItems.map(function(item, index){
				return m('li', {onclick: util.dispatch, role: 'presentation', class: (item.name == ctx.activePage ? 'active' : '')},[
					m('a', [
						m('span',{class:item.icon},item.name)
						])
					]);
			}),
			m('img',{src:'./logo.png', class:'logo'})
			])
		])
	];
};

m.mount(document.body, template);