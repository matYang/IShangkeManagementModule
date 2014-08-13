'use strict';
appControllers.controller('coursesEditCtrl',
    ['$scope', 'app', function ($scope, app) {
        var Courses = app.restAPI.templates;
        var id = app.state.params.id;
        app.getCategory().then(function (data) {
            $scope.category = data.data;
        });
        $scope.options = angular.copy(app.options);

        $scope.doRefresh = function () {
            Courses.get({ID: id}).$promise.then(function (course) {
                //将teacher的obj转换成id的数组
                var tmp_list = [];
                angular.forEach(course.teacherList, function (teacher) {
                    this.push(teacher.id);
                }, tmp_list);
                course.teacherList = tmp_list;
                $scope.course = course;
                return app.getPartnerById(course.partnerId);
            }).then(function (partner) {
                //生成选项
                $scope.options.addressList = partner.addressList;
                var teacherList = [];
                angular.forEach(partner.teacherList, function (teacher) {
                    teacher.label = '<img src="' + teacher.imgUrl + '" alt="' + teacher.name + '" class="img-micro"/>' + teacher.name;
                    teacherList.push(teacher);
                });
                $scope.options.teacherList = teacherList;

                //todo 默认选择机构的所有图片作为模板的图片
                $scope.course.classPhotoList = partner.classPhotoList;
            });
        };
        $scope.doRefresh();
        //提交修改
        $scope.submitCourse = function (course) {
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
