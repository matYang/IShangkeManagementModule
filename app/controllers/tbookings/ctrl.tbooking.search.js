'use strict';
appControllers.controller('tbookingSearchCtrl',
    ['$scope', 'restAPI', 'app', function ($scope, restAPI, app) {
        var restAPI = restAPI.tuanBooking;
        $scope.th = app.PageView['common'].bookingTh;
        var init = function () {

            $scope.items = [];
            $scope.page = angular.copy(app.default_page);
            //filter选择的值 用户展现当前数据的筛选条件
            $scope.filter = {};
            //filter临时存储 用于用户输入
            $scope.filter_tmp = angular.copy($scope.filter);
        };
        init();

        $scope.clearFilter = function () {
            angular.forEach($scope.filter_tmp, function (v, k) {
                $scope.filter_tmp[k] = undefined;
            });
        };

        var doRefresh = $scope.doRefresh = function () {
            var filter_tmp = angular.copy($scope.filter_tmp);
            if (filter_tmp.createTimeEnd) {//结束日期应包括这天结束
                filter_tmp.createTimeEnd += 24 * 3600 * 1000;
            }
            //使用课程模板资源请求数据 筛选条件为当前选择的值
            restAPI.get(angular.extend({columnKey: 'createTime', order: 'desc'}, filter_tmp, $scope.page), function (data) {
                //更新当前数据的筛选条件
                $scope.filter = angular.copy($scope.filter_tmp);
                $scope.items = data.data;
                $scope.page.start = data.start;
                $scope.page.count = data.count;
                $scope.page.total = data.total;
            }, function () {
                app.toaster.pop('error', '查询失败,请稍后再试');
            });
        };
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

        $scope.open = function ($event, id) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope['opened' + id] = true;
        };

    }]
);
