'use strict';
appControllers.controller('partnersEditCtrl',
    ['$scope','restAPI','$state', function ($scope,restAPI,$state) {
        var Partners = restAPI.partners;
        var id = $state.params.id;

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
        
        $scope.doRefresh = function(){
            Partners.get({ID:id}, function(data){
                $scope.partner = data;
            }, function () {
                //error
            });
        };
        $scope.edit = function () {
            Partners.put($scope.partner, function(data){
                app.toaster.pop('success', "机构创建成功", "");
                app.log.info('create partner success');
                app.state.go('admin.partners.detail', {data: id});
            });
        };
        $scope.cancel = function () {
            app.state.go('admin.partners.detail', {data: id});
        };
        $scope.doRefresh();
    }]
);

