var appRoutes = angular.module('appRoutes', []);

appRoutes.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    var version = '?v2build002';
    $urlRouterProvider.otherwise("/login");
    $stateProvider
        /**************** 登录页面 ****************/
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html'+version,
            controller: 'loginCtrl'
        })

        /* main abstract page 用于显示通用的组件 导航条*/
        .state('main', {
            abstract: true,
            url: '/main',
            templateUrl: 'views/main.html'+version
        })

        /**************** 登录后的首页 ****************/
        .state('main.home', {
            url: '',
            templateUrl: 'views/main/home.html'+version,
            controller: 'homeCtrl'
        })



        /**************** 课程订单管理 ****************/
        .state('main.booking', {
            abstract: true,
            url: '/booking',
            template: '<div ui-view></div>'
        })
        //订单处理
        .state('main.booking.list', {
            url: '',
            templateUrl: 'views/main/booking/booking.list.html'+version,
            controller: 'bookingListCtrl'
        })
        //订单查询页面
        .state('main.booking.search', {
            url: '/search',
            templateUrl: 'views/main/booking/booking.search.html'+version,
            controller: 'bookingSearchCtrl'
        })
        //订单详情页面
        .state('main.booking.detail', {
            url: '/{id}',
            templateUrl: 'views/main/booking/booking.detail.html'+version,
            controller: 'bookingDetailCtrl'
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
            templateUrl: 'views/main/course/courses.html'+version,
            controller: 'coursesCtrl'
        })
        //新建课程
        .state('main.courses.create', {
            url: '/create',
            templateUrl: 'views/main/course/courses.create.html'+version,
            controller: 'coursesCreateCtrl'
        })
        //查看课程
        .state('main.courses.detail', {
            url: '/{id}',
            templateUrl: 'views/main/course/courses.detail.html'+version,
            controller: 'coursesDetailCtrl'
        })
        //编辑课程
        .state('main.courses.edit', {
            url: '/{id}/edit',
            templateUrl: 'views/main/course/courses.edit.html'+version,
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
            templateUrl: 'views/main/template/templates.html'+version,
            controller: 'templatesCtrl'
        })
        //新建课程模板
        .state('main.templates.create', {
            url: '/create',
            templateUrl: 'views/main/template/templates.create.html'+version,
            controller: 'templatesCreateCtrl'
        })
        //查看课程模板
        .state('main.templates.detail', {
            url: '/{id}',
            templateUrl: 'views/main/template/templates.detail.html'+version,
            controller: 'templatesDetailCtrl'
        })
        //编辑课程模板
        .state('main.templates.edit', {
            url: '/{id}/edit',
            templateUrl: 'views/main/template/templates.edit.html'+version,
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
            templateUrl: 'views/main/partner/partners.html'+version,
            controller: 'partnersCtrl',
            access:'admin'
        })
        .state('main.partners.create', {
            url: '/create',
            templateUrl: 'views/main/partner/partners.create.html'+version,
            controller: 'partnersCreateCtrl',
            access:'admin'
        })
        //查看机构详情 父路由的controller负责获取机构的详情（子路由共享父路由的scope中的值）
        //子路由分为机构基本信息、机构logo、机构照片、机构教师、机构地址
        .state('main.partners.detail', {
            url: '/{id}',
            templateUrl: 'views/main/partner/partners.detail.html'+version,
            controller: 'partnersDetailCtrl',
            access:'admin'
        })
        //课程非基本信息的编辑和查看
        .state('main.partners.detail.edit', {
            url: '/edit',
            templateUrl: 'views/main/partner/detail/partners.edit.html'+version,
            controller: 'partnersEditCtrl',
            access:'admin'
        })
        .state('main.partners.detail.logo', {
            url: '/logo',
            templateUrl: 'views/main/partner/detail/partners.logo.html'+version,
            controller: 'partnersLogoCtrl',
            access:'admin'
        })
        .state('main.partners.detail.photo', {
            url: '/photo',
            templateUrl: 'views/main/partner/detail/partners.photo.html'+version,
            controller: 'partnersPhotoCtrl',
            access:'admin'
        })
        .state('main.partners.detail.teacher', {
            url: '/teacher',
            templateUrl: 'views/main/partner/detail/partners.teacher.html'+version,
            controller: 'partnersTeacherCtrl',
            access:'admin'
        })
        .state('main.partners.detail.address', {
            url: '/address',
            templateUrl: 'views/main/partner/detail/partners.address.html'+version,
            controller: 'partnersAddressCtrl',
            access:'admin'
        })



        /*****************团购管理****************/
        .state('main.tuan', {
            abstract: true,
            url: '/tuan',
            template: '<div ui-view></div>'
        })
        .state('main.tuan.list', {
            url: '',
            templateUrl: 'views/main/tuan/tuan.list.html'+version,
            controller: 'tuanListCtrl'
        })
        .state('main.tuan.detail', {
            url: '/{id}',
            templateUrl: 'views/main/tuan/tuan.detail.html'+version,
            controller: 'tuanDetailCtrl'
        })
        .state('main.tuan.create', {
            url: '/create',
            templateUrl: 'views/main/tuan/tuan.create.html'+version,
            controller: 'tuanCreateCtrl'
        })


        /*****************用户管理****************/
        .state('main.users', {
            abstract: true,
            url: '/users',
            template: '<div ui-view></div>'
        })

        //课程模板列表
        .state('main.users.list', {
            url: '',
            templateUrl: 'views/main/users/user.list.html'+version,
            controller: 'userListCtrl'
        })

        .state('main.users.detail', {
            url: '/{id}',
            templateUrl: 'views/main/users/user.detail.html'+version,
            controller: 'userDetailCtrl'
        });
//        $locationProvider.html5Mode(true).hashPrefix('!');//remove '#' but all href should be adjusted
//        $locationProvider.hashPrefix('!!');

});