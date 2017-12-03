$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // 首先是页面渲染
    // 一级端口获取
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        data: {},
        success: function (data) {
            var html = template('firstcat', data);
            $('.cate_nav ul').html(html);
            // 开始页面的二级端口渲染
            getSecondCatData({
                id: data.rows[0].id
            }, function (data2) {
                var html2 = template('secondcat', data2);
                $('.cate_content ul').html(html2);
            })
        }
    })
    // 事件委托实现点击渲染
    $('.cate_nav ul').on('tap', 'a', function () {
        $('.cate_nav li.active').removeClass('active');
        $(this).parent().addClass('active');
        var pa={id:this.dataset.id};
        getSecondCatData(pa,function (data2) {
            var html2=template('secondcat',data2);
            console.log(html2);
            $('.cate_content ul').html(html2);
        })
    })
})
// 渲染页面二级菜单
function getSecondCatData(pa, callback) {
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategory',
        data: pa,
        success: function (data) {
            callback && callback(data);
        }
    })
}