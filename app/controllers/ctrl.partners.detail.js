'use strict';
appControllers.controller('partnersDetailCtrl',
    ['$scope','restAPI','$state', function ($scope,restAPI,$state) {
        var Partners = restAPI.partners;
        var id = $state.params.id;
        $scope.partner = {};
        $scope.doRefresh = function(){
            Partners.get({ID:id},function(data){
                $scope.partner = data;
            }, function () {
                //error
                app.toaster.pop('error', "该机构不存在", "");
            });
        };
        $scope.addTeacher = function () {
            app.state.go('admin.partners.teacher', {data: id});
        };
        $scope.addPhoto = function () {
            app.state.go('admin.partners.photo', {data: id});
        };
        $scope.manageTeacher = function () {
            app.state.go('admin.partners.teachermanage', {data: id});
        };
        $scope.managePhoto = function () {
            app.state.go('admin.partners.photomanage', {data: id});
        };
        $scope.edit = function () {
            app.state.go('admin.partners.edit', {data: id});
        };
        $scope.uploadLogo = function () {
            app.state.go('admin.partners.edit', {data: id});
        };
        $scope.doRefresh();
    }]
);
