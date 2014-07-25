'use strict';
appControllers.controller('partnersEditCtrl',
    ['$scope','restAPI','$state', function ($scope,restAPI,$state) {
        var Partners = restAPI.partners;
        var id = $state.params.id;

        $scope.doRefresh = function(){
            Partners.get({ID:id}, function(data){
                $scope.partner = data;
            }, function () {
                //error
            });
        };
        $scope.submit = function () {
            Partners.put($scope.partner, function(data){
                app.toaster.pop('success', "机构创建成功", "");
                app.log.info('create partner success');
                app.state.go('admin.partners.detail', {data: id});
            });
        };
        $scope.cancel = function () {
            app.state.go('admin.partners.detail', {data: id});
        };
        $scope.doRefresh();
    }]
);

