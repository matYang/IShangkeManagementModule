'use strict';
appControllers.controller('coursesCreateCtrl',
    ['$scope', 'app', function ($scope, app) {
        var restAPI = app.restAPI.courses;
        $scope.course = {};//创建课程的模型
        app.getCategory().then(function (data) {
            $scope.category = data.data;
        });
        $scope.options = angular.copy(app.options);
        $scope.Enum = app.Enum;
        app.getCategory().then(function (data) {
            $scope.category = data.data;
        });
        //新建课程需要选择机构（admin需要）
        $scope.choosed = {
            partner: app.rootScope.global.user.partnerId || null,
            template: null
        };
        $scope.$watch(function () {
            return $scope.choosed.partner
        }, function () {
            $scope.choosed.template = null;
        });
        /*从弹出的modal中进行机构和模板的选择*/
        var modalAction = function (optionName) {
            var modal = app.modal.open({
                templateUrl: '/views/admin/modals/choose.html',
                controller: 'chooseCtrl',
                resolve: {
                    optionName: function () {
                        return optionName;
                    },
                    partner: function () {
                        return $scope.choosed.partner;
                    }
                }
            });
            return modal.result;
        };
        $scope.choosePartner = function () {
            if (app.rootScope.global.isAdmin && app.rootScope.port == 'admin') {
                //登录用户为admin
                modalAction('partners').then(function (selectedItem) {
                    $scope.choosed.partner = selectedItem;
                    $scope.course.partnerId = selectedItem.id;
                    //获取机构的详情用来填充options （教师列表和地址）
                    app.getPartnerById(selectedItem.id).then(function (data) {
                        $scope.options.addressList = data.addressList;
                        $scope.options.teacherList = data.teacherList;
                    }, function () {
                        app.toaster.pop('error', '获取机构-' + selectedItem.instName + '的信息失败', '请重新选择或刷新重试');
                    })
                });
            }
        };
        $scope.chooseTemplate = function () {
            modalAction('templates').then(function (selectedItem) {
                $scope.choosed.template = selectedItem;
                $scope.course.templateId = selectedItem.id;
                app.getTemplateById(selectedItem.id).then(function (data) {
                    //获取课程模板的详情用来填充所有选项
                    angular.forEach(data, function (v, k) {
                        if (k !== 'id')$scope.course[k] = v;
                    })
                }, function () {
                    app.toaster.pop('error', '获取课程模板-' + selectedItem.courseName + '的信息失败', '请重新选择或刷新重试');
                })
            });
        };

        $scope.submitCourse = function (course) {
            restAPI.save(course, function (data) {
                //todo success
                app.toaster.pop('error', '创建课程--' + course.courseName + '成功', '');
            }, function () {
                app.toaster.pop('error', '创建课程失败', '请稍后再试');
            });
        };

        //打开日期
        $scope.open = function ($event, id) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope['opened_' + id] = true;
        };
    }]
);
