'use strict';
appControllers.controller('tuanCreateCtrl',
    ['$scope', 'app', function ($scope, app) {
        var restAPI = app.restAPI.tuan;
        var uploadUrl = "/a-api/v2/groupBuy/upload";
        $scope.tuan = {};//创建团购的模型
        $scope.photos = [
            {url:'/img/loading.gif'}
        ];//照片列表
        $scope.progress = [];//照片上传进度

        $scope.options = angular.copy(app.options);
        $scope.Enum = app.Enum;

        $scope.clear = function () {
            //清空课程创建中输入的信息
            $scope.tuan = {};
            app.window.scrollTo(0, 0);
        };
        $scope.submitTuan = function (tuan) {
            //将数组中obj的id转换成map [1,2] --> [{id:1},{id:2}]
            var tuan_save = angular.copy(tuan);
            //todo 这里需要将团购的图片转化为array[obj]
//            tuan_save.teacherList = app.tools.mapToIdObjList(tuan_save.teacherList);
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
         * 上传图片 指定对象
         */
        $scope.onFileSelect = function ($files, $index) {
            //上传开始
            var newPhoto = {
                uploading:true
            };
            $scope.photos.push(newPhoto);
            app.$upload.upload({
                url: uploadUrl,
                method: "POST",
                data: {},
                file: $files[0]
            }).success(function (data, status) {
                if (status !== 200) {
                    //错误信息提示
                    app.toaster.pop('error', data.status +':' + data, '');
                } else {
                    $scope.photos[$index].imgUrl = data.imgUrl;
                }
                //todo 上传结束 error时也需要修改为false
                $scope.photos[$index].uploading = false;
            }).progress(function (evt) {
                //todo  Math.min is to fix IE which reports 200% sometimes
                $scope.progress[$index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };
    }]
);