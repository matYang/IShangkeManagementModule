'use strict';
appServices.factory('Auth',
    ['$rootScope', '$cookieStore', 'restAPI', '$q', '$location',
        function ($rootScope, $cookieStore, restAPI, $q, $location) {
            var auth = restAPI.auth;
            return {
                //该方法主要用于同步内存和cookie中的状态
                checkUser: function () {
                    //检测用户的状态（从内存中的用户信息以及cookie中的信息） user的初始值为null
                    if (!$rootScope.global.user) {
                        //todo 这里的cookie的key name需要确认
                        $rootScope.global.user = $cookieStore.get('user');
                    }
                    //内存中的用户登录状态 这里根据基于上一步的用户信息是否存在判断是否登录
                    $rootScope.global.isLogin = !!$rootScope.global.user;
                    //这里根据用户的role重新设置登录者的身份 暂时只做admin
                    $rootScope.global.isAdmin = $rootScope.global.isLogin && $rootScope.global.user.group.indexOf('admin') == 0;
                    console.log('check user:' + JSON.stringify($rootScope.global));
                },
                login: function (data) {//date为登录信息对象 包含username和password
                    //这里使用promise模式 在controller中调用login先进行以下处理流程
                    var defer = $q.defer();
                    var self = this;
                    auth.post(data, function (user) {
                        //根据返回的用户信息设置内存中保存的用户信息 以及cookie
                        console.log(user);
                        $rootScope.global.user = user;//for test 这里应使用result中返回的用户信息
                        self.checkUser();
                        defer.resolve('login success');
                    }, function () {
                        defer.reject('login failed');
                    });
                    return defer.promise;
                },
                logout: function () {
                    var self = this;
                    //发送用户注销请求
                    auth.delete({}, function () {
                        //success
                    }, function () {
                        //error
                    });
                    //清除cookie中存储的信息 以及内存中的用户信息 并返回到登录页面
                    $cookieStore.remove('access_token');
                    $cookieStore.remove('user');
                    $rootScope.global.user = null;
                    $location.path('/login');
                }
            }
        }]
);