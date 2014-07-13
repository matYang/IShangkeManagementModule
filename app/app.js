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
        })
        .state('admin.new_orders', {
            url: '/new_orders',
            templateUrl: 'views/admin/new_orders.html',
            controller: 'newOrdersCtrl'
        })
        .state('admin.old_orders', {
            url: '/old_orders',
            templateUrl: 'views/admin/old_orders.html',
            controller: 'oldOrdersCtrl'
        })
        .state('admin.courses', {
            url: '/courses',
            templateUrl: 'views/admin/courses.html',
            controller: 'coursesCtrl'
        })
        .state('admin.templates', {
            url: '/templates',
            templateUrl: 'views/admin/templates.html',
            controller: 'templatesCtrl'
        });

//        $locationProvider.html5Mode(true).hashPrefix('!');//remove '#' but all href should be adjusted without '#'

}).constant('app', { //constant 'app' assemble things like restAPI and configs
        version: Date.now()
    }).run(
        ['app', '$rootScope', '$location', '$timeout', '$state', 'Auth',
            function (app, $rootScope, $location, $timeout, $state, Auth) {
                app.test_mode = true;
                //$rootScope has some global functions and params
                $rootScope.global = {
                    user: undefined,
                    isLogin: false,
                    isAdmin: true
                };
                if (app.test_mode) {
                    $rootScope.global.user = {username: 'zhouwenjie'};
                }
                //check user login status to init $rootScope.global
                Auth.checkUser();
                $rootScope.logout = function () {
                    Auth.logout();
                    Auth.checkUser();
                };

                //assemble things to reduce inject times in controllers,just need 'app'
                //for angular will cache all the inject module
                app.state = $state;
                app.rootScope = $rootScope;
                app.timeout = $timeout;
                app.timeOffset = 0;
                app.timestamp = Date.now() + 0;

                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                    console.log('route change');

//                        event.preventDefault();
                    // transitionTo() promise will be rejected with
                    // a 'transition prevented' error
                    var isLoginAsAdmin = $rootScope.global.isLogin && $rootScope.global.isAdmin;
                    var isToLoginPage = $state.get('login') == toState;
                    var isFromLoginPage = $state.get('login') == fromState;
                    if (isToLoginPage && isLoginAsAdmin) {
                        //just as the same as the issue below
                        //neither from the login page nor just into the site
                        if (fromState.name && !isFromLoginPage) {
                            event.preventDefault();
                            return;
                        }
                        //admin already login don't need to go to login page
                        console.log('already login as admin:TO admin.home');
                        $location.path('/admin');
                    }
                    if (!isToLoginPage && !isLoginAsAdmin) {
                        //for a bug when user change the route in the address input frame
                        // the view will not render correctly, you need to prevent from changing router when in login page
                        if (isFromLoginPage) {
                            event.preventDefault();
                            return;
                        }
                        //admin not login can not go anywhere except login page
                        console.log('not login as admin:TO login');
                        $location.path('/login');
                    }
                });
            }]
    );