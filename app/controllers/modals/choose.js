appControllers.controller('chooseCtrl',
    ['$scope', 'app', '$modalInstance', 'optionName','partner', function ($scope, app, $modalInstance, optionName,partner) {
        //name can be 'partner' and 'template'
        //todo then you can has the right api to get the options
        $scope.items = [];
        var getItems = $scope.getItems = function () {
            //todo use restAPI to get options
//            var resource = app.restAPI.option['optionName'].get({option_name:'',parter_id:'');
//            resource.$promise.then(function(data){$scope.items = data;},function(){});

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