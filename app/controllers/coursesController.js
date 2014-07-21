'use strict';
appControllers.controller('coursesCtrl',
    ['$scope','app', function ($scope,app) {
        $scope.title = '课程管理';
        //获取课程模板资源
        var Courses = app.restAPI.courses;

        //初始化审核状态选项
        $scope.options= {
            status:app.options.status
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
            //删除课程模板
        $scope.delete = function(id){
            Courses.delete({ID:id},function(data){
                app.toaster.pop('success', "课程"+id+"删除成功", "");
                doRefresh();
            },function(data){
                //todo error
            })
        };
        //更新课程模板
        /*  status按照以下格式保存
         status:{
         <key>:{ label:'',value:''},...
         }
         * */
        $scope.updateStatus = function(id,fromStatus,toStatusKey){
            var toStatusValue = getStatusValue(toStatusKey);
            var toStatusLabel = app.options.status[toStatusKey]['label'];
            //使用post请求来进行状态操作 todo OP的值为后台返回的值
            Courses.operate({ID:id,OP:'cancel'},function(data){
                fromStatus =_.findWhere(app.options.status,{value:fromStatus})['label'];
                app.toaster.pop('success', "课程"+id+"状态更新成功");
                doRefresh();
            },function(data){
                //todo error
            })
        };
        //根据KEY获取状态的value
        var getStatusValue =  $scope.getStatusValue = function(KEY){
            return app.options.status[KEY]['value'];
        };
    }]
);
