'use strict';
appControllers.controller('partnersPhotomanageCtrl',
    ['$scope','restAPI','$state', 'app', function ($scope, restAPI, $state, app) {
        var Partners = restAPI.partners, Photos = restAPI.photos;
        var id = $state.params.id;
        $scope.id = id;
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
            Photos.get($scope.item, function(data){
                        app.toaster.pop('success', "照片更新成功", "");
                app.log.info('photo update success');
                app.state.go('admin.partners.detail', {id: id});
            },function(){
                //error
            });
            // app.state.go('admin.pasrtners.detail', {id: id});
        };
    }]
);

