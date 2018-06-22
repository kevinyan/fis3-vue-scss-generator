/* eslint-disable */

/** demo
**************************
var API = require("api");
API.fire("pwd_verify", {
  seed: 1234,
  mobile_pwd: "EDSSD455DEE",
}, function() {
  // ....
});
**************************
**/

var broadcast = require("crosswordpuzzle:component/broadcast/broadcast");
var zepto = require("crosswordpuzzle:lib/zepto");
var Device = require('crosswordpuzzle:component/device/device');
var fireSchema = require('crosswordpuzzle:component/schema/schema');
var download = require('crosswordpuzzle:component/downloadtip/share')
var clientApi = require('crosswordpuzzle:component/clientApi/clientApi');
var win = window;
var doc = document;
var ua = navigator.userAgent;
var urlparams = win.util.deparam(location.href);
var toast = require('component/toast');
var loading = require('crosswordpuzzle:component/loading/loading');
var cookie = require('crosswordpuzzle:lib/cookie');

var noop = function () {};

// 这里注册所有API
// 方便统一管理
// 默认是get

var HOST = '';


var apiMap = {
    'donewstongji': {
        'url': '/sn/api/instantlog|POST',
        'schema': ''
    }
}



var api = {};

for (var i in apiMap) {
    var name = i;
    var item = apiMap[i].url;
    var schema = apiMap[i].schema || '';
    var action = apiMap[i].action || '';

    var a = item.split("|");
    var url = a[0];


    // 预览机环境支持
    if (urlparams.orp_preview == 1) {
        // url = url + '?orp_preview=1'
        cookie.set('orp_preview', '1');
    } else if (urlparams.orp_preview == 2) {
        cookie.remove('orp_preview');
    }


    var method = (a[1] || "get").toLowerCase();


    api[name] = {
        url: url,
        method: method,
        schema: schema,
        action: action
    };

    /****
    每个api注册事件
    ```
    broadcast.fire("pwd_verify", function(data) {
      ...
    });
    ```
    ****/

    broadcast.on(name, (function (url, method, schema, action) {
        return function (data) {

            var params = data.params;
            var cb = data.callback || data.cb || noop;
            var onerror = data.onerror || onError;
            var useCommonToast = data.useCommonToast;

            function onSuccess(data) {
                loading.hide();

                if (typeof data === 'string') {
                    data = JSON.parse(data)

                }


                // token不要暴露过去
                if (data.errno != 0 && (useCommonToast || useCommonToast === undefined)) {
                    toast(data.errmsg);
                }


                cb(data);
            }

            function onError(xhr, type) {
                // 重新刷新
                if (data.errno != 0 && (useCommonToast || useCommonToast === undefined)) {
                    toast("请检查网络~");
                }
            }


            var apiData = {};
            // 去掉私有的params参数，不传给后端
            for (var i in params) {
                apiData[i] = params[i];
            }



            if (Device.IsBaiduNewsApp && schema) {

                console.log('do......' + schema + '......', apiData)
                // 端发送schema 
                fireSchema(schema, apiData)

            } else {
                if (url) {

                    if (!!(url.indexOf('crossword_activityinfo') >= 0)) {
                        loading.show();
                    }

                    $.ajax({
                        type: method,
                        url: url,
                        data: apiData,
                        success: onSuccess,
                        error: onerror
                    })
                } else if (schema) {
                    toast('请检查')
                }

            }

        }
    })(url, method, schema, action));

}



// 关于api的可以使用`api.fire`
// 内部通过`braodcast.fire`实现
api.fire = function (name, params, cb, onerror, useCommonToast) {

    broadcast.fire(name, {
        params: params,
        cb: cb,
        onerror: onerror,
        useCommonToast: useCommonToast
    });
};

module.exports = api;
