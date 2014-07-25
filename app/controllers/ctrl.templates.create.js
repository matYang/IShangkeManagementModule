'use strict';
appControllers.controller('templatesCreateCtrl',
    ['$scope','app', function ($scope,app) {
        var Templates = app.restAPI.templates;
        $scope.title = '新建课程模板';

        //提交新建的模板
        $scope.submit_template = function(template){
            Templates.save(template,function(data){
                //todo create success to do something
                app.toaster.pop('success', "课程模板创建成功", "");
                app.log.info('create template success');
                app.state.go('admin.templates');

            },function(){
                app.log.error('create error');
            })
        };

        //打开日期
        $scope.open = function ($event, id) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope['opened_' + id] = true;
        };
    }]
);