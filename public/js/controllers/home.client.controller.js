angular.module('resourceModule', ['resourceservice'])
  .controller('resourceCtrl', ['$scope', '$rootScope', 'resourceService', '$location', function ($scope, $rootScope, resourceService, $location) {
    $scope.category  = '';


    //This method is to randomize the background color of the category tabs
    $scope.$on('$viewContentLoaded', function() {
      $scope.catBgColor = resourceService.randomColorStore().randomColor;
    });

    $scope.showRecentPosts  = function() {
      resourceService.getResources(function(param) {
        $rootScope.allResources = param;
        $scope.resources = param;
        console.log(param);
      });
    };

    $scope.showTopVoted = function() {
      var a = _.sortBy($scope.resources, 'title');
    };

    $scope.showResourcePage = function(resource_id, category) {
      $rootScope.currentResource = resource_id;
      resourceService.updateSchedule(resource_id, {action: 'view'});
      $rootScope.currentCategory = category;
      $location.path('/resources/resource');
    };

    $scope.changeCategory  = function(arg) {
      $scope.category = arg;
    };
  }]);