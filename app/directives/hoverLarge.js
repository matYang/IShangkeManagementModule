'use strict';
/*
 * todo 用于鼠标hover在图片上方显示原图
 * 条件：图片的原图的长或宽大于当前img元素的长或宽 否则无变化
 * 显示效果：鼠标hover在图片上方时出现的原图随着鼠标位置变化而变化
 * 其它：使用css3实现特效部分
 * */
appDirectives.directive('hoverLarge', ['$window', function ($window) {
    var link = function (scope, ele, attrs) {
    };
    return {
        restrict: 'A', //just can use like <div scroll-fix>
        scope: false, //default false means parent scope,{} is isolate scope,true is child scope
        link: link
    };
}]);