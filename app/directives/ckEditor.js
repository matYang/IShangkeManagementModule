'use strict';
/*
 * todo 富文本编辑器
 * */
appDirectives.directive('ckEditor', function () {
    return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
            var EMPTY_HTML = '<p></p>',
                isReady = false;
            //first we should config the editor
            var options = {
                toolbar: 'full',
                toolbar_full: [
                    { name: 'styles', items: [ 'Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat', 'Undo', 'Redo'  ] },
                    { name: 'basicstyles',
                        items: [ 'Bold', 'Italic', 'Strike', 'Underline' ] },
                    { name: 'paragraph', items: [ 'BulletedList', 'NumberedList'] },
                    { name: 'editing', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
                    { name: 'tools', items: [] },
//                    '/',

                    { name: 'insert', items: [ 'Image', 'Table'] },
//                    { name: 'forms', items: [ 'Outdent', 'Indent' ] },
                    //                    { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
//'SpecialChar'   'Blockquote'
//                    { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
                    { name: 'document', items: ['Maximize' , 'PageBreak', 'Source' ] }
                ],
                disableNativeSpellChecker: false,
                uiColor: '#FAFAFA',
                width: '100%'
            };
            options = angular.extend(options, scope[attrs['ck-editor']]);




            var ck = CKEDITOR.replace(element[0],options);
            var setModelData  = function() {
                scope.$apply(function() {
                    ngModel.$setViewValue(ck.getData());
                });
            };


            //与视图进行绑定
//            ck.on('pasteState',setModelData);
            ck.on('change',setModelData);

            //ck editor ready以后render data
            ck.on('instanceReady', function() {
                scope.$apply(function() {
                    ck.setData(ngModel.$viewValue);
                });

                ck.document.on("keyup", setModelData);
            });
            //此处由 ngModel进行数据的render 如果ck editor没有ready页面将会显示不出任何数据
            ngModel.$render = function() {
                ck.setData(ngModel.$viewValue);
            };


            element.bind('$destroy', function () {
                ck.destroy(
                    false
                    //If the instance is replacing a DOM element,
                    // this parameter indicates whether or not to update the element with the instance contents.
                );
            });

        }
    };
});