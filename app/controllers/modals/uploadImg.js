appControllers.controller('uploadImgCtrl',
    ['$scope', 'app', '$modalInstance','args', function ($scope, app, $modalInstance,args) {
        /**
         * init
         */
        var restAPI = args.restApi;
        var uploadUrl = args.uploadUrl;
        //item的字有图片imgUrl 标题或者名字title/name 描述或者简介description/intro
        $scope.uploading = false;
        $scope.item = {
            imgUrl:undefined,
            title:undefined,
            description:undefined
        };

        /**
         * 上传图片
         */
        $scope.onFileSelect = function ($files, $index) {
            //上传开始
            $scope.uploading = true;
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
                    $scope.item.imgUrl = data.imgUrl;
                }
                //todo 上传结束 error时也需要修改为false
                $scope.uploading = false;
            }).progress(function (evt) {
                //todo  Math.min is to fix IE which reports 200% sometimes
                $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
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