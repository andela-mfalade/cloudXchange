var loginService = angular.module('loginService', [])
    .factory('auth', ['$http', function ($http) {  
      return { 
        login: function(arg, cb) {
          $http.post('/login', arg).then(function(response) {
            console.log('Response is: ', response);
          },
          function(err) {
            console.log('An error occured.. details are ', err);
          });

          // $http.post('auth/login', arg)
          //   .success(function(data) {
          //     cb(data)
          //     return true;
          //   })
          //   .error(function(err) {
          //     cb(err);
          //     return false;
          //   })
        }  
      };
    }]);