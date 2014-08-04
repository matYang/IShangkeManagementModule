'use strict';
appControllers.controller('partnersCreateCtrl',
    ['$scope', 'app', function ($scope, app) {
        var Partners = app.restAPI.partners;
        $scope.title = '新建机构';
        $scope.options = angular.copy(app.options); // avoid to change original value
        $scope.partner = {addressList: [""]};
        var addressList = $scope.partner.addressList = [""];
        $scope.addLocation = function () {
            addressList.push("");
        };
        $scope.removeLocation = function (index) {
            addressList.splice(index, 1);
        };
        $scope.clear = function () {
            $scope.partner = {
                addressList: [""]
            };
        };
        $scope.create = function (partner) {
            Partners.save(partner, function (data) {
                app.toaster.pop('success', "新建机构成功", "");
                //todo 提示查看该条信息或者为该信息添加logo 照片或者添加教师
                app.state.go('admin.partners.detail', {id: data.id});

            }, function () {
                app.toaster.pop('error', "新建机构失败", "");
            })
        };
    }]
);