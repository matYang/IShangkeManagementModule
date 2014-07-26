'use strict';

/* App Module */

var app = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
//    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'w5c.validator',
    'toaster',

    'appRoutes',
    'appServices',
    'appControllers',
    'appDirectives',
    'appFilters',
    'angularFileUpload'
]);

var appServices = angular.module('appServices', []);
var appControllers = angular.module('appControllers', []);
var appDirectives = angular.module('appDirectives', []);
var appFilters = angular.module('appFilters', []);