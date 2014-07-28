'use strict';
appControllers.controller('coursesEditCtrl',
    ['$scope','restAPI','$state', function ($scope,restAPI,$state) {
        var Courses = restAPI.templates;
        var id = $state.params.id;

        //刷新列表
        $scope.doRefresh = function(){

            Courses.get({ID:id},function(data){
                $scope.item = data;
            },function(){
                //error
            });
        };
        $scope.doRefresh();

    }]
);
