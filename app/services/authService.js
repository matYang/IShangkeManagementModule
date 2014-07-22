'use strict';
appServices.factory('Auth',
    ['$rootScope', '$cookieStore', '$http', '$q', '$location',
        function ($rootScope, $cookieStore, $http, $q, $location) {
            return {
                checkUser: function () {
                    //检测用户的状态（从内存中的用户信息以及cookie中的信息）
                    if (!$rootScope.global.user) {
                        $rootScope.global.user = $cookieStore.get('user');
                    }
                    //内存中的用户登录状态 这里根据用户信息是否存在判断是否登录，也可根据
                    $rootScope.global.isLogin = !!$rootScope.global.user;
                    //future 这里根据用户的role设置登录者的权限 暂时只做admin
//                    $rootScope.global.isAdmin = !!($rootScope.user && $rootScope.global.user.role === 7);
                    console.log('check user:' + JSON.stringify($rootScope.global));
                },
                login: function (data) {
                    //这里使用promise模式 在controller中调用login先进行一下处理流程
                    var defer = $q.defer();
                    var self = this;
                    //todo 需要确定用户登录的api 以及fake api 并在assert中的data文件夹中加入fake json数据用于返回
                    $http.post('api/login', data).success(function (result) {
                        //todo 根据返回的用户信息设置内存中保存的用户信息
                        $rootScope.global.user = data;//for test 这里应使用result中返回的用户信息
                        //todo 这里还需要设置cookie
                        $cookieStore.put('access_token',result.access_token);
                        $cookieStore.put('user',result.user);
                        self.checkUser();
                        defer.resolve('login success');
                    }).error(function () {
                            defer.reject('login failed');
                        });

                    return defer.promise;
                },
                logout: function () {
                    var self = this;
                    //todo 这里需要发送用户退出请求

                    //清除cookie中存储的信息 以及内存中的用户信息 并返回到登录页面
                    $cookieStore.remove('access_token');
                    $cookieStore.remove('user');
                    $rootScope.global.user = null;
                    $location.path('/login');
                }
            }
        }]
);