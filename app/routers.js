var appRoutes = angular.module('appRoutes', []);

appRoutes.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/admin");
    $stateProvider
        //登录
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })
        //abstract state
        .state('admin', {
            abstract: true,
            url: '/admin',
            templateUrl: 'views/admin.html',
            controller: 'homeCtrl'
        })
        //!admin登录主页面
        .state('admin.home', {
            url: '',
            templateUrl: 'views/admin/home.html',
            controller: 'homeCtrl'
        })
        //!新单处理页面
        .state('admin.new_orders', {
            url: '/new_orders',
            templateUrl: 'views/admin/new_orders.html',
            controller: 'newOrdersCtrl'
        })
        //!旧单审核页面
        .state('admin.old_orders', {
            url: '/old_orders',
            templateUrl: 'views/admin/old_orders.html',
            controller: 'oldOrdersCtrl'
        })

        /* 课程信息管理 */
        //课程管理页面
        .state('admin.courses', {
            url: '/courses',
            templateUrl: 'views/admin/courses.html',
            controller: 'coursesCtrl'
        })
        //新建课程
        .state('admin.courses.create', {
            url: '/create',
            templateUrl: 'views/admin/courses.create.html',
            controller: 'templatesCreateCtrl'
        })
        //查看课程
        .state('admin.courses.detail', {
            url: '/{id:[0-9]}',
            templateUrl: 'views/admin/courses.detail.html',
            controller: 'coursesDetailCtrl'
        })

        /* 课程模板管理 */
        //课程模板列表
        .state('admin.templates', {
            url: '/templates',
            templateUrl: 'views/admin/templates.html',
            controller: 'templatesCtrl'
        })
        //新建课程模板
        .state('admin.templates.create', {
            url: '/create',
            templateUrl: 'views/admin/templates.create.html',
            controller: 'templatesCreateCtrl'
        })
        //查看课程模板
        .state('admin.templates.detail', {
            url: '/{id:[0-9]}',
            templateUrl: 'views/admin/templates.detail.html',
            controller: 'templatesDetailCtrl'
        })
});