'use strict';
appControllers.controller('courseDetailCtrl',
    ['$scope','$stateParams', function ($scope, $stateParams) {
        $scope.title = 'course detail page of coorse id>' + $stateParams.id;
    }]
);
