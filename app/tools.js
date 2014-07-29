app.factory('tools', function () {

    return {
        toOptions:toOptions
    };

    function toOptions(obj){
        var arr = [];
        angular.forEach(obj, function(v, k) {
            this.push({label:v,value:parseInt(k,10)});
        }, arr);
        return arr;
    }
});