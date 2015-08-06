var ctx = {
    menuVisible: false,
    activePage: 'Home',
    profile: {
        actualName: 'David Magee',
        userName: 'divide100',
        pic: './images/ProfilePic.png',
        email: 'magee.david1994@gmail.com',
        bio: 'I like turtles',
        notifications: {
            Inbox: 10
        }
    }
};

var util = {
    showMenu: function() {
        $('.overlay').fadeIn();
        $('.menu').animate({
            'left': '0'
        });
        ctx.menuVisible = !ctx.menuVisible;
    },
    hideMenu: function() {
        $('.overlay').fadeOut();
        $('.menu').animate({
            'left': '-300px'
        });
        ctx.menuVisible = !ctx.menuVisible;
    },
    toggleMenu: function() {
        if (ctx.menuVisible) {
            util.hideMenu();
        } else {
            util.showMenu();
        }
    },
    dispatcher: function(e) {
        ctx.activePage = ($(e.target).hasClass('itemName') ? e.target.innerText : ($(e.target).hasClass('badge') ? $(e.target).parent().find('.itemName')[0].innerText : $(e.target).find('.itemName')[0].innerText));
        $('title').text('SlackR | ' + ctx.activePage);

        ctx.activeComp = $.grep(menuItems, function(item) {
            return item.name == ctx.activePage;
        })[0].component;

        if (ctx.menuVisible) {
            util.hideMenu();
        }
    },
    checkin: function() {

    },
    formatter: function(string, arr) {
        $.each(arr, function(index, value) {
            while (string.match('\{' + index + '\}')) {
                string = string.replace('{' + index + '}', value);
            }
        });
        return string;
    },
    convertRating: function(rating) {
        var i = 0,
            arr = [];

        while (i < 5) {
            arr[arr.length] = m('i', {
                class: (i < rating ? 'glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty')
            });
            i++;
        }
        return arr;
    }
};
