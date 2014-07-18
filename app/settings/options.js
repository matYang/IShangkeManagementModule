'use strict';
//time filter modal options
app.value('OPTIONS', {
        check_status: [//审核状态
            {label: '有效', value: 1},
            {label: '待审核', value: 2},
            {label: '审核失败', value: 3 },
        ],
        start_time: [//开课时间
            {label: '不限', value: undefined},
            {label: '当月', value: 'this month'},
            {label: '下月', value: 'next month'},
            {label: '下下月', value: 'nnext month'}
        ],
        on_time: [//上课时间
            {label: '不限', value: undefined},
            {label: '平日上午', value: '0'},
            {label: '平日下午', value: '1'},
            {label: '平日晚上', value: '2'},
            {label: '周末上午', value: '3'},
            {label: '周末下午', value: '4'},
            {label: '周末晚上', value: '5'}
        ]
    }
);