'use strict';
appServices.factory('Auth',
    ['$rootScope', '$cookieStore', '$http', '$q', '$location',
        function ($rootScope, $cookieStore, $http, $q, $location) {
            return {
                checkUser: function () {

                    //check 'user' from cookie store
                    if (!$rootScope.global.user) {
                        $rootScope.global.user = $cookieStore.get('user');
                    }
                    $rootScope.global.isLogin = !!$rootScope.global.user;
//                $rootScope.global.isAdmin = !!($rootScope.user && $rootScope.global.user.role === 7);//todo  admin role
                    console.log('check user:' + JSON.stringify($rootScope.global));
                },
                login: function (data) {
                    var defer = $q.defer();
                    var self = this;
                    //todo confirm login api
                    $http.post('api/login', data).success(function (result) {
                        //todo set user from result data
                        $rootScope.global.user = data;//for test
                        self.checkUser();
                        defer.resolve('login success');
                    }).error(function () {
                            defer.reject('login failed');
                        }).finally(function () {

                        });

                    return defer.promise;
                },
                logout: function () {
                    var self = this;
                    //todo send logout request
                    $cookieStore.remove('access_token');
                    $cookieStore.remove('user');
                    $rootScope.global.user = null;
                    $location.path('/login');
                }
            }
        }]
);