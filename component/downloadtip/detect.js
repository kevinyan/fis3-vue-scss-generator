/**
 * @file Describe the file
 * 检测组件
 * 探测ua，已经集成到zepto，**不需要**单独引用，直接用Zepto.os
 * Zepto.os里面没有微信微博的判断方法，如果使用，请单独引入detect模块
 * @memberOf Bdbox.utils
 * @name detect
 * @function
 * @param  {String} ua userAgent字符串
 * @return {Object} obj  返回对象
 * @example
 * if(Bdbox.os.android){alert(Bdbox.os.version);}
 * if(Bdbox.os.isWechat){
 *     alert('微信');
 * }
 * if(Bdbox.os.isWeibo){
 *     alert('微博');
 * }
 * //部分userAgent可能是后注入的，所以需要重新获取
 * var os = Bdbox.utils.detect();
 * if(os.isWechat){
 *     alert('微信');
 * }
 * //还可以传入一个userAgent
 * var os = Bdbox.utils.detect(userAgent);
 * console.log(os);
 *
 * @author wangyongqing01
 * $Id: detect.js 286951 2016-03-17 09:28:35Z wangyongqing01 $
 */




module.exports = function (ua) {
    var os = {
        name: 'unknown',
        version: 0
    };
    // 赋值
    if (this !== window && !this.os) {
        this.os = os;
    }
    ua = ua;
    // 增加微信和微博判断
    var iobj = {
        Weibo: /weibo/i,
        Wechat: /micromessenger\//i,
        QQ: /QQ\//
    };
    for (var i in iobj) {
        if (iobj.hasOwnProperty(i)) {
            os['is' + i] = iobj[i].test(ua);
        }
    }
    os.isUC = ua.match(/UC/) || window.ucweb || window.ucbrowser;
    var win10 = ua.match(/Windows Phone ([\d.]+)/);
    if (win10) {
        os.win10 = true;
        os.version = win10[1];
        os.name = 'win10';
        return os;
    }

    var android = ua.match(/(Android);?\s+([\d.]+)?/);
    if (android) {
        os.android = true;
        os.version = android[2];
        os.name = 'android';
        return os;
    }

    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    if (iphone && !ipod) {
        os.ios = os.iphone = true;
        os.version = iphone[2].replace(/_/g, '.');
        os.name = 'ios';
        return os;
    }
    if (ipad) {
        os.ios = os.ipad = true;
        os.name = 'ios';
        os.version = ipad[2].replace(/_/g, '.');
        return os;
    }
    if (ipod) {
        os.name = 'ios';
        os.ios = os.ipod = true;
        os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        return os;
    }

    return os;
};