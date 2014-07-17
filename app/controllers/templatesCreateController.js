'use strict';
appControllers.controller('templatesCreateCtrl',
    ['$scope','app', function ($scope,app) {
        var Templates = app.restAPI.templates;
        $scope.title = '这里是新建课程模板页面';

        //提交新建的模板
        $scope.submit_template = function(template){
            console.log(template);
            Templates.save(template,function(){
                //todo create success to do something
                app.log.info('create template success');
            },function(){
                app.log.error('create error');
            })
        }
    }]
);