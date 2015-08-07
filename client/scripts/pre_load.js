var ctx = {
    menuVisible: false,
    activePage: 'Home',
    profile: {
        location: null,
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
