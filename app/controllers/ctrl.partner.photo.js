'use strict';
appControllers.controller('partnersEditPhotoCtrl',
    ['$scope','restAPI','$state', '$upload', function ($scope,restAPI,$state) {
        var Partners = restAPI.partners;
        var id = $state.params.id;
        $scope.imgs = [{}];

        $scope.cancel = function () {
            app.state.go('admin.partners.detail', {data: id});
        };
        $scope.upload = function () {
            
        }
        $scope.addPhoto = function () {
            
        }
        $scope.doRefresh();
    }]
);

