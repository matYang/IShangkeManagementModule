'use strict';
appControllers.controller('partnersPhotoCtrl',
    ['$scope','restAPI','$state', '$upload', 'app', function ($scope, restAPI, $state, $upload, app) {
        var Partners = restAPI.partners;
        var id = $state.params.id;
        //TODO: replace with real url
        var uploadUrl = "/tempurl"
        $scope.imgs = [{}];
        $scope.onFileSelect = function($files, $index) {
            for ( var i = 0; i < $files.length; i++) {
                var $file = $files[i];
                $scope.imgs[$index].photo = $file;
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
            for (var i = 0; i < $scope.imgs.length; i++) {
                files[i] = $scope.imgs[i].photo;
                fileNames[i] = "classImg" + (i + 1);
                $scope.imgs[i].photo = null;
            }
            $scope.errorMsg = null;

            $upload.upload({
                url: uploadUrl,
                method: "POST",
                data : {},
                file: files,
                fileFormDataName: fileNames
            }).success(function(response) {
                if (response.status > 0) {
                    app.toaster.pop("error", "照片添加失败", "");
                    $scope.errorMsg = response.status + ': ' + response.data;
                } else {
                    app.toaster.pop("success", "照片添加成功", "");
                    app.state.go("admin.partners.detail", {id: id});
                }
            }).progress(function(evt) {
                // Math.min is to fix IE which reports 200% sometimes
                $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };

        $scope.addPhoto = function () {
          $scope.imgs[$scope.imgs.length] = {};
        }
        $scope.cancel = function () {
            app.state.go('admin.pasrtners.detail', {id: id});
        };
    }]
);

