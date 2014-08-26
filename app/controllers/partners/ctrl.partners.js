'use strict';
appControllers.controller('partnersCtrl',
    ['$scope', 'app', function ($scope, app) {
        //获取课程模板资源
        var restAPI = app.restAPI.partners;
        var pageView = app.PageView.partners;

        $scope.tabs = angular.copy(pageView.tabs);
        $scope.th = pageView.th;
        $scope.page = pageView.pagination;

        //filter选择的值 用户展现当前数据的筛选条件
        $scope.filter = {};
        //filter临时存储 用于用户输入
        $scope.filter_tmp = angular.copy($scope.filter);

        $scope.partnerId = app.rootScope.global.user && app.rootScope.global.user.partnerId;

        //查询前需要清空当前的分页和filter
        var beforeQuery = function () {
            $scope.items = [];
            $scope.page = angular.copy(app.default_page);
            $scope.filter = {};
            $scope.filter_tmp = angular.copy($scope.filter);
        };

        $scope.clearFilter = function () {
            angular.forEach($scope.filter_tmp, function (v, k) {
                $scope.filter_tmp[k] = undefined;
            });
        };
        //根据 过滤信息和分页信息 刷新课程模板列表
        var doRefresh = $scope.doRefresh = function () {
            //使用课程模板资源请求数据 筛选条件为当前选择的值
            restAPI.get(angular.extend({}, $scope.filter_tmp, $scope.page), function (data) {
                //更新当前数据的筛选条件
                $scope.filter = angular.copy($scope.filter_tmp);
                $scope.items = data.data;
                $scope.page.start = data.start;
                $scope.page.count = data.count;
                $scope.page.total = data.total;
            }, function () {
                //error
            });
        };
        doRefresh();
        /******************用户操作事件*****************/
            //课程操作
        $scope.operate = function (id, op) {
            var promise = {};
            if (op == 'delete') {
                promise = restAPI.delete({ID: id});
            }
            else if(op=='submitUpdated'){
                app.state.go('main.partners.detail.edit', {id:id});
                return;
            }
            else {
                promise = restAPI.operate({ID: id, OP: op},{id:id});
            }
            promise.$promise.then(function (data) {
                app.toaster.pop('success', "机构" + id + "操作成功", "");
                doRefresh();
            }, function (data) {
                app.toaster.pop('error', "机构" + id + "操作失败", "");
            })
        };
    }]
);