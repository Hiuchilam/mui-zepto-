$(function () {
    // 密码可视
    $(".log-field .mui-icon-eye").on('tap', function () {
        $(".log-field .mui-input-password").attr('type') == 'text' ? $(".log-field .mui-input-password").attr('type') == 'password' : $(".log-field .mui-input-password").attr('type') = 'text';
    })
    //   判断输入是否为空
    $('.mui-btn-primary').on('tap', function () {
        if ($.trim($('.mui-input-clear').val()) == '') {
            mui.toast('请输入用户名');
            return false;
        } else if ($.trim($('.mui-input-password').val()) == '') {
            mui.toast('请输入密码');
            return false;
        }
        var pa = {
            'username': $('.mui-input-clear').val(),
            'password': $('.mui-input-password').val()
        };
        $.ajax({
            type: 'post',
            url: '/user/login',
            data: pa,
            success: function (data) {
                console.log(data);
                if (data.error) {
                    mui.toast(data.message);
                } else if (data.success) {
                    if (location.search && location.search.indexOf("?returnURL") >= 0){
                        var url=location.search.replace('?returnURL=','');
                        location.href=url;
                    }
                }
            }
        })
    })
})