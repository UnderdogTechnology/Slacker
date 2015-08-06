var checkins = [
{
	location:'here',
	username:'divide100',
	date:'14/06/2015',
	distance:5,
	rating: 4
},
{
	location:'there',
	username:'fuzetsu490',
	date:'14/06/2015',
	distance:10,
	rating: 3
}
];

var homeComp = {
	controller: function(){
		mapComp.controller();
	},
	view: function(){
		return [
		m('div.topBox',[
			mapComp.view(),
			m('button.btn',{class:'btn-primary'},'Check In')
			]),
		m('table.table',
			m('tbody',
				checkins.map(function(item, index){
					return m('tr', [
						m('td.listBox', item.location),
						m('td.details', [
							m('div',util.formatter('Checked in by {username} on {date}',item)),
							m('div',[
								m('span.pull-left',util.formatter('{distance}km away',item)),
								m('span.pull-right',util.convertRating(item.rating))
								])
							])
						]);
				})
				)
			)
		];
	}
};