'use strict';
appControllers.controller('partnersLogoCtrl',
    ['$scope', '$upload', 'app', function ($scope, $upload, app) {
        var Partners = app.restAPI.partners;
        var partnerId = app.state.params.id;
        //上传地址为/a-api/v2/partner/1/logo
        var uploadUrl = "/a-api/v2/" + "partner/" + partnerId + "/logo";
        $scope.onFileSelect = function ($files) {
            for (var i = 0; i < $files.length; i++) {
                var $file = $files[i];
                $scope.logo = $file;
                if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL($files[i]);
                    var loadFile = function (fileReader, index) {
                        fileReader.onload = function (e) {
                        }
                    }(fileReader, i);
                }
            }
        };
        /*上传操作 返回图片地址 更改logoUrl的值*/
        $scope.upload = function () {
            var files = [], fileNames = [];
            $scope.errorMsg = null;

            $upload.upload({
                url: uploadUrl,
                method: "POST",
                data: {partnerId: partnerId},
                file: $scope.logo
            }).success(function (data) {//response is the partner obj
                //todo 获取上传图片的url
                $scope.partner.logoUrl = data.logoUrl;
                app.toaster.pop("success", "logo修改成功", "");
                app.state.go("admin.partners.detail", {id: partnerId});
            }).progress(function (evt) {
                //todo Math.min is to fix IE which reports 200% sometimes
                $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
            //todo 上传失败


        };
        /*取消则返回详情页*/
        $scope.cancel = function () {
            app.state.go('admin.partners.detail', {id: partnerId});
        };
    }]
);

