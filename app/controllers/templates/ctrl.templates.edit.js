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
                var tmp_list = [];
                angular.forEach(template.teacherList, function (teacher) {
                    this.push(teacher.id);
                }, tmp_list);
                template.teacherList = tmp_list;
                $scope.template = template;
                return app.getPartnerById(template.partnerId);
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
                $scope.template.classPhotoList = partner.classPhotoList;
            });
        };
        $scope.doRefresh();

        //提交更新
        $scope.updateTemplate = function (template) {
            //将数组中的id转换成map [1,2] --> [{id:1},{id:2}]
            if (template.teacherList !== undefined) {
                template.teacherList = template.teacherList.map(function (v) {
                    return {id: v};
                });
            }
            Templates.operate({ID: id, OP: 'submitUpdated'}, template, function (data) {
                app.toaster.pop('success', '课程模板>' + template.courseName + '修改成功',
                        '<a href="#/admin/templates/' + data.id + '"><strong>查看该信息</strong></a> 或者 <a href="#/admin/templates"><strong>返回列表</strong></a>', 0, 'trustedHtml');
            }, function () {
                app.toaster.pop('error', "课程模板>" + template.courseName + "修改失败", "");
            })
        };
    }]
);
