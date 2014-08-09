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
            url: '/bookings/new',
            templateUrl: 'views/admin/bookings.html',
            controller: 'newBookingsCtrl'
        })

        /**************** 旧单审核页面 ****************/
        .state('admin.old_bookings', {
            url: '/bookings/old',
            templateUrl: 'views/admin/bookings.html',
            controller: 'oldBookingsCtrl'
        })

        /**************** 订单查询页面 ****************/
        .state('admin.query_bookings', {
            url: '/bookings/query',
            templateUrl: 'views/admin/bookings.query.html',
            controller: 'queryBookingsCtrl'
        })

        /**************** 订单详情页面 ****************/
        .state('admin.bookings.detail', {
            url: '/bookings/{id:[0-9]}',
            templateUrl: 'views/admin/bookings.detail.html',
            controller: 'bookingsDetailCtrl'
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
            templateUrl: 'views/admin/course/courses.html',
            controller: 'coursesCtrl'
        })
        //新建课程
        .state('admin.courses.create', {
            url: '/create',
            templateUrl: 'views/admin/course/courses.create.html',
            controller: 'coursesCreateCtrl'
        })
        //查看课程
        .state('admin.courses.detail', {
            url: '/{id:[0-9]}',
            templateUrl: 'views/admin/course/courses.detail.html',
            controller: 'coursesDetailCtrl'
        })
        //编辑课程
        .state('admin.courses.edit', {
            url: '/{id:[0-9]}/edit',
            templateUrl: 'views/admin/course/courses.edit.html',
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
            templateUrl: 'views/admin/template/templates.html',
            controller: 'templatesCtrl'
        })
        //新建课程模板
        .state('admin.templates.create', {
            url: '/create',
            templateUrl: 'views/admin/template/templates.create.html',
            controller: 'templatesCreateCtrl'
        })
        //查看课程模板
        .state('admin.templates.detail', {
            url: '/{id:[0-9]}',
            templateUrl: 'views/admin/template/templates.detail.html',
            controller: 'templatesDetailCtrl'
        })
        //编辑课程模板
        .state('admin.templates.edit', {
            url: '/{id:[0-9]}/edit',
            templateUrl: 'views/admin/template/templates.edit.html',
            controller: 'templatesEditCtrl'
        })


        /****************机构信息管理***************/
        //查看机构信息
        .state('admin.partners', {
            url: '/partners',
            template: '<div ui-view></div>',
            abstract: true,
            access:'admin'
        })
        .state('admin.partners.list', {
            url: '',
            templateUrl: 'views/admin/partner/partners.html',
            controller: 'partnersCtrl',
            access:'admin'
        })
        .state('admin.partners.create', {
            url: '/create',
            templateUrl: 'views/admin/partner/partners.create.html',
            controller: 'partnersCreateCtrl',
            access:'admin'
        })
        //查看机构详情 父路由的controller负责获取机构的详情（子路由共享父路由的scope中的值）
        //todo 子路由分为机构基本信息、机构logo、机构照片、机构教师、机构地址
        .state('admin.partners.detail', {
            url: '/{id:[0-9]}',
            templateUrl: 'views/admin/partner/partners.detail.html',
            controller: 'partnersDetailCtrl',
            access:'admin'
        })
        //课程非基本信息的编辑和查看
        .state('admin.partners.detail.edit', {
            url: '/edit',
            templateUrl: 'views/admin/partner/detail/partners.edit.html',
            controller: 'partnersEditCtrl',
            access:'admin'
        })
        .state('admin.partners.detail.logo', {
            url: '/logo',
            templateUrl: 'views/admin/partner/detail/partners.logo.html',
            controller: 'partnersLogoCtrl',
            access:'admin'
        })
        .state('admin.partners.detail.photo', {
            url: '/photo',
            templateUrl: 'views/admin/partner/detail/partners.photo.html',
            controller: 'partnersPhotoCtrl',
            access:'admin'
        })
        .state('admin.partners.detail.teacher', {
            url: '/teacher',
            templateUrl: 'views/admin/partner/detail/partners.teacher.html',
            controller: 'partnersTeacherCtrl',
            access:'admin'
        })
        .state('admin.partners.detail.address', {
            url: '/address',
            templateUrl: 'views/admin/partner/detail/partners.address.html',
            controller: 'partnersAddressCtrl',
            access:'admin'
        })
});