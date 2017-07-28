// 主js文件
import "./baidu.js";
//import openid from  "../lib/oauth.min.js";   //前端主动跳转方式获取用户的openid，需要时引入
import "../css/main.css";
import "../lib/wechat-mobile-screen-adapt-750.js";
import "./set-weixin-share.js";
import FastClick from "../lib/third/fastclick.min.js";
import $ from '../lib/third/jquery.min.js';
import formRegs from '../lib/form.min.js';
import ImagePreloader from 'image-preloader';


// 主代码写在这里
$(function(){
    FastClick.attach(document.body);

    console.log("main.js");

    var xx = formRegs.email.test("22@qq.com");
    console.log("xx",xx);

    //console.log("openid: ",openid);

    // 预加载图片示例
    var preloader = new ImagePreloader();
    var preloadImages = ["./images/logo.jpg"];
    preloadImages = Array.prototype.slice.call(document.getElementsByTagName('img')).concat(preloadImages);
    var loadedCount = 0;
    var $percent = $(".percent");

    preloader.onProgress = function(info) {
        var percent = Math.round(++loadedCount/preloadImages.length*100)+"%";
        $percent.html(percent);
        console.warn(percent);
        console.log('image with source %s is loaded with status %s', info.value.src, info.status);
    };


    preloader.preload(preloadImages)
        .then(function(status){
            console.log('images all loaded!', status);
            $("[data-background]").each(function(){
                $(this).addClass(this.dataset.background);
            });
            $(".loading").addClass("hide");
            $(".adapt-full-middle").removeClass("hide");
        });
});
