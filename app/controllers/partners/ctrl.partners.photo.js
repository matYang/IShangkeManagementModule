'use strict';
appControllers.controller('partnersPhotoCtrl',
    ['$scope','app', function ($scope, app) {
        /**
         * 初始化页面信息
         */
        var Photos = app.restAPI.photos;
        var partnerId = $scope.partnerId = app.state.params.id;
        //TODO: replace with real url
        var uploadUrl = "/a-api/v2/classPhoto/upload?partnerId="+partnerId;
        $scope.photos = [];
        $scope.doRefresh = function () {
            Photos.query({partnerId: partnerId, start: 0, count: 1000}, function (data) {
                $scope.photos = data.data;
            }, function () {
                app.toaster.pop('error', "机构照片信息获取失败", "");
            });
        };
        $scope.doRefresh();


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
                $scope.photos.splice(index, 1);//进行本地删除 todo seems slowly
                app.toaster.pop('success', "照片删除成功", "");
            }, function () {
                app.toaster.pop('error', "照片删除失败", "");
            });
        };


        /**
         * 增加class photo todo（打开modal）
         */
        $scope.addClassPhoto = function () {
            var modalInstance = app.modal.open({
                templateUrl: '/views/admin/modals/uploadImg.html',
                controller: 'uploadImgCtrl',
                size:'sm',
                resolve:{
                    args:function(){
                        return{
                            partnerId:partnerId,
                            uploadUrl:uploadUrl,
                            name:'photos'
                        }
                    }
                }
            });

            modalInstance.result.then(function (new_item) {
                $scope.photos.push(new_item);
            }, function () {
            });
        };

        /**
         * 上传图片
         */
        $scope.onFileSelect = function ($files, $index) {
            //上传开始
            $scope.photos[$index].uploading = true;
            app.$upload.upload({
                url: uploadUrl,
                method: "POST",
                data: {},
                file: $files[0]
            }).success(function (data, status) {
                if (status !== 200) {
                    //todo 错误信息处理
                    $scope.errorMsg = data.status + ': ' + data;
                } else {
                    $scope.photos[$index].imgUrl = data.imgUrl;
                }
                //todo 上传结束 error时也需要修改为false
                $scope.photos[$index].uploading = false;
            }).progress(function (evt) {
                //todo  Math.min is to fix IE which reports 200% sometimes
                $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };
    }]
);

