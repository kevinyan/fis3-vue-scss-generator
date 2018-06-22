/* eslint-disable */

var detect = require('./detect')
var versionCompare = require('./version_compare');
var Device = require('component/device');

var applinkBase = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.weibo.news&android_schema=';
var ulinkBase = 'https://m.news.weibo.com/app/download/index.html?scheme=';

function invoke(scheme, from) {

    var last = +Date.now();
    var apkFrom = from || 'normal';
    var $node = document.createElement('iframe');
    $node.style.display = 'none';
    $node.src = scheme;
    var body = document.body || document.getElementsByTagName('body')[0];
    body.appendChild($node);
    setTimeout(function () {
        body.removeChild($node);
        $node = null;
    }, 0);
    setTimeout(function () {
        if (Date.now() - last < 1600) {
            window.location.href = 'http://news.weibo.com/app/download/index.html?from=' + apkFrom;
        }
    }, 1500);
};

function showWeiXinTip() {
    var tip = document.createElement('div');
    tip.innerHTML = '<div class="wrapper">' +
        '<section class="main">' +
        '<div class="tips"></div>' +
        '<dl class="options">' +
        '<dt>' +
        '<span class="num">1</span> <span class="case">若您已安装微博新闻</span>' +
        '</dt>' +
        '<dd class="bb">' +
        '<div class="wizard">' +
        '<div class="arr"></div>' +
        '<div class="img"></div>' +
        '<p>第1步 点击该页右上角的“更多”</p>' +
        '<p>第2步 选择在浏览器中打开</p>' +
        '</div>' +
        '</dd>' +
        '<dt>' +
        '<span class="num">2</span> <span class="case">若您尚未安装微博新闻</span>' +
        '</dt>' +
        '<dd>' +
        '<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.weibo.news" class="btn">去Appstore下载</a>' +
        '</dd>' +
        '</dl>' +
        '</section>' +
        '<footer>' +
        '<div class="logo"></div>' +
        '<div class="copy">Copyright ? 2016 weibo Corporation. All rights reserved.</div>' +
        '</footer>' +
        '</div>';
    document.body.appendChild(tip);
    tip.addEventListener('click', function (e) {
        if (e.target.tagName !== 'A') {
            tip.style.display = 'none';
        }
    });
}

function shallowCopy(src) {
    var dst = {};
    for (var prop in src) {
        if (src.hasOwnProperty(prop)) {
            dst[prop] = src[prop];
        }
    }
    return dst;
}


var toShare = function (_data, _type, _from) {



    var data = _data;
    var pageType = _type;
    var from = _from;

    if (pageType === 6) { // 专题
        var jsondata = {
            tid: data.topicId
        }
    } else if (pageType === 0) {
        var jsondata = {
            nid: data.nid,
            title: data.title,
            url: data.url,
            site: data.site,
            type: data.type,
            abs: data.abs,
            display_type: data.display_type,
            display_url: data.display_url
        }
    } else if (pageType === 1) {
        var jsondata = {
            nid: data.nid,
            viewid: data.viewid
        }
    } else if (pageType === 2) {
        // location.href.split('?')[0]
        data.url = data.shareUrl || data.url;
        var tempInfo = shallowCopy(data);
        // 相关视频的数据是数组的，而落地页的不是数组
        if (!data instanceof Array) {
            tempInfo.imageurls = [];
            tempInfo.imageurls.push(data.imageurls);
        }

        var contentType = new Object();
        contentType.shortvideo = 1;
        tempInfo.content_type = contentType;
        var jsondata = tempInfo;
        if (Device.isIOS) {
            pageType = 5;
        }
    } else if (pageType === 3) {
        var jsondata = data;
    } else if (pageType === 9 || pageType === 10) {
        var jsondata = data;
    }

    var ua = navigator.userAgent;
    // alert(JSON.stringify(jsondata));

    share(JSON.stringify(jsondata), ua, pageType, from);
}

var share = function (jsonstr, ua, type, from) {
    var os = detect(ua);

    var pageType = type || 0;
    if (os.android) {
        var androidScheme = 'boxxxx://share?type=' + pageType + '&info=' + encodeURIComponent(jsonstr);
        if (os.isWechat || os.isQQ) {
            window.location.href = applinkBase + encodeURIComponent(androidScheme);
        } else {
            invoke(androidScheme, from);
        }
    } else if (os.ios) {
        var iosScheme = 'boxxxx://share?info=' + encodeURIComponent(jsonstr);
        jsonstr = JSON.parse(jsonstr);
        jsonstr.type = '' + pageType;
        jsonstr = JSON.stringify(jsonstr);
        var apkFrom = from || 'normal';
        if (versionCompare(os.version, '9.0') >= 0) {
            window.location.href = ulinkBase + encodeURIComponent(jsonstr) + '&from=' + apkFrom;
        }
        //  else if (os.isWechat) {
        //     showWeiXinTip();
        // } 
        else {
            invoke(iosScheme);
        }
    }
};


module.exports = {
    share: share,
    toShare: toShare
}