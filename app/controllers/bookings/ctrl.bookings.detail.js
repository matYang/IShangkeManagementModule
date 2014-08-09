'use strict';
appControllers.controller('bookingsDetailCtrl',
    ['$scope','restAPI','$state', function ($scope,restAPI,$state) {
        var Bookings = restAPI.bookings;
        var id = $state.params.id;
        $scope.id = id;
        $scope.doRefresh = function(){

            Bookings.get({ID:id},function(data){
                $scope.item = data;
            },function(){
                //error
                app.toaster.pop('error','订单详情获取失败，请刷新重试')
            });
        };
        $scope.doRefresh();
    }]
);
