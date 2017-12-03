$(function () {
    $('footer a').on('tap',function () {
        $("footer a.active").removeClass('active');
        $(this).addClass('active');
    })
})
function getKey(str) {
    str=str.substring(1);
    var arr=str.split("&");
    // 最后返回的对象
    var obj={};
    for(var i=0;i<arr.length;i++){
        var element=arr[i];
        var items=element.split('=');
        obj[items[0]]=items[1];
    }
    return obj;
}