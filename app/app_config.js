app.constant('app', { //constant 'app' assemble things like restAPI and configs

    version: 'v2', //api版本信息
    test_mode: true, //测试模式

    small_img : "",//小图的url前缀
    large_img : "",//大图的url前缀

    //默认的分页
    default_page: {
        start: 0,    // 起始记录
        count: 20,   //每页记录数
        total: 0    //记录总数
    }
})
    .config(function($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'yyyy-MM-dd',
            startWeek: 1,
            dateType:'number',
            autoclose:true,
            iconLeft:'fa fa-chevron-left',
            iconRight:'fa fa-chevron-right'
        });
    });