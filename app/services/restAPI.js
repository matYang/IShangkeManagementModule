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
                    'user': ['/data/user.json', '/user/:ID/:OP'],
                    'templates': ['/data/templates:ID.json', '/templates/:ID'],
                    'courses': ['/data/courses:ID.json', '/courses/:ID']
                }
            };
            var resource_maker = function (recourseName) {
                var prefix = '/api/' + app.version;
                var url = app.test_mode ? api_config.resources[recourseName][0] : prefix + api_config.resources[recourseName][1];
                return $resource(url)
            };

            return {
                'user': resource_maker('user'),
                'templates': resource_maker('templates'),
                'courses': resource_maker('courses')
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