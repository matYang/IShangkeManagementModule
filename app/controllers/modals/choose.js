appControllers.controller('chooseCtrl', ['$scope', 'app', '$modalInstance', 'optionName', 'partner',
    function ($scope, app, $modalInstance, optionName, partner) {
        /**
         * @optionName can be 'partners' and 'templates'*/
        $scope.title = app.Enum.PageText[optionName];
        $scope.page = angular.copy(app.default_page);
        $scope.items = [];
        $scope.selected = {};
        $scope.loading = false;

        var doRefresh = $scope.doRefresh = function () {
            $scope.loading = true;
            var resource = {};
            if (optionName == 'partners') {
                resource = app.restAPI[optionName].get(angular.extend({}, $scope.page));
            } else if (optionName == 'templates') {
                resource = app.restAPI[optionName].get(angular.extend({}, $scope.page, {partnerId: partner && partner.id,status:2}));
            }
            resource.$promise.then(function (data) {
                $scope.items = data.data;
                $scope.page.start = data.start;
                $scope.page.count = data.count;
                $scope.page.total = data.total;
            }, function () {
            })['finally'](function(){
                $scope.loading = false;
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
    }
]);