'use strict';
appControllers.controller('tuanCreateCtrl',
    ['$scope', 'app', function ($scope, app) {
        var restAPI = app.restAPI.tuan;
        var uploadUrl = "/a-api/v2/groupBuy/upload";
        $scope.tuan = {};//创建团购的模型
        $scope.photos = [];//照片列表
        $scope.progress = [];//照片上传进度

        $scope.options = angular.copy(app.options);
        $scope.Enum = app.Enum;

        $scope.clear = function () {
            //清空课程创建中输入的信息
            $scope.tuan = {};
            app.window.scrollTo(0, 0);
        };
        $scope.submitTuan = function () {
            //将数组中obj的id转换成map [1,2] --> [{id:1},{id:2}]
            var tuan_save = angular.copy($scope.tuan);
            var photos = angular.copy($scope.photos);
            //将团购的图片转化为array[obj]
            tuan_save.photoList = [];
            photos.map(function (obj) {
                if (obj.url) {
                    tuan_save.photoList.push({url: obj.url});
                }
            });
            restAPI.save(tuan_save, function (data) {
                app.toaster.pop('success', '团购>' + tuan_save.title + '创建成功',
                        '<a href="#/main/tuan/'
                        + data.id
                        + '"><strong>查看该信息</strong></a> 或者 <a><strong>继续创建</strong></a>', 0, 'trustedHtml', $scope.clear);
            }, function () {
                app.toaster.pop('error', '创建团购失败', '请稍后再试');
            });
        };


        /**
         * 团购图片
         */
            //删除团购图片
        $scope.deletePhoto = function ($index) {
            var deletedItem = $scope.photos.splice($index, 1);
            deletedItem = null;//清除引用 在回调前（返回url前）调用判断是否删除
        };
        //上传团购图片
        $scope.onFileSelect = function ($files) {
            //未选择文件
            if (!$files[0])return;
            //上传开始 新建对象 并设置索引（当前图片数）
            var index = $scope.photos.length;
            var newPhoto = {
                uploading: true
            };
//            $scope.imgFile = undefined;
            $scope.photos.push(newPhoto);
            app.$upload.upload({
                url: uploadUrl,
                method: "POST",
                data: {},
                file: $files[0]
            }).success(function (data, status) {
                if (status !== 200) {
                    //错误信息提示
                    app.toaster.pop('error', data.status + ':' + data, '');
                } else {
                    newPhoto.url = data.url;
                }
            }).error(function () {
                //todo 上传失败
            }).finally(function () {
                newPhoto.uploading = false;
            });
        };
    }]
);