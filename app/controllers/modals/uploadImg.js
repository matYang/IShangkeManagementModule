appControllers.controller('uploadImgCtrl',
    ['$scope', 'app', '$modalInstance','args', function ($scope, app, $modalInstance,args) {
        /**
         * init
         * arg has partnerId,name('teachers' or 'photos'),uploadUrl
         */
        var partnerId = args.partnerId;
        var name = args.name;
        var restAPI = app.restAPI[name];
        var uploadUrl = args.uploadUrl;
        //item的字有图片imgUrl 标题或者名字title/name 描述或者简介description/intro
        $scope.uploading = false;
        $scope.item = {
            partnerId:partnerId,
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
            //开始创建
            $scope.creating = true;
            var item = angular.copy($scope.item);
            //如果是新建教师需要更改字段 默认的是新建机构照片的字段
            if(name==='teachers'){
                item = {
                    partnerId:$scope.item.partnerId,
                    imgUrl:$scope.item.imgUrl,
                    name:$scope.item.title,
                    intro:$scope.item.description
                };
            }
            //返回的是创建后的item 带有id
            if(app.test_mode){
                app.toaster.pop('success','创建成功');
                $modalInstance.close(angular.extend({id:Math.ceil(Math.random()*10000)},item));
            }else{
                restAPI.save(item).$promise.then(function(data){
                    app.toaster.pop('success','创建成功');
                    $modalInstance.close(data);
                },function(){
                    //todo error
                }).finally(function(){
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