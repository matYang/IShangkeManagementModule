'use strict';
appControllers.controller('partnersEditCtrl',
    ['$scope','app', function ($scope,app) {
        var Partners = app.restAPI.partners;
        var partnerId = app.state.params.id;
        $scope.options = angular.copy(app.options); // avoid to change original value
        $scope.Epartner = angular.copy($scope.partner); //a copy of partner
        //提交更新
        $scope.submit = function () {
            Partners.update({ID:partnerId},$scope.Epartner, function(partner){
                $scope.partner = partner;
                app.toaster.pop('success', "机构信息更新成功", "");
                app.state.go('admin.partners.detail', {id: partnerId});
            },function(){
                app.toaster.pop('error', "机构信息更新失败", "请稍后再试");
            });
        };
        //取消更新 返回基本信息页
        $scope.cancel = function () {
            app.state.go('admin.partners.detail', {id: partnerId});
        };
    }]
);

