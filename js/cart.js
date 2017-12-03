$(function () {
    init();
    getData();
    // 刷新页面
    $('.top_tool .fa-refresh').on('tap',
        getData);
    $(document).on('tap', '.mui-btn-blue', function () {
        var li = this.parentNode.parentNode;
        var editData = li.dataset;
        var html = template('editcart', editData)
        mui.confirm(html.replace(/\n/g, ""), '尺码选择', ['修改', '取消'], function (e) {
            if (e.index == 0) {
                var updateData = {
                    id: $('.product_num').data('id'),
                    num: $('.mui-input-numbox').val(),
                    size: $('.PR-sizes.active').html().trim()
                }
                // 修改按钮updata请求
                $.ajax({
                    type: 'post',
                    url: '/cart/updateCart',
                    data: updateData,
                    success: function (data) {
                        if (data.success) {
                            // console.log($(li).find('.cart_size'));
                            $(li).find('.cart_size').html('鞋码:' + updateData.size);
                            $(li).find('.cart_num').html('x' + updateData.num + '双');
                            $(li).find('.check').attr('data-num', updateData.num);
                            $(li).attr('data-num', updateData.num).attr('data-size', updateData.size);
                            calPrice();
                            mui.toast('修改成功');
                            mui.swipeoutClose(li);
                        }
                    }
                })
            } else {

            }
        })
        init();
        mui('.mui-numbox').numbox();
        $(document).on('tap', '.PR-sizes', function () {
            $('.PR-sizes.active').removeClass('active');
            $(this).addClass('active');
        })
    })
    // 点击计算价格
    $(document).on('change','.check',function () { 
        calPrice();
     })
    //  点击删除
    $(document).on('tap', '. mui-btn-red', function () {
        var li=this.parentNode.parentNode;
        li.removeNode.removeChild(li);
        $.ajax({
            type:get,
            url: '/cart/deleteCart',

        })
    })
})
// 获取数据并渲染页面
function getData() {
    $.ajax({
        type: 'GET',
        url: '/cart/queryCart',
        data: {},
        success: function (data) {
            if (data.error) {
                mui.toast("请先登录");
                location.href = '/m/login.html?returnURL=' + location.href;
            }
            var html = template('datashow', {
                items: data
            });
            $('.cart-container .mui-table-view').html(html);
            calPrice();
        }
    })
}
// 初始化加载
function init() {
    mui.init({
        pullRefresh: {
            container: ".cart-container", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: true, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    setTimeout(function () {
                        mui('.cart-container').pullRefresh().endPulldownToRefresh();
                    }, 1000);
                }
            },
            up: {
                height: 50,
                auto: false,
                contentdown: "下拉可以加载",
                contentover: "释放立即加载",
                contentrefresh: "正在加载...",
                callback: function () {
                    setTimeout(function () {
                        mui('.cart-container').pullRefresh().endPullupToRefresh();
                    }, 1000);
                }
            }
        }
    });
}
//  计算价格
function calPrice() {
    // [{price:499,num:20}]
    var total=0;
    // 被选中的多选框
    var chks=$('.check:checked')
    for (var i = 0; i < chks.length; i++) {
        var element = chks[i];
        total += element.dataset.price * element.dataset.num;
    }
    $('.price_result').html('订单总额：&yen;'+Math.round(total*100)/100);
    return total;
}