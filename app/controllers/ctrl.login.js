appControllers.controller('loginCtrl',
    //注入了authService.js中的Auth服务
    ['$scope','Auth','app', function ($scope,Auth,app) {
        $scope.login = {
            remember: true,
            accountIdentifier: '',
            password: ''
        };
        $scope.submit = function(){
            var data = angular.copy($scope.login);
            //todo 需要验证输入的信息 使用w5c-validate 参考课程模板的创建
            Auth.login(data).then(function(user){
                app.toaster.pop('success','登录成功','欢迎你，'+user.name);
                app.state.go('main.home');
            },function(message){
                app.toaster.pop('error',message);
            });
        }
    }]
);
