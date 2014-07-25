'use strict';
//$resource() has methods below
/*
 'get':    {method:'GET'}
 'save':   {method:'POST'}
 'query':  {method:'GET', isArray:true}
 'remove': {method:'DELETE'}
 'delete': {method:'DELETE'}
 * */
appServices.factory('restAPI', ['$resource', 'app','$rootScope',
    function ($resource, app,$rootScope) {
        var api_config = {
            resources: {
                //[0] is the fake api,[1] is the real api
                //RO--role ID--id OP--operate
                // Example request api: /api/v2/login /api/v2/login
                'auth': ['/data/:RO.json/:OP', '/:OP'],
                'templates': ['/data/templates:ID.json/:OP', '/template/:ID/:OP'],
                'courses': ['/data/courses:ID.json', '/course/:ID/:OP'],
                'partner': ['/data/courses:ID.json', '/partner/:ID/:OP'],
                // /api/v2/booking/1/
                'bookings': ['/data/bookings:ID.json/:OP', '/booking/:ID/:OP']
            }
        };
        var resource_maker = function (recourseName) {
            var port = $rootScope.port;
            var api ='';
            if(port == 'partner') api = '/p-api/';
            else if(port == 'admin') api = '/a-api/';
            var prefix = api + app.version;
            var url = app.test_mode ? api_config.resources[recourseName][0] : prefix + api_config.resources[recourseName][1];
            var params = {};
            var methods = {};
            if(app.test_mode){
                params = {};
                //测试模式使用GET
                methods = {
                    'post': { method: 'GET' },
                    'update': { method: 'GET' },
                    'operate': { method: 'GET' }
                };
            }else{
                params = {ID:'@ID',OP:'@OP',RO:'@RO'};
                methods = {
                    'post': { method: 'POST' },
                    'update': { method: 'PUT' },
                    'operate': { method: 'POST' }
                };
            }
            return $resource(url, params,methods)
        };

        return {
            'auth': resource_maker('auth'),
            'templates': resource_maker('templates'),
            'courses': resource_maker('courses'),
            'bookings': resource_maker('bookings'),
            'partner': resource_maker('partner')

        };
    }
]);


//     remove or use
//    .factory('cache', ['$cacheFactory',
//        function ($cacheFactory) {
//            return {
//                booking: $cacheFactory('booking', {
//                    capacity: 100
//                }),
//                bookings: $cacheFactory('bookings', {
//                    capacity: 100
//                })
//            };
//        }
//    ]);