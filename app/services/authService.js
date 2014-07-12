'use strict';
appServices.factory('Auth',
    ['$rootScope', '$cookieStore','$http', '$q', function ($rootScope, $cookieStore,$http, $q) {
        return {
            checkUser: function () {
                //check 'user' from cookie store
                if (!$rootScope.global.user) {
                    $rootScope.global.user = $cookieStore.get('user');
                }
                $rootScope.global.isLogin = !!$rootScope.global.user;
                $rootScope.global.isAdmin = !!($rootScope.user && $rootScope.global.user.role === 7);//todo  admin role
                console.log($rootScope.global);
            },
            login: function (data) {
                var defer = $q.defer();
                //todo confirm login api
                $http.post('api/login',data,function(result){
                    console.log('http 200');
                    $rootScope.global.user = result.user;
                    defer.resolve('login success');
                    this.checkUser();
                },function(){
                    defer.reject('login failed');
                    this.checkUser();
                });

                return defer.promise;
            },
            logout: function () {
                //todo send logout request
                $cookieStore.remove('access_token');
                $cookieStore.remove('user');
                $rootScope.global.user = null;
                app.checkUser();
                $location.path('/login');
            }
        }
    }]
);