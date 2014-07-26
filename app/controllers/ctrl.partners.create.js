'use strict';
appControllers.controller('partnersCreateCtrl',
    ['$scope','app', function ($scope,app) {
        var Partners = app.restAPI.partners;
        $scope.title = '这里是新建机构页面';
        $scope.partner = {};
        $scope.partner.addressList = [""];
        $scope.addLocation = function () {
            var len = $scope.partner.addressList.length;
            $scope.partner.addressList[len] = "";
        }
        $scope.removeLocation = function (index) {
            while (index < $scope.partner.addressList.length - 1) {
                if ($scope.partner.addressList[index] = $scope.partner.addressList[index + 1]);
                index++;
            }
            $scope.partner.addressList.pop();
        }
        $scope.onFileSelect = function ($files) {

        };
        $scope.submit = function(partner){
            Partners.save(partner, function(data){
                //todo create success to do something
                app.toaster.pop('success', "新建机构成功", "");
                app.log.info('create partner success');
                app.state.go('admin.partners.detail', {id: data.partnerId});

            },function(){
                app.log.error('create error');
            })
        }
    }]
);