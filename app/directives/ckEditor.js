'use strict';
/*
 * todo 富文本编辑器
 * */
appDirectives.directive('ckEditor', function () {
    return {
        require: '?ngModel',
        link: function(scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0]);

            if (!ngModel) return;


            //与视图进行绑定
            ck.on('pasteState', function() {
                scope.$apply(function() {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            //初始值
            ngModel.$render = function(value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
});