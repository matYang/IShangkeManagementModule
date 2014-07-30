'use strict';
/*
 * todo 用于面板在滚动时切换为固定状态
 * */
appDirectives.directive('scrollFix', ['$window', function ($window) {
    var link = function (scope, ele, attrs) {
        var marginTop = 20;
        var fix_height = $window.innerHeight - 2 * marginTop;
        var offsetTop = ele[0].offsetTop - marginTop;
        var offsetLeft = ele[0].offsetLeft;
        var offsetWidth = ele[0].offsetWidth;
        var act = function () {

            var top = $window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
            var style = {};
            if (top > offsetTop) {
                style = {
                    'position': 'fixed',
                    'top': marginTop,
                    'left': offsetLeft,
                    'width': offsetWidth,
                    'height': fix_height,
                    'overflow': 'auto'
                };
            } else {
                style = {
                    'position': null,
                    'top': null,
                    'left': null,
                    'width': null,
                    'height': null
                };
            }
            ele.css(style);
        };
        angular.element(document).bind('scroll', act);
    };
    return {
        restrict: 'A', //just can use like <div scroll-fix>
        scope: {},
//        controller: 'TabsetController',
//        templateUrl: 'template/tabs/tabset.html',
        link: link
    };
}]);