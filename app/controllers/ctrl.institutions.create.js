'use strict';
appControllers.controller('institutionsCreateCtrl',
    ['$scope','app', function ($scope,app) {
        var Institutions = app.restAPI.institutions;
        $scope.title = '这里是新建机构页面';

        //提交新建的模板
        $scope.submit_institution = function(template){
            Institutions.save(template,function(data){
                //todo create success to do something
                app.toaster.pop('success', "新建机构成功", "");
                app.log.info('create insittution success');
                app.state.go('admin.institutions');

            },function(){
                app.log.error('create error');
            })
        }
        $scope.cancel = function () {   
            app.state.go('admin.institutions');
        }
    }]
);