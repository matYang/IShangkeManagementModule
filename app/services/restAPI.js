'use strict';
//$resource() has methods below
/*
 'get':    {method:'GET'}
 'save':   {method:'POST'}
 'query':  {method:'GET', isArray:true}
 'remove': {method:'DELETE'}
 'delete': {method:'DELETE'}
 * */
appServices
    .factory('restAPI', ['$resource', 'app', '$rootScope',
        function ($resource, app, $rootScope) {
            var api_config = {
                resources: {
                    //[0] is the fake api,[1] is the real api
                    //RO--role ID--id OP--operate
                    // Example request api: /api/v2/login /api/v2/login
                    'auth': ['/data/:RO.json/:OP', '/:OP'],
                    'templates': ['/data/templates:ID.json/:OP', '/template/:ID/:OP'],
                    'courses': ['/data/courses:ID.json', '/course/:ID/:OP'],
                    'partners': ['/data/partners:ID.json', '/partner/:ID/:OP'],
                    // /api/v2/booking/1/
                    'bookings': ['/data/bookings:ID.json/:OP', '/booking/:ID/:OP'],
                    'category': ['/data/category.json', '/category']
                }
            };
            var resource_maker = function (recourseName) {
                var port = $rootScope.port;
                var api = '';
                if (port == 'partner') api = '/p-api/';
                else if (port == 'admin') api = '/a-api/';
                var prefix = api + app.version;
                var url = app.test_mode ? api_config.resources[recourseName][0] : prefix + api_config.resources[recourseName][1];
                var params = {};
                var methods = {};
                if (app.test_mode) {
                    params = {};
                    //测试模式使用GET
                    methods = {
                        'post': { method: 'GET' },
                        'update': { method: 'GET' },
                        'operate': { method: 'GET' }
                    };
                } else {
                    params = {ID: '@ID', OP: '@OP'};
                    methods = {
                        'post': { method: 'POST' },
                        'update': { method: 'PUT' },
                        'operate': { method: 'POST' }
                    };
                }
                return $resource(url, params, methods)
            };

            return {
                'auth': resource_maker('auth'),
                'templates': resource_maker('templates'),
                'courses': resource_maker('courses'),
                'bookings': resource_maker('bookings'),
                'partners': resource_maker('partners'),
                'category': resource_maker('category')

            };
        }
    ])
    .factory('promiseGet', ['$q',
        function ($q) {
            return function (param, restAPI, cacheId, cache) {
                var result, defer = $q.defer();

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
    .factory('cache', ['$cacheFactory',
        function ($cacheFactory) {
            return {
                category: $cacheFactory('category', {
                    capacity: 200
                })
            };
        }
    ])
    //返回课程目录数据 使用promiseGet对数据使用内存缓存
    .factory('getCategory', ['restAPI', 'cache', 'promiseGet','toaster',
        function (restAPI, cache, promiseGet,toaster) {
            return function(){
                return promiseGet({}, restAPI.category, 'category', cache.category);
            };
        }
    ])
;