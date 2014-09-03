appControllers.controller('editImgCtrl',
    ['$scope', 'app', '$modalInstance', 'args', function ($scope, app, $modalInstance, args) {
        /**
         * init
         * arg has
         * @name('teachers' or 'photos'),
         * @uploadUrl 上传图片的地址
         * @item 如果为编辑状态 则会传过来
         *
         */
        var name = args.name;
        var uploadUrl = args.uploadUrl;

        var restAPI = app.restAPI[name];

        $scope.uploading = false;

        //判断是否处于编辑模式
        $scope.item = args.item;
        console.log(args)

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
            //开始修改
            $scope.creating = true;
            var item = angular.copy($scope.item);
            //返回的是创建后的item 带有id
            if (app.test_mode) {
                app.toaster.pop('success', '修改成功');
                $modalInstance.close(angular.extend({id: Math.ceil(Math.random() * 10000)}, item));
            } else {
                restAPI.update({ID: item.id},item).$promise.then(function (data) {
                    app.toaster.pop('success', '修改成功');
                    $modalInstance.close(data);
                }, function () {
                    //todo error
                }).finally(function () {
                    //创建结束
                    $scope.creating = false;
                });
            }

        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]
);