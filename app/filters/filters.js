'use strict';

/* Filters */
//todo 输入的错误的值的异常处理
appFilters
    /*通用的独立filter*/
    //将4位以内的数字转换成HH:mm
    .filter('toHHmm', function () {
        return function(value){
            if(value === undefined) return '';
            value = value.toString().substr(0,4);
            return value.substr(0,2)+':'+value.substr(2,2);
        };
    })
    //以下为需要作为option并且value to text
    /*班级类型*/
    .filter('classType', ['app',
        function (app) {
            return function (value) {
                return app.Enum.classType[value] || '未知类型';
            };
        }
    ])
    //资质信息
    .filter('partnerQualification', ['app',
        function (app) {
            return function (value) {
                return app.Enum.partnerQualification[value] || '未知';
            };
        }
    ])
    .filter('schooltimeDay', ['app',
        function (app) {
            return function (value) {
                return app.Enum.schooltimeDay[value] || '未知';
            };
        }
    ])
    .filter('schooltimeWeek', ['app',
        function (app) {
            return function (value) {
                return app.Enum.schooltimeWeek[value] || '未知';
            };
        }
    ])
    .filter('studyDays', ['app',
        function (app) {
            return function (array) {
                var days = [];
                for (k in array) {
                    days.push(app.Enum.studyDays[array[k]]);
                }
                return days.join(', ') || '无';
            };
        }
    ])
    //以下为仅需要value to text
    /*记录可操作的按钮text*/
    .filter('operationText', ['app',
        function (app) {
            return function (op_name) {
                return app.Enum.operationsText[op_name] || '未知操作';
            };
        }
    ])
    /*记录的状态 包括订单状态、课程和课程模板的状态*/
    .filter('statusText', ['app',
        function (app) {
            return function (value) {
                return app.Enum.statusText[value] || '未知状态';
            };
        }
    ])
    /*课程或者课程模板属于的类目*/
    .filter('categoryText', ['app',
        function (app) {
            return function (value) {
                if (typeof value === 'string') {
                    var category = app.cache.category.get('category').data;
                    //filter course category
                    //value is fixed | start is from 0 to value.length |cat is from top level to bottom level
                    /**
                     *
                     * @param value
                     * @param start
                     * @param cat
                     * @description 6位的类目数值 截取的两位数的开始位置 目录的json
                     */
                    var getCat = function (value, start, cat) {
                        if (start >= value.length)return '';
                        for (var a in cat.children) {
                            if (cat.children.hasOwnProperty(a)&&cat.children[a].value == value.substr(0, start + 2))
                                return cat.children[a].name + '--' + getCat(value, start + 2, cat.children[a]);
                        }
                        return '未知--'
                    };
                    var result = getCat(value, 0, {children: category});
                    return result.substr(0, result.length - 2);
                } else {
                    return value;
                }


            };
        }
    ])
;
