'use strict';
appControllers.controller('tbookingDetailCtrl',
    ['$scope', 'app', function ($scope, app) {
        var Bookings = app.restAPI.tuanBooking;
        var id = app.state.params.id;
        $scope.id = id;
        $scope.doRefresh = function () {

            Bookings.get({ID: id}, function (data) {
                $scope.b = data;
            }, function () {
                //error
                app.toaster.pop('error', '订单详情获取失败，请刷新重试')
            });
        };
        $scope.doRefresh();
    }]
);
