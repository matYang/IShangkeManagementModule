app.constant('app', { //constant 'app' assemble things like restAPI and configs

    version: 'v2', //api版本信息
    test_mode: true, //测试模式

    //默认的分页
    default_page:{
        index:1,    // 起始页
        count:20,   //每页记录数
        total:0    //记录总数
    }
});