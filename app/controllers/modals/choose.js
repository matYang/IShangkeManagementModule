appControllers.controller('chooseCtrl',
    ['$scope', 'app', '$modalInstance', 'optionName', 'partner', function ($scope, app, $modalInstance, optionName, partner) {
        /**
         * @optionName can be 'partners' and 'templates'*/
            //todo then you can has the right api to get the options
        console.log(optionName);
        console.log(partner);
        $scope.title = app.Enum.PageText[optionName];
        $scope.page = angular.copy(app.default_page);
        $scope.items = [];
        $scope.selected = {};

        var doRefresh = $scope.doRefresh = function () {
            var resource = {};
            if(optionName == 'partners'){
                resource = app.restAPI[optionName].get(angular.extend({},$scope.page));
            }else if(optionName =='templates'){
                resource = app.restAPI[optionName].get(angular.extend({},$scope.page,{parterId: partner && partner.id}));
            }
            resource.$promise.then(function (data) {
                $scope.items = data.data;
                $scope.page.start = data.start;
                $scope.page.count = data.count;
                $scope.page.total = data.total;
            }, function () {
            });
        };
        doRefresh();
        //下一页
        $scope.nexPage = function () {
            console.log('next page');
            //存在下一页
            if ($scope.page.start + $scope.page.count < $scope.page.total) {
                $scope.page.start += $scope.page.count;
                $scope.doRefresh();
            }
        };
        //上一页
        $scope.prePage = function () {
            console.log('pre page');
            if ($scope.page.start >= $scope.page.count) {
                $scope.page.start -= $scope.page.count;
                $scope.doRefresh();
            }

        };
        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]
);