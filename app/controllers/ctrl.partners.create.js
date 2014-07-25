'use strict';
appControllers.controller('partnersCreateCtrl',
    ['$scope','app', function ($scope,app) {
        var Partners = app.restAPI.partners;
        $scope.title = '这里是新建机构页面';
        $scope.partner = {};
        //提交新建的模板
        $scope.submit = function(partner){
            Partners.save(partner, function(data){
                //todo create success to do something
                app.toaster.pop('success', "新建机构成功", "");
                app.log.info('create partner success');
                app.state.go('admin.partners.detail', {id: data.partnerId});

            },function(){
                app.log.error('create error');
            })
        }
        $scope.cancel = function () {   
            app.state.go('admin.partners');
        }
    }]
);