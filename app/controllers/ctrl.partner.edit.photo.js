'use strict';
appControllers.controller('partnersEditPhotoCtrl',
    ['$scope','restAPI','$state', '$upload', function ($scope,restAPI,$state) {
        var Partners = restAPI.partners;
        var id = $state.params.id;
        $scope.cancel = function () {
            app.state.go('admin.partners.detail', {data: id});
        };
        $scope.onFileSelect = function () {
            for (var i = 0; i < $files.length; i++) {
              var file = $files[i];
              $scope.upload = $upload.upload({
                url: 'a-api/partner/postClassPhoto/' + id, //upload.php script, node.js route, or servlet url
                //method: 'POST' or 'PUT',
                //headers: {'header-key': 'header-value'},
                //withCredentials: true,
                data: {myObj: $scope.myModelObj},
                file: file, // or list of files ($files) for html5 only
                //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
                // customize file formData name ('Content-Desposition'), server side file variable name. 
                //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
                // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
                //formDataAppender: function(formData, key, val){}
              }).progress(function(evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
              }).success(function(data, status, headers, config) {
                // file is uploaded successfully
                app.toaster.pop('success', "图片上传成功", "");
              });
              //.error(...)
              //.then(success, error, progress); 
              // access or attach event listeners to the underlying XMLHttpRequest.
              //.xhr(function(xhr){xhr.upload.addEventListener(...)})
            }
        }
        $scope.doRefresh();
    }]
);

