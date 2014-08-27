app.factory('tools', ['Enum', function (Enum) {

    return  {
        clearReferenceObj:clearReferenceObj,
        toOptions: toOptions,
        toImgLabelValue: toImgLabelValue,
        toImgLabelOptions: toImgLabelOptions,
        mapToIdObjList: mapToIdObjList,
        toSchoolTimeList: toSchoolTimeList
    };

    function clearReferenceObj(obj){
        angular.forEach(obj, function (v, k) {
            obj[k] = undefined;
        });
    }

    /**
     * 将value和name的键值对转换成选项的数组
     * @param obj {<value>:<name>}
     * @returns {Array} [{label:<name>,value:<value>}]
     */
    function toOptions(obj) {
        var arr = [];
        angular.forEach(obj, function (v, k) {
            this.push({label: v, value: parseInt(k, 10)});
        }, arr);
        return arr;
    }

    function mapToIdObjList(list) {
        if (!list)return [];
        return list.map(function (v) {
            return {id: v};
        });
    }


    /**
     * 生成多选选项中已选择的值,将obj的list提取为value的list
     * @param objList
     * @param valueKey 作为选择的value的key
     * @returns {Array}
     */
    function toImgLabelValue(objList, valueKey) {
        var valueList = [];
        if (!valueKey)valueKey = 'id';
        angular.forEach(objList, function (obj) {
            this.push(obj[valueKey]);
        }, valueList);
        return valueList;
    }


    /**
     * 将带有图片的列表生成(图片+名字)的选项
     * @paramobjListt
     * @param imgKey obj中的图片url的key 默认为'imgUrl'
     * @param nameKey 显示在选项中的name key 默认为'name'
     * @returns {Array} 返回可以用于生成带有图片label的数组
     */
    function toImgLabelOptions(objList, imgKey, nameKey) {
        var optionList = [];
        if (!imgKey)imgKey = 'imgUrl';
        if (!nameKey)nameKey = 'name';

        angular.forEach(objList, function (imgObj) {
            var imgUrl = imgObj[imgKey] || '//:0'; //防止src为空
            var name = imgObj[nameKey] || '';
            //生成label
            imgObj.label = '<img src="' + imgObj[imgKey] + '" alt="' + name + '" class="img-micro"/>' + name;
            optionList.push(imgObj);
        });
        return optionList;
    }


    function toSchoolTimeList(val,textEnum) {
        //value = 1 or + 2 or + 4
        var list = [];
        if(textEnum === undefined){//the default value
            textEnum = [3,4];
        }
        angular.forEach(textEnum, function (v, k) {//k is the number value in schooltimeDay
            if ((k & val ) !== 0)
                list.push(parseInt(k));
        }, list);
        if(list.join()==='')
            return undefined;
        return list;
    }
}]);