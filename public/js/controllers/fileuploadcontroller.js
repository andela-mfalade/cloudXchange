angular.module('fileuploadModule', [])
  .controller('uploadCtrl', ['$scope', '$upload', '$http','uploadService',  function ($scope, $upload, $http, uploadService) {
    $scope.uploaded        = false;
    $scope.blankfield      = false;
    $scope.showFileDetails = false;

    $scope.onFileSelect = function(arg) {
      $scope.files = arg;
      var reader = new FileReader();
        reader.onload = function() {
        $scope.newFile = reader.result;
        var output = document.getElementById('output');
        output.src = $scope.newFile;
        console.log($scope.newFile);
      }
        reader.readAsDataURL(arg[0]);
    };

    $scope.hideNotifications = function() {
      $scope.uploaded = false;
      $scope.blankfield = false;
    }

    $scope.addFile = function() {
      $scope.hideNotifications();
      if($scope.category === undefined) {
        $scope.blankfield = true;
      }
      else {
        $scope.fileInfo = {
          category      : $scope.category,
          title         : $scope.descr,
          contributor   : $scope.username,
          fileType      : $scope.fileType,
          file          : $scope.newFile,
          resourceLink  : $scope.resourceLink
        };
        uploadService.addFile($scope.fileInfo);
        $scope.category     = '';
        $scope.descr        = '';
        $scope.username     = '';
        $scope.fileType     = '';
        $scope.resourceLink = '';
        $scope.uploaded     = true;        
      }
    }
  }]);