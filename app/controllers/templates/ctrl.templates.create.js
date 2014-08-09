'use strict';
appControllers.controller('templatesCreateCtrl',
    ['$scope', 'app', function ($scope, app) {
        var Templates = app.restAPI.templates;
        $scope.template = {};//创建模板的模型
        app.getCategory().then(function (data) {
            $scope.category = data.data;
        });
        $scope.options = angular.copy(app.options); // avoid to change original value
        $scope.Enum = app.Enum;
        $scope.choosed = {
            //todo 字段未确定
            partner: app.rootScope.global.user.partner || null
        };
        //选择机构
        $scope.choosePartner = function () {
            if (app.rootScope.global.isAdmin) {
                var modal = app.modal.open({
                    templateUrl: '/views/main/modals/choose.html',
                    controller: 'chooseCtrl',
                    resolve: {
                        optionName: function () {
                            return 'partners';
                        },
                        partner: ''
                    }
                });
                //selectedItem is passed from modal controller
                modal.result.then(function (selectedItem) {
                    //清空之前选择的所有template信息
                    $scope.template = {};
                    $scope.choosed['partner'] = selectedItem;
                    $scope.template.partnerId = selectedItem.id;
                    //获取机构的详情用来填充options （教师列表和地址，机构图片）
                    app.getPartnerById(selectedItem.id).then(function (partner) {
                        $scope.options.addressList = partner.addressList;
                        var teacherList = [];
                        angular.forEach(partner.teacherList, function (teacher) {
                            teacher.label = '<img src="' + teacher.imgUrl + '" alt="'+teacher.name+'" class="img-micro"/>'+teacher.name;
                            teacherList.push(teacher);
                        });
                        $scope.options.teacherList = teacherList;
                        //todo 默认选择机构的所有图片作为模板的图片
                        $scope.template.classPhotoList = partner.classPhotoList;
                    }, function () {
                        app.toaster.pop('error', '获取机构-' + selectedItem.instName + '的信息失败', '请重新选择机构或刷新重试');
                    })
                });
            }
        };
        $scope.clear = function(){
            $scope.template = {partnerId:$scope.template.partnerId||undefined};
            app.window.scrollTo(0,0);
        };
        //提交新建的模板
        $scope.submit_template = function (template) {
            //需要对教师的列表进行map
            if(template.teacherList!==undefined){
                template.teacherList = template.teacherList.map(function(v){
                    return {id:v};
                });
            }
            Templates.save(template, function (data) {
                app.toaster.pop('success', '课程模板>' + template.courseName + '创建成功',
                        '<a href="#/admin/templates/'+data.id+'"><strong>查看该信息</strong></a> 或者 <a><strong>继续创建</strong></a>', 0, 'trustedHtml',$scope.clear);
            }, function () {
                app.toaster.pop('error', '创建课程模板>' + template.courseName + '失败', '');
            })
        };
    }]
);