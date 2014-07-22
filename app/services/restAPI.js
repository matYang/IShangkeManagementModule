'use strict';
//$resource() has methods below
/*
 'get':    {method:'GET'}
 'save':   {method:'POST'}
 'query':  {method:'GET', isArray:true}
 'remove': {method:'DELETE'}
 'delete': {method:'DELETE'}
 * */
appServices.factory('restAPI', ['$resource', 'app',
    function ($resource, app) {
        var api_config = {
            resources: {
                //[0] is the fake api,[1] is the real api
                //RO--role ID--id OP--operate
                // Example request api: /api/v2/user/login /api/v2/admin/login
                'auth': ['/data/:RO.json/:OP', '/:RO/:OP'],
                'templates': ['/data/templates:ID.json/:OP', '/template/:ID/:OP'],
                'courses': ['/data/courses:ID.json', '/course/:ID/:OP'],
                'bookings': ['/data/bookings:ID.json', '/booking/:ID/:OP']
            }
        };
        var resource_maker = function (recourseName) {
            var prefix = '/api/' + app.version;
            var url = app.test_mode ? api_config.resources[recourseName][0] : prefix + api_config.resources[recourseName][1];
            //ID is the resource id and OP is operation name like 'submit' 'cancel'
            return $resource(url, {ID:'@ID',OP:'@OP',RO:'@RO'},//api中前缀为:对应的变量会从数据中的ID/OP/RO中匹配
                {
                    'post': { method: 'POST' },
                    'update': { method: 'PUT' },
                    'operate': { method: 'POST' }

                })
        };

        return {
            'auth': resource_maker('auth'),
            'templates': resource_maker('templates'),
            'courses': resource_maker('courses'),
            'bookings': resource_maker('bookings')

        };
    }
]);


//     remove or use
//    .factory('cache', ['$cacheFactory',
//        function ($cacheFactory) {
//            return {
//                order: $cacheFactory('order', {
//                    capacity: 100
//                }),
//                orders: $cacheFactory('orders', {
//                    capacity: 100
//                })
//            };
//        }
//    ]);