'use strict';
appControllers.controller('coursesCreateCtrl',
    ['$scope', 'app', function ($scope, app) {
        var restAPI = app.restAPI.courses;
        $scope.title = '新建课程';
        //新建课程需要选择机构（admin需要）
        $scope.choosed = {
            //todo 字段未确定
            partner: app.rootScope.global.user.partner || null,
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
                    optionName: optionName,
                    partner:$scope.choosed.partner
                }
            });
            //selectedItem is passed from modal controller
            modal.result.then(function (selectedItem) {
                $scope.choosed[name] = selectedItem;
            });
        };
        $scope.choosePartner = function () {
            if (app.rootScope.global.isAdmin&&app.rootScope.port=='admin'){
                modalAction('partner');
            }
        };
        $scope.chooseTemplate = function () {
            modalAction('template');
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
