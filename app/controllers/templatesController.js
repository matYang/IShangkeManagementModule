'use strict';
appControllers.controller('templatesCtrl',
    ['$scope','app', function ($scope,app) {
        $scope.title = '模板管理';
        //获取课程模板资源
        var Templates = app.restAPI.templates;

        //初始化审核状态选项
        $scope.options= {
            status:app.enum.StatusTab
        };
        $scope.th = [
            {n:'模板号',w:'20'},
            {n:'模板名',w:'20'},
            {n:'爱价格',w:'15'},
            {n:'状态',w:'15'},
            {n:'操作',w:'30'}
        ];
        //分页信息
        $scope.page = angular.copy(app.default_page);
        //filter选择的值 用户展现当前数据的筛选条件
        $scope.filter = {
            id:'',     //模板号
            name:'',   //模板名
            status:'' //审核状态
        };
        //filter临时存储 用于用户输入
        $scope.filter_tmp = angular.copy($scope.filter);

        //清空除了status以外的filter值
        $scope.clearFilter = function(){
            angular.forEach($scope.filter_tmp,function(v,k){
                if(k != 'status') $scope.filter_tmp[k] = '';
            });
        };
        //根据 过滤信息和分页信息 刷新课程模板列表
        var doRefresh = $scope.doRefresh = function(){
            //使用课程模板资源请求数据 筛选条件为当前选择的值
            Templates.get(angular.extend({},$scope.filter_tmp,$scope.page),function(data){
                //更新当前数据的筛选条件
                $scope.filter = angular.copy($scope.filter_tmp);
                $scope.items = data.data;
                $scope.page.index = data.index;
                $scope.page.count = data.count;
                $scope.page.total = data.total;
            },function(){
                //error
            });
        };
        doRefresh();

        /***********监听审核状态的改变 刷新数据************/
        $scope.$watch(function(){
            return $scope.filter.status;
        },function(){
            var s =$scope.filter_tmp.status =  $scope.filter.status;
            s!=''&&doRefresh();
        });

        /******************用户操作事件*****************/
        //删除课程模板
        $scope.delete = function(id){
            Templates.delete({ID:id},function(data){
                app.toaster.pop('success', "课程模板"+id+"删除成功", "");
                doRefresh();
            },function(data){
              //todo error
            })
        };

        //课程模板操作
        $scope.operate = function(id,op){
            Templates.operate({ID:id,OP:op},function(){
                //success
            },function(){
                //error
            });
        };
    }]
);
