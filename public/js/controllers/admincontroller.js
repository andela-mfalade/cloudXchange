angular.module('adminModule', ['adminservice'])
  .controller('adminCtrl', ['$scope', 'adminService', function ($scope, adminService) {
    $scope.userDeleted = false;
    adminService.getUsers(function(arg) {
      $scope.users = arg;
    });

    adminService.getResources(function(arg) {
      $scope.resources = arg;
    });

    $scope.showModal = function () {
      $('#confirmation_modal').modal('show');
    };

    $scope.showModalFor = function (item) {
      $scope.showModal();
      $scope.modalObject = {
        resourceTitle : item.title,
        resourceContributor : item.contributor,
        resourceID: item._id
      }
    };

    $scope.trashResource = function(id) {
      adminService.deleteResource(id);
      adminService.getResources(function(arg) {
        $scope.resources = arg;
      });
    };

    $scope.deleteUser = function(id, username) {
      adminService.deleteUser(id);
      $scope.deletedUser = username + ' has been deleted.';
      $scope.userDeleted = true;
      adminService.getUsers(function(arg) {
        $scope.users = arg;
      });
    };
  }]);