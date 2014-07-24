'use strict';
appControllers.controller('templatesDetailCtrl',
    ['$scope','restAPI','$state', function ($scope,restAPI,$state) {
        var Templates = restAPI.templates;
        var id = $state.params.id;

        $scope.doRefresh = function(){

            Templates.get({ID:id},function(data){
                $scope.item = data;
            },function(){
                //error
            });
        };
        $scope.doRefresh();
    }]
);
