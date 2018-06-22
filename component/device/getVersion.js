/* eslint-disable */
var WIN = window;
var DOC = document;
var LOC = WIN["location"];
var REFERER = DOC["referrer"];
var HIS = WIN.history;
var NA = WIN.navigator;
var UA = NA.userAgent;

getVersion = {
    bdnews: function () {
        var temp = UA.split(' ');
        var tempbdnews = ''
        temp.forEach(function (ele) {
            if (ele.indexOf('bdnews') >= 0) {
                tempbdnews = ele.split('/')[1];
            }
        })
        return tempbdnews
    }
}

module.exports = getVersion;
