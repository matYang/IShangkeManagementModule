'use strict';
appControllers.controller('bookingDetailCtrl',
    ['$scope', 'app', function ($scope, app) {
        var Bookings = app.restAPI.bookings;
        var Users = app.restAPI.users;
        var id = app.state.params.id;
        $scope.id = id;
        $scope.doRefresh = function () {

            Bookings.get({ID: id}, function (data) {
                data.course.schooltimeDay = app.tools.toSchoolTimeList(data.course.schooltimeDay, app.Enum.schooltimeDay);
                data.course.schooltimeWeek = app.tools.toSchoolTimeList(data.course.schooltimeWeek, app.Enum.schooltimeWeek);

                $scope.b = data;
                Users.get({ID: data.userId}, function (user) {
                    $scope.u = user
                })

            }, function () {
                //error
                app.toaster.pop('error', '订单详情获取失败，请刷新重试')
            });
        };
        $scope.doRefresh();
    }]
);
