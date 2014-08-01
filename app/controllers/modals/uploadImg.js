appControllers.controller('uploadImgCtrl',
    ['$scope', 'app', '$modalInstance', function ($scope, app, $modalInstance) {
        //item的字有图片imgUrl 标题或者名字title/name 描述或者简介description/intro
        $scope.item = {
            imgUrl:undefined,
            title:undefined,
            description:undefined
        };

        /**
         * 上传图片
         */
        //TODO: replace with real url
        var uploadUrl = "../a-api/" + "v2/classPhoto/upload"
        $scope.imgs = [
            {}
        ];
        $scope.uploading = [];
        $scope.onFileSelect = function ($files, $index) {
            $upload.upload({
                url: uploadUrl,
                method: "POST",
                data: {},
                file: $files[0],
                fileFormDataName: "classPhoto1"
            }).success(function (response, status) {
                if (status !== 200) {
                    app.toaster.pop("error", "照片上传失败", "");
                    $scope.errorMsg = response.status + ': ' + response.data;
                } else {
                    $scope.imgs[$index].imgUrl = response.data.imgUrl;
                    app.toaster.pop("success", "照片上传成功", "");
                }
                $scope.uploading[$index] = false;
            }).progress(function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
            $scope.uploading[$index] = true;
        };
        $scope.noUploading = function () {
            var result = true, i;
            for (i = 0; i < $scope.uploading.length; i++) {
                result = result && !$scope.uploading[i];
            }
            return result;
        };

        /**
         * 确定和关闭modal
         */
        $scope.ok = function () {
            //根据输入的内容新建教师或者机构图片信息
            //返回的是创建后的item 带有id
            $modalInstance.close(angular.extend({id:Math.ceil(Math.random()*10000)},$scope.item));
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]
);