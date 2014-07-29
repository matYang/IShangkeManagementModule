app
    .constant('app', { //constant 'app' assemble things like restAPI and configs

        version: 'v2', //api版本信息
        test_mode: true, //测试模式

        small_img: "",//小图的url前缀
        large_img: "",//大图的url前缀

        //默认的分页
        default_page: {
            start: 0,    // 起始记录
            count: 20,   //每页记录数
            total: 0    //记录总数
        }
    })
    /*配置日期选择器*/
    .config(function ($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'yyyy-MM-dd',//显示在页面上的日期格式
            startWeek: 1,//一周的开始为周一
            dateType: 'number',//日期返回值为时间戳
            autoclose: true,//点击日期后自动关闭
            iconLeft: 'fa fa-chevron-left',
            iconRight: 'fa fa-chevron-right'
        });
    })
    /*配置单选多选框*/
    .config(function ($selectProvider) {
        angular.extend($selectProvider.defaults, {

        });
    });