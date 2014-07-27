'use strict';
appControllers.controller('partnersTeacherCtrl',
    ['$scope','restAPI','$state', '$upload', 'app', function ($scope, restAPI, $state, $upload, app) {
        var Partners = restAPI.partners;
        var id = $state.params.id;
        var uploadUrl = "/tempurl"
        $scope.teachers = [{}];
        $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
        $scope.hasUploader = function(index) {
            return $scope.upload[index] != null;
        };
        $scope.onFileSelect = function($files, $index) {
            for ( var i = 0; i < $files.length; i++) {
                var $file = $files[i];
                $scope.teachers[$index].teacherImg = $file;
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
            for (var i = 0; i < $scope.teachers.length; i++) {
                files[i] = $scope.teachers[i].teacherImg;
                fileNames[i] = "teacherImg" + (i + 1);
                $scope.teachers[i].teacherImg = null;
            }
            $scope.errorMsg = null;

            $upload.upload({
                url: uploadUrl,
                method: "POST",
                data : {
                    teacherList : $scope.teachers
                },
                file: files,
                fileFormDataName: fileNames
            }).success(function(response) {
                if (response.status > 0) {
                    app.toaster.pop("error", "教师添加失败", "");
                    $scope.errorMsg = response.status + ': ' + response.data;
                } else {
                    app.toaster.pop("success", "教师添加成功", "");
                    app.state.go("admin.partners.detail", {id: id});
                }
            }).progress(function(evt) {
                // Math.min is to fix IE which reports 200% sometimes
                $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };
        $scope.addTeacher = function () {
          $scope.teachers[$scope.teachers.length] = {};
        }
        $scope.removeTeacher = function (index) {
            while (index < $scope.teachers.length - 1) {
                if ($scope.teachers[index] = $scope.teachers[index + 1]);
                index++;
            }
            $scope.teachers.pop();
        }
        $scope.cancel = function () {
            app.state.go('admin.partners.detail', {data: id});
        };
    }]
);

