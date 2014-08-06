'use strict';
appControllers.controller('partnersAddressCtrl',
    ['$scope', 'app', function ($scope, app) {
        /**
         * 初始化页面信息
         */
        var Addresses = app.restAPI.addresses;
        var partnerId = app.state.params.id;
        var addresses_edit = {}; //使用map保存进入修改状态前的address list
        $scope.addresses = [];
        $scope.doRefresh = function () {
            Addresses.query({partnerId: partnerId, start: 0, count: 1000}, function (data) {
                $scope.addresses = data.data;
            }, function () {
                app.toaster.pop('error', "机构校区地址信息获取失败", "");
            });
        };
        $scope.doRefresh();

        /**
         * 进入和退出编辑模式
         */
        $scope.editAddress = function ($index) {
            //在edit更改前进行原始address的保存
            var address = angular.copy($scope.addresses[$index]);
            addresses_edit[address.id] = address;
            $scope.addresses[$index].edit = true;
        };
        $scope.cancelEdit = function($index){
            var id = $scope.addresses[$index].id;
            $scope.addresses[$index] = addresses_edit[id];
            delete addresses_edit[id];
        };
        /**
         * address的更新和删除
         */
        $scope.updateAddress = function (index) {
            var address = $scope.addresses[index];
            Addresses.update({ID: address.id}, address, function (data) {
                address.edit = false;
                delete addresses_edit[address.id];
                app.toaster.pop('success', "校区地址更新成功", "");
            }, function () {
                app.toaster.pop('error', "校区地址更新失败", "");
            });
        };
        $scope.deleteAddress = function (index) {
            var address = $scope.addresses[index];
            Addresses.delete({ID: address.id}, function () {
                $scope.addresses.splice(index, 1);//进行本地删除 todo seems slowly
                app.toaster.pop('success', "校区地址删除成功", "");
            }, function () {
                app.toaster.pop('error', "校区地址删除失败", "");
            });
        };


        /**
         * 增加地址
         */
        $scope.init = function(){
            $scope.item = {
                partnerId:partnerId,
                detail:undefined,
                lat:undefined,
                lng:undefined
            };
        };
        $scope.init();
        $scope.addAddress =function () {
            //开始创建
            $scope.creating = true;
            //返回的是创建后的item 带有id
            if(app.test_mode){
                app.toaster.pop('success','创建成功');
                $scope.addresses.push(angular.extend({id:Math.ceil(Math.random()*100000)},$scope.item));
                $scope.init();
                $scope.creating = false;
            }else{
                Addresses.save($scope.item).$promise.then(function(data){
                    app.toaster.pop('success','创建成功');
                    $scope.init();
                    $scope.addresses.push(data);
                },function(){
                    //error
                    app.toaster.pop('error','创建失败');
                }).finally(function(){
                    //创建结束
                    $scope.creating = false;
                });
            }
        };


    }]
);
