'use strict';
appControllers.controller('oldBookingsCtrl',
    ['$scope', 'restAPI', 'app', function ($scope, restAPI, app) {
        var restAPI = restAPI.bookings;
        var pageView = app.PageView['oldBookings'];
        $scope.tabs = pageView.tabs;
        $scope.th = pageView.th;
        $scope.page = angular.copy(app.default_page);
        //filter选择的值 用户展现当前数据的筛选条件
        $scope.filter = {
            id: ''    //订单号
        };
        //filter临时存储 用于用户输入
        $scope.filter_tmp = angular.copy($scope.filter);
        //标签页的tab filter
        var filter_tab = {};
        //tab选择事件
        $scope.chooseTab = function (tab) {
            filter_tab = {};
            angular.forEach(tab.value, function (v, k) {
                filter_tab[k] = v;
            });
            app.log.log('filter_tab:'+angular.toJson(filter_tab));
            doRefresh();
        };
        $scope.clearFilter = function () {
            angular.forEach($scope.filter_tmp, function (v, k) {
                $scope.filter_tmp[k] = '';
            });
        };

        var doRefresh = $scope.doRefresh = function () {
            //使用课程模板资源请求数据 筛选条件为当前选择的值
            restAPI.get(angular.extend({}, filter_tab, $scope.filter_tmp, $scope.page), function (data) {
                //更新当前数据的筛选条件
                $scope.filter = angular.copy($scope.filter_tmp);
                $scope.items = data.data;
                $scope.page.index = data.index;
                $scope.page.count = data.count;
                $scope.page.total = data.total;
            }, function () {
                //error
            });
        };
        /******************用户操作事件*****************/
            //订单操作
        $scope.operate = function (id, op) {
            var promise = {};
            if (op === 'delete') {
                promise = restAPI.delete({ID: id});
            } else {
                promise = restAPI.operate({ID: id, OP: op});
            }
            promise.$promise.then(function (data) {
                app.toaster.pop('success', "订单" + id + "操作成功", "");
                doRefresh();
            }, function (data) {
                app.toaster.pop('success', "订单" + id + "操作失败", "");
            })
        };
    }]
);
