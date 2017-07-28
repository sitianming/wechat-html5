//need jquery
var xtool = function(){

    var pub = {};

    pub['GetQueryString'] = function(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    pub['base62'] = function (url){
        var base62str='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var len=url.length;
        var i=0;
        var tmpArr=[];
        while(i<len){
            var val=url.substr(i,1);
            var ascii=val.charCodeAt();
            var ejz=parseInt(ascii).toString(2);
            for(var j=0;j<=(8-ejz.length);j++){
                ejz='0'+ejz;
            }
            tmpArr.push(ejz.substr(0,4));
            tmpArr.push(ejz.substr(4,4));
            ++i;
        }
        var t=0;
        var result='';
        var len=tmpArr.length;
        for(var x=0;x<len;x++){
            var temp=(parseInt(tmpArr[x],2))*4+t%2;
            var base=base62str.substr(temp,1);
            result=result+base;
            ++t;
        }
        return result;
    };

    pub["getCookie"] = function (name) { 
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]); 
        else 
            return null; 
    } 

    pub["delCookie"] = function (name) { 
        var exp = new Date(); 
        exp.setTime(exp.getTime() - 1); 
        var cval=pub["getCookie"](name); 
        if(cval!=null) 
            document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
    } 

    pub["setCookie"] = function (name,value,time) { 
        var strsec = getsec(time); 
        var exp = new Date(); 
        exp.setTime(exp.getTime() + strsec*1); 
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
    } 

    var getsec = function(str) { 
        alert(str); 
        var str1=str.substring(1,str.length)*1; 
        var str2=str.substring(0,1); 
        if (str2=="s")
        { 
            return str1*1000; 
        }
        else if (str2=="h")
        { 
            return str1*60*60*1000; 
        }
        else if (str2=="d")
        { 
            return str1*24*60*60*1000; 
        } 
    } 
    pub["getsec"] = getsec;

    //这是有设定过期时间的使用示例： 
    //s20是代表20秒 
    //h是指小时，如12小时则是：h12 
    //d是天数，30天则：d30 
    
        
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    $(function(){
        var d = '<div class="mids_tip" id="show-tip"><div class="bg"></div><h3></h3><button style="color:red">返回</button></div>';
        $("body").append(d);
        $("#show-tip button").click(function(){
            $("#show-tip").css("display","none");
        });
    })

    pub["showTip"] = function(tip){
        //暂时使用alert
        //alert(tip);
        $wrap = $("#show-tip");
        $tip = $wrap.find("h3");
        $tip.html(tip);
        $wrap.css("display","block");
    }

    var timestamp = function(){
        return new Date().getTime();
    };
    pub["timestamp"] = timestamp;

    $(function(){
        var d = '<div class="mids_log" id="show-log"></div>';
        $("body").append(d);
    })
    pub["showLog"] = function(log,show_time){
        var show_time = arguments[1] ? arguments[1] : 500;//设置默认时间 500ms
        $wrap = $("#show-log");
        $wrap.append("<li>"+log+"</li>");
        $log = $("#show-log > li");
        setTimeout(function(){
            $log.fadeOut(1500);
        },show_time);
    }
    pub["longLog"] = function(log){
        $wrap = $("#show-log");
        $wrap.append("<li>"+log+"</li>");
    }

    pub["open_black"] = function(){
        var d = '<div id="all_black" style="display:none"></div>';
        $("body").append(d);
        $("#all_black").fadeIn(1500);
    }

    pub["open_black_here"] = function(){
        var d = '<div id="all_black"></div>';
        document.write(d);
    }


    pub["close_black"] = function(){
        $("#all_black").fadeOut(1500,function(){ 
            $("#all_black").remove(); 
        });
    }

    pub["countDown"] = function($dom,time,callback){
        $dom.html(time+'s');
        var timmer = setInterval(function(){
            time -= 1;
            if(time<=0){
                clearInterval(timmer);
                callback && callback();
            }else{
                $dom.html(time+'s');
            }
        },1000);
    }

    return pub;

}();
