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
var appServices = angular.module('appServices',[]);
var appControllers = angular.module('appControllers', []);
var appDirectives = angular.module('appDirectives', []);
var appFilters = angular.module('appFilters', []);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'homeCtrl'
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

//        $locationProvider.html5Mode(true).hashPrefix('!');//remove '#' but all href should be adjusted

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
        ['app', '$rootScope', function (app, $rootScope) {
            //global loading
            $rootScope.loading = {
                show: false
            };
            $rootScope.goBack = function () {
                $window.history.go(-1);
            };
        }]
    );