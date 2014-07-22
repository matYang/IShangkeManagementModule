appControllers.controller('loginCtrl',
    //注入了authService.js中的Auth服务
    ['$scope','Auth','app', function ($scope,Auth,app) {
        $scope.login = {
            autologin: true,
            username: '',
            password: ''
        };
        $scope.submit = function(){
            var data = angular.copy($scope.login);
            //todo 需要验证输入的信息 使用w5c-validate 参考课程模板的创建
            Auth.login(data).then(function(){
                $scope.$destroy();
                console.log('login success');
                app.state.go('admin.home');
            },function(){
                console.log('login failed');
            });


        }
    }]
);
