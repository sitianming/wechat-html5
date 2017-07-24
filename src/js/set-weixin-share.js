// 微信分享设置
import wx from "weixin-js-sdk";

var track = /trackingid=[\w]+/.exec(location.href);
if(track){
    track = track[0];
}else{
    track = "trackingid=notrack";
}
var wx_share_link = location.href.split("?")[0] + "?" + track;
var wx_share_img = "http://7xormj.com1.z0.glb.clouddn.com/oneday-share.jpg"; //使用带http的链接
var wx_share_timeline_title = "分享到朋友圈的标题，15字以内";
var wx_share_message_title = "分享给朋友的标题，字以内";
var wx_share_message_desc = "分享给朋友的描述，字以内";

// todo trackingid的bug
//生成微信分享信息
var myurl = encodeURIComponent(location.href);
var JSONP = document.createElement("script");
JSONP.type = "text/javascript";
JSONP.async = "async";
JSONP.src = "http://wxpanel.evenhidata.com/api/jsshare/4?url=" + myurl + "&callback=" + "share_callback";
document.getElementsByTagName("head")[0].appendChild(JSONP);

window.share_callback = function(data) {
    console.log('callback');
    wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    });
};
wx.ready(function() {
    wx.checkJsApi({
        jsApiList: [
            'onMenuShareTimeline', 'onMenuShareAppMessage'
        ],
        success: function(res) {}
    });

    wx.onMenuShareTimeline({
        title: wx_share_timeline_title,
        link: wx_share_link,
        imgUrl: wx_share_img,
        success: function() {
            //分享成功
        },
        cancel: function() {}
    });

    wx.onMenuShareAppMessage({
        title: wx_share_message_title,
        desc: wx_share_message_desc,
        link: wx_share_link,
        imgUrl: wx_share_img,
        type: 'link',
        success: function() {
            //分享成功
        },
        cancel: function() {}
    });
});


//  根据不同条件，设置不同的分享标题，描述
const setNewShare = function(){
    // todo:未完成

    wx.onMenuShareTimeline({
        title: wx_share_timeline_title,
        link: wx_share_link,
        imgUrl: wx_share_img,
        success: function() {
            //分享成功
        },
        cancel: function() {}
    });

    wx.onMenuShareAppMessage({
        title: wx_share_message_title,
        desc: wx_share_message_desc,
        link: wx_share_link,
        imgUrl: wx_share_img,
        type: 'link',
        success: function() {
            //分享成功
        },
        cancel: function() {}
    });
};

export default setNewShare;
