'use strict';
appControllers.controller('partnersLogoCtrl',
    ['$scope', '$upload', 'app', function ($scope, $upload, app) {
        var Partners = app.restAPI.partners;
        var partnerId = $scope.partnerId = app.state.params.id;
        //todo 初始化logo
        $scope.logoUrl = undefined;
        //TODO: replace with real url
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
        $scope.upload = function () {
            var files = [], fileNames = [];
            $scope.errorMsg = null;

            $upload.upload({
                url: uploadUrl,
                method: "POST",
                data: {partnerId: partnerId},
                file: $scope.logo
            }).success(function (response) {
                //todo 获取上传图片的url
                app.toaster.pop("success", "logo上传成功", "");
                app.state.go("admin.partners.detail", {id: id});
            }).progress(function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };
        $scope.cancel = function () {
            app.state.go('admin.partners.detail', {id: partnerId});
        };
    }]
);

