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
                    teacher.label = '<img src="' + teacher.imgUrl + '" alt="' + teacher.name + '" class="pic-micro"/>' + teacher.name;
                    teacherList.push(teacher);
                });
                $scope.options.teacherList = teacherList;
                //todo 默认选择机构的所有图片作为模板的图片
                $scope.template.classPhotoList = partner.classPhotoList;
            });
        };
        $scope.doRefresh();
        //提交新建的模板
        $scope.updateTemplate = function (template) {
            //需要对教师的列表进行map
            template.teacherList = template.teacherList.map(function (v) {
                return {id: v};
            });
            Templates.update({ID:id},template, function (data) {
                app.toaster.pop('success', "课程模板创建成功", "");
                app.log.info('update template success');
                //todo 提示查看该条信息 或者留在此页
                app.state.go('admin.templates.list');

            }, function () {
                app.log.error('create error');
            })
        };
    }]
);
