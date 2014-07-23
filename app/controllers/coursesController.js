'use strict';
appControllers.controller('coursesCtrl',
    ['$scope','app', function ($scope,app) {
        $scope.title = '课程管理';
        //获取课程模板资源
        var Courses = app.restAPI.courses;

        //初始化审核状态选项
        $scope.options= {
            status:app.enum.status
        };
        $scope.th = [
            {n:'课程号',w:'20'},
            {n:'课程名',w:'30'},
            {n:'状态',w:'20'},
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
            Courses.get(angular.extend({},$scope.filter_tmp,$scope.page),function(data){
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
        //课程操作
        $scope.operate = function(id,op){
            var promise = {};
            if(op==='delete'){
                promise = Courses.delete({ID:id});
            }else{
                promise = Courses.operate({ID:id,OP:op});
            }
            promise.$promise.then(function(data){
                app.toaster.pop('success', "课程"+id+"操作成功", "");
                doRefresh();
            },function(data){
                app.toaster.pop('success', "课程"+id+"操作失败", "");
            })
        };
    }]
);
