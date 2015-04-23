angular.module('signupModule', ['signupService'])
  .controller('signupCtrl', ['$scope', 'signUp', '$location', '$rootScope', function ($scope, signUp, $location, $rootScope) {
    $scope.errorMessage = '';
    $scope.errorThrown  = false;
    $scope.addUser = function() {
      $scope.userInfo = {
        username: $scope.username,
        password: $scope.password,
        email   : $scope.email
      };
      
      signUp.addUser($scope.userInfo, function(value) {
        $rootScope.currentUsername = $scope.username;
        var value = parseInt(value);
        if( value === 900 ) {
          $scope.errorMessage = 'Sorry, that username has been taken. Here are some suggestions: \n ' + $scope.username + '001, ' + $scope.username + '419, ' + $scope.username + '007';
          $scope.errorThrown  = true;        
        }
        else if( value === 200 ) {
          $location.path('/profile');
        }
      });
    }
  }]);