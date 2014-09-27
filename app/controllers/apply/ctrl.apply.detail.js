'use strict';
appControllers.controller('applyDetailCtrl',
    ['$scope', 'app', function ($scope, app) {
        var restAPI = app.restAPI.apply;
        var id = app.state.params.id;

        var doRefresh = $scope.doRefresh = function () {

            restAPI.get({ID: id}, function (apply) {
                $scope.a = apply;
            }, function () {
                //todo error
            });
        };
        $scope.doRefresh();
    }]
);
