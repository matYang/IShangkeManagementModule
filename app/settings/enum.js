'use strict';
app.value('Enum', {
        //课程分类的options todo  confirm value
        classType: {
            1: 'VIP 1对1',
            2: '小班授课（小于6人）',
            3: '中班授课（6-30人）',
            4: '大班授课（30人+）'
        },
        schooltimeDay: {
            1:'上午',
            2:'下午',
            3:'晚上'
        },
        schooltimeWeek: {
             1:'平时',
             2:'周末'
        },
        studyDays: {
            1:'周一',
            2:'周二',
            3:'周三',
            4:'周四',
            5:'周五',
            6:'周六',
            7:'周日'
        },
        partnerQualification: {
            1:'已认证',
            2:'未认证'
        },
        //关于页面的text
        PageText:{
          'partners':'合作机构',
          'templates':'课程模板',
          'courses':'课程'
        },
        //状态的text
        courseStatusText: {
            //课程和课程模板的状态
            0: '待审核',
            2: '已上线',
            3: '已下线',
            4: '已删除',
            1: '审核失败'
        },
        bookingStatusText: {
            //线下订单状态
            //todo 待支付:拒绝:订单取消:确认:推迟报道:爽约:完成报道:已交学费:已开学:终止交费:已退学:入学成功:


            //在线订单状态
            //todo 待支付/订单取消:支付成功:应退费:已退款:机构确认:已开学:入学成功:已获返利:支付过期:支付失败:支付成功:
            11:'待支付',
            12:'订单取消',
            13:'支付成功'



        },
        //记录操作的按钮text
        courseOperationText: {
            //课程和课程模板的操作
            'submitNew': '提交审核',
            'reject': '拒绝审核',
            'approve': '接受审核',
            'submitUpdated': '提交修改',
            'delete': '删除',
            'takeOffline': '下线'
        },
        bookingOperationText: {//todo

            //admin订单操作
            'onlineRefund': '退款成功',
            'onlineCashback': '支付返利',

            //partner订单操作
            'onlineConfirm': '确认订单',
            'onlineReject': '拒绝订单',
            'onlineNoShow': '爽约',
            'onlineQuit': '用户退学',
            'onlineStartSchool': '已开学',
            'onlineEnroll': '入学成功',

            'offlineConfirm': '确认订单',
            'offlineReject': '拒绝订单',
            'offlinePartnerDelay': '推迟报道',
            'offlineNoShow': '爽约',
            'offlineRegister': '完成报道',
            'offlineQuit': '用户退学',
            'offlineStartSchool': '已开学',
            'offlineEnroll': '入学成功'
        }
    }
);