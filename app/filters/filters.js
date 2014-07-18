'use strict';

/* Filters */
appFilters.filter('checkStatus', ['app', function (app) {
    return function (input) {
        var status = _.findWhere(app.options.status, {value: input});
        return status?status['label']:'未知';
    };
}]);
