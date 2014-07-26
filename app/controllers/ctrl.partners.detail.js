'use strict';
appControllers.controller('partnersDetailCtrl',
    ['$scope','restAPI','$state', 'app', function ($scope,restAPI,$state) {
        var Partners = restAPI.partners;
        var id = $state.params.id;
        $scope.id = id;
        $scope.doRefresh = function(){
            Partners.get({ID:id},function(data){
                $scope.partner = data;
            }, function () {
                //error
                app.toaster.pop('error', "该机构不存在", "");
            });
        };
        $scope.doRefresh();
    }]
);
