$(function () {
    mui.init({
        pullRefresh: {
            container: ".search-container", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: true, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    setTimeout(function () {
                        mui('.search-container').pullRefresh().endPulldownToRefresh();
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
                        mui('.search-container').pullRefresh().endPullupToRefresh();
                    }, 1000);
                }
            }
        } 
    });

    var inputVal = getKey(location.search).key;
    $('.search-bar input').val(inputVal);
    // 初次刷新页面
    var pa = {
        "proName": inputVal,
        "page": 1,
        "pagesize": 20
    }
    getData(pa);
    // 搜索按钮
    $('.search-bar .mui-btn-blue').on('tap', function () {
        pa = {
            "proName": $('.search-bar input').val(),
            "page": 1,
            "pagesize": 20
        }
        getData(pa);
    })
    //   排序按钮
    $('.search-filter a').on('tap', function () {
        // 箭头方向判断
        if ($(this).hasClass('active')) {
            $(this).children('.mui-icon').toggleClass('mui-icon-arrowdown mui-icon-arrowup');
        }
        $(this).siblings().removeClass('active').children(".mui-icon").removeClass('mui-icon-arrowup').addClass('mui-icon-arrowdown');
        $(this).addClass('active');
        var type = $(this).data('type');
        var typedir = $(this).children('.mui-icon').hasClass('mui-icon-arrowdown') ? 2 : 1;
        pa = {
            "proName": $('.search-bar input').val(),
            "page": 1,
            "pagesize": 20,
        };
        pa[type]=typedir;
        getData(pa);
    })
})

function getData(pa) {
    $.ajax({
        type: "get",
        url: '/product/queryProduct',
        data: pa,
        success: function (result) {
            console.log(result);
            var html = template('productlist', result);
            $('.search_lists ul').html(html);
        }
    })
}