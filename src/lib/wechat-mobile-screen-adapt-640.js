/*
    设置viewport
 */

var $ = require("./third/jquery.min.js");

(function(){
    if(typeof($)===undefined){
        console.error("请先引入jquery");
    }
    //设置viewport缩放，设为宽度640px
    var phoneWidth = parseInt(window.screen.width);
    var phoneScale = phoneWidth / 640;
    var ua = navigator.userAgent;
    if (/Android (\d+\.\d+)/.test(ua)) {
        var version = parseFloat(RegExp.$1);
        if (version > 2.3) {
            document.write('<meta name="viewport" content="width=640, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
        } else {
            document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
        }
    } else {
        document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
    }

    //根据屏幕宽高，输出一套动态生成的css，开发者可以根据需要，使用其中的一部分
    var winHeight = $(window).height();
    var style = "";
    var fullMiddleStyle = ".adapt-full-middle{width:640px;height:1040px;position:relative;top:"+(winHeight-1040)/2+"px;}";
    var fullBodyStyle = ".full-body{height:"+winHeight+"px;position: relative;overflow: hidden;}";
    style = fullMiddleStyle + fullBodyStyle;
    document.write("<style>"+style+"</style>");
})();
