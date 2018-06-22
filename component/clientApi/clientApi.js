/* eslint-disable */
/* about content */

var DataFormater = {};

window['util'] = {
    hasClass: function (elm, className) {
        if (className === '' || className === undefined) {
            return;
        }
        var classes = elm.className.split(' ');

        for (var index in classes) {
            if (classes[index] == className) {
                return index;
            }
        }

        return -1;
    },

    addClass: function (elm, newClass) {
        var self = this;
        if (newClass === '' || newClass === undefined) {
            return;
        }
        var classes = elm.className ? elm.className.split(' ') : [];
        var classIndex = self.hasClass(elm, newClass);

        if (classIndex > -1) { return; }

        classes.push(newClass);
        elm.className = classes.length > 1 ? classes.join(' ') : newClass;
    },

    removeClass: function (elm, className) {
        var self = this;
        var classes = elm.className ? elm.className.split(' ') : [];
        // 新添加操作
        if (className instanceof Array && className.length > 0) {
            var obj = {},
                i = className.length,
                j = classes.length;
            while (i--) {
                obj[className[i]] = true;
            }
            while (j--) {
                if (obj[classes[j]]) {
                    console.log(j);
                    classes.splice(j, 1);
                }
            }
        }
        // 原有功能
        else {
            var classIndex = self.hasClass(elm, className);

            if (classIndex === -1) {
                return;
            }
            classes.splice(classIndex, 1);
        }

        elm.className = classes.join(' ');
    },
    deparam: function (querystring) {
        // remove any preceding url and split
        querystring = querystring.slice(querystring.indexOf('?') + 1).split('&');
        var params = {};
        var pair;
        var d = function (str) {
            return str;
        };
        // march and parse
        for (var i = querystring.length - 1; i >= 0; i--) {
            pair = querystring[i].split('=');
            params[d(pair[0])] = d(pair[1]);
        }
        return params;
    }

}



module.exports = '';
