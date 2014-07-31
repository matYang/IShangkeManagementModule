'use strict';
appControllers.controller('partnersTeacherCtrl',
    ['$scope','restAPI','$state', '$upload', 'app', function ($scope, restAPI, $state, $upload, app) {
        /**
         * 初始化页面信息
         */
        var Teachers = restAPI.teachers, Partners = restAPI.partners;
        var id = $state.params.id;
        $scope.partner = {
            teacherList:[]
        };
        $scope.doRefresh = function() {
            app.getPartnerById(id).then(function(partner){
                $scope.partner = partner;
            },function(){
                //error
            });
        };
        $scope.doRefresh(); //获取机构详情

        /**
         * 增删教师
         */
        $scope.addTeacher = function () {
            $scope.partner.teacherList.push({});
        };
        $scope.removeTeacher = function ($index) {
            $scope.partner.teacherList.splice($index,1);
        };

        /**
         * 上传图片
         */
        //TODO: replace with real url
        var uploadUrl = "../a-api/v2/" + "teacher/upload";
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

        /**
         * 提交更新的信息
         */
        $scope.submit = function () {
            Teachers.update({ID:id},$scope.partner, function (data) {
                app.toaster.pop('success', "教师更新成功", "");
                app.state.go('admin.partners.detail', {id: id});

            },function(){
                app.log.error('update error');
            });
        };

        /*返回详情页面*/
        $scope.cancel = function () {
            app.state.go('admin.pasrtners.detail', {id: id});
        };

    }]
);

