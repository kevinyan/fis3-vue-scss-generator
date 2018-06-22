/**
 *
 * var utils = require('lib/utils');
 *
 * // 活动倒计时
 *          startTime: 倒计时开始时间
 *          endTime: 倒计时结束时间
 * utils.countDown({
 *     startTime: data.timestamp * 1000,
 *     endTime: data.data.activity.game_start_time
 * }, function (res) {
 *     switch (res.code + '') {
 *         case '0':
 *             console.log('返回格式： 07:07:07');
 *             self.countDown = res.data;
 *             break;
 *         case '1':
 *             console.log('倒计时已结束');
 *             break;
 *         case '2':
 *             console.log('本地时间已修改，请重新拉取服务器时间进行校验');
 *             break;
 *     }
 * });
 *
 */

Date.prototype.format = function (fmt) {
    var o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S': this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
                ? (o[k])
                : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
};
var utils = {
    // 毫秒转换成时间格式，注：此方法与毫秒准换成日期时间方法不是一个
    msToTime: function (ms) {
        var ss = parseInt(+ms / 1000, 10); // 秒
        var mm = 0; // 分
        var hh = 0; // 小时
        if (ss > 60) {
            mm = parseInt(ss / 60, 10);
            ss = parseInt(ss % 60, 10);
        }
        if (mm > 60) {
            hh = parseInt(mm / 60, 10);
            mm = parseInt(mm % 60, 10);
        }
        var result = ('00' + parseInt(ss, 10)).slice(-2);
        if (mm > 0) {
            result = ('00' + parseInt(mm, 10)).slice(-2) + ':' + result;
        } else {
            result = '00:' + result;
        }
        if (hh > 0) {
            result = ('00' + parseInt(hh, 10)).slice(-2) + ':' + result;
        }
        else {
            result = '00:' + result;
        }
        return result;
    },
    // type格式: yyyy-MM-dd hh:mm:ss.S
    formateMsToDateTime: function (ms, type) {
        return (new Date(ms)).format(type);
    },
    intervalId: null,
    countDown: function (param, callback) {
        var lastTimes = param.startTime;
        var diff = param.startTime - (new Date()).getTime();
        var endTime = param.endTime;
        var self = this;
        var goCount = function () {
            var nowTimes = (new Date()).getTime() + diff;
            // 误差大于800毫秒重新校准
            if (Math.abs(lastTimes - nowTimes) > 1800) {
                callback({
                    code: 2,
                    msg: '本地时间已修改，请重新校准时间'
                });
                return false;
            }
            lastTimes = nowTimes;
            var showTime = endTime - nowTimes;
            if (showTime < 0) {
                callback({
                    code: 1,
                    msg: '倒计时结束'
                });
                return false;
            }
            callback({
                code: 0,
                msg: '成功',
                data: self.msToTime(showTime)
            });
            self.intervalId && clearInterval(self.intervalId);
            self.intervalId = setInterval(function () {
                goCount();
            }, 1000);
        };
        return goCount();
    }
};
module.exports = utils;












