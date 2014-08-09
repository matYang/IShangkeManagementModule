app.factory('tools', function () {

    return  {
        toOptions:toOptions
    };
    /**
     * 将value和name的键值对转换成选项的数组
     * @param obj {<value>:<name>}
     * @returns {Array} [{label:<name>,value:<value>}]
     */
    function toOptions(obj){
        var arr = [];
        angular.forEach(obj, function(v, k) {
            this.push({label:v,value:parseInt(k,10)});
        }, arr);
        return arr;
    }
});