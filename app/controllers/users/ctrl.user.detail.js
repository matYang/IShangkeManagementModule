'use strict';
appControllers.controller('userDetailCtrl',
    ['$scope', 'restAPI', 'app', function ($scope, restAPI, app) {
        var restAPI = restAPI.users;
        var id = app.state.params.id;

        var doRefresh = $scope.doRefresh = function () {

            restAPI.get({ID: id}, function (user) {
                $scope.u = user;
            }, function () {
                //error
            });
        };
        $scope.doRefresh();
    }]
);
