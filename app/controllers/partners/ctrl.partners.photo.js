'use strict';
appControllers.controller('partnersPhotoCtrl',
    ['$scope','restAPI','$state', '$upload', 'app', function ($scope, restAPI, $state, $upload, app) {
        var Partners = restAPI.partners, Photos = restAPI.photos;
        var id = $state.params.id;
        //TODO: replace with real url
        var uploadUrl = "../a-api/" + "v2/classPhoto/upload"
        $scope.imgs = [{}];
        $scope.uploading = [];
        $scope.onFileSelect = function($files, $index) {
            $upload.upload({
                url: uploadUrl,
                method: "POST",
                data : {},
                file: $files[0],
                fileFormDataName: "classPhoto1"
            }).success(function(response, status) {
                if (status !== 200) {
                    app.toaster.pop("error", "照片添加失败", "");
                    $scope.errorMsg = response.status + ': ' + response.data;
                } else {
                    $scope.imgs[$index].imgUrl = response.data.imgUrl;
                    app.toaster.pop("success", "照片添加成功", "");
                }
                $scope.uploading[$index] = false;
            }).progress(function(evt) {
                // Math.min is to fix IE which reports 200% sometimes
                $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
            $scope.uploading[$index] = true;
        };
        $scope.noUploading = function () {
            var result = true, i;
            for (i = 0; i < $scope.uploading.length; i++){
                result = result && !$scope.uploading[i];
            }
            return result;
        };
        $scope.addPhoto = function () {
          $scope.imgs[$scope.imgs.length] = {};
        };
        $scope.save = function () {
            Photos.save({id:id, classPhotoList:$scope.imgs}, function (status) {
                app.toaster.pop("success", "保存成功", "");
                app.state.go('admin.pasrtners.detail', {id: id});
            }, function () {

            });
        };
        $scope.cancel = function () {
            app.state.go('admin.pasrtners.detail', {id: id});
        };
    }]
);

