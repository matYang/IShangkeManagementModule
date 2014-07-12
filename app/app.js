'use strict';

/* App Module */

var app = angular.module('app', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',

    'appServices',
    'appControllers',
    'appDirectives',
    'appFilters'
]);
var appServices = angular.module('appServices', []);
var appControllers = angular.module('appControllers', []);
var appDirectives = angular.module('appDirectives', []);
var appFilters = angular.module('appFilters', []);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/admin");
    $stateProvider
        //登录
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })
        //已登录
        .state('admin', {
            abstract: true,
            url: '/admin',
            templateUrl: 'views/admin.html',
            controller: 'homeCtrl'
        })
        .state('admin.home', {
            url: '',
            templateUrl: 'views/admin/home.html',
            controller: 'homeCtrl'
        });

//        $locationProvider.html5Mode(true).hashPrefix('!');//remove '#' but all href should be adjusted without '#'

}).constant('app', { //constant 'app' assemble things like restAPI and configs
        version: Date.now()
    }).run(
        ['app', '$rootScope', '$location', '$timeout', '$state','Auth',
            function (app, $rootScope, $location, $timeout, $state,Auth) {
                //$rootScope has some global functions and params
                $rootScope.global= {
                    user:undefined,
                    isLogin: false,
                    isAdmin: false
                };
                //check user login status to init $rootScope.global
                Auth.checkUser();
                $rootScope.logout = Auth.logout;


                //assemble things to reduce inject times in controllers,just need 'app'
                //for angular will cache all the inject module
                app.state = $state;
                app.rootScope = $rootScope;
                app.timeout = $timeout;
                app.timeOffset = 0;
                app.timestamp = Date.now() + 0;


                $rootScope.$on('$stateChangeStart',
                    function (event, toState, toParams, fromState, fromParams) {
//                        event.preventDefault();
                        // transitionTo() promise will be rejected with
                        // a 'transition prevented' error

                        console.log('route change start');
                    });
            }]
    );