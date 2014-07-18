'use strict';
appControllers.controller('templatesDetailCtrl',
    ['$scope','restAPI','$state', function ($scope,restAPI,$state) {
        var Templates = restAPI.templates;
        var id = $state.params.id;
        $scope.title = '模板详细信息';

        //刷新列表
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
