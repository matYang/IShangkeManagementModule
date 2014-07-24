appControllers.controller('chooseCtrl',
    ['$scope', 'app', '$modalInstance', 'name','institution', function ($scope, app, $modalInstance, name,institution) {
        //name can be 'institution' and 'template'
        //can get institution id from institution
        //todo then you can has the right api to get the options
        $scope.items = [];
        var getItems = $scope.getItems = function () {
            //todo use restAPI to get options
            $scope.items = [
                {label: '方法', value: 12},
                {label: '订单', value: 54}
            ];
        };
        getItems();
        $scope.selected = {};
        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]
);