'use strict';
appControllers.controller('homeCtrl', ['$scope', 'app',
    function ($scope, app) {
        var Bookings = app.restAPI.bookings;
        var TBookings = app.restAPI.tuanBooking;
        var Users = app.restAPI.users;
        var Apply = app.restAPI.apply;
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
            TBookings.get({createTimeStart: app.tools.getDeltaDayTimestamp()}).$promise
                .then(function (data) {
                    //获取团购订单数量
                    $scope.today.bookingCount = data.total;
                    return Bookings.get({createTimeStart: app.tools.getDeltaDayTimestamp()}).$promise;
                })
                .then(function (data) {
                    //获取试听订单数量
                    $scope.today.bookingCount = data.total;
                    return Apply.get({createTimeStart: app.tools.getDeltaDayTimestamp()}).$promise;
                })
                .then(function (data) {
                    //获取选课申请数量
                    $scope.today.applyCount = data.total;
                    return Users.get({createTimeStart: app.tools.getDeltaDayTimestamp()}).$promise;
                })
                .then(function(data){
                    //获取注册用户数量
                    $scope.today.loading = false;
                    $scope.today.updateTime = new Date();
                    $scope.today.registerCount = data.total;
                });
        };
        doRefresh();

    }
]);
