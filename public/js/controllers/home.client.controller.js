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
      });
    };

    $scope.sortByStat = function(param) {
      var sortedArrayOfResources;
      console.log($rootScope.allResources, 'All resources in the rootScope')
      switch (param) {
        case 'all':
          sortedArrayOfResources = $rootScope.allResources;
          break;
        case 'topVoted':
          sortedArrayOfResources = _.sortBy($rootScope.allResources, 'likes').reverse();
          break;
        case 'mostViewed':
          sortedArrayOfResources = _.sortBy($rootScope.allResources, 'views').reverse();
          break;
        default:
          sortedArrayOfResources = $rootScope.allResources;
      }
      $scope.resources = sortedArrayOfResources;
      console.log($scope.resources, 'current resources dislayed in scope for category:  ', param);
    };

    $scope.showMostViewed = function() {
      var sortedArrayOfResources = _.sortBy($scope.resources, 'views');
      $scope.resources = sortedArrayOfResources;
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