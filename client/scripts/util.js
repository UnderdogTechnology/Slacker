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
                if (!sel) {
                    for (var key in item) {
                        if (item[key].toString().match(expr)) {
                            foundList.push(item);
                            break;
                        }
                    }
                } else if (item[sel].toString().match(expr)) {
                    foundList.push(item);
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
    },
    createSwitch: function(obj, prop) {
        var selected = obj[prop];
        return m('div.tgl', [
            m('label.tgl-btn', {
                    class: (selected ? 'tgl-on' : 'tgl-off')
                },
                m('div.tgl-opt.primary', 'ON'),
                m('div.separator'),
                m('div.tgl-opt.secondary', 'OFF'),
                m('input[type="checkbox"].tgl-switch', {
                    checked: selected,
                    onclick: function(evt) {
                        obj[prop] = !selected;
                    }
                }))
        ]);
    },
    createDropdown: function(obj, list, prop) {
        var selectedIndex = obj[prop];
        return m('select', {
            onchange: function(evt) {
                obj[prop] = evt.target.selectedIndex;
            }
        }, list.map(function(option, index) {
            return m('option', {
                value: index,
                selected: index === selectedIndex
            }, option);
        }));
    }
};

// reusable config attrs
mutil.c = {
    autofocus: function(elem, isInit) {
        elem.focus();
    }
};
