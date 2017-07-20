var _ = window._;
var $ = window.$;
var add_dict = window.dict;


var function_lparea = function(){



    var onProvinceChange = function(){
        onAreaChange("province");

        var province_id=$("#s_province").val();
        var province = add_dict[province_id];
        redraw_city_selector(province_id,-1);
        if(province && parseInt(province.depth) === 2){
            //对于二层的地区数据 - 把default值改为0 冻结
            redraw_country_selector(-1,0);
        }else{
            redraw_country_selector(-1,-1);
        }

    };

    var onCityChange = function(){
        onAreaChange("city");

        //如果地区没有被冻结（有3层）
        if(parseInt($("#s_country").val()) !== 0){
            var city_id = $("#s_city").val();
            redraw_country_selector(city_id,-1);
        }

    };

    var onCountryChange = function(){
        onAreaChange("country");
    };

    var onAreaChange = function(sth){
        var val = $("#s_"+sth).val();

        var disp_dom = $("#s_"+sth+" option[value='"+val+"']");
        var display = "";
        if(disp_dom.text().length>4){
            display = disp_dom.text().substr(0,4)+"...";
        }else{
            display = disp_dom.text();
        }
        //console.log(sth+" val:"+val+" "+display);

        $("#"+sth).html(display);
        if(val>0){
            $("#"+sth).addClass("color-white");
        }else{
            $("#"+sth).removeClass("color-white");
        }
    };


    var redraw_province_selector = function(default_id){
        console.log("bbb:"+default_id);
        var options_str = "<option value=\"-1\">选择省份</option>";
        _.forEach(add_dict, function(value, key) {
            options_str += "<option value=\""+key+"\" ";
            options_str += ">"+value.ename+"</option>";
        });
        $("#s_province").html(options_str);
        $("#s_province").val(default_id);

        onProvinceChange();


    };



    var redraw_city_selector = function(province_id,default_id){
        var options_str = "<option value=\"-1\">选择城市</option>";
        if( add_dict[province_id] ){
            _.forEach(add_dict[province_id].info, function(value, key) {
                options_str += "<option value=\""+key+"\" ";
                options_str += ">"+value.ename+"</option>";
            });
        }
        $("#s_city").html(options_str);
        $("#s_city").val(default_id);
        onCityChange();
    };




    var redraw_country_selector = function(city_id,default_id){
        $("#s_country").attr("disabled",false);
        var options_str = "<option value=\"-1\">选择地区</option>";
        if(city_id > 0){
            var province_id = getProvinceIdByCityId(city_id);
            var city = add_dict[province_id].info[city_id];
            _.forEach(city.info, function(value, key) {
                options_str += "<option value=\""+key+"\" ";
                options_str += ">"+value.ename+"</option>";
            });
        }else if(parseInt(default_id) === 0 ){
            //冻结三层
            options_str = "<option value=\"0\">无需选择</option>";
            $("#s_country").attr("disabled",true);
        }
        $("#s_country").html(options_str);
        $("#s_country").val(default_id);
        onCountryChange();
    };


    var getProvinceIdByCityId = function(city_id){
        return parseInt(city_id/100)*100;
    };
    // var getCityIdByCountryId = function(country_id){
    //     var res = _.split(country_id,".",2);
    //     return res[0];
    // };

    // var getCountryById = function(country_id){
    //     var city_id = getCityIdByCountryId(country_id);
    //     var province_id = getProvinceIdByCityId(city_id);
    //     return add_dict[province_id].info[city_id].info[country_id];
    // };

    // var getCityById = function(city_id){
    //     var province_id = getProvinceIdByCityId(city_id);
    //     return add_dict[province_id].info[city_id];
    // };


    var init = function(){
        redraw_all(-1,-1,-1);
    };

    var redraw_all = function(province_id,city_id,country_id){

        redraw_province_selector(province_id);
        redraw_city_selector(province_id,city_id);
        redraw_country_selector(city_id,country_id);
    };

    return {
        init:init,
        redraw_all:redraw_all,
        onProvinceChange:onProvinceChange,
        onCityChange:onCityChange,
        onCountryChange:onCountryChange
    };


};

var lparea = function_lparea();
window.lparea = lparea;
