$(function () {
    //渲染当前页面
    var arr = getHistoryData();
    var html = template('firstshow', {
        "lists": arr
    });
    $('.search-list').html(html);
    // 点击搜索历史按钮刷新,将当前条置顶
    $(document).on('tap', '.sl_contents a', function () {
        var value = $.trim($(this).html());
        var arr = getHistoryData();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == value) {
                arr.splice(i, 1);
                arr.push(value);
                break;
            }
        }
        localStorage.setItem('searchdata', JSON.stringify(arr));
        location.href = 'searchList.html?key=' + value;
    })

    // 搜索按钮,存储当前搜索的内容
    $('.search-bar .mui-btn-blue').on('tap', function () {
        // 存储到本地
        var value = $('.search-bar input').val();
        var arr = getHistoryData();
        // 判断是否重复
        for (var i = 0; i < arr.length; i++) {
            var element = arr[i];
            if (value == element) {
                arr.splice(i, 1);
            }
        }
        // 判断是否超过长度10
        if (arr.length >= 10) {
            arr.splice(0, 1);
        }
        arr.push(value);
        localStorage.setItem('searchdata', JSON.stringify(arr))
        // 跳转页面
        location.href = '/m/searchList.html?key=' + value;
    })
    // 点击删除单条操作
    $(document).on('tap', ' .fa-close', function () {
        var id = $(this).data("id");
        var arr = getHistoryData();
        arr.splice(id, 1);
        localStorage.setItem('searchdata', JSON.stringify(arr))
        var html = template('firstshow', {
            "lists": arr
        });
        $('.search-list').html(html);
    })
    // 清空记录按钮
    $(document).on('tap', '.sl-clearall', function () {
        var arr = [];
        localStorage.setItem('searchdata', JSON.stringify(arr))
        var html = template('firstshow', {
            "lists": arr
        });
        $('.search-list').html(html);
        mui - toast("清空成功");
    })
})

function getHistoryData() {
    var data = localStorage.getItem('searchdata');
    // 注意:得到的data是字符串形式的数组
    var arr = eval(data || "[]");
    return arr;
}