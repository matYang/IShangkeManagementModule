'use strict';
/* App Runtime */
app.run(
    ['app', '$rootScope', '$cookieStore', '$location', '$timeout', '$state', 'Auth', 'restAPI',
        '$log', 'toaster', 'ENUM','TH',
        function (app, $rootScope, $cookieStore, $location, $timeout, $state, Auth, restAPI, $log, toaster, ENUM,TH) {
            //$rootScope has some global functions and params
            $rootScope.$state = $state;
            $rootScope.global = {
                user: null,
                isLogin: false,
                isAdmin: true
            };
            if (app.test_mode) {
                var user = {}
                if ($rootScope.port == 'admin')user = {username: 'admin', group: 'admin_group'};
                else if ($rootScope.port == 'partner')user = {username: 'partner', group: 'partner_group'};

                $rootScope.global.user = user;
                $cookieStore.put('user', $rootScope.global.user);
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
            app.toaster = toaster;
            app.log = $log; //$log can log/info/warn/error
            app.enum = ENUM;
            app.th = TH;
            app.restAPI = restAPI;
            app.rootScope = $rootScope;
            app.timeout = $timeout;
            app.timeOffset = 0;
            app.timestamp = Date.now() + 0;

            //router的权限控制
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                console.log('route change');

//                        event.preventDefault();
                // transitionTo() promise will be rejected with
                // a 'transition prevented' error
                var isLogin = $rootScope.global.isLogin;
                var isToLoginPage = $state.get('login') == toState;
                var isFromLoginPage = $state.get('login') == fromState;
                /*需要处理以下三种情况*/
                //已登录用户想要进入登录页面
                if (isToLoginPage && isLogin) {
                    //已登录用户在非登录页面要进入登录页面 不触发路由改变
                    if (fromState.name && !isFromLoginPage) {
                        event.preventDefault();
                        return;
                    }
                    //admin already login don't need to go to login page
                    $log.info('already login as admin:TO admin.home');
                    $location.path('/admin');
                }
                //未登录用户想要进入非登录页面
                else if (!isToLoginPage && !isLogin) {
                    //for a bug when user change the route in the address input frame
                    // the view will not render correctly, you need to prevent from changing router when in login page
                    //未登录用户在登录页面要进入非登录页面 不触发路由改变
                    if (isFromLoginPage) {
                        event.preventDefault();
                        return;
                    }
                    //user not login can not go anywhere except login page
                    $log.warn('not login:TO login');
                    $location.path('/login');
                }
                //处理已登录用户的权限 带有admin权限的路由需要验证用户的权限(默认权限为partner)
                //该情况与第一种情况存在交际交集
                if (toState.access && toState.access == 'admin' && !$rootScope.global.isAdmin) {

                    $log.warn('Insufficient privilege');
                    //如果是第一次进入网站 则进入admin首页（未登录情况在情况2中已处理）
                    if (!fromState.name) $location.path('/admin');
                    //同样不触发路由
                    else {
                        event.preventDefault();
                        return;
                    }
                }
            });
        }]
);