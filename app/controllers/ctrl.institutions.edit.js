'use strict';
appControllers.controller('institutionsEditCtrl',
    ['$scope','restAPI','$state', '$upload', function ($scope,restAPI,$state) {
        var Institutions = restAPI.institutions;
        var id = $state.params.id;

        $scope.doRefresh = function(){
            Institutions.get({ID:id},function(data){
                $scope.item = data;
            }, function () {
                //error
            });
        };
        $scope.submit_change = function () {
            Institutions.put($scope.item, function(data){
                app.toaster.pop('success', "课程模板创建成功", "");
                app.log.info('create insittution success');
                app.state.go('admin.institutions.detauk', {data: id});
            });
        };
        $scope.cancel = function () {
            Institutions.put($scope.item, function(data){

            });
        };
        $scope.doRefresh();
    }]
);

