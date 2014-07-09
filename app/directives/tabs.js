'use strict';

/* Filters */
appDirectives.directive('tabs', function() {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        scope: {},
//        controller: 'TabsetController',
//        templateUrl: 'template/tabs/tabset.html',
        link: function(scope, element, attrs) {
            scope.type = angular.isDefined(attrs.type) ? scope.$parent.$eval(attrs.type) : 'tabs';
        }
    };
});