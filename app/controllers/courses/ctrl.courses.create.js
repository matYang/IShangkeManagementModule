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
                templateUrl: '/views/main/modals/choose.html',
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
            if (app.rootScope.global.isAdmin) {
                //登录用户为admin
                modalAction('partners').then(function (selectedItem) {
                    //清空之前选择的所有信息
                    $scope.course = {};
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
                //清空之前选择的除了partnerId之外的所有信息
                $scope.course = {partnerId: $scope.course.partnerId};
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
        $scope.clear = function () {
            $scope.course = {
                partnerId: $scope.course.partnerId || undefined,
                templateId: $scope.course.templateId || undefined,
                courseName: $scope.course.courseName || undefined,
                originalPrice: $scope.course.originalPrice || undefined,
                price: $scope.course.price || undefined,
                categoryId: $scope.course.categoryId || undefined,
                teacherList: $scope.course.teacherList || undefined,
                classPhotoList: $scope.course.classPhotoList || undefined
            };
            app.window.scrollTo(0,0);
        };
        $scope.submitCourse = function (course) {
            restAPI.save(course, function (data) {
                app.toaster.pop('success', '课程>' + course.courseName + '创建成功',
                        '<a href="#/admin/courses/' + data.id + '"><strong>查看该信息</strong></a> 或者 <a><strong>继续创建</strong></a>', 0, 'trustedHtml',$scope.clear);
            }, function () {
                app.toaster.pop('error', '创建课程失败', '请稍后再试');
            });
        };
    }]
);
