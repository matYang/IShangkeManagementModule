    'use strict';
appControllers.controller('partnersTeachermanageCtrl',
    ['$scope','restAPI','$state', 'app', function ($scope, restAPI, $state, app) {
        var Teachers = restAPI.teachers, Partners = restAPI.partners;
        var id = $state.params.id;
        $scope.doRefresh = function() {
            Partners.get({ID:id},function(data){
                $scope.item = data;
            },function(){
                //error
            });
        };

        $scope.removeTeacher = function ($index) {
            while ($index < $scope.item.teacherList.length - 1) {
                $scope.item.teacherList[$index] = $scope.item.teacherList[$index+1];
                $index++;
            }
            item.teacherList.pop();
        }
        $scope.cancel = function () {
            app.state.go('admin.pasrtners.detail', {id: id});
        };
        $scope.update = function () {
            Teachers.save({id:id, teacherList:$scope.item.teacherList}, function(response){
                app.toaster.pop('success', "教师更新成功", "");
                app.log.info('teacher update success');
                app.state.go('admin.partners.detail', {id: id});
            }, function () {
                app.log.error('update error');
            });
        };
        $scope.doRefresh();
    }]
);

