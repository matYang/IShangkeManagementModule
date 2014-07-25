'use strict';
appControllers.controller('coursesCreateCtrl',
    ['$scope', 'app', function ($scope, app) {
        var restAPI = app.restAPI.courses;
        $scope.title = '新建课程';
        //新建课程需要选择机构（admin需要）
        $scope.choosed = {
            //todo 字段未确定
            institution: app.rootScope.global.user.institution || null,
            template: null
        };
        $scope.$watch(function(){return $scope.choosed.institution},function(){
           $scope.choosed.template=null;
        });
        var modalAction = function(name){
            var modal = app.modal.open({
                templateUrl: '/views/admin/modals/choose.html',
                controller: 'chooseCtrl',
                resolve: {
                    name: name,
                    institution:$scope.choosed.institution
                }
            });
            //selectedItem is passed from modal controller
            modal.result.then(function (selectedItem) {
                $scope.choosed[name] = selectedItem;
            });
        };
        $scope.chooseInstitution = function () {
            if (app.rootScope.global.isAdmin&&app.rootScope.port=='admin'){
                modalAction('institution');
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

    }]
);
