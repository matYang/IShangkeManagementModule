'use strict';
appControllers.controller('partnersPhotoCtrl',
    ['$scope','restAPI','$state', '$upload', 'app', function ($scope, restAPI, $state, $upload, app) {
        /**
         * 初始化页面信息
         */
        var Partners = restAPI.partners, Photos = restAPI.photos;
        var id = $state.params.id;
        $scope.partner = {
            teacherList:[]
        };
        $scope.doRefresh = function() {
            app.getPartnerById(id).then(function(partner){
                $scope.partner = partner;
            },function(){
                //error
            });
        };
        $scope.doRefresh(); //获取机构详情

        /**
         * 增删图片
         */
        $scope.addPhoto = function () {
            $scope.imgs[$scope.imgs.length] = {};
        };
        $scope.removePhoto = function () {
            $scope.imgs[$scope.imgs.length] = {};
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

        /**
         * 提交更新的信息
         */
        $scope.submit = function () {
            Teachers.update({ID:id},$scope.partner, function (data) {
                app.toaster.pop('success', "教师更新成功", "");
                app.state.go('admin.partners.detail', {id: id});

            },function(){
                app.log.error('update error');
            });
        };

        //from photo manage js below


        $scope.removePhoto = function ($index) {
            while ($index < item.classPhotoList.length - 1) {
                item.classPhotoList[$index] = item.classPhotoList[$index+1];
                $index++;
            }
            item.classPhotoList.pop();
        };
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

