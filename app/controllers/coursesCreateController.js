'use strict';
appControllers.controller('coursesCreateCtrl',
    ['$scope', function ($scope) {
        $scope.title = '这里是新建课程页面';
        $scope.vm.submit_template = function(){
            alert('success');
        }
    }]
);
