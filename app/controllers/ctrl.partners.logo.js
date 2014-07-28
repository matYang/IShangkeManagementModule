'use strict';
appControllers.controller('partnersLogoCtrl',
    ['$scope','restAPI','$state', '$upload', 'app', function ($scope, restAPI, $state, $upload, app) {
        var Partners = restAPI.partners;
        var id = $state.params.id;
        //TODO: replace with real url
        var uploadUrl = "/tempurl"
        $scope.onFileSelect = function($files) {
            for ( var i = 0; i < $files.length; i++) {
                var $file = $files[i];
                $scope.logo = $file;
                if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL($files[i]);
                    var loadFile = function(fileReader, index) {
                        fileReader.onload = function(e) {
                        }
                    }(fileReader, i);
                }
            }
        };
        $scope.upload = function() {
            var files = [], fileNames = [];
            $scope.errorMsg = null;

            $upload.upload({
                url: uploadUrl,
                method: "POST",
                data : {id: id},
                file: $scope.logo,
                fileFormDataName: "logo"
            }).success(function(response) {
                if (response.status > 0) {
                    app.toaster.pop("error", "机构创建失败", "");
                    $scope.errorMsg = response.status + ': ' + response.data;
                } else {
                    app.toaster.pop("success", "机构创建失败", "");
                    app.state.go("admin.partners.detail", {id: id});
                }
            }).progress(function(evt) {
                // Math.min is to fix IE which reports 200% sometimes
                $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };
        $scope.cancel = function () {
            app.state.go('admin.partners.detail', {data: id});
        };
    }]
);

