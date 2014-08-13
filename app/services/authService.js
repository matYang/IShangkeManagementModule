'use strict';
appServices.factory('Auth',
    ['$rootScope', 'getPartnerById', 'restAPI', '$q', '$location', '$log', 'app',
        function ($rootScope, getPartnerById, restAPI, $q, $location, $log, app) {
            var auth = restAPI.auth;
            return {
                checkUser: function () {
                    var self = this;
//                    var defer = $q.defer();
                    //检测用户的状态（从内存中的用户信息以及调用findSession的） user的初始值为null
//                    if (!$rootScope.global.user) {
//                        auth.get({OP: 'findSession'}, function (user) {
//                            if (user && user.id >= 0) {
//                                $rootScope.global.user = user;
//                                $rootScope.global.isLogin = true;
//                                $log.log('checking user:session found');
//                            }
//                            $log.log('checking user:session not found');
//                            setTimeout(function(){
//                                defer.resolve(true);
//                            },1000);
//
//                        });
//                    } else {
//                        //已登录
//                        defer.resolve(true);
//                        $log.log('checking user:logined');
//                    }
//                    return defer.promise;

                    //sync method to check user
                    var xhr = new window.XMLHttpRequest();//ie>8
                    if (app.test_mode) {
                        xhr.open('GET', '/data/user.json', false);
                    } else {
                        xhr.open('GET', restAPI.makeResourceUrl('user') + '/findSession', false);
                    }
                    xhr.setRequestHeader('content-type', 'application/json');
                    xhr.send();

                    var user = JSON.parse(xhr.responseText);
                    if (user && user.id >= 0) {
                        $rootScope.global.user = user;
                        $rootScope.global.isLogin = true;
                        $log.log('checking user:session found');
                        self.initPartner(); //进行partner信息的初始化
                    } else {
                        $log.log('checking user:session not found');
                    }

                },
                login: function (user) {//date为登录信息对象
                    var self = this;
                    user.remember = user.remember ? 1 : 0;
                    //这里使用promise模式 在controller中调用login先进行以下处理流程
                    var defer = $q.defer();
                    auth.post({ID: 'login', OP: 'reference'}, user, function (result_user) {
                        //根据返回的用户信息设置内存中保存的用户信息 以及cookie
                        $rootScope.global.user = result_user;
                        $rootScope.global.isLogin = true;
                        self.initPartner(); //进行partner信息的初始化
                        $log.log('login success');
                        defer.resolve(result_user);
                    }, function () {
                        defer.reject('login failed');
                    });
                    return defer.promise;
                },
                logout: function () {
                    var self = this;
                    //发送用户注销请求
                    auth.update({ID: $rootScope.global.user.id, OP: 'logout'},{}, function () {
                        //success
                        $log.log('logout success');
                    }, function () {
                        //error
                        $log.log('logout failed');
                    });
                    $rootScope.global.user = null;
                    $rootScope.global.isLogin = false;
                    $location.path('/login');

                },
                initPartner: function () {
                    if (!$rootScope.global.isAdmin //如果是partner
                        && $rootScope.global.isLogin && $rootScope.global.user.partnerId//如果处于登录状态 并且partnerId不为空
                        ) {
                        $log.log('pulling partner info');
                        getPartnerById($rootScope.global.user.partnerId).then(function (partner) {
                            $rootScope.global.user.partner = partner;
                        });

                    }
                }
            }
        }]
);