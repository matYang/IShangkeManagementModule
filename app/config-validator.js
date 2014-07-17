//////////////////////////////////
//config form validator messages//
//////////////////////////////////
/*
    [input name]:{
        required:"",
        email:"",
        minlength:"",
        maxlength:"",
        pattern:"",
    }
*/


angular.module('app').config(["w5cValidatorProvider", function (w5cValidatorProvider) {
    // 全局配置
    w5cValidatorProvider.config({
        blurTrig   : true,
        showError  : true,
        removeError: true
    });
    w5cValidatorProvider.setRules({
        email   : {
            required: "输入的邮箱地址不能为空",
            email   : "输入邮箱地址格式不正确"
        },
        username: {
            required: "输入的用户名不能为空",
            pattern : "用户名必须输入字母、数字、下划线,以字母开头"
        },
        password: {
            required : "密码不能为空",
            minlength: "密码长度不能小于{minlength}",
            maxlength: "密码长度不能大于{maxlength}"
        },
        number  : {
            required: "数字不能为空"
        }
    });
}]);