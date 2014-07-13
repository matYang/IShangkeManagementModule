appControllers.controller('loginCtrl',
    ['$scope','Auth','app', function ($scope,Auth,app) {
        $scope.login = {
            autologin: true,
            username: '',
            password: ''
        };
        $scope.submit = function(){
            var data = angular.copy($scope.login);
            //todo form validate and result to info
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
