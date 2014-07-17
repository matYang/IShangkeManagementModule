'use strict';
appControllers.controller('templatesCreateCtrl',
    ['$scope', function ($scope) {
        $scope.title = '这里是新建课程模板页面';

        //提交新建的模板
        $scope.submit_template = function(){
            alert('create success');
        }
    }]
);
