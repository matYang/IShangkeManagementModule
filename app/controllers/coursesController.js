'use strict';
appControllers.controller('coursesCtrl',
    ['$scope','app', function ($scope,app) {
        $scope.title = '课程管理';
        $scope.page = angular.copy(app.default_page);
        var Courses = app.restAPI.courses;

        $scope.th = [
            {n:'课程号',w:'20'},
            {n:'课程名',w:'20'},
            {n:'操作',w:'30'}
        ];
        $scope.items = []; //列表内容
        //filter选择的值
        $scope.filter = {
            c_name:''   //课程名
        };
        $scope.doRefresh = function(){
            //使用课程模板资源请求数据
            Courses.get(angular.extend({},$scope.filter,$scope.page),function(data){
                $scope.items = data.data;
                $scope.page.index = data.page;
                $scope.page.count = data.count;
                $scope.page.total = data.total;
            },function(){
                //error
            });
        };
        $scope.doRefresh();
    }]
);
