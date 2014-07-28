'use strict';
appControllers.controller('partnersEditCtrl',
    ['$scope','restAPI','$state', function ($scope,restAPI,$state) {
        var Partners = restAPI.partners;
        var id = $state.params.id;

        $scope.doRefresh = function(){
            Partners.get({ID:id}, function(data){
                $scope.partner = data;
            }, function () {
                //error
            });
        };
        $scope.addLocation = function () {
            var len = $scope.partner.addressList.length;
            $scope.partner.addressList[len] = "";
        }
        $scope.removeLocation = function (index) {
            while (index < $scope.partner.addressList.length - 1) {
                if ($scope.partner.addressList[index] = $scope.partner.addressList[index + 1]);
                index++;
            }
            $scope.partner.addressList.pop();
        }
        $scope.onFileSelect = function($files) {
            for ( var i = 0; i < $files.length; i++) {
                var $file = $files[i];
                $scope.logo = $file;
                if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL($files[i]);
                    var loadFile = function(fileReader, index) {
                        fileReader.onload = function(e) {
                        }
                    }(fileReader, i);
                }
            }
        };
        $scope.upload = function() {
            var files = [], fileNames = [];
            $scope.errorMsg = null;

            $upload.upload({
                url: uploadUrl,
                method: "POST",
                data : $scope.partner,
                file: $scope.logo,
                fileFormDataName: "logo"
            }).success(function(response) {
                if (response.status > 0) {
                    app.toaster.pop("error", "机构创建失败", "");
                    $scope.errorMsg = response.status + ': ' + response.data;
                } else {
                    app.toaster.pop("success", "机构创建失败", "");
                    app.state.go("admin.partners.detail", {id: id});
                }
            }).progress(function(evt) {
                // Math.min is to fix IE which reports 200% sometimes
                $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };

        $scope.edit = function () {
            Partners.put($scope.partner, function(data){
                app.toaster.pop('success', "机构创建成功", "");
                app.log.info('create partner success');
                app.state.go('admin.partners.detail', {data: id});
            });
        };
        $scope.cancel = function () {
            app.state.go('admin.partners.detail', {data: id});
        };
        $scope.doRefresh();
    }]
);

