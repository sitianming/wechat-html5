/*
    表单相关的js
*/

// 表单验证
var $ = window.$;
$(".submit-btn").click(function(){
    var $wrap = $(".form-wrap");

    var name = $wrap.find("[name=name]").val().trim();
    var company = $wrap.find("[name=company]").val().trim();
    var job = $wrap.find("[name=job]").val().trim();
    var qq = $wrap.find("[name=qq]").val().trim();
    var email = $wrap.find("[name=email]").val().trim();
    var wechat = $wrap.find("[name=wechat]").val().trim();
    var phone = $wrap.find("[name=phone]").val().trim();


    //姓名，公司，QQ，电话
    if(name===""||company===""||qq===""||phone===""){
        console.warn("请填写完整信息");
        xtool.showTip("请填写完整信息");
        return;
    }
    if(!/^\d+$/.test(qq)){
        console.warn("请填写正确QQ");
        xtool.showTip("请填写正确QQ");
        return;
    }
    if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)){
           console.warn("请填写正确E-mail");
           xtool.showTip("请填写正确E-mail");
           return;
    }
    if(!/^1\d{10}$/.test(phone)){
        console.warn("请填写正确手机号");
        xtool.showTip("请填写正确手机号");
        return;
    }

    var data = {
        name:name,
        company:company,
        job:job,
        qq:qq,
        email:email,
        wechat:wechat,
        phone:phone
    };
    console.log("开始提交，data数据为：",data);
    $(".submiting").css("display","block");
    cjapp.new_hddata(JSON.stringify(data));
});


// 表单初始化，存储
(function(){
    var $ = window.$;
    window.initInputFromStorage = function (){
        //从localstorage里面初始化页面的所有input
        var $inputs = $("input");
        $inputs.each(function(index){
            var inputName = $(this).attr("name");
            var store = localStorage.getItem(inputName);
            if(store!==null){
                //存了值
                $(this).val(store);
            }
        });
    };
    window.setInputToStorage = function (){
        //从localstorage里面初始化页面的所有input
        console.log("setInputToStorage");
        var $inputs = $("input");
        $inputs.each(function(index){
            var inputName = $(this).attr("name");
            localStorage.setItem(inputName,$(this).val());
        });
    };
})();
