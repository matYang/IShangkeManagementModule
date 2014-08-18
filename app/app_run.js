'use strict';
/* App Runtime */
app.run(
    ['app', '$rootScope', '$cookieStore', '$localStorage', '$location', '$window', '$timeout', '$state', 'Auth', 'restAPI',
        '$log', '$upload', '$modal', '$parse', 'toaster', 'Enum', 'PageView', 'operateService', 'promiseGet', 'cache', 'getCategory', 'tools',
        'getPartnerById', 'getTemplateById', 'getLocation',
        function (app, $rootScope, $cookieStore, $localStorage, $location, $window, $timeout, $state, Auth, restAPI, $log, $upload, $modal, $parse, toaster, Enum, PageView, operateService, promiseGet, cache, getCategory, tools, getPartnerById, getTemplateById, getLocation) {

            if (app.test_mode) {
                $log.info('RUN IN TEST MODE');
            }
            //$rootScope has some global functions and params
            $rootScope.$state = $state;
            $rootScope.global = {
                user: null,
                isLogin: false,
                isAdmin: $rootScope.port === 'admin'
            };
//            if (app.test_mode) {
//                var user = {};
//                if ($rootScope.global.isAdmin)user = {name: 'admin'};
//                else if ($rootScope.global.isAdmin)user = {name: 'partner'};
//                $rootScope.global.user = user;
//            }
            $rootScope.logout = function () {
                Auth.logout();
            };

            //assemble things to reduce inject times in controllers,just need 'app'
            //for angular will cache all the inject module
            app.state = $state;
            app.window = $window;
            app.storage = $localStorage;
            app.toaster = toaster;
            app.log = $log; //$log can log/info/warn/error
            app.$upload = $upload;
            app.modal = $modal;
            app.parse = $parse;
            app.Enum = Enum;
            app.PageView = PageView;
            app.cache = cache;
            app.restAPI = restAPI;
            app.promiseGet = promiseGet;
            app.tools = tools;
            /**/
            app.getLocation = getLocation;
            app.getCategory = getCategory; //获取目录数据的promise 使用了内存缓存
            app.getPartnerById = getPartnerById; //
            app.getTemplateById = getTemplateById; //
            /**/
//            app.exec_operate = operateService.exec_operate;//todo 订单 模板 课程等的操作 待完成
            app.rootScope = $rootScope;
            app.timeout = $timeout;
            app.timeOffset = 0;
            app.timestamp = Date.now() + 0;
            app.options = {
                studyDays: tools.toOptions(app.Enum.studyDays),
                schooltimeDay: tools.toOptions(app.Enum.schooltimeDay),
                schooltimeWeek: tools.toOptions(app.Enum.schooltimeWeek),
                classType: tools.toOptions(app.Enum.classType),
                payType: tools.toOptions(app.Enum.payTypeText),
                partnerQualification: tools.toOptions(app.Enum.partnerQualification)
            };
            app.rootScope.pagination = {
              templates:angular.copy(app.default_page),
              courses:angular.copy(app.default_page),
              partners:angular.copy(app.default_page)
            };
            Auth.checkUser();


            //初始化应用时的请求(使用promiseGet方法会使用内存进行缓存) 请求category目录
            getLocation();
            getCategory();
            //router的权限控制
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                $log.log('route change start');
                // event.preventDefault();
                // transitionTo() promise will be rejected with
                // a 'transition prevented' error
                var isLogin = $rootScope.global.isLogin;
                var isToLoginPage = $state.get('login') === toState;
                var isFromLoginPage = $state.get('login') === fromState;

                /*需要处理以下三种情况*/

                //未登录用户想要进入非登录页面
                if (!isToLoginPage && !isLogin) {
                    //for a bug when user change the route in the address input frame
                    // the view will not render correctly, you need to prevent from changing router when in login page
                    //未登录用户在登录页面要进入非登录页面 不触发路由改变
                    if (isFromLoginPage) {
                        $log.info('not login&from login page:prevent route change');
                        event.preventDefault();
                        return;
                    }
                    //user not login can not go anywhere except login page
                    $log.warn('not login&not from login page:TO login');
                    $location.path('/login');
                    return
                }

                //已登录用户想要进入登录页面
                if (isToLoginPage && isLogin) {
                    //已登录用户在非登录页面()要进入登录页面 不触发路由改变
                    if (fromState.name && !isFromLoginPage) {
                        event.preventDefault();
                        return;
                    }
                    //admin already login don't need to go to login page
                    $log.info('already login as admin:TO main.home');
                    $location.path('/main');
                    return
                }

                //处理已登录用户的权限 带有admin权限的路由需要验证用户的权限(默认权限为partner)
                //该情况与第一种情况存在交际交集
                if (toState.access && toState.access === 'admin' && !$rootScope.global.isAdmin) {

                    $log.warn('Insufficient privilege');
                    //如果是第一次进入网站 则进入首页（未登录情况在情况2中已处理）
                    if (!fromState.name) $location.path('/main');
                    //同样不触发路由
                    else {
                        event.preventDefault();
                        return;
                    }
                }

            });

        }]
);