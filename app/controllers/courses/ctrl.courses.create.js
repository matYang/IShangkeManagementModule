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
        //新建课程需要选择机构（admin需要）
        $scope.choosed = {
            partner: app.rootScope.global.user.partner || null,
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
        /*选择机构 用于获得partnerId以及生成选项*/
        $scope.choosePartner = function () {
            if (app.rootScope.global.isAdmin) {
                //登录用户为admin
                modalAction('partners').then(function (selectedItem) {
                    //清空之前选择的所有信息
                    $scope.course = {};
                    $scope.choosed.partner = selectedItem;
                    $scope.course.partnerId = selectedItem.id;

                    //获取机构的详情用来生成选项 （教师列表和地址）
                    app.getPartnerById(selectedItem.id).then(function (partner) {
                        //生成选项
                        $scope.options.addressList = partner.addressList;
                        $scope.options.teacherList = app.tools.toImgLabelOptions(partner.teacherList);
                        $scope.options.classPhotoList = app.tools.toImgLabelOptions(partner.classPhotoList);
                    }, function () {
                        app.toaster.pop('error', '获取机构-' + selectedItem.instName + '的信息失败', '请重新选择或刷新重试');
                    })
                });
            }
        };
        /*选择模板 用于获得模板id并且填充已选择的值 多选的地方需要将对象的数组转换成int的数组才能与多选框的值进行匹配*/
        $scope.chooseTemplate = function () {
            modalAction('templates').then(function (selectedItem) {
                //清空之前选择的除了partnerId之外的所有信息
                $scope.course = {partnerId: $scope.course.partnerId};
                $scope.choosed.template = selectedItem;
                $scope.course.courseTemplateId = selectedItem.id;
                app.getTemplateById(selectedItem.id).then(function (template) {
                    //获取课程模板并将模板中的值映射到课程中
                    //过滤tempalte中无用的信息
                    delete template.id;
                    delete template.bookingTotalEnd;
                    delete template.bookingTotalSet;
                    delete template.bookingTotalStart;
                    delete template.rating;
                    delete template.ratingEnd;
                    delete template.ratingStart;
                    //获取课程模板的详情用来填充所有选项
                    //转换多选框选择的值
                    template.teacherList = app.tools.toImgLabelValue(template.teacherList);
                    template.classPhotoList = app.tools.toImgLabelValue(template.classPhotoList);
                    $scope.course = template;
                }, function () {
                    app.toaster.pop('error', '获取课程模板-' + selectedItem.courseName + '的信息失败', '请重新选择或刷新重试');
                })
            });
        };
        $scope.clear = function () {
            //保留不可更改的数据
            $scope.course = {
                partnerId: $scope.course.partnerId || undefined,
                courseTemplateId: $scope.course.courseTemplateId || undefined,
                courseName: $scope.course.courseName || undefined,
                originalPrice: $scope.course.originalPrice || undefined,
                price: $scope.course.price || undefined,
                categoryValue: $scope.course.categoryValue || undefined,
            };
            app.window.scrollTo(0, 0);
        };
        $scope.submitCourse = function (course) {
            //将多选框选择的值转换成obj的数组
            //将数组中obj的id转换成map [1,2] --> [{id:1},{id:2}]
            var course_save = angular.copy(course);
            course_save.teacherList = app.tools.mapToIdObjList(course_save.teacherList);
            course_save.classPhotoList = app.tools.mapToIdObjList(course_save.classPhotoList);
            restAPI.save(course_save, function (data) {
                app.toaster.pop('success', '课程>' + course_save.courseName + '创建成功',
                        '<a href="#/admin/courses/' + data.id + '"><strong>查看该信息</strong></a> 或者 <a><strong>继续创建</strong></a>', 0, 'trustedHtml', $scope.clear);
            }, function () {
                app.toaster.pop('error', '创建课程失败', '请稍后再试');
            });
        };
    }]
);