'use strict';
appControllers.controller('bookingListCtrl',
    ['$scope', 'restAPI', 'app', function ($scope, restAPI, app) {
        var restAPI = restAPI.bookings;
        var pageView = app.PageView['bookings'];
        /**
         * @controll2 中的代码均遵循以下设计
         * 页面上存在标签页的tab可供点击
         * 有输入框可输入搜索 并需要展示当前数据的筛选条件
         * 所有记录集带有分页结果
         *
         * @数据保存:
         * filter--标签页的当前筛选条件
         * search_tmp--用户输入的搜索条件
         * search--当前数据的筛选条件
         * page--当前数据的分页信息
         * ##注意:其中filter和search以及page是pageView中对应值的引用
         * 所以进行清空操作时避免更改引用 应直接更改其中的原始类型
         * @另外页面显示的标签tab需要与后面的filter信息保持一致
         * 1初始化时必须在pageView中配置filter与tabs中active的值保持一致
         * 2在选择tab时立刻更新filter的值与tabs选中的值一致 之后进行数据的更新
         *
         * @操作流程:
         * 1用户进入页面
         *   search filter以及page均和pageView中的值保持一致
         *   根据这些值发送请求加载数据
         * 2用户输入搜索条件(附带标签页的搜索条件)
         *   <code>doSearch()</code>
         *   点击查询时首先清空当前数据items以及当前数据的筛选条件search
         *   将用户输入的条件search_tmp输入到当前的筛选条件search中
         *   发送请求加载数据
         * 3用户点击标签(清空除标签页筛选条件的其它所有条件)
         *   <code>chooseTab()</code>
         *   首先清空当前数据items 用户当前输入的条件search_tmp,当前数据的条件search以及分页
         *   发送请求进行查询
         */

        /*page config*/
        $scope.tabs = pageView.tabs;//页面的tabs应与filter_tab(from tab.value)的值对应
        $scope.th = pageView.th;
        $scope.page = pageView.pagination;

        /*filters*/
        $scope.filter = pageView.filter;//标签页的tab filter
        $scope.search = pageView.search;//filter选择的值 当前数据的筛选条件
        $scope.search_tmp = {};//filter临时存储 用于用户输入

        //todo 这里进行权限管理
//        $scope.partnerId = app.rootScope.global.user && app.rootScope.global.user.partnerId;
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

        //根据 过滤信息和分页信息 刷新课程模板列表 保持当前查询条件
        var doRefresh = $scope.doRefresh = function () {
            //使用课程模板资源请求数据 筛选条件为当前选择的值
            restAPI.get(angular.extend({partnerId: $scope.partnerId}, $scope.filter, $scope.search, $scope.page), function (data) {
                //更新当前数据的筛选条件
                $scope.items = data.data;
                $scope.page.start = data.start;
                $scope.page.count = data.count;
                $scope.page.total = data.total;
            }, function () {
                app.window.alert('数据获取失败!')
            });
        };
        //查询操作 更改查询条件后进行刷新
        $scope.doSearch = function () {
            //更新当前数据的筛选条件
            app.tools.clearReferenceObj($scope.search);
            angular.extend($scope.search, $scope.search_tmp);
            doRefresh();
        };
        //页面首次加载时refresh
        doRefresh();
        /******************用户操作事件*****************/
            //订单操作
        $scope.operate = function (id, op) {
            var promise = {};
            if (op === 'delete') {
                promise = restAPI.delete({ID: id});
            } else {
                promise = restAPI.operate({ID: id, OP: op}, {id: id});
            }
            promise.$promise.then(function (data) {
                app.toaster.pop('success', "订单" + id + "操作成功", "");
                doRefresh();
            }, function (data) {
                app.toaster.pop('error', "订单" + id + "操作失败", "");
            })
        };
    }]
);
