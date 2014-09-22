'use strict';
appControllers.controller('homeCtrl', ['$scope', 'app',
    function ($scope, app) {
        var Bookings = app.restAPI.bookings;
        var Users = app.restAPI.users;
        var Applys = app.restAPI.applys;
        //今日数据
        $scope.today = {
            bookingCount: 0,
            applyCount: 0,
            registerCount: 0,
            updateTime: 0,
            loading: false
        };

        //刷新今日数据
        var doRefresh = $scope.doRefresh = function () {
            $scope.today.loading = true;
            //获取booking的数据
            Bookings.get({createTimeStart: app.tools.getDeltaDayTimestamp()}).$promise
                .then(function (data) {
                    //获取课程订单数量
                    $scope.today.bookingCount = data.total;
                    return Applys.get({createTimeStart: app.tools.getDeltaDayTimestamp()}).$promise;
                }).then(function (data) {
                    //获取选课申请数量
                    $scope.today.applyCount = data.total;
                    return Users.get({createTimeStart: app.tools.getDeltaDayTimestamp()}).$promise;
                }).then(function(data){
                    //获取注册用户数量
                    $scope.today.loading = false;
                    $scope.today.updateTime = new Date();
                    $scope.today.registerCount = data.total;
                });
        };
        doRefresh();

    }
]);
