var resourceservice = angular.module('resourceservice', [])
  .factory('resourceService', ['$http', function ($http) {  
    return {
      getResources: function(callbackFn) {
        $http.get('/resources')
          .success(function(data){
            callbackFn(data);
          })
          .error(function(error) {
            console.log(error);
          });     
      }
    } 
}]);