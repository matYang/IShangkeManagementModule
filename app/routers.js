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

        /* main abstract page 用于显示通用的组件 导航条*/
        .state('main', {
            abstract: true,
            url: '/main',
            templateUrl: 'views/main.html'
        })

        /**************** 登录主页面 ****************/
        .state('main.home', {
            url: '',
            templateUrl: 'views/main/home.html',
            controller: 'homeCtrl'
        })


        .state('main.bookings', {
            abstract: true,
            url: '/bookings',
            template: '<div ui-view></div>'
        })
        /**************** 新单处理页面 ****************/
        .state('main.bookings.new', {
            url: '/new',
            templateUrl: 'views/main/bookings.html',
            controller: 'newBookingsCtrl'
        })

        /**************** 旧单审核页面 ****************/
        .state('main.bookings.old', {
            url: '/old',
            templateUrl: 'views/main/bookings.html',
            controller: 'oldBookingsCtrl'
        })

        /**************** 订单查询页面 ****************/
        .state('main.bookings.search', {
            url: '/search',
            templateUrl: 'views/main/bookings.search.html',
            controller: 'searchBookingsCtrl'
        })

        /**************** 订单详情页面 ****************/
        .state('main.bookings.detail', {
            url: '/{id}',
            templateUrl: 'views/main/bookings.detail.html',
            controller: 'bookingsDetailCtrl'
        })

        /*************** 课程信息管理 ***************/
        .state('main.courses', {
            abstract: true,
            url: '/courses',
            template: '<div ui-view></div>'
        })
        //课程管理页面
        .state('main.courses.list', {
            url: '',
            templateUrl: 'views/main/course/courses.html',
            controller: 'coursesCtrl'
        })
        //新建课程
        .state('main.courses.create', {
            url: '/create',
            templateUrl: 'views/main/course/courses.create.html',
            controller: 'coursesCreateCtrl'
        })
        //查看课程
        .state('main.courses.detail', {
            url: '/{id}',
            templateUrl: 'views/main/course/courses.detail.html',
            controller: 'coursesDetailCtrl'
        })
        //编辑课程
        .state('main.courses.edit', {
            url: '/{id}/edit',
            templateUrl: 'views/main/course/courses.edit.html',
            controller: 'coursesEditCtrl'
        })



        /**************** 课程模板管理 ****************/
        .state('main.templates', {
            abstract: true,
            url: '/templates',
            template: '<div ui-view></div>'
        })
        //课程模板列表
        .state('main.templates.list', {
            url: '',
            templateUrl: 'views/main/template/templates.html',
            controller: 'templatesCtrl'
        })
        //新建课程模板
        .state('main.templates.create', {
            url: '/create',
            templateUrl: 'views/main/template/templates.create.html',
            controller: 'templatesCreateCtrl'
        })
        //查看课程模板
        .state('main.templates.detail', {
            url: '/{id}',
            templateUrl: 'views/main/template/templates.detail.html',
            controller: 'templatesDetailCtrl'
        })
        //编辑课程模板
        .state('main.templates.edit', {
            url: '/{id}/edit',
            templateUrl: 'views/main/template/templates.edit.html',
            controller: 'templatesEditCtrl'
        })


        /****************机构信息管理***************/
        //查看机构信息
        .state('main.partners', {
            url: '/partners',
            template: '<div ui-view></div>',
            abstract: true,
            access:'admin'
        })
        .state('main.partners.list', {
            url: '',
            templateUrl: 'views/main/partner/partners.html',
            controller: 'partnersCtrl',
            access:'admin'
        })
        .state('main.partners.create', {
            url: '/create',
            templateUrl: 'views/main/partner/partners.create.html',
            controller: 'partnersCreateCtrl',
            access:'admin'
        })
        //查看机构详情 父路由的controller负责获取机构的详情（子路由共享父路由的scope中的值）
        //todo 子路由分为机构基本信息、机构logo、机构照片、机构教师、机构地址
        .state('main.partners.detail', {
            url: '/{id}',
            templateUrl: 'views/main/partner/partners.detail.html',
            controller: 'partnersDetailCtrl',
            access:'admin'
        })
        //课程非基本信息的编辑和查看
        .state('main.partners.detail.edit', {
            url: '/edit',
            templateUrl: 'views/main/partner/detail/partners.edit.html',
            controller: 'partnersEditCtrl',
            access:'admin'
        })
        .state('main.partners.detail.logo', {
            url: '/logo',
            templateUrl: 'views/main/partner/detail/partners.logo.html',
            controller: 'partnersLogoCtrl',
            access:'admin'
        })
        .state('main.partners.detail.photo', {
            url: '/photo',
            templateUrl: 'views/main/partner/detail/partners.photo.html',
            controller: 'partnersPhotoCtrl',
            access:'admin'
        })
        .state('main.partners.detail.teacher', {
            url: '/teacher',
            templateUrl: 'views/main/partner/detail/partners.teacher.html',
            controller: 'partnersTeacherCtrl',
            access:'admin'
        })
        .state('main.partners.detail.address', {
            url: '/address',
            templateUrl: 'views/main/partner/detail/partners.address.html',
            controller: 'partnersAddressCtrl',
            access:'admin'
        })


        /*****************机构用户管理****************/
        .state('main.users', {
            url: '/users',
            templateUrl: 'views/main/users/users.html',
            controller: '',
            access:'admin'
        })




});