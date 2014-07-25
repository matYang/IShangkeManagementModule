'use strict';
appControllers.controller('institutionsDetailCtrl',
    ['$scope','restAPI','$state', function ($scope,restAPI,$state) {
        var Institutions = restAPI.institutions;
        var id = $state.params.id;

        $scope.doRefresh = function(){
            Institutions.get({ID:id},function(data){
                $scope.item = data;
            }, function () {
                //error
            });
        };
        $scope.doRefresh();
    }]
);
