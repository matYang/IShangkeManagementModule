appControllers.controller('loginCtrl',
    ['$scope','Auth','app', function ($scope,Auth,app) {
        $scope.login = {
            autologin: true,
            username: '',
            password: ''
        };
        $scope.submit = function(){
            var data = angular.copy($scope.login);
            //todo login validate
            //error to info
            //success to redirect
            //user is the response data from backend
            Auth.login(data).then(function(){
                app.rootScope.global.user = data.username;
                $scope.$destroy();
                app.state.go('admin.home');
                console.log('success');
            },function(){
                console.log('failed');
            });


        }
    }]
);
