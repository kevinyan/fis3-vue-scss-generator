/**
 * @file Describe the file
 * 弹层组件

** step1:
var dialog = require('widget/dialog');

** step2
{
    template: __inline('topic.html'),
    components: {
        'dialog-component': dialog
    }
}

** step3
    <dialog-component
        :dia-title="diaName"
        :dia-content="diaContent"
        :dia-footer="diaFooter"
        :dia-isshow="showflag">
        :changeDiaFlag="changeShowFlag"
    </dialog-component>

** step4
    here

***** changeDiaFlag ****** 控制父子组件交互
 *
 */




var api = require('component/api');
var Vue = require('lib/vue');
var Device = require('component/device');

var dialog = Vue.extend({
    template: __inline('dialog.html'),
    props: ['diaTitle', 'diaContent', 'diaFooter', 'diaShowflag'],
    data: function () {
        return {
            showflag: this.diaShowflag
        };
    },
    methods: {
        'doDia': function (type) {
            var self = this;
            if (type === 'download') {
                if (Device.IsAndroid) {
                    self.download('android');
                } else {
                    self.download('ios');
                }
            } else if (type === 'close') {
                self.close();
            }
        },
        'close': function () {
            this.$emit('changeDiaFlag', false);
        },
        'download': function (param) {
            // ios事件绑定
            var url = 'https://itunes.apple.com/us/app/bai-du-xin-wen/id482820737?mt=8';
            if (param === 'android') {
                url = 'https://downpack.weibo.com/weibonews_AndroidPhone_1019026t.apk';
            }
            setTimeout(function () {
                location.href = url;
            }, 100);
        }
    },

    created: function () {

    }
});

module.exports = dialog;