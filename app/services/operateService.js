'use strict';
appServices.factory('operateService',
    ['$rootScope', '$cookieStore', 'restAPI', '$q', '$location','toaster',
        function ($rootScope, $cookieStore, restAPI, $q, $location,toaster) {
            //todo this need to be tested later
            //用于提取通用的执行记录操作的方法 未采用
            var auth = restAPI.auth;
            return {
                //通用的记录操作方法 todo 应使用promise模式返回用于执行doRefresh()以更新页面
                exec_operate: function (resourceName, id, op) {
                    var restAPI = restAPI[resourceName];
                    //todo if restAPI not existed
                    var promise = {};
                    if (op === 'delete') {
                        promise = restAPI.delete({ID: id});
                    }
                    else if (op == 'submitUpdated') {
                        app.state.go(['main',resourceName,'edit'].join('.'), {id: id});
                        return;
                    }
                    else {
                        promise = restAPI.operate({ID: id, OP: op});
                    }
                    promise.$promise.then(function (data) {
                        toaster.pop('success', "课程" + id + "操作成功", "");
                        doRefresh();
                    }, function (data) {
                        toaster.pop('error', "课程" + id + "操作失败", "");
                    })
                }
            }
        }]
);