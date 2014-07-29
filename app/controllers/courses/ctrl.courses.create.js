'use strict';
appControllers.controller('coursesCreateCtrl',
    ['$scope', 'app', function ($scope, app) {
        var restAPI = app.restAPI.courses;
        app.getCategory().then(function(data){
            $scope.category  = data.data;
        });
        $scope.options = app.options;
        $scope.Enum = app.Enum;
        app.getCategory().then(function(data){
            $scope.category  = data.data;
        });
        //新建课程需要选择机构（admin需要）
        $scope.choosed = {
            partner: null,
            template: null
        };
        $scope.$watch(function(){return $scope.choosed.partner},function(){
           $scope.choosed.template=null;
        });
        /*从弹出的modal中进行机构和模板的选择*/
        var modalAction = function(optionName){
            var modal = app.modal.open({
                templateUrl: '/views/admin/modals/choose.html',
                controller: 'chooseCtrl',
                resolve: {
                    optionName: function(){
                        return optionName;
                    },
                    partner:function(){
                        $scope.choosed.partner;
                    }
                }
            });
            return modal.result;
        };
        $scope.choosePartner = function () {
            if (app.rootScope.global.isAdmin&&app.rootScope.port=='admin'){
                //登录用户为admin
                modalAction('partners').then(function (selectedItem) {
                    $scope.choosed.partner = selectedItem;
                    $scope.course.partnerId = selectedItem.id;
                    //获取机构的详情用来填充options （教师列表和地址）
                    app.getPartnerById(selectedItem.id).then(function(data){
                        $scope.options.addressList = data.addressList;
                        $scope.options.teacherList = data.teacherList;
                    },function(){
                        app.toaster.pop('error','获取机构-'+selectedItem.instName+'的信息失败','请重新选择机构或刷新重试');
                    })
                });
            }else{
                //登录用户为partner
                if(app.rootScope.global.user&&app.rootScope.global.user.partner){

                }
            }
        };
        $scope.chooseTemplate = function () {
            modalAction('templates').then(function (selectedItem) {
                $scope.choosed.template = selectedItem;
            });
        };

        $scope.submitCourse = function(course){
            restAPI.save(course,function(){
                //todo success
            },function(){
                //todo error
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
