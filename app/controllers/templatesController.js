'use strict';
appControllers.controller('templatesCtrl',
    ['$scope','restAPI', function ($scope,restAPI) {
        var Templates = restAPI.templates;
        $scope.title = '模板管理';

        $scope.th = [
            {n:'模板号',w:'20'},
            {n:'模板名',w:'20'},
            {n:'爱价格',w:'15'},
            {n:'状态',w:'15'},
            {n:'操作',w:'30'}
        ];
        $scope.items = []; //列表内容
        //分页信息
        $scope.page = {
            index:1,
            size:10,
            total:22
        };
        //filter选择的值
        $scope.filter = {

            status:''//审核
        };

        //刷新列表
        $scope.doRefresh = function(){

            Templates.get({},function(data){
                $scope.items = data.data;
                $scope.page = data.page;
            },function(){
                //error
            });
            // todo ajax to get data use $scope.choosed and $scope.page
        };
        $scope.doRefresh();
    }]
);
