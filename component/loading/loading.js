/**
 * @file loadingfile file
 */

// var html = '<div class="page-loading">\
//                 <div class="page-loading-logo-wrap">\
//                     <div class="page-loading-logo"></div>\
//                     <div class="page-loading-anim"></div>\
//                 </div>\
//             </div>';

var html = '<div class="page-loading">\
                <div class="page-loading-logo-wrap">\
                    <div class="page-loading-logo"></div>\
                </div>\
            </div>';

var $ = require('lib/zepto.js');
var body = document.body;
var styles = {};

var loadingdom;

var loading = {

    show: function () {
        if (!loadingdom) {
            // 创建dom
            loadingdom = $(html)
                .appendTo(body)
                .css(styles);
        }

        if (loadingdom) {
            loadingdom.css({
                display: 'block'
            });
        }
    },
    hide: function () {
        if (loadingdom) {
            loadingdom.css({
                display: 'none'
            });

        }
    }
};

module.exports = loading;
