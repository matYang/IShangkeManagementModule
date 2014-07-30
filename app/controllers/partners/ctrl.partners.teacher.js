'use strict';
appControllers.controller('partnersTeacherCtrl',
    ['$scope','restAPI','$state', '$upload', 'app', function ($scope, restAPI, $state, $upload, app) {
        var Teachers = restAPI.teachers;
        var id = $state.params.id;
        //TODO: replace with real url
        var uploadUrl = "../a-api/v2/" + "teacher/upload"
        $scope.teachers = [{}];
        $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
        $scope.hasUploader = function(index) {
            return $scope.upload[index] != null;
        };
        $scope.onFileSelect = function($files, $index) {
            $upload.upload({
                url: uploadUrl,
                method: "POST",
                file: $files[0],
                fileFormDataName: "teacherImg1"
            }).success(function(response, status) {
                if (response.status > 0) {
                    app.toaster.pop("error", "教师添加失败", "");
                    $scope.errorMsg = response.status + ': ' + response.data;
                } else {
                    $scope.teachers[$index].teacherImgUrl = response.data.imgUrl;
                    app.toaster.pop("success", "教师添加成功", "");
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
        $scope.submit = function () {
            Teachers.save({id:id, teacherList:$scope.teachers}, function (data) {
                app.toaster.pop('success', "教师创建成功", "");
                app.log.info('create teacher success');
                app.state.go('admin.partners.detail', {id: id});

            },function(){
                app.log.error('create error');
            });
        }
        $scope.cancel = function () {
            app.state.go('admin.partners.detail', {data: id});
        };
    }]
);

