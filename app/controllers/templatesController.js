'use strict';
appControllers.controller('templatesCtrl',
    ['$scope', function ($scope) {
        $scope.title = 'templates page';
        $scope.th = [
            {n:'模板号',w:'20'},
            {n:'模板名',w:'20'},
            {n:'爱价格',w:'15'},
            {n:'状态',w:'15'},
            {n:'操作',w:'30'}
        ];
        $scope.items = []; //列表内容
        $scope.page = {
            index:1,
            size:10,
            total:123
        }; //分页信息

        $scope.choosed = {}; //filter选择的值
        //刷新列表
        $scope.doRefresh = function(){
            // todo ajax to get data user $scope.choosed and $scope.page
        };
    }]
);
