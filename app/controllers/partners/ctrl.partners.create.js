'use strict';
appControllers.controller('partnersCreateCtrl',
    ['$scope','app', function ($scope,app) {
        var Partners = app.restAPI.partners;
        $scope.title = '这里是新建机构页面';
        $scope.partner = {};
        var new_address = ""; //todo单个地址的model 添加经纬度
        var addressList = $scope.partner.addressList = [new_address];
        $scope.addLocation = function () {
            addressList.push(new_address);
        };
        $scope.removeLocation = function (index) {
            addressList.splice(index,1);
//            while (index < $scope.partner.addressList.length - 1) {
//                if ($scope.partner.addressList[index] = $scope.partner.addressList[index + 1]);
//                index++;
//            }
//            $scope.partner.addressList.pop();
        };
        $scope.create = function(partner){
            Partners.save(partner, function(data){
                app.toaster.pop('success', "新建机构成功", "");
                //todo 提示查看该条信息或者为该信息添加logo 照片或者添加教师
                app.state.go('admin.partners.detail', {id: data.id});

            },function(){
                app.toaster.pop('error', "新建机构失败", "");
            })
        };
    }]
);