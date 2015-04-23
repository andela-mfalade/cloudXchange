var signupService = angular.module('signupService', []);
  signupService.factory('signUp', ['$http', function ($http) {  
    return { 
      addUser: function(userInfo, callbackFn) {
        $http.post('/auth/signup', userInfo)
          .success(function(data) {
            callbackFn(data);
          })
          .error(function(err) {
            callbackFn(err);        
          })
      }  
    };
  }])