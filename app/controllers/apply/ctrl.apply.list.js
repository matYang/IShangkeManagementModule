'use strict';
appControllers.controller('applyListCtrl',
    ['$scope', 'app', function ($scope, app) {
        //获取课程申请资源
        var restAPI = app.restAPI.apply;
        var pageView = app.PageView.apply;

        /*page config*/
        $scope.tabs = pageView.tabs;//页面的tabs应与filter_tab(from tab.value)的值对应
        $scope.th = pageView.th;
        $scope.page = pageView.pagination;

        /*filters*/
        $scope.filter = pageView.filter;//标签页的tab filter
        $scope.search = pageView.search;//filter选择的值 当前数据的筛选条件
        $scope.search_tmp = {};//filter临时存储 用于用户输入

        //条件查询(点击tab)前需要清空当前的分页和用户输入的search
        var beforeQuery = function () {
            $scope.items = [];//条件查询时直接置空列表数据
            $scope.search_tmp = {};
            //重置分页信息 这里的值
            angular.extend($scope.page, app.default_page);
            //在避免更改对象引用的情况下将所有查询值设为undefined
            app.tools.clearReferenceObj($scope.filter);
        };

        //tab选择事件
        $scope.chooseTab = function (tab) {
            beforeQuery();
            angular.forEach(tab.value, function (v, k) {
                $scope.filter[k] = v;//重新设置选中的filter
            });
            app.log.log('filter_tab:' + angular.toJson($scope.filter));
            doRefresh();
        };

        $scope.clearSearch = function () {
            app.tools.clearReferenceObj($scope.search_tmp);
        };
        //根据 过滤信息和分页信息 刷新课程列表 保持当前查询条件
        var doRefresh = $scope.doRefresh = function () {
            //使用课程模板资源请求数据 筛选条件为当前选择的值
            restAPI.get(angular.extend({columnKey: 'createTime', order: 'desc'}, $scope.filter, $scope.search, $scope.page), function (data) {
                $scope.items = data.data;
                $scope.page.start = data.start;
                $scope.page.count = data.count;
                $scope.page.total = data.total;
            }, function () {
                app.window.alert('数据获取失败!')
            });
        };
        //查询操作 更改查询条件后进行刷新
        $scope.doSearch = function(){
            //更新当前数据的筛选条件
            app.tools.clearReferenceObj($scope.search);
            angular.extend($scope.search, $scope.search_tmp);
            doRefresh();
        };
        doRefresh();
    }]
);