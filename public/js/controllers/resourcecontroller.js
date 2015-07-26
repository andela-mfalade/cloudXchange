angular.module('resourceModule', ['resourceservice'])
  .controller('resourceCtrl', ['$scope', '$rootScope', 'resourceService', '$location', function ($scope, $rootScope, resourceService, $location) {
    $scope.category      = '';

    $scope.showRecentPosts  = function() {
      resourceService.getResources(function(param) {
        $rootScope.allResources = param;
        $scope.resources = param;
        console.log(param);
      });
    };

    $scope.showResourcePage = function(resource, category) {
      $rootScope.currentResource = resource;
      $rootScope.currentCategory = category;
      $location.path('/resources/resource');
    };

    $scope.changeCategory  = function(arg) {
      $scope.category = arg;
    };

    $scope.updateModal = function(arg) {
      angular.forEach($scope.resources, function(index){
        if(index._id === arg) {
          $scope.resourceSummary = index;
        }
      })
    };
  }]);