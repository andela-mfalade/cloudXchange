angular.module('userModule', [])
  .controller('userCtrl', ['$scope', function ($scope) {
    $scope.pageLabel = 'ControllerStatus: User controller up and running..';
  }]);