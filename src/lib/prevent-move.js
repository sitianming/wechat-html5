// 禁止微信内页面被拖拽，露出底部
// 这段代码会禁用所有的浏览器默认事件，使用后，滚动条需要自己编写js
document.body.addEventListener("touchmove",function(e){
    e.preventDefault();
});
document.body.addEventListener("touchstart",function(e){
    e.preventDefault();
});
