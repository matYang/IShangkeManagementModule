'use strict';
appControllers.controller('templatesCtrl',
    ['$scope','app', function ($scope,app) {
        $scope.title = '模板管理';
        //获取课程模板资源
        var Templates = app.restAPI.templates;
        //分页信息
        $scope.page = angular.copy(app.default_page);

        $scope.th = [
            {n:'模板号',w:'20'},
            {n:'模板名',w:'20'},
            {n:'爱价格',w:'15'},
            {n:'状态',w:'15'},
            {n:'操作',w:'30'}
        ];
        $scope.items = []; //列表内容
        //filter选择的值
        $scope.filter = {
            t_id:'',     //模板号
            t_name:'',   //模板名
            t_status:'' //审核状态
        };

        //根据 过滤信息和分页信息 刷新课程模板列表
        $scope.doRefresh = function(){
            //使用课程模板资源请求数据
            Templates.get(angular.extend({},$scope.filter,$scope.page),function(data){
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
