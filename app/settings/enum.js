'use strict';
app.value('ENUM', {
        //课程和课程模板的审核状态tab标签
        StatusTab: [
            {label: '已上线', value: 0, active: true},
            {label: '已下线', value: 1, active: false},
            {label: '待审核', value: 2, active: false},
            {label: '审核失败', value: 3, active: false },
            {label: '已删除', value: 4, active: false }
        ],

        //状态的text
        StatusText:{
            //课程和课程模板的状态
            '-1':'未知状态',
            2:'待审核',
            3:'已上线',
            4:'已下线',
            5:'已删除',
            1:'审核失败'

            //在线订单状态
            //待支付/订单取消:支付成功:应退费:已退款:机构确认:已开学:入学成功:已获返利:支付过期:支付失败:支付成功:

            //线下订单状态
            //待支付:拒绝:订单取消:确认:推迟报道:爽约:完成报道:已交学费:已开学:终止交费:已退学:入学成功:

        },
        //记录操作的按钮text
        OperationsText:{
            '-1':'未知操作',

            //课程和课程模板的操作
            'submitNew':'提交审核',
            'reject':'拒绝审核',
            'approve':'接受审核',
            'submitUpdated':'提交修改',
            'delete':'删除',
            'takeOffline': '下线',

            //admin订单操作
            'onlineRefund':'退款成功',
            'onlineCashback':'支付返利',

            //partner订单操作
            'onlineConfirm':'确认订单',
            'onlineReject':'拒绝订单',
            'onlineNoShow':'爽约',
            'onlineQuit':'用户退学',
            'onlineStartSchool':'已开学',
            'onlineEnroll':'入学成功',

            'offlineConfirm':'确认订单',
            'offlineReject':'拒绝订单',
            'offlinePartnerDelay':'推迟报道',
            'offlineNoShow':'爽约',
            'offlineRegister':'完成报道',
            'offlineQuit':'用户退学',
            'offlineStartSchool':'已开学',
            'offlineEnroll':'入学成功'
        }
    }
);