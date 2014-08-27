'use strict';
appControllers.controller('coursesDetailCtrl',
    ['$scope', 'restAPI', 'app', function ($scope, restAPI, app) {
        var restAPI = restAPI.courses;
        var id = app.state.params.id;

        var doRefresh = $scope.doRefresh = function () {

            restAPI.get({ID: id}, function (course) {
                //解析schooltimeDay from number value to number list:7-->[1,2,4]
                course.schooltimeDay = app.tools.toSchoolTimeList(course.schooltimeDay,app.Enum.schooltimeDay);
                course.schooltimeWeek = app.tools.toSchoolTimeList(course.schooltimeWeek,app.Enum.schooltimeWeek);
                $scope.course = course;
            }, function () {
                //error
            });
        };
        $scope.doRefresh();
        /******************用户操作事件*****************/
        $scope.operate = function (id, op) {
            var promise = {};
            if (op === 'delete') {
                promise = restAPI.delete({ID: id});
            }
            else if (op == 'submitUpdated') {
                app.state.go('main.courses.edit', {id: id});
                return;
            }
            else {
                promise = restAPI.operate({ID: id, OP: op},{id:id});
            }
            promise.$promise.then(function (data) {
                app.toaster.pop('success', "课程" + id + "操作成功", "");
                //如果是删除操作 那么应该返回列表页面
                if (op === 'delete') {
                    app.state.go('main.courses.list');
                    return;
                } else {
                    doRefresh();
                }
            }, function (data) {
                app.toaster.pop('error', "课程" + id + "操作失败", "");
            })
        };
    }]
);
