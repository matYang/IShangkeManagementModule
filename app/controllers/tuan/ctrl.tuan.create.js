'use strict';
appControllers.controller('tuanCreateCtrl',
    ['$scope', 'app', function ($scope, app) {
        var restAPI = app.restAPI.tuan;
        var Courses = app.restAPI.courses;
        var Partners = app.restAPI.partners;
        var uploadUrl = "/a-api/v2/groupBuy/upload";
        $scope.tuan = {hot:0};//创建团购的模型
        $scope.photos = [];//照片列表
        $scope.progress = [];//照片上传进度
        $scope.addressList = [];//机构的地址选项列表

        $scope.options = angular.copy(app.options);
        $scope.Enum = app.Enum;


        //获取课程对应的机构的地址来生成地址选项
        $scope.getAddressList = function (courseId) {
            if(!courseId) return;
            //初始化的状态为 存在该课程 和 处于loading装填
            $scope.noSuchCourse = false;
            $scope.loadingCourse = true;
            Courses.get({ID:courseId}).$promise.then(function(course){
                //无课程返回
                if(!course||!course.partnerId){
                    $scope.noSuchCourse = true;
                    $scope.loadingCourse = false;
                    return
                }
                $scope.loadingCourse = false;
                return Partners.get({ID:course.partnerId}).$promise;
            },function(){
                $scope.loadingCourse = false;
                $scope.noSuchCourse = true;
            }).then(function(partner){
               //根据partner的地址列表生成地址的选项
                $scope.tuan.addressList = undefined;//置空原来的选择
                $scope.addressList = partner.addressList;
            });
        };

        $scope.clear = function () {
            //清空课程创建中输入的信息
            $scope.tuan = {
                hot:0
            };
            $scope.addressList = [];
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
            //将团购地址转化为array[obj]
            tuan_save.addressList = tuan_save.addressList.map(function(addressId){
               return {id:addressId}
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