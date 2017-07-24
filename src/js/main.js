// 主js文件
import "./baidu.js";
import openid from  "../lib/oauth.min.js";   //前端主动跳转方式获取用户的openid，需要时引入
// import "../css/main.css";
import "../lib/wechat-mobile-screen-adapt-750.js";
import "./set-weixin-share.js";
import FastClick from "../lib/third/fastclick.min.js";
import $ from '../lib/third/jquery.min.js';

// 主代码写在这里
$(function(){
    FastClick.attach(document.body);
    console.log("main.js");
    console.log("openid: ",openid);
});
