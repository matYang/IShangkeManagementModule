appControllers.controller('partnersAddressCtrl',
    ['$scope', 'app', function ($scope, app) {
        /**
         * 初始化页面信息
         */
        var Addresses = app.restAPI.addresses;
        var partnerId = app.state.params.id;
        var circleKey = {};
        var addresses_edit = {}; //使用map保存进入修改状态前的address list
        //获取商圈列表 用于生成下拉选项 和显示商圈名字 之后doRefresh()
        app.getCircle().then(function (data) {

            $scope.circle = data.data;

            //根据id显示circle的name
            angular.forEach(data.data, function(item){
                circleKey[item.id] = item.name;
            });
            $scope.getCircleName = function(id){
                return circleKey[id];
            };
            $scope.doRefresh();
        });
        //页面显示的机构地址列表（页面主体）
        $scope.addresses = [];
        $scope.doRefresh = function () {
            Addresses.query({partnerId: partnerId, start: 0, count: 1000}, function (data) {
                $scope.addresses = data.data;
            }, function () {
                app.toaster.pop('error', "机构校区地址信息获取失败", "");
            });
        };

        /**
         * 进入和退出编辑模式
         */
        $scope.editAddress = function ($index) {
            //在edit更改前进行原始address的保存
            var address = angular.copy($scope.addresses[$index]);
            addresses_edit[address.id] = address;
            $scope.addresses[$index].edit = true;
        };
        $scope.cancelEdit = function($index){
            var id = $scope.addresses[$index].id;
            $scope.addresses[$index] = addresses_edit[id];
            delete addresses_edit[id];
        };
        /**
         * address的更新和删除
         */
        $scope.updateAddress = function (index) {
            var address = angular.copy($scope.addresses[index]);
            //todo 暂时使用直接删除无用字段的方式
            delete address.edit;
            Addresses.update({ID: address.id}, address, function (data) {
                $scope.addresses[index].edit = false;
                delete addresses_edit[address.id];
                app.toaster.pop('success', "校区地址更新成功", "");
            }, function () {
                app.toaster.pop('error', "校区地址更新失败", "");
            });
        };
        $scope.deleteAddress = function (index) {
            Addresses.delete({ID: $scope.addresses[index].id}, function () {
                $scope.addresses.splice(index, 1);//进行本地删除 todo seems slowly
                app.toaster.pop('success', "校区地址删除成功", "");
            }, function () {
                app.toaster.pop('error', "校区地址删除失败", "");
            });
        };


        /**
         * 增加地址
         */
        $scope.init = function(){
            $scope.item = {
                partnerId:partnerId,
                detail:undefined,
                lat:undefined,
                lng:undefined
            };
        };
        $scope.init();
        $scope.addAddress =function () {
            //开始创建
            $scope.creating = true;
            //返回的是创建后的item 带有id
            if(app.test_mode){
                app.toaster.pop('success','创建成功');
                $scope.addresses.push(angular.extend({id:Math.ceil(Math.random()*100000)},$scope.item));
                $scope.init();
                $scope.creating = false;
            }else{
                Addresses.save($scope.item).$promise.then(function(data){
                    app.toaster.pop('success','创建成功');
                    $scope.init();
                    $scope.addresses.push(data);
                },function(){
                    //error
                    app.toaster.pop('error','创建失败');
                }).finally(function(){
                    //创建结束
                    $scope.creating = false;
                });
            }
        };
    }]
);

