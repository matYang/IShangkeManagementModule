app.factory('tools', function () {

    return {
        toOptions:toOptions
    };

    function toOptions(obj){
        var arr = [];
        angular.forEach(obj, function(v, k) {
            this.push({label:v,value:k});
        }, arr);
        return arr;
    }
});