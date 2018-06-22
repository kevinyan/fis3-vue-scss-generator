var Vue = require('lib/vue');
var VueRouter = require('lib/vue-router');
var $ = require('lib/zepto');
var api = require('component/api');

var toast = require('component/toast');
var device = require('component/device');


var fastClick = require('lib/fastclick');
var cookie = require('lib/cookie');

fastClick(document.body);

var win = window;
var urlparams = win.util.deparam(location.href);


// 这是是让所有的触碰都具有:active
$('*').on('touchstart', function () {}, false);


// page demo
var demo = require('pages/demo');

var router = new VueRouter({
    routes: [{
        name: 'demo',
        path: '/demo',
        component: demo
    }]
});

new Vue({
    router: router,

    data: function () {
        return {

        }
    },
    template: '',
    created: function () {

    },
    destroyed: function () {

    },
    methods: {

    }
}).$mount('#container');


router.beforeEach(function (to, from, next) {
    // 监听路由变化

    next();
});