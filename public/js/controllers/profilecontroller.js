angular.module('profileModule', [])
  .controller('profileCtrl', ['$scope', '$rootScope', 'ModalService', function ($scope, $rootScope, ModalService) {
    $scope.loggedInUser = $rootScope.currentUsername;
  }]);



