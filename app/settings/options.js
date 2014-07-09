'use strict';
//time filter modal options
app.value('OPTIONS', {
        item: [//培训类目
            {label: '', value: undefined},
            {label: '', value: '5'}
        ],
        address: [//上课地点
            {
                label: '南京市',
                value: 'nanjing',
                district: [
                    {label: '玄武区', value: '11'},
                    {label: '雨花区', value: '12'},
                    {label: '秦淮区', value: '13'}
                ]
            },
            {
                label: '苏州',
                value: 'suzhou',
                district: [
                    {label: '1区', value: '21'},
                    {label: '2区', value: '22'},
                    {label: '3区', value: '23'}
                ]
            }

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