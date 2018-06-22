/* eslint-disable */
var html = "<div class='toast'><p>m</p></div>";
var $ = require("lib/zepto.js");
var body = document.body;
var tip;
var timeout;
var time = 3000;
var transitionValue = "opacity .8s ease";
var styles = {
    zIndex: 999999,
    position: "fixed",
    webkitTransition: transitionValue,
    transition: transitionValue,
    opacity: 0,
    color: "#fff",
    borderRadius: "15px",
    left: "50%",
    width: "80%",
    marginLeft: "-40%",
    fontSize: "14px",
    lineHeight: "1.3",
    textAlign: "center",
    background: "rgba(0,0,0,.6)",
    padding: "12px 14px"
};

module.exports = function (msg, expire, align) {
    var toast;
    msg = msg || "";
    expire = expire || time;

    Tip(msg, expire, align);
};

Tip.rm = remove;

function Tip(str, time, align) {

    if (tip) {
        clearTimeout(timeout);
        tip.find('p').html(str);
    } else {
        styles['textAlign'] = align || 'center';
        tip = $(html.replace("m", str))
            .css(styles)
            .css({
                // top: $(window).scrollTop() + 200
                top: 200
            })
            .appendTo(body);

        setTimeout(function () {
            tip.css({
                opacity: 1
            });
        }, 50);
    }
    timeout = clear(time);
}

function clear(time) {
    return setTimeout(remove, time);
}

function remove() {
    if (tip) {
        tip.remove();
        tip = null;
    }
}