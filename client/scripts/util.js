/**
 ** Generic Utilities
 **/
var util = {
    q: function(q, c) {
        return (c || document).querySelector(q);
    },
    qq: function(q, c) {
        return [].slice.call((c || document).querySelectorAll(q));
    },
    checkin: function() {

    },
    formatter: function(string, obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                string = string.replace('{' + key + '}', obj[key], 'g');
            }
        }
        return string;
    },
    findModel: function(list, expr, sel) {
        if (expr) {
            expr = expr.toString();
            var foundList = [];
            list.some(function(item, index) {
                if (sel && item[sel].toString().match(expr)) {
                    foundList.push(item);
                } else {
                    for (var key in item) {
                        if (item[key].toString().match(expr)) {
                            foundList.push(item);
                            break;
                        }
                    }
                }
            });
            return m.prop(foundList);
        } else {
            return m.prop(list);
        }
    },
    extend: function(obj, newProps) {
        for (var prop in newProps) {
            if (newProps.hasOwnProperty(prop)) {
                obj[prop] = newProps[prop];
            }
        }
        return obj;
    }
};

/**
 ** Mithril Specific Utilities
 **/
var mutil = {
    convertRating: function(rating) {
        var i = 0,
            arr = [];

        while (i < 5) {
            arr[arr.length] = m('i', {
                class: (i < rating ? 'fa fa-star' : 'fa fa-star o')
            });
            i++;
        }
        return arr;
    },
    formGroup: function(children, attrs) {
        return m('div.pure-control-group', attrs, children);
    },
    formControls: function(children, attrs) {
        return m('div.pure-controls', attrs, children);
    },
    icon: function(name, children) {
        return m('i.fa.fa-' + name, children);
    }
};
