'use strict';

/* App Module */

var app = angular.module('app', [
//    'ngAnimate',//is not needed so far
    'ngCookies',
    'ngResource',
//    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'w5c.validator',

    'appRoutes',
    'appServices',
    'appControllers',
    'appDirectives',
    'appFilters'
]);

var appServices = angular.module('appServices', []);
var appControllers = angular.module('appControllers', []);
var appDirectives = angular.module('appDirectives', []);
var appFilters = angular.module('appFilters', []);
app.config(["w5cValidatorProvider", function (w5cValidatorProvider) {

    // 全局配置
    w5cValidatorProvider.config({
        blurTrig   : true,
        showError  : true,
        removeError: true

    });
    w5cValidatorProvider.setRules({
        email   : {
            required: "输入的邮箱地址不能为空",
            email   : "输入邮箱地址格式不正确"
        },
        username: {
            required: "输入的用户名不能为空",
            pattern : "用户名必须输入字母、数字、下划线,以字母开头"
        },
        password: {
            required : "密码不能为空",
            minlength: "密码长度不能小于{minlength}",
            maxlength: "密码长度不能大于{maxlength}"
        },
        number  : {
            required: "数字不能为空"
        }
    });
}]);
app.run(
        ['app', '$rootScope', '$location', '$timeout', '$state', 'Auth',
            function (app, $rootScope, $location, $timeout, $state, Auth) {
                //$rootScope has some global functions and params
                $rootScope.$state = $state;
                $rootScope.global = {
                    user: undefined,
                    isLogin: false,
                    isAdmin: true
                };
                if (app.test_mode) {
                    $rootScope.global.user = {username: 'ishangke'};
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