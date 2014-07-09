appControllers.controller('loginCtrl',
    ['$scope','app', function ($scope,app) {
        $scope.title = 'login page';
        $scope.user = {};
        $scope.login = function(user){
            //error to info
            //success to redirect
            app.rootScope.global.user = user;//user is the response data from backend
            app.checkUser();
            console.log(user)
            console.log(app.rootScope.global)

            app.state.go('home');
        }
    }]
);
