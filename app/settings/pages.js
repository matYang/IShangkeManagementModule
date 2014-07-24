'use strict';
//table中的th
app.factory('PageView', function(){
    var common = {
        tabs: [
            {label: '已上线', active: true, value: {status: 0}},
            {label: '已下线', active: false, value: {status: 1}},
            {label: '待审核', active: false, value: {status: 2}},
            {label: '审核失败', active: false, value: {status: 3} },
            {label: '已删除', active: false, value: {status: 4} }
        ]
    };
    return {
        'newBookings': {
            tabs: [
                {label: '今日待处理', active: true, value: {status: 0, createTimeStart: new Date()}},
                {label: '往日待处理', active: false, value: {status: 0, createTimeEnd: new Date()}}
            ],
            th: [
                //n--name w-width percent
                {n: '操作', w: '30'}
            ]
        },
        'templates': {
            tabs: angular.copy(common.tabs),
            th: [
                {n: '模板号', w: '20'},
                {n: '模板名', w: '20'},
                {n: '爱价格', w: '15'},
                {n: '状态', w: '15'},
                {n: '操作', w: '30'}
            ]
        },
        'courses': {
            tabs: angular.copy(common.tabs),
            th: [
                {n: '课程号', w: '20'},
                {n: '课程名', w: '30'},
                {n: '状态', w: '20'},
                {n: '操作', w: '30'}
            ]
        }

    }
});