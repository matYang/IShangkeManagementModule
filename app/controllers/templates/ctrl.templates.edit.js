'use strict';
appControllers.controller('templatesEditCtrl',
    ['$scope', 'app', function ($scope, app) {
        var Templates = app.restAPI.templates;
        var id = app.state.params.id;
        app.getCategory().then(function (data) {
            $scope.category = data.data;
        });
        app.getLocation().then(function (data) {
            $scope.location = data.data[0]&&data.data[0].children[0]&&data.data[0].children[0].children;
        });
        $scope.options = angular.copy(app.options);

        $scope.doRefresh = function () {
            app.getTemplateById(id).then(function (template) {
                //解析schooltimeDay from number value to number list:7-->[1,2,4]
                template.schooltimeDay = app.tools.toSchoolTimeList(template.schooltimeDay,app.Enum.schooltimeDay);
                template.schooltimeWeek = app.tools.toSchoolTimeList(template.schooltimeWeek,app.Enum.schooltimeWeek);
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
            template_save.teacherList = app.tools.mapToIdObjList(template_save.teacherList);
            template_save.classPhotoList = app.tools.mapToIdObjList(template_save.classPhotoList);
            //一天中的上课时间 上午 下午 晚上 多选值
            if (template_save.schooltimeDay) {
                template_save.schooltimeDay = eval(template_save.schooltimeDay.join('+'));
            }
            if(template_save.schooltimeWeek){
                template_save.schooltimeWeek = eval(template_save.schooltimeWeek.join('+'));
            }
            Templates.operate({ID: id, OP: 'submitUpdated'}, template_save, function (data) {
                app.toaster.pop('success', '课程模板>' + template_save.courseName + '修改成功',
                        '<a href="#/main/templates/' + data.id + '"><strong>查看该信息</strong></a> 或者 <a href="#/main/templates"><strong>返回列表</strong></a>', 0, 'trustedHtml');
            }, function () {
                app.toaster.pop('error', "课程模板>" + template_save.courseName + "修改失败", "");
            })
        };
    }]
);
