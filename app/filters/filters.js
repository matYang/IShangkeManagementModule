'use strict';

/* Filters */
appFilters
    .filter('operationText', ['app',
        function (app) {
            return function (op_name) {
//        var status = _.findWhere(app.options.status, {value: input});
//        return status?status['label']:'未知';
                return app.enum.OperationsText[op_name] || app.enum.OperationsText[-1];
            };
        }
    ])
    .filter('statusText', ['app',
        function (app) {
            return function (value) {
//        var status = _.findWhere(app.options.status, {value: input});
//        return status?status['label']:'未知';
                return app.enum.StatusText[value] || app.enum.StatusText[-1];
            };
        }
    ])
;
