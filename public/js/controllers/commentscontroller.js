angular.module('commentModule', ['commentservice'])
  .controller('commentCtrl', ['$scope', 'commentService', '$rootScope', function ($scope, commentService, $rootScope) {
    commentService.getResource( $rootScope.currentResource, function(arg) {
      $scope.currentInformation = arg;
      $scope.commentPosted = false;
      $scope.emptyComment = false;
      $scope.noResourceLink = false;
      $scope.relatedResources = [];
      var checkRL = $scope.currentInformation[0].resourceLink; //RL in this context means Resource Link
      if (checkRL === undefined || checkRL === '') {
        $scope.noResourceLink = true;
      }
      console.log($scope.currentInformation);
      angular.forEach($rootScope.allResources, function(item) {
        if(item.category === $rootScope.currentCategory) {
          $scope.relatedResources.push(item);
        }
      });

      // var newoutput = document.getElementById('newoutput');
      //     newoutput.src = $scope.currentInformation[0].file;
      
      $scope.showThisCategory = function(arg) {
        // console.log(arg);
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

      $scope.updateCurrent = function(arg) {
        angular.forEach($rootScope.allResources, function(item) {
          if(arg === item._id) {
            $scope.currentInformation = [item];
            $scope.fetchComments();
            var checkRL = $scope.currentInformation[0].resourceLink; //RL-Resource Link
            if (checkRL === undefined || checkRL === '') {
              $scope.noResourceLink = true;
            }
            else{
              $scope.noResourceLink = false;
            }
          }
        });
      };

      $scope.fetchComments = function() {
        commentService.getComments($scope.currentInformation['0']._id ,function(arg) {
          $scope.comments = arg;
          console.log(arg);
        });        
      };

      $scope.fetchComments();
    });


  }]);