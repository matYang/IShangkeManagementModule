'use strict';
appControllers.controller('templatesCreateCtrl',
    ['$scope', function ($scope) {
        $scope.title = '这里是新建课程模板页面';
        $scope.submit_template = function(form){
            alert('success');
        }
    }]
);
