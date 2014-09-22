'use strict';
appControllers.controller('homeCtrl', ['$scope', 'app',
    function ($scope, app) {
        var Bookings = app.restAPI.bookings;
        var Users = app.restAPI.users;
        //今日数据
        $scope.today = {
            bookingCount: 0,
            applyCount: 0,
            updateTime: 0,
            loading: false
        };

        //刷新今日数据
        var doRefresh = $scope.doRefresh = function () {
            $scope.today.loading = true;
            //获取booking的数据
            Bookings.get({createTimeStart: app.tools.getDeltaDayTimestamp()}, function (data) {

                $scope.today.bookingCount = data.total;
                return Users.get({createTimeStart: app.tools.getDeltaDayTimestamp()})
            }).$promise.then(function (data) {
                    $scope.today.loading = false;
                    $scope.today.updateTime = new Date();
                    $scope.today.registerCount = data.total;
                });
            //todo 获取选课申请的数据

        };
        doRefresh();

    }
]);
