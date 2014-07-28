'use strict';
appControllers.controller('partnersPhotomanageCtrl',
    ['$scope','restAPI','$state', 'app', function ($scope, restAPI, $state, app) {
        var Partners = restAPI.partners;
        $scope.doRefresh = function() {
            Partners.get({ID:id},function(data){
                $scope.item = data;
            },function(){
                //error
            });
        };

        $scope.removePhoto = function ($index) {
            while ($index < item.classPhotoList.length - 1) {
                item.classPhotoList[$index] = item.classPhotoList[$index+1];
                $index++;
            }
            item.classPhotoList.pop();
        }
        $scope.cancel = function () {
            app.state.go('admin.pasrtners.detail', {id: id});
        };
        $scope.update = function () {
            // app.state.go('admin.pasrtners.detail', {id: id});
        };
    }]
);

