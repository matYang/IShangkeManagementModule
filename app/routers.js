var appRoutes = angular.module('appRoutes', []);

appRoutes.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider
        /**************** 登录页面 ****************/
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })

        /* admin abstract page 用于显示通用的组件 导航条*/
        .state('admin', {
            abstract: true,
            url: '/admin',
            templateUrl: 'views/admin.html'
        })

        /**************** admin登录主页面 ****************/
        .state('admin.home', {
            url: '',
            templateUrl: 'views/admin/home.html',
            controller: 'homeCtrl'
        })

        /**************** 新单处理页面 ****************/
        .state('admin.new_bookings', {
            url: '/new_bookings',
            templateUrl: 'views/admin/bookings.html',
            controller: 'newBookingsCtrl'
        })

        /**************** 旧单审核页面 ****************/
        .state('admin.old_bookings', {
            url: '/old_bookings',
            templateUrl: 'views/admin/bookings.html',
            controller: 'oldBookingsCtrl'
        })

        /*************** 课程信息管理 ***************/
        .state('admin.courses', {
            abstract: true,
            url: '/courses',
            template: '<div ui-view></div>'
        })
        //课程管理页面
        .state('admin.courses.list', {
            url: '',
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
        //编辑课程
        .state('admin.courses.edit', {
            url: '/{id:[0-9]}/edit',
            templateUrl: 'views/admin/courses.edit.html',
            controller: 'coursesEditCtrl'
        })



        /**************** 课程模板管理 ****************/
        .state('admin.templates', {
            abstract: true,
            url: '/templates',
            template: '<div ui-view></div>'
        })
        //课程模板列表
        .state('admin.templates.list', {
            url: '',
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
        //编辑课程模板
        .state('admin.templates.edit', {
            url: '/{id:[0-9]}/edit',
            templateUrl: 'views/admin/templates.edit.html',
            controller: 'templatesEditCtrl'
        })


        /****************机构信息管理***************/
        //查看机构信息
        .state('admin.institutions', {
            url: '/institutions',
            templateUrl: 'views/admin/institutions.html',
            template:'<h1>HAHA</h1>',
            controller: 'institutionsCtrl'
            access:'admin'
        })
});