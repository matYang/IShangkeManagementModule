'use strict';
appControllers.controller('newBookingsCtrl',
    ['$scope','restAPI', function ($scope,restAPI) {
        var Orders = restAPI.orders;
        /*
         * 新订单处理方法
         * 暂时为页面按钮直接操作
         * 方式1：确认对话框
         * 方式2：操作td中进行确认
         * 方式3：可撤销 记入请求列表中 页面销毁时统一进行请求
         * */
        //订单操作
        $scope.operate = function(id,op){
            Orders.operate({ID:id,OP:op},function(){
                //success
            },function(){
               //error
            });
        };

    }]
);
