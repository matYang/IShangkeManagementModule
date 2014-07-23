'use strict';
appControllers.controller('bookingsDetailCtrl',
    ['$scope','restAPI','$state', function ($scope,restAPI,$state) {
        var Bookings = restAPI.booking;
        var id = $state.params.id;

        //刷新列表
        $scope.doRefresh = function(){

            Bookings.get({ID:id},function(data){
                $scope.item = data;
            },function(){
                //error
            });
        };
        $scope.doRefresh();
    }]
);