'use strict';
appControllers.controller('partnersPhotoCtrl',
    ['$scope','restAPI','$state', '$upload', 'app', function ($scope, restAPI, $state, $upload, app) {
        /**
         * 初始化页面信息
         */
        var Partners = restAPI.partners, Photos = restAPI.photos;
        var partnerId = $state.params.id;
        $scope.partner = {
            teacherList:[]
        };
        $scope.doRefresh = function() {
            Photos.query({partnerId: partnerId, start: 0, count: 1000}, function (data) {
                console.log(data.data)
                $scope.photos = data.data;
            });
        };
        $scope.doRefresh(); //获取机构详情


        /**
         * class photo的更新和删除
         */
        $scope.updateClassPhoto = function (index) {
            var photo = $scope.photos[index];
            Photos.update({ID: photo.id}, photo, function (data) {
                photo.edit = false;
                app.toaster.pop('success', "照片更新成功", "");
            }, function () {
                app.toaster.pop('error', "照片更新失败", "");
            });
        };
        $scope.deleteClassPhoto = function (index) {
            var photo = $scope.photos[index];
            Photos.delete({ID: photo.id}, function () {
                $scope.photos.splice(index,1);//进行本地删除 todo seems slowly
                app.toaster.pop('success', "照片删除成功", "");
            }, function () {
                app.toaster.pop('error', "照片删除失败", "");
            });
        };



        /**
         * 增加class photo todo（打开modal）
         */
        $scope.addClassPhoto = function () {
        };
        /**
         * 上传图片
         */
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

    }]
);

