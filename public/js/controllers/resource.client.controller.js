angular.module('commentModule', ['commentservice', 'resourceservice'])
  .controller('commentCtrl', ['$scope', '$route', '$routeParams', 'commentService', '$rootScope','resourceService',function ($scope,  $route, $routeParams, commentService, $rootScope, resourceService) {
  
    console.log($routeParams, 'Whatever the heck this is');
    // Load the cached resource in the $rootScope.currentResource everytime the resource page is loaded
    var currentResourceInfo = resourceService.getCachedResource();
    $rootScope.currentResource = $rootScope.currentResource || currentResourceInfo.resourceID;
    $rootScope.currentCategory = currentResourceInfo.resourceCATEGORY;

    // Load background color and the information of the resource currently in the scope.
    $scope.$on('$viewContentLoaded', function() {
      $scope.catBgColor = resourceService.randomColorStore().randomColor;
      $scope.updateResourceInfo();
    });

    // This would be updated later.. This value herein is static and is intended only to implement the 'LIKE' feature.
    $scope.liked = false;

    // This function is to update the currently displayed resource based on a certain trigger..
    /*  
     * The current triggers for this method is the $viewsContentLoaded, The addComment and the likeResource methods
     */
    $scope.updateResourceInfo = function() {
      $rootScope.currentResource = $rootScope.currentResource;
      commentService.getResource($rootScope.currentResource, function(arg) {
        $scope.currentInformation = arg;
        $scope.commentPosted = false;
        $scope.emptyComment = false;
        $scope.noResourceLink = false;
        $scope.relatedResources = [];

        $scope.updateLocalStorage();
        $scope.updateRelatedResource();
        $scope.fetchComments();

      });
    };

    $scope.updateRelatedResource = function () {
      angular.forEach($rootScope.allResources, function(item) {
        if(item.category === $rootScope.currentCategory) {
          $scope.relatedResources.push(item);
        }
      });
    };

    $scope.updateLocalStorage = function () {
      // Create object to store current resource ID and category in the local storage
      var resourceID       = $scope.currentInformation[0]._id;
      var resourceCATEGORY = $scope.currentInformation[0].category || $rootScope.currentCategory;
      resourceService.storeResourceID_inLocalStorage(resourceID, 'id');
      resourceService.storeResourceID_inLocalStorage(resourceCATEGORY, 'cat');
    }

    // All occurence of $rootScope.currentResource here refers to the _id of the currently selected resource
    // Forgive your younger self's silliness
    $scope.updateResource = function() {
      $scope.fetchComments();
      $scope.updateResourceInfo();
    };

    $scope.likeResource = function() {
      var currentResourceId = $scope.currentInformation[0]._id;
      $scope.liked = !$scope.liked;
      if($scope.liked) {
        resourceService.updateSchedule(currentResourceId, {action: 'like'});
      }
      else {
        resourceService.updateSchedule(currentResourceId, {action: 'unlike'});
      }
      $scope.updateResourceInfo();
    };

    $scope.clearfields = function() {
      $scope.commenter = '';
      $scope.comment = '';
    }

    $scope.hideNotifications = function() {
      $scope.commentPosted = false;
      $scope.emptyComment = false;
    }

    $scope.addComment = function() {
      $scope.hideNotifications();
      $scope.emptyComment = false;
      if($scope.comment === undefined) {
        $scope.emptyComment = true;
      }
      else{
        var commentDetails = {
          commentBy    : $scope.commenter || 'Anonymous',
          comment      : $scope.comment,
          resourceId   : $scope.currentInformation[0]._id
        };
        commentService.addComment(commentDetails);
        $scope.clearfields();
        $scope.commentPosted = true;
        $scope.fetchComments();          
      }
    };

    $scope.loadNewResource = function(arg) {
      commentService.getResource(arg, function (data) {
        $scope.currentInformation = data;
        $rootScope.currentResource = arg;


        // Store the new resource ID in local storage
        $scope.updateLocalStorage();
        $scope.fetchComments(); 
      });
    };

    $scope.fetchComments = function() {
      commentService.getComments($scope.currentInformation['0']._id ,function(arg) {
        $scope.comments = arg;
      });        
    };


  }]);
