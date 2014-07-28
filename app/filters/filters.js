'use strict';

/* Filters */
appFilters
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
