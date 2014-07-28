'use strict';

/* Filters */
appFilters
    //以下为需要作为option并且value to text
    .filter('classType', ['app',
        function (app) {
            return function (value) {
                return app.Enum.ClassType[value] || app.Enum.ClassType[value];
            };
        }
    ])
    //以下为仅需要value to text
    .filter('operationText', ['app',
        function (app) {
            return function (op_name) {
//        var status = _.findWhere(app.options.status, {value: input});
//        return status?status['label']:'未知';
                return app.Enum.OperationsText[op_name] || app.Enum.OperationsText[-1];
            };
        }
    ])
    .filter('statusText', ['app',
        function (app) {
            return function (value) {
//        var status = _.findWhere(app.options.status, {value: input});
//        return status?status['label']:'未知';
                return app.Enum.StatusText[value] || app.Enum.StatusText[-1];
            };
        }
    ])
    .filter('categoryText', ['app',
        function (app) {
            return function (value) {
                //todo filter course category
                return value;
            };
        }
    ])
;
