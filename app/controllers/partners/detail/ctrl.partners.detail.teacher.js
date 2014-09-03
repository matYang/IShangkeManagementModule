'use strict';
appControllers.controller('partnersTeacherCtrl',
    ['$scope', '$upload', 'app', function ($scope, $upload, app) {
        /**
         * 初始化页面信息
         */
        var Teachers = app.restAPI.teachers;
        var partnerId = app.state.params.id;
        var uploadUrl = "/a-api/v2/teacher/upload?partnerId=" + partnerId;
        var teachers_edit = {}; //使用mao保存进入修改状态前的teacher
        $scope.teachers = [];
        //todo 教师的获取可直接通过父scope的partner中的teacherList
        $scope.doRefresh = function () {
            Teachers.query({partnerId: partnerId, start: 0, count: 1000}, function (data) {
                $scope.teachers = data.data;
            }, function () {
                app.toaster.pop('error', "教师信息获取失败", "");
            });
        };
        $scope.doRefresh();

        /**
         * 进入和退出编辑模式 修改为打开modal
         */
        $scope.editTeacher = function ($index) {
            //在edit更改前进行原始teacher的保存
            var teacher = angular.copy($scope.teachers[$index]);

            var modalInstance = app.modal.open({
                templateUrl: '/views/main/modals/editImg.html',
                controller: 'editImgCtrl',
                size: 'md',
                resolve: {
                    args: function () {
                        return{
                            item: teacher,
                            uploadUrl: uploadUrl,
                            name: 'teachers'
                        }
                    }
                }
            });

            modalInstance.result.then(function (new_item) {
                $scope.teachers[$index] = new_item;
            }, function () {
            });
//            teachers_edit[teacher.id] = teacher;//保存修改前的数据 便于后续恢复
//            $scope.teachers[$index].edit = true;//进入编辑模式
        };
        $scope.cancelEdit = function($index){
            var id = $scope.teachers[$index].id;
            $scope.teachers[$index] = teachers_edit[id];
            delete teachers_edit[id];
        };

        /**
         * 教师信息的更新和删除
         */
//        $scope.updateTeacher = function ($index) {
//            var teacher = angular.copy($scope.teachers[$index]);
//            delete teacher.edit;
//            delete teacher.uploading;
//            Teachers.update({ID: teacher.id}, teacher, function (data) {
//                $scope.teachers[$index].edit = false;
//                delete teachers_edit[teacher.id];
//                app.toaster.pop('success', "教师>" + teacher.name + "的资料更新成功", "");
//            }, function () {
//                app.toaster.pop('error', "教师>" + teacher.name + "的资料更新失败", "");
//            });
//        };
        $scope.deleteTeacher = function ($index) {
            Teachers.delete({ID: $scope.teachers[$index].id}, function () {
                $scope.teachers.splice($index, 1);//进行本地删除 todo seems slowly
                app.toaster.pop('success', "教师>" + $scope.teachers[$index].name + "删除成功", "");
            }, function () {
                app.toaster.pop('error', "教师>" + $scope.teachers[$index].name + "删除失败", "");
            });
        };

        /**
         * 增加教师 todo（打开modal）
         */
        $scope.addTeacher = function () {
            var modalInstance = app.modal.open({
                templateUrl: '/views/main/modals/uploadImg.html',
                controller: 'uploadImgCtrl',
                size: 'sm',
                resolve: {
                    args: function () {
                        return{
                            partnerId: partnerId,
                            uploadUrl: uploadUrl,
                            name: 'teachers'
                        }
                    }
                }
            });

            modalInstance.result.then(function (new_item) {
                $scope.teachers.push(new_item);
            }, function () {
            });
        };

        /**
         * 上传图片
         */
//        $scope.fileReaderSupported = window.FileReader !== null && (window.FileAPI === null || window.FileAPI.html5 !== false);
        $scope.onFileSelect = function ($files, $index) {
            //上传开始
            $scope.teachers[$index].uploading = true;
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
                    $scope.teachers[$index].imgUrl = data.imgUrl;
                }
                //todo 上传结束 error时也需要修改为false
                $scope.teachers[$index].uploading = false;
            }).progress(function (evt) {
                //todo  Math.min is to fix IE which reports 200% sometimes
                $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };

    }]
);

