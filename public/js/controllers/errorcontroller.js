angular.module('errorModule', [])
  .controller('errCtrl', ['$scope', function ($scope) {
    $scope.pageLabel = 'ControllerStatus: Error page controller up and running..';
  }]);