angular.module('commentModule', ['commentservice', 'resourceservice'])
  .controller('commentCtrl', ['$scope', 'commentService', '$rootScope','resourceService', function ($scope, commentService, $rootScope, resourceService) {
    
    // Load background color and the information of the resource currently in the scope.
    $scope.$on('$viewContentLoaded', function() {
      $scope.catBgColor = resourceService.randomColorStore().randomColor;
      $scope.updateResourceInfo();
    });

    $scope.liked = false;

    // All occurence of $rootScope.currentResource here refers to the _id of the currently selected resource
    // Forgive your younger self's silliness
    $scope.updateResource = function() {
      $scope.fetchComments();
      $scope.updateResourceInfo();
    };

    // This function is to update the currently displayed resource based on a certain trigger..
    /*  
     * The current triggers for this method is the $viewsContentLoaded, The addComment and the likeResource methods
     */
    $scope.updateResourceInfo = function() {
      commentService.getResource($rootScope.currentResource, function(arg) {
        $scope.currentInformation = arg;
        $scope.commentPosted = false;
        $scope.emptyComment = false;
        $scope.noResourceLink = false;
        $scope.relatedResources = [];

        angular.forEach($rootScope.allResources, function(item) {
          if(item.category === $rootScope.currentCategory) {
            $scope.relatedResources.push(item);
          }
        });
        $scope.fetchComments();
      });
    };

      $scope.likeResource = function() {
        var currentResourceId = $scope.currentInformation[0]._id;
        console.log(currentResourceId, 'Oya nah.. current resource Id');
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
          $scope.fetchComments(); 
        });
      };

      $scope.fetchComments = function() {
        commentService.getComments($scope.currentInformation['0']._id ,function(arg) {
          $scope.comments = arg;
        });        
      };


  }]);
