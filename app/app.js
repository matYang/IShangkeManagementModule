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
    $urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })
        .state('course-list', {
            url: '/course',
            templateUrl: 'views/course-list.html',
            controller: 'courseListCtrl'
        })
        .state('course-detail', {
            url: '/course/:id',
            templateUrl: 'views/course-detail.html',
            controller: 'courseDetailCtrl'
        });

//        $locationProvider.html5Mode(true).hashPrefix('!');//remove '#' but all href should be adjusted without '#'

//        $httpProvider.interceptors.push(function ($rootScope, $location, $q, $cookieStore) {
//            return {
//                'responseError': function (rejection) {
//                    // if we're not logged-in to the web service, redirect to login page
//                    if (rejection.status === 401) {
//                        console.log('remove cookie accesss_token and current_user')
//                        $rootScope.accesss_token = ''
//                        $rootScope.current_user = ''
//
//                        $cookieStore.remove('accesss_token');
//                        $cookieStore.remove('current_user');
//                    }
//                    return $q.reject(rejection);
//                }
//            };
//        });
}).constant('app', { //constant 'app' assemble things like restAPI and configs
        version: Date.now()
    }).run(
        ['app', '$rootScope','$location','$timeout','$state',
            function (app, $rootScope,$location,$timeout,$state) {

                var global = $rootScope.global = {
                    isLogin:false,
                    isAdmin:false,
                    user:{}
                }
                //assemble things to reduce inject times in controllers,just need 'app'
                //angular will cache all the inject module
                app.state = $state;
                app.location = $location;
                app.timeout = $timeout;
                app.timeOffset = 0;
                app.timestamp = Date.now() + 0;
                app.rootScope = $rootScope;
                app.checkUser = function () {
                    global.isLogin = !! global.user;
                    global.isAdmin = global.user && global.user.role === 7;//todo  admin role
                };
                app.clearUser = function () {
                    global.user = null;
                    app.checkUser();
                };
                //$rootScope has some global functions to be invoked anywhere
                $rootScope.logout = function () {
                    restAPI.user.get({
                        ID: 'logout'
                    }, function () {
                        global.user = null;
                        app.checkUser();
                        $location.path('/login');
                    });
                };
            }]
    );