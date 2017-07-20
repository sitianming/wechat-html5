var $year_lists  = $("#dropdown-year .options");
var range = 70-15;
var temp = new Date();
var year_now = temp.getFullYear()-15;
var li_html = "";
for(var i=year_now-range;i<=year_now;i++){
    li_html += "<li>"+i+"</li>";
}
$year_lists.html(li_html);

var $optionsAll = $(".options");
$(".dropdown-wrap").click(function(){
    var $options = $(this).find(".options");
    //关闭所有选项
    $optionsAll.css("display","none");
    $options.css("display","block");
});
$(".options li").click(function(){
    var val = $(this).html();
    $options = $(this).parent();
    var $span = $options.parent().find("span");
    $span.addClass("color-white");
    $span.css("opacity",1);
    if($span[0].id == "type"){
        var num = $(this).data("num");
        $("#type-input").val(num);
        if(num==1){
            $span.html("10月15日训练指导｜跑步...");
        }else if(num==2){
            $span.html("10月16日实战训练｜赛前...");
        }else if(num==3){
            $span.html("10月15、16两天两场我都...");
        }
    }else if($span[0].id == "speed"){
        var num = $(this).data("num");
        $("#speed-input").val(num);
        $span.html(val);
    }else{
        $span.html(val);
    }
    setTimeout(function(){
        $options.css("display","none");
    },300);
});

$("#province").on("change",function(){
    console.log("change province");
    if( 0 == $(this).val()){
        $(this).removeClass("color-white");
    }else{
        $(this).addClass("color-white");
    }
    set_city(this,$("#city")[0]);
});

$("#city").on("change",function(){
    if( 0 == $(this).val()){
        $(this).removeClass("color-white");
    }else{
        $(this).addClass("color-white");
    }
});

$(".pop-size-tip").click(function(){
    $optionsAll.css("display","none");
    $(".tips").css("display","block");
});

$(".tips").click(function(){
    $(this).css("display","none");
});

$(".close-btn").click(function(){
    try{
        wx.closeWindow();
    }catch(e){
        
    }
    $(this).parents(".success2").css("display","none");
});


var showTip = xtool.showTip;
$submit_p =  $(".submit-btn > p");
$("#submit").click(function(){
    //关闭所有选项
    $optionsAll.css("display","none");
//    if($submit_p.html()!=="确认提交"){
//        log("提交中，不可重复提交！");
//        return;
//    }
    var name = $("#name").val();
    var sex = $("#sex").html();
    var year = $("#year").html();
    var month = $("#month").html();
    var province = $("#province").val();
    var city = $("#city").val();
    var address = $("#address").val(); //详细地址
    var type = $("#type-input").val();
    var size = $("#size").html();
    var speed = $("#speed-input").val();//速度
    //验证
    if(!name){showTip("请填写姓名！");return;};
    if(sex=="请选择"){showTip("请填写性别！");return;};
    if(year=="请选择"){showTip("请填写年份！");return;};
    if(month=="请选择"){showTip("请填写月份！");return;};
    if(province==0){showTip("请填写省份");return;};
    if(city==0){showTip("请填写城市");return;};
    if(!address){showTip("请填写详细地址！");return;};
    if(type==0){showTip("请填写报名参加");return;};
    if(size=="请选择"){showTip("请填写申请尺码");return;};
    if(speed==0){showTip("请填写10公里平均配速");return;};

    //var entertime = xtool.xtool.Entertime;
    //var submittime = (new Date()).Format("yyyy-MM-dd hh:mm:ss");


    
    //状态改成提交中
    //$submit_p.html("提交中...");

    data = {
        openid:cjapp.get_openid(),
        score:cjapp.get_score(),
        phone:cjapp.get_tel(),
        nickname:cjapp.get_nickname(),
//        openid:"openid",
//        score:"score",
//        phone:"phone",
//        nickname:"nickname",
        name:name,
        sex:sex,
        year:year,
        month:month,
        province:province,
        city:city,
        address:address,
        type:type,
        size:size,
        speed:speed
    };
    console.log(data);
    cjapp.new_hddata(JSON.stringify(data));

    //$submit_p.html("确认提交");
    return;

});

$("#get-code-btn").on("touchstart",function(){
    if($("#get-code-btn").html() == "获取验证码"){
        var new_phone = $("#new_phone").val();
        if(new_phone[0]!=1 || new_phone.length!=11){
            showTip("请输入正确手机号");
            return;
        }
        //get tel code with jsonp
        cjapp.get_telcode(new_phone);
        xtool.countDown($("#get-code-btn"),60,function(){
            $("#get-code-btn").html("获取验证码"); 
        });
    }
});


$("#check-code-btn").click(function(){
      var new_phone = $("#new_phone").val();
      var code = $("#code").val();
      if( code.length!=4){
          showTip("请输入正确验证码");
          return;
      }
      cjapp.check_telcode(new_phone,code);
});

