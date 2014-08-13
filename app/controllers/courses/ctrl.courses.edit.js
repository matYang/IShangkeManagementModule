'use strict';
appControllers.controller('coursesEditCtrl',
    ['$scope', 'app', function ($scope, app) {
        var Courses = app.restAPI.courses;
        var id = app.state.params.id;
        app.getCategory().then(function (data) {
            $scope.category = data.data;
        });
        $scope.options = angular.copy(app.options);

        $scope.doRefresh = function () {
            Courses.get({ID: id}).$promise.then(function (course) {
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
            //将数组中的id转换成map [1,2] --> [{id:1},{id:2}]
            if (course.teacherList !== undefined) {
                course.teacherList = course.teacherList.map(function (v) {
                    return {id: v};
                });
            }
            console.log(JSON.stringify(course))
            Courses.operate({ID: id, OP: 'submitUpdated'}, course, function (data) {
                app.toaster.pop('success', '课程>' + course.courseName + '修改成功',
                        '<a href="#/admin/courses/'+data.id+'"><strong>查看该信息</strong></a> 或者 <a href="#/admin/courses"><strong>返回列表</strong></a>', 0, 'trustedHtml');
            }, function () {
                app.toaster.pop('error', "课程>" + course.courseName + "修改失败", "");
            })
        };
    }]
);
