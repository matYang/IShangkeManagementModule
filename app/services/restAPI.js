'use strict';
//$resource() has methods below
/*
 'get':    {method:'GET'}
 'save':   {method:'POST'}
 'query':  {method:'GET', isArray:true}
 'remove': {method:'DELETE'}
 'delete': {method:'DELETE'}
 新增或修改的方法:
 'post': POST
 'query': GET isArray false
 'operate': PUT
 'update': PUT
 * */
appServices
    .factory('restAPI', ['$resource', 'app', '$rootScope',
        function ($resource, app, $rootScope) {
            var isAdmin = $rootScope.port === 'admin';
            var prefix = app.host + (isAdmin ? app.api_admin : app.api_partner) + '/' + app.version;

            var api_config = {
                resources: {
                    //[0] is the fake api,[1] is the real api
                    //RO--role ID--id OP--operate
                    // Example request api: /api/v2/login /api/v2/login
                    'auth': ['/data/user.json?:ID:OP', '/user/:ID/:OP'],
                    // /api/v2/booking/1/
                    'bookings': ['/data/bookings:ID.json?:OP', '/booking/:ID/:OP'],
                    'templates': ['/data/templates:ID.json?:OP', '/courseTemplate/:ID/:OP'],
                    'courses': ['/data/courses:ID.json?:OP', '/course/:ID/:OP'],

                    'partners': ['/data/partners:ID.json?:OP', '/partner/:ID/:OP'],
                    'teachers': ['/data/teachers:ID.json?:OP', '/teacher/:ID/:OP'],
                    'photos': ['/data/classPhotos:ID.json?:OP', '/classPhoto/:ID/:OP'],
                    'addresses': ['/data/addresses:ID.json?:OP', '/address/:ID/:OP'],

                    'category': ['/data/category.json', '/general/category']
                }
            };
            var resource_maker = function (recourseName) {

                var url = app.test_mode ? api_config.resources[recourseName][0] : prefix + api_config.resources[recourseName][1];
                var methods = {};
                if (app.test_mode) {
                    //测试模式使用GET
                    methods = {
                        'query': {method: 'GET', isArray: false},
                        'post': { method: 'GET' },
                        'update': { method: 'GET' },
                        'operate': { method: 'GET' }
                    };
                } else {
                    methods = {
                        'query': {method: 'GET', isArray: false},
                        'post': { method: 'POST' },
                        'update': { method: 'PUT' },
                        'operate': { method: 'PUT' }
                    };
                }
                return $resource(url, {}, methods)
            };

            var makeResourceUrl = function (resourceName) {
                return prefix + '/' + resourceName;
            };

            return {
                'auth': resource_maker('auth'),
                'templates': resource_maker('templates'),
                'courses': resource_maker('courses'),
                'bookings': resource_maker('bookings'),

                'partners': resource_maker('partners'),
                'teachers': resource_maker('teachers'),
                'photos': resource_maker('photos'),
                'addresses': resource_maker('addresses'),

                'category': resource_maker('category'),

                'makeResourceUrl': makeResourceUrl//资源的地址

            };
        }
    ])
    //带有缓存服务的promise服务 仅限GET请求
    .factory('promiseGet', ['$q',
        function ($q) {
            return function (param, restAPI, cacheId, cache) {
                var result, defer = $q.defer();
                //如果指定了cacheId和cache则会优先获取缓存中值
                result = cacheId && cache && cache.get(cacheId);
                if (result) {
                    defer.resolve(result);
                } else {
                    restAPI.get(param, function (data) {
                        if (cacheId && cache) {
                            cache.put(cacheId, data);
                        }
                        defer.resolve(data);
                    }, function (data) {
                        defer.reject(data.error);
                    });
                }
                return defer.promise;
            };
        }
    ])
    //缓存服务
    .factory('cache', ['$cacheFactory',
        function ($cacheFactory) {
            return {
                //课程分类目录的缓存 容量大小为200条记录 todo 暂不清楚多层嵌套的json的容量如何计算
                category: $cacheFactory('category', {
                    capacity: 200
                })
            };
        }
    ])
    //返回课程目录数据 使用promiseGet对数据使用内存缓存
    .factory('getCategory', ['restAPI', 'cache', 'promiseGet',
        function (restAPI, cache, promiseGet) {
            return function () {
                return promiseGet({}, restAPI.category, 'category', cache.category);
            };
        }
    ])
    //根据id获取partner的详细信息 todo 是否需要进行缓存
    .factory('getPartnerById', ['restAPI', 'cache', 'promiseGet',
        function (restAPI, cache, promiseGet) {
            return function (id) {
                return promiseGet({ID: id}, restAPI.partners, null, null);
            };
        }
    ])
//根据id获取模板的详细信息 todo 是否需要进行缓存
    .factory('getTemplateById', ['restAPI', 'cache', 'promiseGet',
        function (restAPI, cache, promiseGet) {
            return function (id) {
                return promiseGet({ID: id}, restAPI.templates, null, null);
            };
        }
    ])
;