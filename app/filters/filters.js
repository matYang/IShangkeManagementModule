'use strict';

/* Filters */
appFilters
/**
 * 图片地址的filter
 * @input array [imageName,partner_id]
 * @return string <absolute image url>
 */
    .filter('smallImg', ['app',
        function (app) {
            return function (value) {
                return app.small_img + value[1] + '/' + value[0];
            };
        }
    ])
    .filter('largeImg', ['app',
        function (app) {
            return function (value) {
                return app.large_img + value[1] + '/' + value[0];
            };
        }
    ])

    //以下为需要作为option并且value to text
    /*班级类型*/
    .filter('classType', ['app',
        function (app) {
            return function (value) {
                return app.Enum.classType[value] || '未知类型';
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
                return days.join() || '无';
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
                    var result = [];
                    var category = app.cache.category.get('category').data;
                    //filter course category
                    //value is fixed | start is from 0 to value.length |cat is from top level to bottom level
                    var getCat = function (value, start, cat) {
                        if (start >= value.length)return '';
                        for (a in cat.children) {
                            if (cat.children[a].value == value.substr(0, start + 2))
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
