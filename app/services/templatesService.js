appServices.service('templatesService', ['$resource', 'app',
    function ($resource,app) {
        var prefix = 'api/' + app.version;
        var resources = {

            templates: ['', '/data/templates.json']
        };
        this.getFilterTemplates = function (filter,page) {
            //todo  use filter and page
            return $resource(app.test_mode ? resources.get('templates')[1] : prefix + resources.get('templates')[0],filter);
        };

    }
]);