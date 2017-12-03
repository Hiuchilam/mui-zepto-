$(function () {

    var id = getKey(location.search).productid;
    // 初始化
    getData({
        "id": id
    });
    mui.init({
        pullRefresh: {
            container: ".scroll-container", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: false, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    getData({
                        "id": id
                    });
                    setTimeout(function () {
                        mui('.scroll-container').pullRefresh().endPulldownToRefresh();
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
                    getData({
                        "id": id
                    });
                    setTimeout(function () {
                        mui('.scroll-container').pullRefresh().endPullupToRefresh();
                    }, 1000);
                }
            }
        }
    });
    // 选尺码
    $(document).on('tap', '.PR-sizes', function () {
        $('.PR-sizes.active').removeClass('active');
        $(this).addClass('active');
    })
    // 加入购物车
    $('.mui-btn-danger').on('tap', function () {
        var size = $('.PR-sizes.active').text();
        var num = $('.mui-input-numbox').val();
        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data: { 'size': size, 'num': num,'productId':id},
            success:function (data) { 
                console.log(data);
                if(data.error){
                    mui.toast('请先登录');
                    location.href='/m/login.html?returnURL='+location.href;
                }else if(data.success){
                    mui.confirm('添加购物车成功,是否查看?', '操作提示', ['是','否'],function (e) {
                        if (e.index == 0) {
                            location.href='/m/cart.html';
                        } else {
                            mui.toast('爱看不看');
                        }
                    })
                }
             }
        })
    })
})

function getData(pa) {
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: pa,
        success: function (data) {
            var html = template('productPage', data);
            $('.mui-scroll').html(html);
            initrun();
        }
    })
}

function initrun() {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
    mui('.mui-numbox').numbox()
}