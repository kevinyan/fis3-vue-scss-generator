/* eslint-disable */

// 在向客户端同时发送时 需生成队列形式进行处理
// 目前逻辑为 设置最小的时间间隔 在客户端端生成请求队列 至少每100ms才会处理一个请求
// 主要为 jsapiInterFunc 函数处理逻辑

var Device = require('crosswordpuzzle:component/device/device');

var jsapiSchemeList = [];
// 当前的interval 是否处于开启状态
var jsapiSchemeInterOngoing = false;
// 周期时钟 100ms开放一次 接受一个客户端 jsapi
var jsapiSchemeInter;

var jsapiInterFunc = function (url) {
    jsapiSchemeList.push(url);
    // 在interval停止的条件下 重新创建
    if (jsapiSchemeInterOngoing === false) {
        jsapiSchemeInterOngoing = true;
        jsapiSchemeInter = setInterval(function () {
            document.getElementById('newsapp_jsbridge').src = jsapiSchemeList.shift();
            if (jsapiSchemeList.length === 0) {
                jsapiSchemeInterOngoing = false;
                clearInterval(jsapiSchemeInter);
            }
        }, 50);
    }

}

var deviceBehave = function (action, args) {

    if (Device.IsAndroid) {
        var url = 'bdapi://hybrid?info={"action": "' + action + '", "args": ' + (args ? JSON.stringify(args) : "{}") + '}';
        var id = 'newsapp_jsbridge';
        var $node = document.getElementById(id);
        if ($node) {
            jsapiInterFunc(url);
        } else {
            $node = document.createElement('iframe');
            $node.style.display = 'none';
            $node.id = id;
            $node.src = url;
            (document.body || document.getElementsByTagName('body')[0]).appendChild($node);
        }
    } else {

        // ios wkwebkit
        window.webkit.messageHandlers[action].postMessage( args )
    }
}

module.exports = deviceBehave
