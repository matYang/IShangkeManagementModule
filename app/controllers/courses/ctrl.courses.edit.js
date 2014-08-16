'use strict';
appControllers.controller('coursesEditCtrl',
    ['$scope', 'app', function ($scope, app) {
        var Courses = app.restAPI.courses;
        var id = app.state.params.id;
        app.getCategory().then(function (data) {
            $scope.category = data.data;
        });
        app.getLocation().then(function (data) {
            $scope.location = data.data[0]&&data.data[0].children[0]&&data.data[0].children[0].children;
        });
        $scope.options = angular.copy(app.options);

        $scope.doRefresh = function () {
            Courses.get({ID: id}).$promise.then(function (course) {
                //解析schooltimeDay from number value to number list:7-->[1,2,4]
                course.schooltimeDay = app.tools.toSchoolTimeDayList(course.schooltimeDay);
                //将teacher的obj转换成id的数组
                course.teacherList = app.tools.toImgLabelValue(course.teacherList);
                course.classPhotoList = app.tools.toImgLabelValue(course.classPhotoList);
                $scope.course = course;
                return app.getPartnerById(course.partnerId);
            }).then(function (partner) {
                //生成选项
                $scope.options.addressList = partner.addressList;
                $scope.options.teacherList = app.tools.toImgLabelOptions(partner.teacherList);
                $scope.options.classPhotoList = app.tools.toImgLabelOptions(partner.classPhotoList);
            });
        };
        $scope.doRefresh();
        //提交修改
        $scope.updateCourse = function (course) {
            var course_save = angular.copy(course);
            course_save.teacherList = app.tools.mapToIdObjList(course_save.teacherList);
            course_save.classPhotoList = app.tools.mapToIdObjList(course_save.classPhotoList);
            //一天中的上课时间 上午 下午 晚上 多选值
            if(course_save.schooltimeDay){
                course_save.schooltimeDay = eval(template_save.schooltimeDay.join('+'));
            }
            Courses.operate({ID: id, OP: 'submitUpdated'}, course_save, function (data) {
                app.toaster.pop('success', '课程>' + course_save.courseName + '修改成功',
                        '<a href="#/admin/courses/'+data.id+'"><strong>查看该信息</strong></a> 或者 <a href="#/admin/courses"><strong>返回列表</strong></a>', 0, 'trustedHtml');
            }, function () {
                app.toaster.pop('error', "课程>" + course_save.courseName + "修改失败", "");
            })
        };
    }]
);
