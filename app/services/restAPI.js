'use strict';
//todo change all below when know the all APIs
appServices.factory('restAPI',
    ['$resource', function ($resource) {
        var api_config = {
            version: '/v1.0',
            resources: {
                'user': '/user/:ID/:OP',
                // 'user/logout' 'user/login' 'user/12'
                'course': '/general/course',
                'courses': '/general/courses'
            }
        };
        var resource_maker = function (recourseName) {
            return $resource('/api' + api_config.version + api_config.resources[recourseName])
        };

        return {
            'user': resource_maker('user'),
            'course': resource_maker('course'),
            'courses': resource_maker('courses')
        };
    }]
)