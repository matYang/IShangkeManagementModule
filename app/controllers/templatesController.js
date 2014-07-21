'use strict';
appControllers.controller('templatesCtrl',
    ['$scope','app', function ($scope,app) {
        $scope.title = '模板管理';
        //获取课程模板资源
        var Templates = app.restAPI.templates;

        //初始化审核状态选项
        $scope.options= {
            status:app.options.status
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
        //filter选择的值
        $scope.filter = {
            id:'',     //模板号
            name:'',   //模板名
            status:'' //审核状态
        };

        //根据 过滤信息和分页信息 刷新课程模板列表
        var doRefresh = $scope.doRefresh = function(){
            //使用课程模板资源请求数据
            Templates.get(angular.extend({},$scope.filter,$scope.page),function(data){
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
            var s = $scope.filter.status;
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
        //更新课程模板
        /*  status按照以下格式保存
            status:{
                <key>:{ label:'',value:''},...
            }
        * */
        $scope.updateStatus = function(id,fromStatus,toStatusKey){
            var toStatusValue = getStatusValue(toStatusKey);
            var toStatusLabel = app.options.status[toStatusKey]['label'];
            //使用post请求来进行状态操作
            Templates.operate({ID:id,OP:'cancel'},function(data){
                fromStatus =_.findWhere(app.options.status,{value:fromStatus})['label'];
                app.toaster.pop('success', "课程模板"+id+"状态更新成功", "由 "+fromStatus+" 变更为 "+toStatusLabel);
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
