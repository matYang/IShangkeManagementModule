'use strict';
appControllers.controller('templatesEditCtrl',
    ['$scope', 'app', function ($scope, app) {
        var Templates = app.restAPI.templates;
        var id = app.state.params.id;
        app.getCategory().then(function (data) {
            $scope.category = data.data;
        });
        $scope.options = angular.copy(app.options);

        $scope.doRefresh = function () {
            app.getTemplateById(id).then(function (template) {
                //将teacher的obj转换成id的数组
                template.teacherList = app.tools.toImgLabelValue(template.teacherList);
                template.classPhotoList = app.tools.toImgLabelValue(template.classPhotoList);
                $scope.template = template;
                return app.getPartnerById(template.partnerId);
            }).then(function (partner) {
                //生成选项
                $scope.options.addressList = partner.addressList;
                $scope.options.teacherList = app.tools.toImgLabelOptions(partner.teacherList);
                $scope.options.classPhotoList = app.tools.toImgLabelOptions(partner.classPhotoList);
            });
        };
        $scope.doRefresh();

        //提交更新
        $scope.updateTemplate = function (template) {
            var template_save = angular.copy(template);
            //将数组中的id转换成map [1,2] --> [{id:1},{id:2}]
            template_save.teacherList =app.tools.mapToIdObjList(template_save.teacherList);
            template_save.classPhotoList =app.tools.mapToIdObjList(template_save.classPhotoList);
            Templates.operate({ID: id, OP: 'submitUpdated'}, template_save, function (data) {
                app.toaster.pop('success', '课程模板>' + template_save.courseName + '修改成功',
                        '<a href="#/admin/templates/' + data.id + '"><strong>查看该信息</strong></a> 或者 <a href="#/admin/templates"><strong>返回列表</strong></a>', 0, 'trustedHtml');
            }, function () {
                app.toaster.pop('error', "课程模板>" + template_save.courseName + "修改失败", "");
            })
        };
    }]
);
