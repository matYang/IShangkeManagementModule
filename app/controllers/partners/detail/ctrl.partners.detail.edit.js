'use strict';
appControllers.controller('partnersEditCtrl',
    ['$scope','app', function ($scope,app) {
        var Partners = app.restAPI.partners;
        var partnerId = app.state.params.id;
        $scope.options = angular.copy(app.options); // avoid to change original value
        $scope.Epartner = angular.copy($scope.partner); //a copy of partner
        //提交更新
        $scope.submit = function () {
            if(app.test_mode){
                $scope.$parent.partner = $scope.Epartner;
                app.toaster.pop('success', "机构信息更新成功", "");
                app.state.go('main.partners.detail', {id: partnerId});
                return
            }
            Partners.update({ID:partnerId},$scope.Epartner, function(partner){
                $scope.$parent.partner = partner;
                app.toaster.pop('success', "机构信息更新成功", "");
                app.state.go('main.partners.detail', {id: partnerId});
            },function(){
                app.toaster.pop('error', "机构信息更新失败", "请稍后再试");
            });
        };
        //取消更新 返回基本信息页
        $scope.cancel = function () {
            app.state.go('main.partners.detail', {id: partnerId});
        };
    }]
);

