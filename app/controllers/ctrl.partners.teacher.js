'use strict';
appControllers.controller('partnersTeacherCtrl',
    ['$scope','restAPI','$state', '$upload', function ($scope, restAPI, $state, $upload) {
        var Partners = restAPI.partners;
        var id = $state.params.id;
        var uploadUrl = "/tempurl"
        $scope.teachers = [{}];
        $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
        $scope.uploadRightAway = false;
        $scope.hasUploader = function(index) {
            return $scope.upload[index] != null;
        };
        $scope.onFileSelect = function($files) {
            $scope.selectedFiles = [];
            $scope.progress = [];
            if ($scope.upload && $scope.upload.length > 0) {
                for (var i = 0; i < $scope.upload.length; i++) {
                    if ($scope.upload[i] != null) {
                        $scope.upload[i].abort();
                    }
                }
            }
            $scope.upload = [];
            $scope.uploadResult = [];
            $scope.selectedFiles = $files;
            $scope.dataUrls = [];
            for ( var i = 0; i < $files.length; i++) {
                var $file = $files[i];
                if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL($files[i]);
                    var loadFile = function(fileReader, index) {
                        fileReader.onload = function(e) {
                            $timeout(function() {
                                $scope.dataUrls[index] = e.target.result;
                            });
                        }
                    }(fileReader, i);
                }
                $scope.progress[i] = -1;
                if ($scope.uploadRightAway) {
                    $scope.start(i);
                }
            }
        };
        $scope.startAll = function() {
            for (var i = 0; i < $scope.selectedFiles.length; i++) {
              $scope.start(i);
            }
        };
        $scope.start = function(index) {
            $scope.progress[index] = 0;
            $scope.errorMsg = null;

            $scope.upload[index] = $upload.upload({
                url: uploadUrl,
                method: "POST",
                data : {
                    teacherList : $scope.teachers
                },
                file: $scope.selectedFiles[index],
                fileFormDataName: 'classImg' + (index + 1)
            });
            $scope.upload[index].then(function(response) {
                $timeout(function() {

                    $scope.uploadResult.push(response.data);
                });
            }, function(response) {
                if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
            }, function(evt) {
                // Math.min is to fix IE which reports 200% sometimes
                $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
            $scope.upload[index].xhr(function(xhr){
//              xhr.upload.addEventListener('abort', function() {console.log('abort complete')}, false);
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

