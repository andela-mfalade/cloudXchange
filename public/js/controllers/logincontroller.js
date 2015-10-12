angular.module('loginModule', ['loginService'])
  .controller('loginCtrl', ['$scope', 'auth', '$location', '$rootScope', function ($scope, auth, $location, $rootScope) {
    $scope.errorMsg = '';
    $scope.errorthrown = false;
    $scope.loginDetails = {
      username: '', 
      password: ''
    };
    $scope.loginFailed = false;

    $scope.login = function() {
      $scope.errorthrown = false;
      $rootScope.currentUsername = $scope.username;
      $scope.loginDetails = {
        username: $scope.username, 
        password: $scope.password
      };

      auth.login($scope.loginDetails, function(status) {

        var status = parseInt(status);
        if(status === 505) {
          $scope.errorMsg = 'Invalid user credentials. Please sign up to continue.';
          $scope.errorthrown = true;
        }
        else if (status === 300) {
          $scope.errorMsg = 'Password incorrect..';
          $scope.errorthrown = true;
        }
        else if (status === 200) {
          $location.path('/profile');
        }

      });

        // 
    }
  }]);