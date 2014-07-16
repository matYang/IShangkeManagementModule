'use strict';
//！！！暂时不使用该restAPI service进行api的请求 每个页面先独立写service提供方法供controller调用
//第二轮再使用该service进行api的整理 并考虑是否有必要使用$cacheFactory进行缓存处理
//todo change all below when know the all APIs
appServices.factory('restAPI',
        ['$resource', 'app', function ($resource, app) {
            var api_config = {
                version: app.version,
                resources: {
                    'user': '/user/:ID/:OP'
                    // 'user/logout' 'user/login' 'user/12'
                }
            };
            var resource_maker = function (recourseName) {
                //name 'templates' return '/api/[version]/templates'
                return $resource('/api' + api_config.version + api_config.resources[recourseName])
            };

            return {
                'user': resource_maker('user')
            };
        }]
    ).factory('cache', ['$cacheFactory',
        function ($cacheFactory) {
            //todo remove or use
            return {
                order: $cacheFactory('order', {
                    capacity: 100
                }),
                orders: $cacheFactory('orders', {
                    capacity: 100
                })
            };
        }
    ]);