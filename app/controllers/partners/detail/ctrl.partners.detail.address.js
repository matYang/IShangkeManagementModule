'use strict';
appControllers.controller('partnersAddressCtrl',
    ['$scope','restAPI','$state', 'app', function ($scope, restAPI, $state, app) {
        var Addresses = restAPI.addresses, Partners = restAPI.partners;
        $scope.newAddress = {};
        var id = $state.params.id;
        $scope.doRefresh = function() {
            Partners.get({ID:id},function(data){
                $scope.item = data;
            },function(){
                //error
            });
        };

        $scope.update = function ($index) {
            Address.update($scope.item.addressList[$index], function(response){
                app.toaster.pop('success', "地址更新成功", "");
                app.log.info('address update success');
            }, function () {
                app.log.error('update error');
            });
        }
        $scope.create = function ($index) {
            Address.save($scope.newAddress, function(response){
                app.toaster.pop('success', "地址新建成功", "");
                app.log.info('address creation success');
                $scope.doRefresh();
                $scope.newAddress = {}
            }, function () {
                app.log.error('update error');
            });
        }
        $scope.delete = function ($index) {
            Address.remove({ID: item.addressList[$index].id}, function(response){
                app.toaster.pop('success', "地址新建成功", "");
                app.log.info('address creation success');
                $scope.doRefresh();
            }, function () {
                app.log.error('update error');
            });
        }
    }]
);

