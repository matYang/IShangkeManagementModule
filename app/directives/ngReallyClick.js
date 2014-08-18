'use strict';
/*
 *
 * */
appDirectives.directive('ngReallyClick', ['$window',function($window) {
    return {
        restrict: 'A',
        scope:{
            message:'@ngReallyMessage',
            click:'&ngReallyClick' //get the click function from the current scope
        },
        link: function(scope, element, attrs) {
            console.log(scope);
            element.bind('click', function() {
                var message = attrs.ngReallyMessage;
                if (message && $window.confirm(message)) {
                    scope.$apply(scope.click);
                }
            });
        }
    }
}]);