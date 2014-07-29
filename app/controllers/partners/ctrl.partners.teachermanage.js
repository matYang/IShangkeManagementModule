'use strict';
appControllers.controller('partnersTeachermanageCtrl',
    ['$scope','restAPI','$state', 'app', function ($scope, restAPI, $state, app) {
        var Teachers = restAPI.teachers, Partners = restAPI.partners;
        $scope.doRefresh = function() {
            Partners.get({ID:id},function(data){
                $scope.item = data;
            },function(){
                //error
            });
        };

        $scope.removeTeacher = function ($index) {
            while ($index < item.teacherList.length - 1) {
                item.teacherList[$index] = item.teacherList[$index+1];
                $index++;
            }
            item.teacherList.pop();
        }
        $scope.cancel = function () {
            app.state.go('admin.pasrtners.detail', {id: id});
        };
        $scope.update = function () {
            Teachers.save($scope.item, function(response){
                app.toaster.pop('success', "教师更新成功", "");
                app.log.info('teacher update success');
                app.state.go('admin.partners.detail', {id: id});
            }, function () {
                app.log.error('update error');
            });
        };
    }]
);

