'use strict';

/* Filters */
appFilters
    /**
     * 图片地址的filter
     * @input array [imageName,partner_id]
     * @return string <absolute image url>
     */
    .filter('smallImg', ['app',
        function (app) {
            return function (value) {
                return app.small_img + value[1]+'/'+value[0];
            };
        }
    ])
    .filter('largeImg', ['app',
        function (app) {
            return function (value) {
                return app.large_img + value[1]+'/'+value[0];
            };
        }
    ])

    //以下为需要作为option并且value to text
    /*班级类型*/
    .filter('classType', ['app',
        function (app) {
            return function (value) {
                return app.Enum.classType[value];
            };
        }
    ])
    //以下为仅需要value to text
    /*记录可操作的按钮text*/
    .filter('operationText', ['app',
        function (app) {
            return function (op_name) {
                return app.Enum.OperationsText[op_name] || app.Enum.OperationsText[-1];
            };
        }
    ])
    /*记录的状态 包括订单状态、课程和课程模板的状态*/
    .filter('statusText', ['app',
        function (app) {
            return function (value) {
//        var status = _.findWhere(app.options.status, {value: input});
//        return status?status['label']:'未知';
                return app.Enum.StatusText[value] || app.Enum.StatusText[-1];
            };
        }
    ])
    /*课程或者课程模板属于的类目*/
    .filter('categoryText', ['app',
        function (app) {
            return function (value) {
                //todo filter course category
                return value;
            };
        }
    ])
;
