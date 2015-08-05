angular.module('fileuploadModule', ["slugifier"])
  .controller('uploadCtrl', ['$scope', '$upload', '$http','uploadService', 'Slug',  function ($scope, $upload, $http, uploadService, Slug) {
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
      $scope.resourceSlug = Slug.slugify($scope.descr);
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
          resourceLink  : $scope.resourceLink,
          resourceSlug  : $scope.resourceSlug
        };
        console.log($scope.fileInfo);
        uploadService.addFile($scope.fileInfo, function (param) {
          $scope.uploaded = param;
          if($scope.uploaded) $('#myModal').modal('show');
        });
      }      
    }
  }]);