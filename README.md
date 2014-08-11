IShangkeManagementModule
========================

yoke

##Files
    +app/
      assert/                   --files in this folder just will be copied into 'public' folder
        data/                   --json files used for test mode
      css/                      --styles for each page or common styles
      controllers/              --each page has more than one controllers
      directives/
      filters/
      services/                 --service like restAPI
      settings/                 --constant options
        config-validator.js     --config form validator messages
     app.js                     --init the application modules
     app_config.js              --config app version(for api) and test mode
     app_run.js                 --init the application runtime config
     routers.js                 --config routers
    +vendor/
      css/
      js/
    +doc                        --docs used for the project
        lib/                    --docs of libs used in the project(angular libs mainly)
    brunch-config.coffee        --brunch config file,look for more in [brunch](http://brunch.io/)
    package.json                --project information and dependencies of the project

##brunch
([brunch](http://brunch.io/) should be installed first using `npm install -g brunch`,no 'bower' any more for bower.json in some packages has no 'main' property)

`brunch w -s` to watch

`brunch build -P` to build production version with all files compressed and combined,no more map files and all comments cleaned

##Steps
1.***`npm install`***

2.***`brunch w -s`*** or ***`brunch w -sp 1234`*** to use port '1234'

##response format
对于操作的返回
    with http status
    {
        errorCode: xxxx //如果成功就是0
        msg: xxxx  //如果成功就是"success"
        data: xxxx  //如果失败就是""
    }

对于数据的返回
    with http status
    对条数据的返回:
        {
            "start" = 0,
            "count" = 10,
            "total" = 34,
            "data" = [数组]
        }
    单条数据的返回:
        {
            //单条数据详情json
        }


##road map
1.引入data model

2.减少对绑定数据的更新,提升性能

3.重新设计界面