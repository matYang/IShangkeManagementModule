'use strict';
//table中的th
app.factory('PageView', ['app',
    function (app) {
        var common = {
            statusTabs: [
                {label: '已上线', active: true, value: {status: 2}},
                {label: '待审核', active: false, value: {status: 0}},
                {label: '审核失败', active: false, value: {status: 1} },
                {label: '已下线', active: false, value: {status: 3}}
            ],
            partnerTabs: [
                {label: '已上线', active: true, value: {status: 0}},
                {label: '已下线', active: false, value: {status: 1}}
            ],
            bookingTh: [
                //n--name w-width percent
                {n: '订单号', w: '8'},
                {n: '入学人姓名', w: '10'},
                {n: '价格', w: '6'},
                {n: '预约报名日期', w: '12'},
                {n: '支付方式', w: '10'},
                {n: '订单状态', w: '10'},
                {n: '创建时间', w: '14'},
                {n: '操作', w: '18'}
            ]
        };
        return {
            common: common,
            newBookings: {
                tabs: [
                    {
                        label: '今日待处理', active: true,
                        value: {status: 0, createTimeStart: new Date().getTime()}
                    },
                    {
                        label: '往日待处理', active: false,
                        value: {status: 0, createTimeEnd: new Date().getTime()}
                    }
                ],
                th: common.bookingTh
            },
            oldBookings: {
                tabs: [
                    {label: '待审核', active: true, value: {status: 0, createTimeStart: new Date().getTime()}},
                    {label: '往日待处理', active: false, value: {status: 0, createTimeEnd: new Date().getTime()}}
                ],
                th: common.bookingTh
            },
            templates: {
                pagination: angular.copy(app.default_page),
                filter:{},//过滤条件 点击生成的条件
                search:{},//查询条件 手动输入的条件
                tabs: angular.copy(common.statusTabs),
                th: [
                    {n: '模板号', w: '10'},
                    {n: '模板名', w: '20'},
                    {n: '爱上课价格', w: '13'},
                    {n: '原价', w: '11'},
                    {n: '状态', w: '12'},
                    {n: '操作', w: '30'}
                ]
            },
            courses: {
                pagination: angular.copy(app.default_page),
                filter:{},//过滤条件 点击生成的条件
                search:{},//查询条件 手动输入的条件
                tabs: angular.copy(common.statusTabs),
                th: [
                    {n: '课程号', w: '10'},
                    {n: '课程名', w: '20'},
                    {n: '爱上课价格', w: '12'},
                    {n: '原价', w: '12'},
                    {n: '类别', w: '12'},
                    {n: '状态', w: '12'},
                    {n: '操作', w: '22'}
                ]
            },
            partners: {
                pagination: angular.copy(app.default_page),
                th: [
                    {n: '机构号', w: '10'},
                    {n: '机构名', w: '25'},
                    {n: '总部地址', w: '25'},
                    {n: '查询号', w: '25'},
                    {n: '操作', w: '15'}
                ]
            }

        }
    }
]);