'use strict';
//table中的th
app.factory('PageView', ['app', 'tools',
    function (app, tools) {
        //这里主要配置结果页面table的header th
        var common = {
            statusTabs: [
                {label: '已上线', active: true, value: {status: 2}},
                {label: '待审核', active: false, value: {status: 0}},
                {label: '审核失败', active: false, value: {status: 1} },
                {label: '已下线', active: false, value: {status: 3}}
            ],
            bookingListTh: [
                //n--name w-width percent
                {n: '订单号', w: '15'},
                {n: '入学人姓名', w: '15'},
                {n: '价格', w: '10'},
                {n: '支付方式', w: '10'},
                {n: '订单状态', w: '10'},
                {n: '创建时间', w: '20'},
                {n: '操作', w: '20'}
            ],
            courseListTh: [
                {n: '课程号', w: '10'},
                {n: '课程名', w: '20'},
                {n: '爱上课价格', w: '12'},
                {n: '原价', w: '12'},
                {n: '类别', w: '12'},
                {n: '状态', w: '12'},
                {n: '操作', w: '22'}
            ],
            templateListTh:[
                {n: '模板号', w: '10'},
                {n: '模板名', w: '20'},
                {n: '爱上课价格', w: '13'},
                {n: '原价', w: '11'},
                {n: '状态', w: '12'},
                {n: '操作', w: '30'}
            ],
            partnerListTh: [
                {n: '机构号', w: '10'},
                {n: '机构名', w: '25'},
                {n: '总部地址', w: '25'},
                {n: '查询号', w: '25'},
                {n: '操作', w: '15'}
            ],
            tuanListTh: [
                {n: 'ID', w: '10'},
                {n: '团购名', w: '20'},
                {n: '团购价格', w: '15'},
                {n: '下线时间', w: '20'},
                {n: '状态', w: '15'},
                {n: '操作', w: '20'}
            ],
            applyListTh: [
                {n: 'ID', w: '7'},
                {n: '申请人', w: '10'},
                {n: '联系方式', w: '15'},
                {n: '意向课程', w: '15'},
                {n: '申请时间', w: '15'},
                {n: '备注', w: '30'},
                {n: '操作', w: '8'}
            ],
            userListTh: [
                {n: 'ID', w: '10'},
                {n: '用户名', w: '15'},
                {n: '真实姓名', w: '12'},
                {n: '手机号', w: '20'},
                {n: '邀请码', w: '13'},
                {n: '注册时间', w: '20'},
                {n: '操作', w: '10'}
            ]
        };
        return {
            common: common,
            bookings: {
                tabs: [
                    {
                        label: '今日待处理', active: true,
                        value: {statusSet: [0, 13], createTimeStart: tools.getDeltaDayTimestamp()}
                    },
                    {
                        label: '今日订单', active: false,
                        value: {createTimeStart: tools.getDeltaDayTimestamp()}
                    },
                    {
                        label: '往日待处理', active: false,
                        value: {statusSet: [0, 13], createTimeEnd: tools.getDeltaDayTimestamp()}
                    },
                    {
                        label: '往日订单', active: false,
                        value: {createTimeEnd: tools.getDeltaDayTimestamp()}
                    }
                ],
                //初始化过滤条件 tab的过滤条件 需要跟tabs处于active的tab的value相对应
                filter: {
                    statusSet: [0, 13],
                    createTimeStart: tools.getDeltaDayTimestamp()
                },
                th: common.bookingListTh,
                pagination: angular.copy(app.default_page),

                search: {}//查询条件 存储用户手动输入的条件
            },
            templates: {
                pagination: angular.copy(app.default_page),
                filter: {status: 2},//过滤条件 点击生成的条件
                search: {},//查询条件 手动输入的条件
                tabs: angular.copy(common.statusTabs),
                th: common.templateListTh
            },
            courses: {
                pagination: angular.copy(app.default_page),
                filter: {status: 2},//过滤条件 tab的过滤条件
                search: {},//查询条件 手动输入的条件
                tabs: angular.copy(common.statusTabs),
                th: common.bookingListTh
            },
            partners: {
                pagination: angular.copy(app.default_page),
                th: common.partnerListTh
            },
            apply: {
                tabs: [
                    {
                        label: '今日申请', active: true,
                        value: {createTimeStart: tools.getDeltaDayTimestamp()}
                    },
                    {
                        label: '往日申请', active: false,
                        value: { createTimeEnd: tools.getDeltaDayTimestamp()}
                    }
                ],
                filter: {
                    //与tabs中处于active为true的value一致
                    createTimeStart: tools.getDeltaDayTimestamp()
                },//过滤条件 tab的过滤条件
                search: {},//查询条件 手动输入的条件
                pagination: angular.copy(app.default_page),
                th: common.applyListTh
            },
            tuan: {
                tabs: [
                    {
                        label: '待上线', active: true,
                        value: {status:0}
                    },
                    {
                        label: '热卖中', active: false,
                        value: {status:1}
                    },
                    {
                        label: '已下线', active: false,
                        value: {status:2}
                    },
                    {
                        label: '置顶团购', active: false,
                        value: {hot:1}
                    }
                ],
                //初始化过滤条件 tab的过滤条件 需要跟tabs处于active的tab的value相对应
                filter: {},
                th: common.tuanListTh,
                pagination: angular.copy(app.default_page),

                search: {}//查询条件 存储用户手动输入的条件
            },
            users: {
                tabs: [
                    {
                        label: '今日注册', active: true,
                        value: {createTimeStart: tools.getDeltaDayTimestamp()}
                    },
                    {
                        label: '所有用户', active: false,
                        value: {}
                    }
                ],
                //初始化过滤条件 tab的过滤条件 需要跟tabs处于active的tab的value相对应
                filter: { createTimeStart: tools.getDeltaDayTimestamp() },
                th: common.userListTh,
                pagination: angular.copy(app.default_page),

                search: {}//查询条件 存储用户手动输入的条件
            }

        }
    }
]);