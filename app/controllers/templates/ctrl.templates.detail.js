'use strict';
appControllers.controller('templatesDetailCtrl',
    ['$scope', 'app', function ($scope, app) {
        var restAPI = app.restAPI.templates;
        var id = app.state.params.id;

        var doRefresh = $scope.doRefresh = function () {

            restAPI.get({ID: id}, function (template) {
                //解析schooltimeDay from number value to number list:7-->[1,2,4]
                template.schooltimeDay = app.tools.toSchoolTimeList(template.schooltimeDay);
                template.schooltimeWeek = app.tools.toSchoolTimeList(template.schooltimeWeek);
                $scope.template = template;
            }, function () {
                //todo error
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
                app.state.go('main.templates.edit', {id: id});
                return;
            }
            else {
                promise = restAPI.operate({ID: id, OP: op},{id:id});
            }
            promise.$promise.then(function (data) {
                app.toaster.pop('success', "课程模板" + id + "操作成功", "");
                //如果是删除操作 那么应该返回列表页面
                if (op === 'delete') {
                    app.state.go('main.templates.list');
                    return;
                } else {
                    doRefresh();
                }
            }, function (data) {
                app.toaster.pop('error', "课程模板" + id + "操作失败", "");
            })
        };
    }]
);
