'use strict';
appControllers.controller('partnersTeacherCtrl',
    ['$scope', 'restAPI', '$state', '$upload', 'app', function ($scope, restAPI, $state, $upload, app) {
        /**
         * 初始化页面信息
         */
        var Teachers = restAPI.teachers, Partners = restAPI.partners;
        var partnerId = $scope.partnerId = $state.params.id;
        //TODO: replace with real url
        var uploadUrl = "/a-api/v2/teacher/upload?partnerId="+partnerId;
        $scope.teachers = [];
        $scope.doRefresh = function () {
            Teachers.query({partnerId: partnerId, start: 0, count: 1000}, function (data) {
                $scope.teachers = data.data;
            },function(){
                app.toaster.pop('error', "教师信息获取失败", "");
            });
        };
        $scope.doRefresh(); //获取该机构的教师列表

        /**
         * 教师信息的更新和删除
         */
        $scope.updateTeacher = function (index) {
            var teacher = $scope.teachers[index];
            Teachers.update({ID: teacher.id}, teacher, function (data) {
                teacher.edit = false;
                app.toaster.pop('success', "教师>" + teacher.name + "的资料更新成功", "");
            }, function () {
                app.toaster.pop('error', "教师>" + teacher.name + "的资料更新失败", "");
            });
        };
        $scope.deleteTeacher = function (index) {
            var teacher = $scope.teachers[index];
            Teachers.delete({ID: teacher.id}, function () {
                $scope.teachers.splice(index,1);//进行本地删除 todo seems slowly
                app.toaster.pop('success', "教师>" + teacher.name + "删除成功", "");
            }, function () {
                app.toaster.pop('error', "教师>" + teacher.name + "删除失败", "");
            });
        };

        /**
         * 增加教师 todo（打开modal）
         */
        $scope.addTeacher = function () {
            var modalInstance = app.modal.open({
                templateUrl: '/views/admin/modals/uploadImg.html',
                controller: 'uploadImgCtrl',
                resolve:{
                    args:function(){
                        return{
                            api:uploadUrl
                        }
                    }
                }
            });

            modalInstance.result.then(function (new_item) {
                $scope.teachers.push({id:new_item.id,imgUrl:new_item.imgUrl,name:new_item.title,intro:new_item.description});
            }, function () {
            });
        };

        /**
         * 上传图片
         */
        $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
        $scope.hasUploader = function (index) {
            return $scope.upload[index] != null;
        };
        $scope.onFileSelect = function ($files, $index) {
            $upload.upload({
                url: uploadUrl,
                method: "POST",
                file: $files[0],
                fileFormDataName: "teacherImg1"
            }).success(function (response, status) {
                if (response.status > 0) {
                    app.toaster.pop("error", "教师添加失败", "");
                    $scope.errorMsg = response.status + ': ' + response.data;
                } else {
                    $scope.teachers[$index].teacherImgUrl = response.data.imgUrl;
                    app.toaster.pop("success", "教师添加成功", "");
                }
            }).progress(function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };

    }]
);

