var cjapp = function(){

    var LPSUPPOT_API_PATH = "http://lponline_backend.evenhidata.com/activity_819";
    var LPHD_API_PATH = "http://lphd.evenhidata.com/api";

    //未关注的转到文章
    var NO_SUB_URL = "http://mp.weixin.qq.com/s?__biz=MjM5ODc2Nzc2NQ==&mid=2653601101&idx=1&sn=ebe4bc496bd2d01e51541dda0d575643&chksm=bd1ba0b78a6c29a1c69248c7c4e48fd8e3472a368fef6848e6cf68aa10c32f6eb657eec61cbc&mpshare=1&scene=1&srcid=1008n2eBqJmGVAFWIbEx0Q1b#rd";
    var GET_SCORE_URL= "http://mp.weixin.qq.com/s?__biz=MjM5ODc2Nzc2NQ==&mid=506116926&idx=1&sn=efc606766cad0fbc2a55a07c004c78c7#wechat_redirect";
    var GAP = 100;
    var HD_SCORE = 0;
    var SERVER_DOWN_WAIT = 30 * 1000; //ms
    var SERVER_DOWN_WAIT_REFRESH = 60; //s

    var pub = {};
    pub["cbs"] = [];

    var openid;
    var tel;
    var nickname;
    var score;
    var _hddata_jsondata;
    pub["get_openid"] = function(){ return openid;};
    pub["get_tel"]    = function(){ return tel;}
    pub["get_score"]    = function(){ return score;}
    pub["get_nickname"] = function(){ return nickname;}
    var timer;
    var timer2;

    //get tools from xtool
    var showTip = xtool.showTip;
    var log = xtool.showLog;



    pub["new_hddata"] = function(jsondata){
        jsonp(LPHD_API_PATH+"/new_hddata/hd0105","new_hddata","&jsondata="+jsondata);
    };

    pub["cbs"]["new_hddata"] = function (data) {
        callback(data);
        setTimeout(function(){
            if(data.error == 0){
                //log("提交成功！");
                setInputToStorage();
                $(".success-pop").css("display","block");
                $(".submiting").css("display","none");
                //$(".success2").css("display","block");
            }else{
                log("提交失败！");
                $(".submiting").css("display","none");
            }

        },GAP)
    }


    function callback(data){
        clearTimeout(timer);
        clearTimeout(timer2);
        console.log("[data:"+JSON.stringify(data)+"]");
        isClicked = false;
    }

    function jsonp(url,func,param_str){
        console.log("start:"+func);
        timer = setTimeout(function(){
            console.log("timeout:"+func);
            xtool.longLog("对不起 服务器好像有点忙 我们等它一会儿吧(<span id='logcd'></span>) ");
            timer2 = xtool.countDown($("#logcd"),SERVER_DOWN_WAIT_REFRESH,function(){
                window.location.reload();
            })


            //setTimeout(function(){
            //},30000)
        },SERVER_DOWN_WAIT);
        var JSONP = document.createElement("script");
        JSONP.type = "text/javascript";
        JSONP.async = "async";
        JSONP.src = url + "?callback=cjapp.cbs[\"" + func +"\"]" + param_str;
        document.getElementsByTagName("head")[0].appendChild(JSONP);
    }


    return pub;

}();
