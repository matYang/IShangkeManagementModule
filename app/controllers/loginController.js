appControllers.controller('loginCtrl',
    ['$scope','app','$cookies', function ($scope,app,$cookies) {
        $scope.title = 'login page';
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
            app.rootScope.global.user = data.username;//user is the response data from backend
            app.checkUser();
            console.log(app.rootScope.global)

            $scope.$destroy();
            app.state.go('home');
        }
    }]
);
