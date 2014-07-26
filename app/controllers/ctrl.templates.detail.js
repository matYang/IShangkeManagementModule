'use strict';
appControllers.controller('templatesDetailCtrl',
    ['$scope','restAPI','app', function ($scope,restAPI,app) {
        var restAPI = restAPI.templates;
        var id = app.state.params.id;

        var doRefresh = $scope.doRefresh = function(){

            restAPI.get({ID:id},function(data){
                $scope.template = data;
            },function(){
                //error
            });
        };
        $scope.doRefresh();
        /******************用户操作事件*****************/
        $scope.operate = function (id, op) {
            var promise = {};
            if (op === 'delete') {
                promise = restAPI.delete({ID: id});
            }
            else if (op == 'submitUpdated') {
                app.state.go('admin.templates.edit',{id:id});
                return;
            }
            else {
                promise = restAPI.operate({ID: id, OP: op});
            }
            promise.$promise.then(function (data) {
                app.toaster.pop('success', "课程模板" + id + "操作成功", "");
                //如果是删除操作 那么应该返回列表页面
                if(op === 'delete'){
                    app.state.go('admin.templates.list');
                    return;
                }else{
                    doRefresh();
                }
            }, function (data) {
                app.toaster.pop('success', "课程模板" + id + "操作失败", "");
            })
        };
    }]
);
