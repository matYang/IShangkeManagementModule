'use strict';
appControllers.controller('coursesEditCtrl',
    ['$scope','app', function ($scope,app) {
        var Courses = app.restAPI.templates;
        var id = app.state.params.id;
        app.getCategory().then(function (data) {
            $scope.category = data.data;
        });
        $scope.options = angular.copy(app.options);

        $scope.doRefresh = function () {
            Courses.get({ID:id}).$promise.then(function (course) {
                $scope.course = course;
                return app.getPartnerById(course.partnerId);
            }).then(function (partner) {
                //生成选项
                $scope.options.addressList = partner.addressList;
                $scope.options.teacherList = partner.teacherList;
                //todo 默认选择机构的所有图片作为模板的图片
                $scope.course.classPhotoList = partner.classPhotoList;
            });
        };
        $scope.doRefresh();
        //提交新建的模板
        $scope.submitCourse = function (course) {
            //需要对教师的列表进行map
            Courses.update({ID:id},course, function (data) {
                app.toaster.pop('success', "课程模板创建成功", "");
                app.log.info('update course success');
                //todo 提示查看该条信息 或者留在此页
                app.state.go('admin.courses.list');

            }, function () {
                app.log.error('create error');
            })
        };
    }]
);
