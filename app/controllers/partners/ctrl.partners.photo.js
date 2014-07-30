'use strict';
appControllers.controller('partnersPhotoCtrl',
    ['$scope','restAPI','$state', '$upload', 'app', function ($scope, restAPI, $state, $upload, app) {
        var Partners = restAPI.partners;
        var id = $state.params.id;
        //TODO: replace with real url
        var uploadUrl = "../a-api/" + "v2/classPhoto/upload"
        $scope.imgs = [{}];
        $scope.onFileSelect = function($files, $index) {
            $upload.upload({
                url: uploadUrl,
                method: "POST",
                data : {},
                file: files,
                fileFormDataName: fileNames
            }).success(function(response) {
                if (response.status > 0) {
                    app.toaster.pop("error", "照片添加失败", "");
                    $scope.errorMsg = response.status + ': ' + response.data;
                } else {
                    $scope.imgs[$index].classPhotoUrl = response.data.imgUrl;
                    app.toaster.pop("success", "照片添加成功", "");
                }
            }).progress(function(evt) {
                // Math.min is to fix IE which reports 200% sometimes
                $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };

        $scope.addPhoto = function () {
          $scope.imgs[$scope.imgs.length] = {};
        }
        $scope.cancel = function () {
            app.state.go('admin.pasrtners.detail', {id: id});
        };
    }]
);

