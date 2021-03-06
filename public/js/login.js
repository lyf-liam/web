var errArray = [
    "用户名不能为空",
    "用户密码不能为空"
]

var accessToLogin = [0, 0]

$(document).ready(() => {
    $('#username').blur(function(){
        let userName = $(this).val();
        if (userName == "") {
            $('#usernameMsg').html(errArray[0]).css('color', 'red');
            $(this).removeClass('is-valid').addClass('is-invalid');
            accessToLogin[0] = 0;
        } else {
            $('#usernameMsg').html('&nbsp');
            $(this).removeClass('is-invalid').addClass('is-valid');
            accessToLogin[0] = 1;
        }
    })

    $('#password').blur(function() {
        let pwd = $(this).val();
        if (pwd == "") {
            $('#passwordMsg').html(errArray[1]).css('color', 'red');
            $(this).removeClass('is-valid').addClass('is-invalid');
            accessToLogin[1] = 0;
        } else {
            $('#passwordMsg').html('&nbsp');
            $(this).removeClass('is-invalid').addClass('is-valid');
            accessToLogin[1] = 1;
        }
    })

    $('#loginBtn').on('click', function(event) {
        event.preventDefault();
        console.log(accessToLogin[0]);
        console.log(accessToLogin[1]);
        if (accessToLogin[0] && accessToLogin[1]) {
            let info = $('#loginForm').serialize()
            console.log(info)
            $.ajax({
                url: '/login',
                method: 'post',
                data: info,
                success: function(res) {
                    if (res.code == 200) {
                        alert(res.msg);
                        if (res.role == 0) {
                            // 去用户端
                            console.log("user");
                            window.location.href = `/reportAnalyse?id=${res.id}`
                        } else if (res.role == 1) {
                            // 去管理员
                            console.log("admain")
                            window.location.href = `/administor?id=${res.id}`
                        } else {
                            alert("系统异常");
                        }
                    } else {
                        alert(res.msg);
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            })
        }
    })

    $('#registerBtn').on('click', function(event) {
        event.preventDefault();
        window.location.href = "/signup";
    })


})