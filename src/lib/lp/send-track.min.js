// 记录当前的用户访问，发送到 LP 服务器
(function() {
   function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r !== null) return unescape(r[2]); return null; //返回参数值
        }
        var trackingid = getUrlParam('trackingid');
        var from = getUrlParam('from');
        // var activity = getUrlParam('activity');//活动参数名，如fsp
        var activity = "lp北海道马拉松";
        // var openid = getUrlParam('openid');
        var JSONP=document.createElement("script");
        JSONP.type="text/javascript";
        JSONP.src="http://lponline_backend.evenhidata.com/getinteracts?trackingid="+trackingid+"&from="+from+"&activity="+activity+"&openid="+oauth.openid;
        document.getElementsByTagName("head")[0].appendChild(JSONP);
})();
