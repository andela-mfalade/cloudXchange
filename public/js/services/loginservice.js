var loginService = angular.module('loginService', [])
    .factory('login', ['$http', function ($http) {  
      return { 
        login: function(arg, cb) {
          $http.post('auth/login', arg)
            .success(function(data) {
              cb(data)
              return true;
            })
            .error(function(err) {
              cb(err);
              return false;
            })
        }  
      };
    }]);